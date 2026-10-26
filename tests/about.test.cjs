const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// Exercise the real component with CMS data, without making remote API calls.
const source = fs.readFileSync(path.join(__dirname, '../views/About.tsx'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;

function renderAbout(content) {
  let state = 0;
  const pages = content ? [{ slug: 'tentang-kami', content }] : null;
  const exports = {};
  const motion = new Proxy({}, {
    get: (_, tag) => ({ initial, animate, transition, whileInView, viewport, whileHover, ...props }) => React.createElement(tag, props),
  });
  vm.runInNewContext(compiled, { exports, require(name) {
    if (name === 'react') return { ...React, useState: () => [state++ === 0 ? pages : false, () => {}], useEffect: () => {} };
    if (name === 'react/jsx-runtime') return require(name);
    if (name === 'motion/react') return { motion };
    if (name === '../constants') return { ORGANIZATION_STRUCTURE: { pengawas: [], pengurus: [], manajemen: [] } };
    if (name === '../services/dataService') return { fetchCmsPages: async () => pages };
    if (name === 'lucide-react') return new Proxy({}, { get: () => () => null });
    throw new Error(`Unexpected import: ${name}`);
  } });
  return exports.default();
}

function descendants(element) {
  if (!element || typeof element !== 'object') return [];
  return [element, ...React.Children.toArray(element.props?.children).flatMap(descendants)];
}

const blocks = [
  { id: 'hero', type: 'hero', data: { headline: 'HEADER CMS' } },
  { id: 'history', type: 'rich-text', data: { content: '<h1>SEJARAH CMS</h1>' } },
  { id: 'vision', type: 'features', data: { items: [{ title: 'Visi CMS', description: 'Visi koperasi' }] } },
  { id: 'values', type: 'features', data: { title: 'Nilai CMS', items: [] } },
  { id: 'team', type: 'team', data: { title: 'Pengawas CMS', members: [{ name: 'Nama', role: 'Pengawas', photo_url: 'https://example.com/person.jpg' }] } },
  { id: 'cta', type: 'cta-banner', data: { headline: 'CTA CMS', buttons: [{ text: 'Tonton Video Profil', link: 'https://youtu.be/p3ZtUGPEI8k?si=example' }] } },
];
const markers = ['HEADER CMS', 'SEJARAH CMS', 'Visi CMS', 'Nilai CMS', 'Pengawas CMS', 'CTA CMS'];

for (const position of [0, 2, 5]) {
  test(`CTA follows CMS position ${position + 1}, retaining all other sections`, () => {
    const content = structuredClone(blocks.slice(0, -1));
    content.splice(position, 0, structuredClone(blocks.at(-1)));
    const original = structuredClone(content);
    const expected = markers.slice(0, -1);
    expected.splice(position, 0, markers.at(-1));
    const html = renderToStaticMarkup(renderAbout(content));
    let previous = -1;
    for (const marker of expected) {
      const index = html.indexOf(marker);
      assert.ok(index > previous, `${marker} should follow the preceding CMS section`);
      previous = index;
    }
    assert.equal((html.match(/<section\b/g) || []).length, 6);
    assert.deepEqual(content, original);
  });
}

test('other recognized sections also follow CMS order', () => {
  const content = [blocks[3], blocks[0], blocks[5], blocks[4], blocks[2], blocks[1]];
  const html = renderToStaticMarkup(renderAbout(content));
  const expected = ['Nilai CMS', 'HEADER CMS', 'CTA CMS', 'Pengawas CMS', 'Visi CMS', 'SEJARAH CMS'];
  const indices = expected.map(marker => html.indexOf(marker));
  assert.ok(indices.every((index, i) => index >= 0 && (i === 0 || index > indices[i - 1])));
});

test('CTA uses configured external, internal and fragment links with their exact labels', () => {
  const buttons = [
    { text: 'Tonton Video Profil', link: 'https://youtu.be/p3ZtUGPEI8k?si=example' },
    { text: 'Hubungi Kami', link: '/kontak' },
    { text: 'Sejarah', link: '#sejarah' },
  ];
  const tree = renderAbout([{ ...blocks.at(-1), data: { headline: 'CTA CMS', buttons } }]);
  const anchors = descendants(tree).filter(element => element.type === 'a');
  assert.equal(anchors.length, buttons.length);
  for (const [index, anchor] of anchors.entries()) {
    assert.equal(anchor.props.href, buttons[index].link);
    assert.equal(anchor.props.children, buttons[index].text);
  }
  assert.equal(anchors[0].props.target, '_blank');
  assert.equal(anchors[0].props.rel, 'noopener noreferrer');
  assert.equal(anchors[1].props.target, undefined);
  assert.equal(anchors[2].props.target, undefined);
});

test('legacy CTA fields are supported, including an empty buttons array', () => {
  for (const buttons of [undefined, []]) {
    const tree = renderAbout([{ ...blocks.at(-1), data: { button_text: 'Video Lama', button_link: 'https://example.com/profile', buttons } }]);
    const anchor = descendants(tree).find(element => element.type === 'a');
    assert.equal(anchor.props.children, 'Video Lama');
    assert.equal(anchor.props.href, 'https://example.com/profile');
  }
});

test('fallback sections retain their original order without CMS data', () => {
  const html = renderToStaticMarkup(renderAbout(null));
  const markers = ['Tentang Kami', 'Dua Dekade Mengabdi', 'Visi Kami', 'Nilai-Nilai Koperasi GIAT', 'Struktur Organisasi', 'Mari Tumbuh Bersama Kami'];
  const indices = markers.map(marker => html.indexOf(marker));
  assert.ok(indices.every((index, i) => index >= 0 && (i === 0 || index > indices[i - 1])));
});

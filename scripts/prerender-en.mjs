// Genera dist/en/index.html: la misma app con la cabecera SEO en inglés, para que
// Google indexe https://www.itpcargo.com.do/en/ como página propia en inglés.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const SITE = 'https://www.itpcargo.com.do';
const html = readFileSync('dist/index.html', 'utf8');

const ES = {
  title: 'ITP Cargo | Transporte de carga y logística en República Dominicana',
  desc: 'Agente de carga con más de 28 años en RD: carga marítima, aérea y terrestre, consolidación desde China, USA y Europa, aduanas y entrega puerta a puerta.',
};
const EN = {
  title: 'ITP Cargo | Freight forwarding &amp; logistics in the Dominican Republic',
  desc: 'Freight forwarder with 28+ years in the DR: ocean, air and ground freight, consolidation from China, USA and Europe, customs clearance and door-to-door delivery.',
};

const replacements = [
  ['<html lang="es">', '<html lang="en">'],
  [ES.title, EN.title],
  [ES.desc, EN.desc],
  [`<link rel="canonical" href="${SITE}/" />`, `<link rel="canonical" href="${SITE}/en/" />`],
  [`<meta property="og:url" content="${SITE}/" />`, `<meta property="og:url" content="${SITE}/en/" />`],
  ['content="es_DO"', 'content="en_US"'],
  ['content="Contenedor ITP Cargo en puerto al atardecer"', 'content="ITP Cargo container at port at sunset"'],
  ['<h1>ITP Cargo — Transporte de carga y logística en República Dominicana</h1>',
    '<h1>ITP Cargo — Freight forwarding and logistics in the Dominican Republic</h1>'],
  ['<p>Más de 28 años moviendo el comercio nacional. Pioneros en el servicio puerta a puerta: carga marítima (FCL y LCL), aérea y terrestre, consolidación desde China, USA y Europa, despacho aduanero, almacenaje y distribución.</p>',
    '<p>28+ years moving national trade. Pioneers in door-to-door service: ocean (FCL and LCL), air and ground freight, consolidation from China, USA and Europe, customs clearance, warehousing and distribution.</p>'],
  ['<p>Contacto: Wellington González · WhatsApp (809) 481-8976 · w.gonzalez@itpgroupdr.com · Santo Domingo, República Dominicana.</p>',
    '<p>Contact: Wellington González · WhatsApp +1 (809) 481-8976 · w.gonzalez@itpgroupdr.com · Santo Domingo, Dominican Republic.</p>'],
];

let out = html;
for (const [from, to] of replacements) {
  if (!out.includes(from)) throw new Error(`prerender-en: no se encontró en dist/index.html → ${from.slice(0, 70)}`);
  out = out.split(from).join(to);
}

mkdirSync('dist/en', { recursive: true });
writeFileSync('dist/en/index.html', out);
console.log('✓ dist/en/index.html generado');

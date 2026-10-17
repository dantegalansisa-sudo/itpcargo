import { createContext, useContext, useEffect, useState } from 'react';
import type { IconName } from './data';

export type Lang = 'es' | 'en';

const es = {
  meta: {
    title: 'ITP Cargo — Logística y transporte desde la fábrica hasta su almacén',
    description: 'ITP Cargo: más de 28 años moviendo el comercio de República Dominicana. Carga marítima, aérea y terrestre, consolidación desde China, USA y Europa, aduanas y almacenaje puerta a puerta.',
  },
  wa: {
    default: 'Hola ITP Cargo, me gustaría solicitar una cotización.',
    service: (s: string) => `Hola ITP Cargo, me interesa el servicio de ${s.toLowerCase()}.`,
    import: (s: string) => `Hola ITP Cargo, quiero importar ${s.toLowerCase()} desde China. ¿Me pueden cotizar?`,
  },
  header: {
    home: 'ITP Cargo — inicio',
    quote: 'Cotizar',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    links: ['Servicios', 'Cómo trabajamos', 'Rastrear / Cotizar', 'Cobertura', 'Nosotros', 'Contacto'],
  },
  hero: {
    pill: '28 años · República Dominicana',
    title: 'Movemos tu carga más lejos',
    accent: [3, 4], breaks: [0, 2],
    sub: [
      'Pioneros del servicio ', 'puerta a puerta', ' en RD. Importa desde China, USA y Europa con un solo aliado: ',
      'desde la fábrica hasta su almacén.',
    ],
    placeholder: 'Rastrea tu envío · Ej. ITP-48213',
    trackLabel: 'Número de rastreo',
    trackBtn: 'Rastrear envío',
    containerAlt: 'Contenedor ITP Cargo flotando',
    swipe: 'Desliza',
    chip: ['China · USA', 'Europa → RD'],
  },
  story: {
    routesLabel: 'Rutas frecuentes',
    routes: [
      'Shenzhen → Santo Domingo', 'Miami → Caucedo', 'Shanghái → Haina', 'Valencia → Santo Domingo',
      'Ningbo → Caucedo', 'Nueva York → Haina', 'Rotterdam → Caucedo', 'Guangzhou → Santo Domingo',
    ],
    big: '28 años moviendo el comercio nacional ·',
    eyebrow: 'Más que experiencia',
    title: 'Una trayectoria de éxitos, carga tras carga', accent: [0, 1],
    imgAlt: 'Contenedor ITP Cargo en puerto al atardecer',
    badge: 'Pioneros puerta a puerta en RD',
    text: 'ITP Cargo es una empresa dominicana de transporte y logística con más de 28 años en el sector. Ofrecemos soluciones completas y personalizadas, respaldadas por un equipo altamente capacitado y una amplia red de socios estratégicos en todo el mundo.',
    cta: 'Solicitar cotización',
    more: 'Conocer más',
    stats: ['Años de experiencia', 'Continentes de origen', 'Modalidades de transporte', 'Aliado de punta a punta'],
  },
  services: {
    eyebrow: 'Nuestros servicios',
    title: 'Soluciones para cada ruta de tu negocio', accent: [3],
    prev: 'Anterior', next: 'Siguiente',
    cta: 'Cotizar este servicio',
    items: [
      { title: 'Transporte marítimo', kicker: 'FCL · LCL', desc: 'Contenedores completos o carga consolidada desde los principales puertos del mundo hacia Caucedo y Haina.', tags: ['20’ y 40’', 'Consolidado', 'Refrigerado'] },
      { title: 'Transporte aéreo', kicker: 'Express · Carga general', desc: 'Cuando el tiempo manda. Coordinamos espacio con aerolíneas de carga para envíos urgentes y de alto valor.', tags: ['Urgente', 'Alto valor', 'Perecederos'] },
      { title: 'Transporte terrestre', kicker: 'Última milla nacional', desc: 'Del puerto a su almacén en todo el territorio nacional, con flota coordinada y entregas programadas.', tags: ['Puerta a puerta', 'Todo el país'] },
      { title: 'Despacho aduanero', kicker: 'Agentes de carga', desc: 'Clasificación, documentación y liberación de mercancía de todo tipo. Sin sorpresas ni retrasos en aduana.', tags: ['Documentación', 'Liberación', 'Asesoría'] },
      { title: 'Almacenaje y distribución', kicker: 'Bodega · Inventario', desc: 'Guardamos, organizamos y despachamos su mercancía según la demanda de su negocio.', tags: ['Inventario', 'Picking', 'Despacho'] },
      { title: 'Carga consolidada', kicker: 'China · USA · Europa', desc: 'Consolidamos su carga en cualquier ciudad de China, USA o Europa con las tarifas más competitivas del mercado.', tags: ['Tarifas preferenciales', 'Cualquier ciudad'] },
    ],
  },
  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'Desde la fábrica hasta su almacén', accent: [3, 4, 5, 6], breaks: [2],
    sub: 'Un solo equipo coordina cada etapa. Usted se enfoca en vender; nosotros en que su carga llegue.',
    step: 'Paso',
    steps: [
      { title: 'Cotiza en minutos', desc: 'Nos cuenta qué importa, desde dónde y cuándo. Le respondemos con una propuesta clara.' },
      { title: 'Recogemos en origen', desc: 'Retiramos la mercancía en la fábrica o con su proveedor en China, USA o Europa.' },
      { title: 'Consolidamos y embarcamos', desc: 'Agrupamos su carga, la embarcamos y la monitoreamos en cada etapa del trayecto.' },
      { title: 'Liberamos en aduana', desc: 'Nuestro equipo gestiona documentación, aranceles y liberación sin contratiempos.' },
      { title: 'Entregamos en su almacén', desc: 'La carga llega a su puerta, lista para vender. Desde la fábrica hasta su almacén.' },
    ],
  },
  imports: {
    eyebrow: 'Importa desde China',
    title: '¿Qué puedes importar con tarifas preferenciales?', accent: [4, 5],
    items: ['Línea blanca', 'Aires acondicionados', 'Hogar y muebles', 'Materiales de construcción', 'Eléctricos y ferretería', 'Y mucho más'],
    note: 'Toca una categoría y te cotizamos por WhatsApp.',
  },
  tools: {
    eyebrow: 'Autoservicio',
    title: 'Rastrea o cotiza tu envío', accent: [1, 2],
    tabs: ['Rastrear', 'Cotizar'],
    trackPh: 'Número de guía o BL',
    trackBtn: 'Rastrear',
    loading: 'Localizando su carga…',
    shipment: 'Envío',
    delivered: 'Entregado',
    inProgress: (n: number, t: number) => `En curso · etapa ${n} de ${t}`,
    stages: [
      { label: 'Recogido en origen', place: 'Shenzhen, China' },
      { label: 'Consolidado y embarcado', place: 'Puerto de Yantian' },
      { label: 'En tránsito marítimo', place: 'Océano Pacífico · Canal de Panamá' },
      { label: 'Arribo y despacho aduanero', place: 'Puerto Caucedo, RD' },
      { label: 'Entregado en almacén', place: 'Santo Domingo, RD' },
    ],
    trackNote: 'Vista demo con datos ilustrativos. Se conectará al sistema de rastreo de ITP Cargo.',
    origin: 'Origen', mode: 'Modalidad', load: 'Tipo de carga', product: '¿Qué va a importar?', name: 'Su nombre o empresa',
    productPh: 'Ej. aires acondicionados, cerámica…', namePh: 'Opcional',
    origins: ['China', 'Estados Unidos', 'Europa', 'Otro origen'],
    modes: ['Marítimo', 'Aéreo', 'Terrestre (nacional)'],
    loads: ['Carga consolidada (LCL)', 'Contenedor completo (FCL)', 'Carga suelta / paquetes'],
    transit: 'Tránsito estimado', days: 'días', dest: 'RD',
    send: 'Enviar cotización por WhatsApp',
    quoteNote: 'Tiempos referenciales. Le confirmamos tarifa y fecha exacta.',
    msg: (o: string, m: string, l: string, p: string, n: string) =>
      `Hola ITP Cargo, quiero cotizar un envío:\n• Origen: ${o}\n• Modalidad: ${m}\n• Tipo de carga: ${l}\n` +
      (p ? `• Producto: ${p}\n` : '') + (n ? `Mi nombre: ${n}` : ''),
  },
  coverage: {
    eyebrow: 'Cobertura global',
    title: 'Tu carga, sin fronteras', accent: [2, 3],
    sub: 'Consolidamos en cualquier ciudad de China, USA o Europa y la llevamos hasta República Dominicana.',
    mapAlt: 'Mapa de rutas hacia República Dominicana',
    dr: 'República Dominicana',
    regions: [
      { label: 'Asia', desc: 'Shenzhen, Shanghái, Ningbo, Guangzhou' },
      { label: 'Norteamérica', desc: 'Miami, Nueva York, Houston' },
      { label: 'Europa', desc: 'Valencia, Rotterdam, Hamburgo' },
    ],
  },
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Detrás de cada carga hay un equipo', accent: [5, 6],
    photoAlt: 'Equipo ITP Cargo',
    photoTag: 'Profesionales comprometidos con su negocio',
    mission: 'Misión',
    missionText: 'Brindar un servicio de calidad, eficiente y confiable, que contribuya al éxito de nuestros clientes y consolide nuestra posición como una de las principales empresas de logística y transporte internacional en la República Dominicana.',
    vision: 'Visión',
    visionText: 'Mantenernos a la vanguardia del sector con soluciones innovadoras y eficientes, comprometidos con la satisfacción de cada cliente y la mejora continua de nuestros servicios.',
    values: 'Nuestros valores',
    valueList: ['Confianza', 'Calidad', 'Orientación al cliente', 'Innovación', 'Responsabilidad', 'Trabajo en equipo', 'Profesionalismo', 'Flexibilidad', 'Excelencia operativa'],
  },
  tips: {
    eyebrow: 'Guía para importadores',
    title: 'errores que pueden retrasar tu importación',
    items: [
      { title: 'Documentación incompleta', desc: 'Una factura comercial o un packing list con errores puede dejar su carga detenida en aduana por días. Revisamos todo antes del embarque.' },
      { title: 'Planificación tardía', desc: 'Las temporadas altas llenan los buques. Reservar con anticipación asegura espacio y mejores tarifas.' },
      { title: 'Desconocimiento de costos', desc: 'Flete, seguro, aranceles, manejo portuario… Le damos el costo total puesto en su almacén, no solo el flete.' },
      { title: 'Problemas aduanales', desc: 'Una clasificación arancelaria incorrecta genera multas y retrasos. Nuestros agentes de carga lo resuelven por usted.' },
      { title: 'Elegir el tipo de carga incorrecto', desc: '¿Contenedor completo o consolidado? ¿Marítimo o aéreo? Le asesoramos según volumen, urgencia y presupuesto.' },
    ],
    quote: ['Una buena logística comienza ', 'antes de que la carga salga.'],
  },
  final: {
    eyebrow: 'Cotiza hoy',
    title: 'Hagamos que tu próxima ruta sea un gran negocio', accent: [5, 6],
    cta: 'Solicitar cotización',
    tag: 'Más de 28 años moviendo el comercio nacional. Desde la fábrica hasta su almacén.',
    contact: 'Contacto comercial',
    location: 'Santo Domingo, República Dominicana',
    services: 'Servicios',
    serviceLinks: ['Marítimo', 'Aéreo', 'Terrestre', 'Aduanas', 'Almacenaje'],
    company: 'Empresa',
    companyLinks: ['Nosotros', 'Cómo trabajamos', 'Cobertura', 'Rastreo'],
    top: 'Volver arriba ↑',
    fab: 'Escríbenos por WhatsApp',
  },
};

export type Dict = typeof es;

const en: Dict = {
  meta: {
    title: 'ITP Cargo — Logistics & freight from the factory to your warehouse',
    description: 'ITP Cargo: 28+ years moving Dominican Republic trade. Ocean, air and ground freight, consolidation from China, USA and Europe, customs and door-to-door warehousing.',
  },
  wa: {
    default: 'Hello ITP Cargo, I would like to request a quote.',
    service: (s: string) => `Hello ITP Cargo, I'm interested in your ${s.toLowerCase()} service.`,
    import: (s: string) => `Hello ITP Cargo, I want to import ${s.toLowerCase()} from China. Could you send me a quote?`,
  },
  header: {
    home: 'ITP Cargo — home',
    quote: 'Get a quote',
    open: 'Open menu',
    close: 'Close menu',
    links: ['Services', 'How we work', 'Track / Quote', 'Coverage', 'About us', 'Contact'],
  },
  hero: {
    pill: '28 years · Dominican Republic',
    title: 'We move your cargo further',
    accent: [4], breaks: [1, 3],
    sub: [
      'Pioneers of ', 'door-to-door', ' service in the DR. Import from China, the USA and Europe with a single partner: ',
      'from the factory to your warehouse.',
    ],
    placeholder: 'Track shipment · e.g. ITP-48213',
    trackLabel: 'Tracking number',
    trackBtn: 'Track shipment',
    containerAlt: 'Floating ITP Cargo container',
    swipe: 'Swipe',
    chip: ['China · USA', 'Europe → DR'],
  },
  story: {
    routesLabel: 'Frequent routes',
    routes: [
      'Shenzhen → Santo Domingo', 'Miami → Caucedo', 'Shanghai → Haina', 'Valencia → Santo Domingo',
      'Ningbo → Caucedo', 'New York → Haina', 'Rotterdam → Caucedo', 'Guangzhou → Santo Domingo',
    ],
    big: '28 years moving national trade ·',
    eyebrow: 'More than experience',
    title: 'A track record of success, load after load', accent: [1, 2],
    imgAlt: 'ITP Cargo container at port at sunset',
    badge: 'Door-to-door pioneers in the DR',
    text: 'ITP Cargo is a Dominican transport and logistics company with more than 28 years in the industry. We offer complete, tailored solutions backed by a highly trained team and a broad network of strategic partners worldwide.',
    cta: 'Request a quote',
    more: 'Learn more',
    stats: ['Years of experience', 'Origin continents', 'Transport modes', 'End-to-end partner'],
  },
  services: {
    eyebrow: 'Our services',
    title: 'Solutions for every route of your business', accent: [3],
    prev: 'Previous', next: 'Next',
    cta: 'Quote this service',
    items: [
      { title: 'Ocean freight', kicker: 'FCL · LCL', desc: 'Full containers or consolidated cargo from the world’s major ports to Caucedo and Haina.', tags: ['20’ & 40’', 'Consolidated', 'Reefer'] },
      { title: 'Air freight', kicker: 'Express · General cargo', desc: 'When time matters most. We book space with cargo airlines for urgent and high-value shipments.', tags: ['Urgent', 'High value', 'Perishables'] },
      { title: 'Ground transport', kicker: 'Nationwide last mile', desc: 'From the port to your warehouse anywhere in the country, with a coordinated fleet and scheduled deliveries.', tags: ['Door to door', 'Nationwide'] },
      { title: 'Customs clearance', kicker: 'Freight forwarders', desc: 'Classification, paperwork and release of all kinds of goods. No surprises, no customs delays.', tags: ['Paperwork', 'Release', 'Advisory'] },
      { title: 'Warehousing & distribution', kicker: 'Storage · Inventory', desc: 'We store, organize and dispatch your goods according to your business demand.', tags: ['Inventory', 'Picking', 'Dispatch'] },
      { title: 'Consolidated cargo', kicker: 'China · USA · Europe', desc: 'We consolidate your cargo in any city in China, the USA or Europe at the most competitive rates on the market.', tags: ['Preferential rates', 'Any city'] },
    ],
  },
  process: {
    eyebrow: 'How we work',
    title: 'From the factory to your warehouse', accent: [3, 4, 5], breaks: [2],
    sub: 'One team coordinates every stage. You focus on selling; we make sure your cargo arrives.',
    step: 'Step',
    steps: [
      { title: 'Get a quote in minutes', desc: 'Tell us what you import, from where and when. We reply with a clear proposal.' },
      { title: 'We pick up at origin', desc: 'We collect the goods at the factory or from your supplier in China, the USA or Europe.' },
      { title: 'We consolidate and ship', desc: 'We group your cargo, ship it and monitor it at every stage of the journey.' },
      { title: 'We clear customs', desc: 'Our team handles paperwork, duties and release with no setbacks.' },
      { title: 'We deliver to your warehouse', desc: 'Your cargo arrives at your door, ready to sell. From the factory to your warehouse.' },
    ],
  },
  imports: {
    eyebrow: 'Import from China',
    title: 'What can you import at preferential rates?', accent: [5, 6],
    items: ['Home appliances', 'Air conditioners', 'Home & furniture', 'Building materials', 'Electrical & hardware', 'And much more'],
    note: 'Tap a category and we’ll quote you on WhatsApp.',
  },
  tools: {
    eyebrow: 'Self-service',
    title: 'Track or quote your shipment', accent: [1, 2],
    tabs: ['Track', 'Quote'],
    trackPh: 'Tracking or BL number',
    trackBtn: 'Track',
    loading: 'Locating your cargo…',
    shipment: 'Shipment',
    delivered: 'Delivered',
    inProgress: (n: number, t: number) => `In progress · stage ${n} of ${t}`,
    stages: [
      { label: 'Picked up at origin', place: 'Shenzhen, China' },
      { label: 'Consolidated and shipped', place: 'Port of Yantian' },
      { label: 'Ocean transit', place: 'Pacific Ocean · Panama Canal' },
      { label: 'Arrival and customs clearance', place: 'Port of Caucedo, DR' },
      { label: 'Delivered to warehouse', place: 'Santo Domingo, DR' },
    ],
    trackNote: 'Demo view with sample data. It will connect to ITP Cargo’s tracking system.',
    origin: 'Origin', mode: 'Mode', load: 'Cargo type', product: 'What are you importing?', name: 'Your name or company',
    productPh: 'e.g. air conditioners, ceramics…', namePh: 'Optional',
    origins: ['China', 'United States', 'Europe', 'Other origin'],
    modes: ['Ocean', 'Air', 'Ground (domestic)'],
    loads: ['Consolidated cargo (LCL)', 'Full container (FCL)', 'Loose cargo / parcels'],
    transit: 'Estimated transit', days: 'days', dest: 'DR',
    send: 'Send quote via WhatsApp',
    quoteNote: 'Reference times. We’ll confirm the exact rate and date.',
    msg: (o: string, m: string, l: string, p: string, n: string) =>
      `Hello ITP Cargo, I'd like a shipping quote:\n• Origin: ${o}\n• Mode: ${m}\n• Cargo type: ${l}\n` +
      (p ? `• Product: ${p}\n` : '') + (n ? `My name: ${n}` : ''),
  },
  coverage: {
    eyebrow: 'Global coverage',
    title: 'Your cargo, without borders', accent: [2, 3],
    sub: 'We consolidate in any city in China, the USA or Europe and bring it all the way to the Dominican Republic.',
    mapAlt: 'Map of routes to the Dominican Republic',
    dr: 'Dominican Republic',
    regions: [
      { label: 'Asia', desc: 'Shenzhen, Shanghai, Ningbo, Guangzhou' },
      { label: 'North America', desc: 'Miami, New York, Houston' },
      { label: 'Europe', desc: 'Valencia, Rotterdam, Hamburg' },
    ],
  },
  about: {
    eyebrow: 'Who we are',
    title: 'Behind every shipment there is a team', accent: [5, 6],
    photoAlt: 'ITP Cargo team',
    photoTag: 'Professionals committed to your business',
    mission: 'Mission',
    missionText: 'To provide a quality, efficient and reliable service that contributes to our clients’ success and strengthens our position as one of the leading international logistics and transport companies in the Dominican Republic.',
    vision: 'Vision',
    visionText: 'To stay at the forefront of the industry with innovative, efficient solutions, committed to every client’s satisfaction and the continuous improvement of our services.',
    values: 'Our values',
    valueList: ['Trust', 'Quality', 'Customer focus', 'Innovation', 'Responsibility', 'Teamwork', 'Professionalism', 'Flexibility', 'Operational excellence'],
  },
  tips: {
    eyebrow: 'Importer’s guide',
    title: 'mistakes that can delay your import',
    items: [
      { title: 'Incomplete paperwork', desc: 'A commercial invoice or packing list with errors can leave your cargo stuck in customs for days. We review everything before shipping.' },
      { title: 'Late planning', desc: 'Peak seasons fill up vessels. Booking ahead secures space and better rates.' },
      { title: 'Unknown costs', desc: 'Freight, insurance, duties, port handling… We give you the total landed cost at your warehouse, not just the freight.' },
      { title: 'Customs issues', desc: 'A wrong tariff classification leads to fines and delays. Our freight forwarders handle it for you.' },
      { title: 'Choosing the wrong cargo type', desc: 'Full container or consolidated? Ocean or air? We advise you based on volume, urgency and budget.' },
    ],
    quote: ['Good logistics starts ', 'before the cargo leaves.'],
  },
  final: {
    eyebrow: 'Quote today',
    title: 'Let’s make your next route a great deal', accent: [6, 7],
    cta: 'Request a quote',
    tag: '28+ years moving national trade. From the factory to your warehouse.',
    contact: 'Sales contact',
    location: 'Santo Domingo, Dominican Republic',
    services: 'Services',
    serviceLinks: ['Ocean', 'Air', 'Ground', 'Customs', 'Warehousing'],
    company: 'Company',
    companyLinks: ['About us', 'How we work', 'Coverage', 'Tracking'],
    top: 'Back to top ↑',
    fab: 'Message us on WhatsApp',
  },
};

const DICTS: Record<Lang, Dict> = { es, en };

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: 'es', t: es, setLang: () => {} });

function initialLang(): Lang {
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q === 'en' || q === 'es') return q;
  try {
    const saved = localStorage.getItem('itp-lang');
    if (saved === 'en' || saved === 'es') return saved;
  } catch { /* almacenamiento no disponible */ }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = DICTS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try { localStorage.setItem('itp-lang', lang); } catch { /* almacenamiento no disponible */ }
  }, [lang, t]);

  return <LangContext.Provider value={{ lang, t, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Íconos por posición, compartidos entre idiomas */
export const IMPORT_ICONS: IconName[] = ['fridge', 'snow', 'sofa', 'brick', 'plug', 'plus'];
export const STEP_ICONS: IconName[] = ['calc', 'pin', 'ship', 'customs', 'warehouse'];

export const CONTACT = {
  name: 'Wellington González',
  phone: '(809) 481-8976',
  whatsapp: '18094818976',
  email: 'w.gonzalez@itpgroupdr.com',
  instagram: 'https://www.instagram.com/itpcargo',
};

export const wa = (msg: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export const WA_DEFAULT = wa('Hola ITP Cargo, me gustaría solicitar una cotización.');

export type IconName =
  | 'ship' | 'plane' | 'truck' | 'warehouse' | 'customs' | 'boxes'
  | 'arrow' | 'search' | 'globe' | 'shield' | 'clock' | 'pin'
  | 'fridge' | 'snow' | 'sofa' | 'brick' | 'plug' | 'whatsapp'
  | 'mail' | 'phone' | 'instagram' | 'check' | 'doc' | 'calendar'
  | 'calc' | 'plus' | 'users' | 'spark' | 'route' | 'menu' | 'close';

export const SERVICES: {
  id: string; title: string; kicker: string; desc: string; img: string; icon: IconName; tags: string[];
}[] = [
  {
    id: 'maritimo', title: 'Transporte marítimo', kicker: 'FCL · LCL',
    desc: 'Contenedores completos o carga consolidada desde los principales puertos del mundo hacia Caucedo y Haina.',
    img: '/img/maritimo.webp', icon: 'ship', tags: ['20’ y 40’', 'Consolidado', 'Refrigerado'],
  },
  {
    id: 'aereo', title: 'Transporte aéreo', kicker: 'Express · Carga general',
    desc: 'Cuando el tiempo manda. Coordinamos espacio con aerolíneas de carga para envíos urgentes y de alto valor.',
    img: '/img/aereo.webp', icon: 'plane', tags: ['Urgente', 'Alto valor', 'Perecederos'],
  },
  {
    id: 'terrestre', title: 'Transporte terrestre', kicker: 'Última milla nacional',
    desc: 'Del puerto a su almacén en todo el territorio nacional, con flota coordinada y entregas programadas.',
    img: '/img/terrestre.webp', icon: 'truck', tags: ['Puerta a puerta', 'Todo el país'],
  },
  {
    id: 'aduanas', title: 'Despacho aduanero', kicker: 'Agentes de carga',
    desc: 'Clasificación, documentación y liberación de mercancía de todo tipo. Sin sorpresas ni retrasos en aduana.',
    img: '/img/p_image2.webp', icon: 'customs', tags: ['Documentación', 'Liberación', 'Asesoría'],
  },
  {
    id: 'almacen', title: 'Almacenaje y distribución', kicker: 'Bodega · Inventario',
    desc: 'Guardamos, organizamos y despachamos su mercancía según la demanda de su negocio.',
    img: '/img/almacen.webp', icon: 'warehouse', tags: ['Inventario', 'Picking', 'Despacho'],
  },
  {
    id: 'consolidado', title: 'Carga consolidada', kicker: 'China · USA · Europa',
    desc: 'Consolidamos su carga en cualquier ciudad de China, USA o Europa con las tarifas más competitivas del mercado.',
    img: '/img/puerto.webp', icon: 'boxes', tags: ['Tarifas preferenciales', 'Cualquier ciudad'],
  },
];

export const STEPS: { title: string; desc: string; icon: IconName }[] = [
  { title: 'Cotiza en minutos', desc: 'Nos cuenta qué importa, desde dónde y cuándo. Le respondemos con una propuesta clara.', icon: 'calc' },
  { title: 'Recogemos en origen', desc: 'Retiramos la mercancía en la fábrica o con su proveedor en China, USA o Europa.', icon: 'pin' },
  { title: 'Consolidamos y embarcamos', desc: 'Agrupamos su carga, la embarcamos y la monitoreamos en cada etapa del trayecto.', icon: 'ship' },
  { title: 'Liberamos en aduana', desc: 'Nuestro equipo gestiona documentación, aranceles y liberación sin contratiempos.', icon: 'customs' },
  { title: 'Entregamos en su almacén', desc: 'La carga llega a su puerta, lista para vender. Desde la fábrica hasta su almacén.', icon: 'warehouse' },
];

export const IMPORTS: { title: string; icon: IconName }[] = [
  { title: 'Línea blanca', icon: 'fridge' },
  { title: 'Aires acondicionados', icon: 'snow' },
  { title: 'Hogar y muebles', icon: 'sofa' },
  { title: 'Materiales de construcción', icon: 'brick' },
  { title: 'Eléctricos y ferretería', icon: 'plug' },
  { title: 'Y mucho más', icon: 'plus' },
];

export const ERRORS: { title: string; desc: string }[] = [
  { title: 'Documentación incompleta', desc: 'Una factura comercial o un packing list con errores puede dejar su carga detenida en aduana por días. Revisamos todo antes del embarque.' },
  { title: 'Planificación tardía', desc: 'Las temporadas altas llenan los buques. Reservar con anticipación asegura espacio y mejores tarifas.' },
  { title: 'Desconocimiento de costos', desc: 'Flete, seguro, aranceles, manejo portuario… Le damos el costo total puesto en su almacén, no solo el flete.' },
  { title: 'Problemas aduanales', desc: 'Una clasificación arancelaria incorrecta genera multas y retrasos. Nuestros agentes de carga lo resuelven por usted.' },
  { title: 'Elegir el tipo de carga incorrecto', desc: '¿Contenedor completo o consolidado? ¿Marítimo o aéreo? Le asesoramos según volumen, urgencia y presupuesto.' },
];

export const VALUES = [
  'Confianza', 'Calidad', 'Orientación al cliente', 'Innovación', 'Responsabilidad',
  'Trabajo en equipo', 'Profesionalismo', 'Flexibilidad', 'Excelencia operativa',
];

export const ROUTES = [
  'Shenzhen → Santo Domingo', 'Miami → Caucedo', 'Shanghái → Haina', 'Valencia → Santo Domingo',
  'Ningbo → Caucedo', 'Nueva York → Haina', 'Rotterdam → Caucedo', 'Guangzhou → Santo Domingo',
];

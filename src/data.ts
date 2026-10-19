export const CONTACT = {
  name: 'Wellington González',
  phone: '(809) 481-8976',
  whatsapp: '18094818976',
  email: 'w.gonzalez@itpgroupdr.com',
  instagram: 'https://www.instagram.com/itpcargo',
};

export const wa = (msg: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export type IconName =
  | 'ship' | 'plane' | 'truck' | 'warehouse' | 'customs' | 'boxes'
  | 'arrow' | 'search' | 'globe' | 'shield' | 'clock' | 'pin'
  | 'fridge' | 'snow' | 'sofa' | 'brick' | 'plug' | 'whatsapp'
  | 'mail' | 'phone' | 'instagram' | 'check' | 'doc' | 'calendar'
  | 'calc' | 'plus' | 'users' | 'spark' | 'route' | 'menu' | 'close';

/** Datos visuales de cada servicio; los textos viven en i18n.tsx (mismo orden) */
export const SERVICES: { id: string; img: string; icon: IconName }[] = [
  { id: 'maritimo', img: '/img/maritimo.webp', icon: 'ship' },
  { id: 'aereo', img: '/img/aereo.webp', icon: 'plane' },
  { id: 'terrestre', img: '/img/terrestre.webp', icon: 'truck' },
  { id: 'aduanas', img: '/img/p_image2.webp', icon: 'customs' },
  { id: 'almacen', img: '/img/almacen.webp', icon: 'warehouse' },
  { id: 'consolidado', img: '/img/puerto.webp', icon: 'boxes' },
];

/**
 * Navieras para rastreo de contenedores (FCL). Se abre la página oficial de rastreo y el
 * número se copia al portapapeles; solo Maersk acepta el número en la URL.
 * `prefixes` = códigos de propietario ISO 6346 (4 letras) para detectar la naviera.
 * Revisar los enlaces con ITP Cargo antes de producción: las navieras cambian sus rutas.
 */
export type Carrier = { id: string; name: string; prefixes: string[]; url: (n: string) => string };

export const CARRIERS: Carrier[] = [
  { id: 'msc', name: 'MSC', prefixes: ['MSCU', 'MEDU', 'MSDU', 'MSMU', 'MSNU'], url: () => 'https://www.msc.com/en/track-a-shipment' },
  { id: 'maersk', name: 'Maersk', prefixes: ['MAEU', 'MSKU', 'MRKU', 'MSFU', 'MRSU', 'SUDU'], url: (n) => `https://www.maersk.com/tracking/${encodeURIComponent(n)}` },
  { id: 'cma', name: 'CMA CGM', prefixes: ['CMAU', 'CGMU', 'APHU', 'APZU'], url: () => 'https://www.cma-cgm.com/ebusiness/tracking' },
  { id: 'hapag', name: 'Hapag-Lloyd', prefixes: ['HLCU', 'HLXU', 'HLBU', 'UACU'], url: () => 'https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html' },
  { id: 'cosco', name: 'COSCO', prefixes: ['CBHU', 'COSU', 'CCLU', 'CSNU'], url: () => 'https://elines.coscoshipping.com/ebusiness/cargoTracking' },
  { id: 'evergreen', name: 'Evergreen', prefixes: ['EISU', 'EMCU', 'EGHU', 'EGSU'], url: () => 'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do' },
  { id: 'one', name: 'ONE', prefixes: ['ONEU', 'NYKU', 'MOLU'], url: () => 'https://www.one-line.com/one-ecom/manage-shipment/cargo-tracking' },
  { id: 'zim', name: 'ZIM', prefixes: ['ZIMU', 'ZCSU'], url: () => 'https://www.zim.com/tools/track-a-shipment' },
  { id: 'seaboard', name: 'Seaboard Marine', prefixes: ['SMLU'], url: () => 'https://www.seaboardmarine.com/' },
  { id: 'crowley', name: 'Crowley', prefixes: ['CMCU'], url: () => 'https://www.crowley.com/' },
];

export const GLOBAL_TRACKERS = {
  container: 'https://www.track-trace.com/container',
  air: 'https://www.track-trace.com/aircargo',
};

const ISO_VALUES = 'A10B12C13D14E15F16G17H18I19J20K21L23M24N25O26P27Q28R29S30T31U32V34W35X36Y37Z38';
const letterValue = (ch: string) => Number(ISO_VALUES.slice(ISO_VALUES.indexOf(ch) + 1, ISO_VALUES.indexOf(ch) + 3));

/** Número de contenedor ISO 6346: 4 letras + 7 dígitos (el último es verificador) */
export const CONTAINER_RE = /^[A-Z]{4}\d{7}$/;
/** Guía aérea (AWB): prefijo de aerolínea de 3 dígitos + 8 dígitos */
export const AWB_RE = /^\d{3}[- ]?\d{8}$/;

export function containerCheckOk(n: string) {
  if (!CONTAINER_RE.test(n)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const v = i < 4 ? letterValue(n[i]) : Number(n[i]);
    sum += v * 2 ** i;
  }
  return (sum % 11) % 10 === Number(n[10]);
}

export const detectCarrier = (n: string) => CARRIERS.find((c) => c.prefixes.includes(n.slice(0, 4).toUpperCase()));

export type TrackKind = 'itp' | 'container' | 'air';
export function detectKind(raw: string): TrackKind {
  const n = raw.trim().toUpperCase().replace(/\s+/g, '');
  if (CONTAINER_RE.test(n) || detectCarrier(n)) return 'container';
  if (AWB_RE.test(raw.trim())) return 'air';
  return 'itp';
}

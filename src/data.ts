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

import { getPermalink } from './utils/permalinks';

// Rutas de I1 (plan-i1.md D-01). Nada de enlaces a páginas de I2.
export const headerData = {
  links: [
    { text: 'Inicio', href: getPermalink('/') },
    { text: 'Soluciones', href: getPermalink('/soluciones/') },
    { text: 'Servicios de terreno', href: getPermalink('/pruebas-fat-sat-y-comisionamiento/') },
    { text: 'Empresa', href: getPermalink('/empresa/') },
    { text: 'Contacto', href: getPermalink('/contacto/') },
  ],
  actions: [{ text: 'Cotizar', href: getPermalink('/contacto/') }],
};

export const footerData = {
  links: [],
  secondaryLinks: [{ text: 'Privacidad', href: getPermalink('/privacidad/') }],
  socialLinks: [],
  footNote: '© Telectrich · Una empresa de AT Ingeniería',
};

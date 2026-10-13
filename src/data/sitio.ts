export const CONTACTO = {
  whatsapp: 'https://wa.me/56935935595?text=Hola%2C%20los%20contacto%20desde%20telectrich.cl',
  correo: 'ventas@atingenieria.com',
  telefono: '+56 9 3593 5595',
  whatsappRaw: '56935935595',
  taller: 'Parcelación Victoria de Viluco, Buin, Región Metropolitana',
  horario: 'Lunes a viernes 09:00 a 18:00 h',
};

export interface Solucion {
  numero: string;
  nombre: string;
  resumen: string;
  ruta: string;
  foto: string;
  alt: string;
}

export const SOLUCIONES: Solucion[] = [
  {
    numero: '01',
    nombre: 'Tableros de fuerza',
    resumen: 'Distribución y alimentación de cargas con protecciones y envolventes adaptados al entorno.',
    ruta: '/soluciones/tableros-de-fuerza/',
    foto: 'distribucion-schneider',
    alt: 'Tablero de distribución con interruptores y protecciones en riel',
  },
  {
    numero: '02',
    nombre: 'Tableros de control',
    resumen: 'Integración de PLC, gestión de señales y automatización industrial diseñada para facilitar la escalabilidad.',
    ruta: '/soluciones/tableros-de-control/',
    foto: 'control-abb-interior',
    alt: 'Interior de un tablero de control con PLC y cableado ordenado',
  },
  {
    numero: '03',
    nombre: 'Supervisión HMI',
    resumen: 'Interfaces HMI para visualizar estados, gestionar alarmas y comandar la operación.',
    ruta: '/soluciones/supervision-hmi/',
    foto: 'hmi-nema4x',
    alt: 'Puerta de un tablero con pantalla HMI y botonera',
  },
  {
    numero: '04',
    nombre: 'Comunicaciones industriales',
    resumen: 'Redes de campo, enlaces Ethernet y fibra óptica para conectar control y supervisión.',
    ruta: '/soluciones/comunicacion-industrial/',
    foto: 'switch-emerson',
    alt: 'Switch industrial montado en un tablero de comunicaciones',
  },
];

export interface Marca {
  nombre: string;
  src: string | null;
}

export const MARCAS: Marca[] = [
  { nombre: 'SIEMENS', src: null },
  { nombre: 'ABB', src: '/marcas/marca-abb.svg' },
  { nombre: 'Schneider Electric', src: '/marcas/marca-schneider-electric.svg' },
  { nombre: 'Rockwell Automation', src: '/marcas/marca-rockwell-automation.svg' },
  { nombre: 'Rittal', src: '/marcas/marca-rittal.svg' },
  { nombre: 'Eaton', src: '/marcas/marca-eaton.svg' },
  { nombre: 'Legrand', src: '/marcas/marca-legrand.svg' },
  { nombre: 'Phoenix Contact', src: '/marcas/marca-phoenix-contact.svg' },
  { nombre: 'Cisco', src: null },
  { nombre: 'Emerson', src: null },
];

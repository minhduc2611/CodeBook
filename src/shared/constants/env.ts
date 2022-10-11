export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const NODE_ENV = process.env.NODE_ENV;

export const PORT = NODE_ENV === 'development' ? process.env.PORT || 3000 : '';

export const BASE_URL = process.env.BASE_URL || 'http://localhost';

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const NEXT_PUBLIC_NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

export const NEXT_PUBLIC_PORT = process.env.NEXT_PUBLIC_PORT || 3000;

export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost';

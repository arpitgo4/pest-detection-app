
export const JWT_TOKEN_HEADER = 'X-Token';

export const DEFAULT_PAGE_SIZE = 10;

export const LS_JWT_TOKEN_KEY = `token`;
export const LS_USER_KEY = `user`;


const APP_BASE = `/dashboard`;
export const ROUTES = {
    LOGIN_LAYOUT: '/',
    REGISTER_LAYOUT: '/register',
    APP_LAYOUT: APP_BASE,
    USER_MANAGEMENT_LAYOUT: `${APP_BASE}/user`,
    INSPECTION_LAYOUT: `${APP_BASE}/inspections`,
    IMAGERY_LAYOUT: `${APP_BASE}/imagery`,
};

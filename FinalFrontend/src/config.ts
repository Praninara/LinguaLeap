// export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://lingualeap-backend.onrender.com';
// export const BACKEND_URL = 'https://lingualeap-backend.onrender.com/api';
export const BACKEND_URL = 'https://lingualeap-backend.onrender.com';

export const SOCKET_OPTIONS = {
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: false,
    path: '/socket.io'
};
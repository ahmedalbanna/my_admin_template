import { io, Socket } from 'socket.io-client';
import { APP_CONFIG } from '../config/app.config';
import { tokenStorage } from '../api/apiClient';

let socket: Socket | null = null;

export const connectSocket = () => {
  if (socket) return socket;

  const token = tokenStorage.getAccess();
  if (!token) return null;

  socket = io(APP_CONFIG.apiUrl, {
    auth: {
      token: `Bearer ${token}`,
    },
    transports: ['websocket'],
    autoConnect: true,
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

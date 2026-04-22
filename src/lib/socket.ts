// /lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let currentToken: string | null = null;

export const getSocket = (token: string) => {
  const socketUrl = process.env.NEXT_PUBLIC_HOST_SOCKET_API as string;

  // If no socket OR token has changed, create a new connection
  if (!socket || currentToken !== token) {
    if (socket) {
      socket.disconnect();
    }
    currentToken = token;
    socket = io(socketUrl, {
      query: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    currentToken = null;
  }
};

// /lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (token: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_HOST_SOCKET_API as string, {
      query: { token },
      transports: ['websocket', 'polling'], // polling fallback for Vercel
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

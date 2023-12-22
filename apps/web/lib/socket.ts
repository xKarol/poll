import type { WebSocket } from "@poll/types";
import { io } from "socket.io-client";

const sockerUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const socket: WebSocket.ClientSocket = io(sockerUrl, {
  autoConnect: false,
});

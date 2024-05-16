import io from "socket.io-client";

const socket = io("https://geospotter.onrender.com", {
  autoConnect: false,
});

export default socket;

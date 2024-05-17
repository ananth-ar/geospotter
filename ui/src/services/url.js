export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : `http://localhost:3001`;

console.log("running on ",process.env.NODE_ENV);
console.log("listening to ", BASE_URL);
// "https://geospotter.onrender.com"

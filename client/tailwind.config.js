/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta corporativa de Che Tarea
        primary: {
          DEFAULT: "#2563eb", // blue-600
          hover: "#1d4ed8", // blue-700
          light: "#3b82f6", // blue-500
        },
        // Estados de prioridad
        urgent: "#ef4444", // red-500
        high: "#f59e0b", // amber-500
        medium: "#eab308", // yellow-500
        low: "#22c55e", // green-500
        completed: "#10b981", // green-600
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Pateta corporativa de Che Tarea
        primary: {
          DEFAULT: "#2563EB", // blue-600
          hover: "#1D4ED8", // blue-700
          light: "#3B82F6", // blue-500
        },
        // Estados de prioridad
        urgente: "#EF4444", // red-500
        alta: "#F59E0B", // amber-500
        media: "#EAB308", // yellow-500
        baja: "#22C55E", // green-500
        completada: "#10B981", // green-600
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

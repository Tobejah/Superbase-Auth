import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // If you're using React
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),          // Keep this if you're using React
    tailwindcss(),    // Add the Tailwind CSS plugin
  ],
});

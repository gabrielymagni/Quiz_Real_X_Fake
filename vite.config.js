import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Caminhos relativos: o site funciona em qualquer endereço (ex.: GitHub Pages em /Quiz_Real_X_Fake/)
  base: './',
});

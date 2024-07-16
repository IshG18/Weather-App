import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

// vite.config.js
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), 
    basicSsl({
    /** name of certification */
    name: 'test',
    /** custom trust domains */
    domains: ['*.custom.com'],
    /** custom certification directory */
    certDir: '/Users/.../.devServer/cert'
  })],

  // server: {
  //   open: true
  // }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 6079,
    allowedHosts:['https://xiocoin.io','http://www.xiocoin.io','http://xiocoin.io','xiocoin.io','xiocoin.org','xiocoin.xyz','www.xiocoin.io','https://xiocoin.org','http://www.xiocoin.org','http://xiocoin.org','www.xiocoin.org','https://xiocoin.xyz','http://www.xiocoin.xyz','http://xiocoin.xyz','www.xiocoin.xyz'],
  },
  preview:{
    port: 6079,
    allowedHosts:['https://xiocoin.io','http://www.xiocoin.io','http://xiocoin.io','xiocoin.io','xiocoin.org','xiocoin.xyz','www.xiocoin.io','https://xiocoin.org','http://www.xiocoin.org','http://xiocoin.org','www.xiocoin.org','https://xiocoin.xyz','http://www.xiocoin.xyz','http://xiocoin.xyz','www.xiocoin.xyz'],
  }
})

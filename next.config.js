/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr(
  withPWA({
    reactStrictMode: false,
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      runtimeCaching,
    },
  }),
);

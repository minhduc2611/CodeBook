/** @type {import('next').NextConfig} */
const path = require('path');
const removeImports = require('next-remove-imports')({
  matchImports: '\\.(less|css|scss|sass|styl)$'
});
const nextConfig = removeImports({
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: { 
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack: function (config, { isServer }) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    console.log('nextConfig __dirname', __dirname);
    
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  }
});

module.exports = nextConfig;

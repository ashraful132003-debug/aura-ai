/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Three.js ships untranspiled ESM examples; let Next transpile the package.
  transpilePackages: ['three'],
};

export default nextConfig;

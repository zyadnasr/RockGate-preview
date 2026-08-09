/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — the preview is a pure static site (no server runtime).
  output: "export",
  // Deployed to GitHub Pages as a project site under /RockGate/.
  basePath: "/RockGate",
  trailingSlash: true,
  images: {
    // No image optimizer on GitHub Pages; serve imported assets as-is.
    unoptimized: true,
  },
};

export default nextConfig;

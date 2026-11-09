/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole app (including .docx generation) runs in the browser,
  // so it can be hosted as plain files on Netlify, Cloudflare Pages, etc.
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;

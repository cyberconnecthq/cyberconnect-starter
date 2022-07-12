/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl$/,
      loader: "webpack-glsl-loader",
    });

    return config;
  },
};

module.exports = nextConfig;

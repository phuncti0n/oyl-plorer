import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "babel-loader",
      include: /node_modules\/alkanes/,
    });
    return config;
  },
};

export default nextConfig;

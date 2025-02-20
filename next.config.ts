import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日間のキャッシュ
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // クライアントサイドのビルドでは、sharp関連のモジュールを空のモジュールに置き換える
      config.resolve.alias = {
        ...config.resolve.alias,
        sharp: false,
        "detect-libc": false,
      };
    }
    return config;
  },
};

export default nextConfig;

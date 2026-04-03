import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // GitHub Pages 정적 배포
  trailingSlash: true,        // /projects/1 → /projects/1/index.html
  images: {
    unoptimized: true,        // 정적 export시 이미지 최적화 비활성화
  },
  transpilePackages: ['react-markdown', 'remark-gfm'],
};

export default nextConfig;

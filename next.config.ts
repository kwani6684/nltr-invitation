import type { NextConfig } from 'next';

const isElectronBuild = process.env.ELECTRON_BUILD === 'true';

const nextConfig: NextConfig = {
  ...(isElectronBuild
    ? {
        // Electron용 설정
        output: 'standalone',
        distDir: 'dist',
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        // Vercel용 설정 (기본값)
        images: {
          unoptimized: true, // Vercel에서도 이미지 최적화 비활성화
        },
      }),
};

export default nextConfig;

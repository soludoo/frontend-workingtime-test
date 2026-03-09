import { withSerwist } from "@serwist/turbopack";
import withNextIntl from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntlPlugin = withNextIntl();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://github.com/**")],
  },
};

export default withSerwist(withNextIntlPlugin(nextConfig));

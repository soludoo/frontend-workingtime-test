import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["github.com"],
  },
};

export default withNextIntl()(nextConfig);

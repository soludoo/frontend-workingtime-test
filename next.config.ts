import withNextIntl from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntlPlugin = withNextIntl();

const nextConfig = {
  images: {
    domains: ["github.com"],
  },
};

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withNextIntlPlugin(pwa(nextConfig));

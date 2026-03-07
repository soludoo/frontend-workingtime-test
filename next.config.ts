import withNextIntl from "next-intl/plugin";
import withPWAInit from "next-pwa";

const withNextIntlPlugin = withNextIntl();

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    domains: ["github.com"],
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withPWA(withNextIntlPlugin(nextConfig) as any);

import withNextIntl from "next-intl/plugin";

const withNextIntlPlugin = withNextIntl();

const nextConfig = {
  images: {
    domains: ["github.com"],
  },
};

export default withNextIntlPlugin(nextConfig);

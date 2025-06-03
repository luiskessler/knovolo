/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  redirects: async () => {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/home",
        permanent: true,
      },
    ];
  },
  experimental: {
    allowedDevOrigins: [
      "http://app.localhost:3000",
      "http://www.localhost:3000",
    ],
  },
};

export default config;

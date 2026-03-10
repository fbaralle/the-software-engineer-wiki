import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/docs'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/app',
  assetPrefix: '/app',
}

export default withNextra(nextConfig)

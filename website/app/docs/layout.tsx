import { Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { navbar, footer } from '../../theme.config'

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap('/docs')
  return (
    <Layout
      navbar={navbar}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com"
      footer={footer}
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      nextThemes={{ storageKey: 'wiki-theme', defaultTheme: 'light' }}
    >
      {children}
    </Layout>
  )
}

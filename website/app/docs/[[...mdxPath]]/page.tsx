import { notFound } from 'next/navigation'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

const NON_DOC_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|json)$/i

/** Root /docs has no segment; Nextra expects 'README' for content/README.md */
function toPathSegments(mdxPath: string[] | undefined): string[] {
  const segs = mdxPath ?? []
  return segs.length === 0 ? ['README'] : segs
}

/** Only .md/.mdx (and folder README) are doc pages; .ts etc. must not be loaded as pages */
function isDocPath(pathSegments: string[]): boolean {
  if (pathSegments.length === 0) return true
  const last = pathSegments[pathSegments.length - 1]
  return !NON_DOC_EXT.test(last)
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath?: string[] }>
}) {
  const params = await props.params
  const pathSegments = toPathSegments(params.mdxPath)
  if (!isDocPath(pathSegments)) notFound()
  const { metadata } = await importPage(pathSegments)
  return metadata ?? { title: 'Docs' }
}

const Wrapper = getMDXComponents({}).wrapper

export default async function DocPage(props: {
  params: Promise<{ mdxPath?: string[] }>
}) {
  const params = await props.params
  const pathSegments = toPathSegments(params.mdxPath)
  if (!isDocPath(pathSegments)) notFound()
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(pathSegments)
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}

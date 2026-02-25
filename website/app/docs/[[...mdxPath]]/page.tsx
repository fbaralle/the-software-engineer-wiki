import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

/** Root /docs has no segment; Nextra expects 'README' for content/README.md */
function toPathSegments(mdxPath: string[] | undefined): string[] {
  const segs = mdxPath ?? []
  return segs.length === 0 ? ['README'] : segs
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath?: string[] }>
}) {
  const params = await props.params
  const pathSegments = toPathSegments(params.mdxPath)
  const { metadata } = await importPage(pathSegments)
  return metadata ?? { title: 'Docs' }
}

const Wrapper = getMDXComponents({}).wrapper

export default async function DocPage(props: {
  params: Promise<{ mdxPath?: string[] }>
}) {
  const params = await props.params
  const pathSegments = toPathSegments(params.mdxPath)
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(pathSegments)
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}

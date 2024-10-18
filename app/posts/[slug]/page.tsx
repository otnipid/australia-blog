import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) notFound()

  const Content = getMDXComponent(post.body.code)

  return (
    <article className="container mx-auto px-4 py-8 prose dark:prose-invert">
      <h1>{post.title}</h1>
      <time dateTime={post.date} className="text-sm text-gray-600 dark:text-gray-400">
        {new Date(post.date).toLocaleDateString()}
      </time>
      <Content />
    </article>
  )
}

export default PostLayout
import Link from "next/link";
import type { Post } from "@/lib/posts";

type PostsSectionProps = {
  posts: Post[];
  showAllLink?: boolean;
};

export function PostsSection({ posts, showAllLink = true }: PostsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section>
      <p className="eyebrow">Posts</p>
      <div className="posts-list">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.slug}`} className="post-item">
            {post.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.cover_image_url}
                alt=""
                className="post-thumb"
              />
            ) : (
              <div className="post-thumb-placeholder" aria-hidden="true" />
            )}
            <div>
              <h3 className="post-title">{post.title} →</h3>
              {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            </div>
          </Link>
        ))}
      </div>
      {showAllLink && posts.length >= 3 && (
        <Link href="/posts" className="see-all">
          See all posts →
        </Link>
      )}
    </section>
  );
}

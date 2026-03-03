"use client";

import type { BlogPost as BlogPostType, ContentBlock } from "@/lib/types";
import { featuredPost } from "@/lib/data/blog";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { ScrollPanel } from "@/components/organisms/ScrollPanel";

function BlockContent({ block }: { block: ContentBlock }) {
  const sharedContainerClass = "flex min-h-screen flex-col items-center justify-center px-8 py-20 text-center";
  const mutedClass = "text-brand-text-muted max-w-2xl";
  const bodyStyle = { fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" };

  if (block.type === "heading") {
    return (
      <div className={sharedContainerClass}>
        <Heading
          level={2}
          className="font-display text-brand-text"
          style={{
            fontSize: "var(--font-size-h1)",
            lineHeight: "var(--leading-h1)",
            letterSpacing: "var(--tracking-h1)",
          }}
        >
          {block.content}
        </Heading>
      </div>
    );
  }

  if (block.type === "quote") {
    return (
      <div className={sharedContainerClass}>
        <blockquote
          className={`font-display text-brand-accent ${mutedClass}`}
          style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--leading-h2)" }}
        >
          {block.content}
        </blockquote>
      </div>
    );
  }

  return (
    <div className={sharedContainerClass}>
      <Text className={mutedClass} style={bodyStyle}>
        {block.content}
      </Text>
    </div>
  );
}

/**
 * Vertical scroll narrative (Project O–style). Renders a blog post as a sequence of
 * pinned, scrubbed sections on desktop; simplified (no pin) on mobile.
 */
export function BlogScroller({ post }: { post?: BlogPostType } = {}) {
  const data = post ?? featuredPost;

  return (
    <article className="bg-brand-bg" aria-labelledby="blog-post-title">
      <section className="flex min-h-screen flex-col items-center justify-center px-8 py-20 text-center">
        <Heading
          level={1}
          id="blog-post-title"
          className="font-display text-brand-text"
          style={{
            fontSize: "var(--font-size-display)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
          }}
        >
          {data.title}
        </Heading>
        <Text
          className="mt-4 max-w-xl text-brand-text-muted"
          style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}
        >
          {data.summary}
        </Text>
        <time dateTime={data.date} className="mt-2 text-brand-text-muted" style={{ fontSize: "var(--font-size-small)", lineHeight: "var(--leading-small)" }}>
          {data.date}
        </time>
      </section>
      {data.contentBlocks.map((block, i) => (
        <ScrollPanel key={`${data.id}-block-${i}`} pinAndScrub>
          <BlockContent block={block} />
        </ScrollPanel>
      ))}
    </article>
  );
}

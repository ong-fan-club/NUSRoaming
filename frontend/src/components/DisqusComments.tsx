"use client";

import { DiscussionEmbed } from "disqus-react"

interface Post {
  slug: string;
  id: string;
  title: string;
}

const DisqusComments = (post: Post) => {
  const disqusShortname = "nusroaming"

  const disqusConfig = {
    url: `https://nus.roaming/${post.slug}`,
    identifier: post.id,
    title: post.title
  }

  return (
    <div className="w-full">
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}

export default DisqusComments;

![Lost Bison](https://cloud.githubusercontent.com/assets/794809/9972650/ac3511d4-5e34-11e5-8bf1-89174f769c35.png)

# Lost Bison

## Dependencies

This project relies on having [Node.js](https://nodejs.org/en/) installed on your system.

## Getting Started

**Pull down the repo**
- `git clone git@github.com:pruett/lostbison.com.git`

**Change into directory**
- `cd lostbison.com`

**Install dependencies**
*You may need to prefix command with `sudo` depending on permissions*
- `npm install`

**Run locally**
*The repo houses both the www and the blog content*
*You must run only one at a time*
- `npm run www` or `npm run blog`

**View in browser**
- `open http://localhost:1234` (for www local build)
- `open http://localhost:5678` (for blog local build)

## Folder Structure

```
<project>
└──src
    ├──www
    │   └──[...] # website related content
    └──blog
    │   └──[...] # blog related content
    ├
    └──data.js # site-wide globals
```

## Adding Blog Posts

To add a blog post, create a new file within `src/blog/views/posts`. Create a filename with the following format:

`YYYY-MM-DD-title-of-post-separated-by-dashes.jade`

**Format matters** as we parse the filename and look for this pattern. An example post filename would look like:

*2015-12-31-my-new-years-post.jade*

Additionally, each blog post accepts frontmatter.

*Frontmatter allows page-specific variables to be included at the top of a template using the YAML or JSON format delimited wihin triple-dashed lines.*

Here's an example of frontmatter within a blog post:

```
---
author: 'Author Name' #required
title: 'Title of Post' #required
description: 'Description of post to show up in page metadata' #optional
image: '/path/to/image' #optional
---
```

## Deploying to Production

To deploy to production, simply run the following command: `npm run www:deploy` or `npm run blog:deploy` depending on the content you've changed.

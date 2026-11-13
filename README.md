# cnx has spoken

An English-language notebook on security and cryptography, built with Jekyll and
GitHub Pages. The theme pairs local Terminus pixel typography and Hack body text
with a charcoal-and-cream palette, a Dithering background, and a halftone flower illustration.

## Run locally

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>. Restart the server after editing `_config.yml`.

```sh
bundle exec jekyll build
bundle exec jekyll doctor
python3 scripts/check-content.py
```

The generated site is written to `_site/`. Do not commit build output.

## Publish on GitHub Pages

Push this source to the branch configured under **Settings → Pages → Deploy
from a branch**, using the repository root. The existing `github-pages` gem and
GitHub's supported Liquid/Sass features handle the build. No Node, npm, external
CDN, or custom Jekyll plugin is required by the theme.

`CNAME` retains `cnx.sh`; `_config.yml` sets the canonical `url` accordingly.
For another domain, change both. For a project site hosted in a subdirectory,
set `baseurl: "/repository-name"`. Existing English article URLs remain `/en/<slug>/`.

## Add a note

Create `_my_posts/en/descriptive-slug.md` with this front matter:

```yaml
---
layout: post
lang: en
title: "The full article title"
index_title: "A short index title"
description: "A one-sentence introduction."
category: Cryptography
order: 3
---
```

Start the body with an introduction; the layout supplies the main heading.
Use `##` for sections: these become the article's navigation. Use fenced blocks
with a language (for example, `php`) for Jekyll's local Rouge highlighting.
Keep image links compatible with Pages subdirectories:

```liquid
![Descriptive alternative text]({{ '/assets/images/example.png' | relative_url }})
```

## Theme implementation

- `assets/css/style.scss`: colors, responsive layouts, local fonts, article styles.
- `about.md`: minimal Whoami page, with one square tile per original contact/profile link.
- `assets/js/main.js`: nested contents navigation, reading progress, accessible code
  toolbars, exact code copying, optional line wrapping, and scrollable tables.
- `assets/js/background.js`: global Dithering background in the inverted palette
  (`#2b2b2b` / `#f2f1e8`), simplex, 4×4, size 2, scale 0.6, speed 1.
  A dark veil keeps text readable.
- `assets/js/halftone.js`: the full-width flower background behind the hero text,
  using the gooey/hex preset in the site's charcoal-and-cream palette.
- `assets/js/paper-shaders/`: selected modules from Paper Shaders **0.0.82**,
  with its Apache-2.0 LICENSE and NOTICE. [Upstream](https://github.com/paper-design/shaders).
- `assets/images/flowers.webp`: self-hosted [flower sample](https://paper.design/flowers.webp)
  from the Paper Design reference. `halftone-flowers.png` is its rendered static fallback.

The background pauses when hidden, respects reduced motion automatically, and
caps rendering resolution. Static background and flower artwork remain
visible if JavaScript or WebGL is unavailable. Content,
links, and code highlighting also work without JavaScript. The theme respects
reduced motion and supports keyboard navigation and printing.

Before submitting changes, build the site and preview the index, `/about/`, both
articles, and `/404.html` on desktop and mobile. Check links, contents navigation,
code whitespace and copying, horizontal scrolling, and reduced motion. Check the
static fallbacks with JavaScript disabled. Keep a requested development preview running.

Code fences always carry a language. Use `text` for output and diagrams, `html`
for markup, and `php` with an opening `<?php` tag for PHP snippets. Separate
paragraphs and lists with blank lines, and use tables for structured comparisons.
The layout owns the main heading; use H2 and H3 inside articles. See `AGENTS.md`
for the theme and content conventions.

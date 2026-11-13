# Repository Guidelines

## Project Structure

English-only Jekyll notebook on GitHub Pages. `index.md` lists articles; `about.md` organizes original profiles and contact details. Articles live in `_my_posts/en/`. `_layouts/` and `_includes/` provide shared Liquid templates. Assets live under `assets/`; `scripts/` contains optional artwork generators and content checks.

## Development & Verification

- `bundle install`: install the locked GitHub Pages dependencies.
- `bundle exec jekyll serve`: preview at `http://localhost:4000` with rebuilds.
- `bundle exec jekyll build`: generate `_site/`.
- `bundle exec jekyll doctor`: check configuration.
- `python3 scripts/check-content.py`: validate article headings, fences, and Python examples.

Check the index, Whoami, both articles, and 404 on desktop and at 320px width. Verify navigation, code scrolling/wrapping, clipboard content, highlighting, reduced motion, and JavaScript/WebGL fallbacks. Keep a requested preview running; do not stop it during handoff. Never commit generated output, caches, or dependencies.

## Theme & Accessibility

Use the inverted signal palette: charcoal surfaces, warm light text, and muted sage accents. Reuse the semantic CSS variables in `assets/css/style.scss`; define syntax colors there rather than inside posts. Use original copy; never invent taglines, biographies, interests, or filler. Keep text readable and focus visible.

The global background uses the self-hosted Dithering shader: simplex, 4×4, size 2, scale 0.6, speed 1. A dark veil preserves text contrast. Respect reduced motion automatically and retain the static fallback. Keep the background free of options, controls, and explanatory copy. Keep shader branding out of visible copy; preserve vendor LICENSE and NOTICE files. Whoami contains only square tiles for original links.

## Markdown & Code Conventions

Use two-space indentation in templates, CSS, JavaScript, and PHP examples. Name articles with lowercase hyphenated slugs. Include `layout`, `lang: en`, `title`, `description`, `category`, and numeric `order` in front matter. The layout supplies the sole H1; start sections at H2, then H3.

Always label fenced blocks (`php`, `html`, `python`, `text`). Use `text` for formulas, diagrams, and output; inline code for identifiers. Include `<?php` in PHP snippets. Separate prose and lists with blank lines; avoid manual line breaks for layout. Preserve whitespace and check sample arithmetic. Keep demonstration behavior explicit when correcting examples.

Use descriptive image alt text and Liquid `relative_url` for local links. Code frames own their background and toolbar; nested Rouge elements must remain transparent. Constrain overflow to code blocks and tables, with keyboard access.

## Commits & Pull Requests

Use brief action-oriented subjects, consistent with history (`Update CNAME`). Describe affected pages, link relevant issues, record checks, and include screenshots for visual changes. Preserve existing article URLs and `CNAME` unless explicitly changing deployment.

---
layout: default
lang: en
shader: true
---

{% assign notes = site.my_posts | where: 'lang', 'en' | sort: 'order' %}
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <h1 id="hero-title">cnx has<br>spoken<span class="cursor">_</span></h1>
  </div>
  <div class="signal" aria-hidden="true">
    <div class="signal-frame">
      <img class="signal-fallback" src="{{ '/assets/images/halftone-flowers.png' | relative_url }}" alt="" width="960" height="720">
      <div class="signal-shader" data-halftone data-image="{{ '/assets/images/flowers.webp' | relative_url }}" aria-hidden="true"></div>
    </div>
  </div>
</section>


<section class="notes-section" id="index" aria-labelledby="index-title">
  <div class="section-heading">
    <h2 id="index-title">Posts</h2>
    <span class="entry-count">[ {{ notes.size | prepend: '00' | slice: -2, 2 }} ENTRIES ]</span>
  </div>
  <div class="index-columns" aria-hidden="true"><span>NO.</span><span>ENTRY</span><span>FILE UNDER</span><span>READ</span><span></span></div>
  <ol class="note-index">
    {% for post in notes %}
    {% assign words = post.content | strip_html | number_of_words %}{% assign minutes = words | divided_by: 200 | plus: 1 %}
    <li>
      <a class="note-row" href="{{ post.url | relative_url }}">
        <span class="note-number" aria-hidden="true">{{ forloop.index | prepend: '00' | slice: -2, 2 }}</span>
        <span class="note-summary"><span class="note-title">{{ post.title | escape }}</span></span>
        <span class="note-category">{{ post.category | default: 'Cryptography' }}</span>
        <span class="note-time">{{ minutes }} min<span class="sr-only"> read</span></span>
        <span class="note-arrow" aria-hidden="true">↗</span>
      </a>
    </li>
    {% endfor %}
  </ol>
</section>

---
layout: default
lang: "en"
---

<div class="json-container">
<p>{</p>
<p class="indent-level-1">"path": "/",</p>
<p class="indent-level-1">"greeting": "welcome aboard.",</p>
<p class="indent-level-1">"content": [</p>

<p class="indent-level-2">"contact": [</p>
<p class="indent-level-3">"office": "<a href="https://www.google.com/maps/@48.3732225,-123.586822,3a,48.2y,232.23h,66.6t/data=!3m8!1e1!3m6!1s3FtRkV-ZSnIGk-5std5Dlg!2e0!5s20140601T000000!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D23.39976161683363%26panoid%3D3FtRkV-ZSnIGk-5std5Dlg%26yaw%3D232.23087536051523">1293 Liberty Dr</a>",</p>
<p class="indent-level-3">"email": "contact@cnx.sh",</p>
<p class="indent-level-2">],</p>

<p class="indent-level-2">"profiles": [</p>
<p class="indent-level-3">"<a href="https://www.linkedin.com/in/eliabenasc">linkedIn</a>",</p>
<p class="indent-level-3">"<a href="https://github.com/cnxis">gitHub</a>",</p>
<p class="indent-level-3">"<a href="https://app.hackthebox.com/profile/48571">hackthebox</a>",</p>
<p class="indent-level-2">],</p>

<p class="indent-level-2">"posts": [</p>
{% assign lang_posts = site.my_posts | where: "lang", page.lang %}
{% for post in lang_posts %}
  <p class="indent-level-3">"<a href="{{ post.url }}">{{ post.title }}</a>",</p>
{% endfor %}
<p class="indent-level-2">]</p>
<p class="indent-level-1">]}</p>
</div>

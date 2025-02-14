---
layout: default
---

<div class="json-container">

<p>{</p>

<p class="indent-level-1">"Name": "welcome",</p>
<p class="indent-level-1">"Greeting": "Hello! This tiny website looks like JSON",</p>
<p class="indent-level-1">"Description": "This tiny website|",</p>
<p class="indent-level-1">"CV": "cv.pdf",</p>

<p class="indent-level-1">"Address": [</p>
<p class="indent-level-2">"University of Jekyll",</p>
<p class="indent-level-2">"Department of Themes",</p>
<p class="indent-level-2">"123 Main St, Anytown, USA"</p>
<p class="indent-level-1">],</p>

<p class="indent-level-1">"Contact": [</p>
<p class="indent-level-2">"Office": "Foobar Hall 1.23",</p>
<p class="indent-level-2">"Phone": "+1 234 567 890",</p>
<p class="indent-level-2">"Email": "username@domain.com"</p>
<p class="indent-level-1">],</p>

<p class="indent-level-1">"Source": "piazzai/hacked-jekyll",</p>

<p class="indent-level-1">"Profiles": [</p>
<p class="indent-level-2">"Instagram",</p>
<p class="indent-level-2">"LinkedIn",</p>
<p class="indent-level-2">"StackOverflow",</p>
<p class="indent-level-2">"GitHub"</p>
<p class="indent-level-1">],</p>

<p class="indent-level-1">"Posts": [</p>
{% for post in site.my_posts %}
<p class="indent-level-2">"<a href="{{ post.url | relative_url }}">{{ post.title }}</a>"</p>
{% endfor %}
<p class="indent-level-1">]}</p>

</div>

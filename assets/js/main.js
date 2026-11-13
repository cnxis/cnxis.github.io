(() => {
  const article = document.querySelector('.post-content');
  if (!article) return;

  const headings = [...article.querySelectorAll('h2[id], h3[id]')];
  const contents = document.querySelector('[data-toc]');
  if (contents && headings.length) {
    contents.replaceChildren();
    let section;
    headings.forEach((heading) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      item.append(link);
      if (heading.tagName === 'H3' && section) {
        let sublist = section.querySelector('ol');
        if (!sublist) {
          sublist = document.createElement('ol');
          section.append(sublist);
        }
        sublist.append(item);
      } else {
        contents.append(item);
        section = item;
      }
    });
    if (matchMedia('(max-width: 760px)').matches) contents.closest('details').open = false;
  }

  const progress = document.querySelector('.reading-progress');
  let pending = false;
  const updateReading = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, scrollY / scrollable) : 0})`;
    let current = headings[0];
    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= 130) current = heading;
    });
    if (contents) contents.querySelectorAll('a').forEach((link) => {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    pending = false;
  };
  addEventListener('scroll', () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(updateReading);
    }
  }, { passive: true });
  addEventListener('resize', updateReading);
  updateReading();

  const labels = { plaintext: 'Text', text: 'Text', php: 'PHP', html: 'HTML', python: 'Python', bash: 'Shell', shell: 'Shell', json: 'JSON' };
  const canCopy = window.isSecureContext && navigator.clipboard && typeof navigator.clipboard.writeText === 'function';
  article.querySelectorAll('pre').forEach((pre, index) => {
    let frame = pre.closest('.highlighter-rouge');
    if (!frame) {
      frame = document.createElement('div');
      pre.before(frame);
      frame.append(pre);
    }
    if (frame.classList.contains('code-frame')) return;
    frame.classList.add('code-frame');
    const code = pre.querySelector('code') || pre;
    const language = `${frame.className} ${code.className}`.match(/language-([\w-]+)/)?.[1] || 'text';
    const languageName = labels[language] || language;
    pre.tabIndex = 0;
    pre.setAttribute('aria-label', `${languageName} code block ${index + 1}, scroll horizontally if needed`);
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    const label = document.createElement('span');
    label.className = 'code-language';
    label.textContent = languageName;
    const actions = document.createElement('div');
    actions.className = 'code-actions';
    const wrap = document.createElement('button');
    wrap.className = 'wrap-code';
    wrap.type = 'button';
    wrap.textContent = 'Wrap';
    wrap.setAttribute('aria-label', `Wrap long lines in ${languageName} code block ${index + 1}`);
    wrap.setAttribute('aria-pressed', 'false');
    const updateOverflow = () => {
      wrap.hidden = pre.scrollWidth <= pre.clientWidth && !pre.classList.contains('is-wrapped');
    };
    wrap.addEventListener('click', () => {
      const wrapped = pre.classList.toggle('is-wrapped');
      wrap.setAttribute('aria-pressed', String(wrapped));
      updateOverflow();
    });
    new ResizeObserver(updateOverflow).observe(pre);
    const copy = document.createElement('button');
    copy.className = 'copy-code';
    copy.type = 'button';
    copy.textContent = canCopy ? 'Copy code' : 'Select code';
    copy.setAttribute('aria-label', `${canCopy ? 'Copy' : 'Select'} ${languageName} code block ${index + 1}`);
    const status = document.createElement('span');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    let reset;
    copy.addEventListener('click', async () => {
      clearTimeout(reset);
      try {
        if (!canCopy) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(code.textContent);
        copy.textContent = 'Copied!';
        status.textContent = `${languageName} code copied to clipboard.`;
      } catch {
        const selection = getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        copy.textContent = 'Selected';
        status.textContent = 'Code selected. Press Control C or Command C to copy.';
      }
      reset = setTimeout(() => {
        copy.textContent = canCopy ? 'Copy code' : 'Select code';
        status.textContent = '';
      }, 2400);
    });
    actions.append(wrap, copy);
    toolbar.append(label, actions, status);
    frame.prepend(toolbar);
    updateOverflow();
  });

  article.querySelectorAll('table').forEach((table, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', `Data table ${index + 1}`);
    table.before(wrapper);
    wrapper.append(table);
  });
})();

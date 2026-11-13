"""Validate the repository's Markdown and Python example syntax."""
import ast
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
blocks = 0
for post in sorted((root / '_my_posts/en').glob('*.md')):
    source = post.read_text()
    assert source.startswith('---\n'), f'{post.name}: missing front matter'
    _, metadata, body = source.split('---', 2)
    for key in ('layout', 'lang', 'title', 'index_title', 'description', 'category', 'order'):
        assert re.search(rf'^{key}: .+', metadata, re.M), f'{post.name}: missing {key}'
    assert re.search(r'^lang: en$', metadata, re.M), f'{post.name}: articles must be English'
    code = None
    language = None
    for number, line in enumerate(body.splitlines(), 1):
        if line.startswith('```'):
            if code is None:
                language = line[3:].strip()
                assert language in {'html', 'php', 'python', 'text', 'bash', 'json'}, f'{post.name}:{number}: label the code fence'
                code = []
            else:
                assert line == '```', f'{post.name}:{number}: invalid closing fence'
                sample = '\n'.join(code)
                assert sample.strip(), f'{post.name}:{number}: empty code block'
                if language == 'python':
                    ast.parse(sample)
                if language == 'php':
                    assert sample.startswith('<?php'), f'{post.name}:{number}: PHP needs its opening tag'
                blocks += 1
                code = None
        elif code is not None:
            code.append(line)
        else:
            assert not line.startswith('# '), f'{post.name}:{number}: layout owns the H1'
            assert not line.startswith('####'), f'{post.name}:{number}: simplify heading hierarchy'
            assert not line.endswith('  '), f'{post.name}:{number}: use paragraphs instead of manual breaks'
    assert code is None, f'{post.name}: unclosed code fence'
print(f'PASS: {blocks} labeled blocks, English metadata, heading structure, PHP tags, and Python examples.')

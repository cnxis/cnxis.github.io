"""Generate a deterministic 4x4 ordered-noise background for no-WebGL browsers.

Run from the repository root. Uses only the Python standard library.
"""
from math import floor
from pathlib import Path
import struct
import zlib

WIDTH, HEIGHT, PIXEL_SIZE = 960, 640, 2
BAYER = ((0, 8, 2, 10), (12, 4, 14, 6), (3, 11, 1, 9), (15, 7, 13, 5))


def random_at(x, y):
    seed = (x * 374761393 + y * 668265263 + 17) & 0xffffffff
    seed = ((seed ^ (seed >> 13)) * 1274126177) & 0xffffffff
    return ((seed ^ (seed >> 16)) & 0xffffffff) / 0xffffffff


def noise(x, y):
    ix, iy = floor(x), floor(y)
    fx, fy = x - ix, y - iy
    sx, sy = fx * fx * (3 - 2 * fx), fy * fy * (3 - 2 * fy)
    a = random_at(ix, iy) * (1 - sx) + random_at(ix + 1, iy) * sx
    b = random_at(ix, iy + 1) * (1 - sx) + random_at(ix + 1, iy + 1) * sx
    return a * (1 - sy) + b * sy


rows = bytearray()
for y in range(HEIGHT):
    rows.append(0)
    for x in range(WIDTH):
        px, py = x // PIXEL_SIZE, y // PIXEL_SIZE
        field = .7 * noise(px / 100, py / 100) + .3 * noise(px / 43, py / 43)
        value = (242, 241, 232) if field > (BAYER[py % 4][px % 4] + .5) / 16 else (43, 43, 43)
        rows.extend(value)


def chunk(kind, data):
    return struct.pack('>I', len(data)) + kind + data + struct.pack('>I', zlib.crc32(kind + data) & 0xffffffff)


header = struct.pack('>IIBBBBB', WIDTH, HEIGHT, 8, 2, 0, 0, 0)
Path('assets/images/dithering-fallback.png').write_bytes(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', header) + chunk(b'IDAT', zlib.compress(rows, 9)) + chunk(b'IEND', b''))

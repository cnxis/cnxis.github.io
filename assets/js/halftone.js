import { ShaderMount } from './paper-shaders/shader-mount.js';
import { halftoneDotsFragmentShader } from './paper-shaders/shaders/halftone-dots.js';

const host = document.querySelector('[data-halftone]');
if (host) {
  const figure = host.closest('.signal');
  const image = new Image();
  image.src = host.dataset.image;
  try {
    await image.decode();
    const mount = new ShaderMount(host, halftoneDotsFragmentShader, {
      u_image: image,
      u_colorBack: [43 / 255, 43 / 255, 43 / 255, 1],
      u_colorFront: [242 / 255, 241 / 255, 232 / 255, 1],
      u_originalColors: false,
      u_type: 1,
      u_grid: 1,
      u_inverted: false,
      u_size: 0.5,
      u_radius: 1.25,
      u_contrast: 0.4,
      u_grainMixer: 0.2,
      u_grainOverlay: 0.2,
      u_grainSize: 0.5,
      u_fit: 2,
      u_scale: 1,
      u_rotation: 0,
      u_offsetX: 0,
      u_offsetY: 0,
      u_originX: 0.5,
      u_originY: 0.5,
      u_worldWidth: 0,
      u_worldHeight: 0,
    }, undefined, 0, 0, 1.5, 1600000);
    requestAnimationFrame(() => figure.classList.add('is-ready'));
    mount.canvasElement.addEventListener('webglcontextlost', () => figure.classList.remove('is-ready'));
    addEventListener('pagehide', (event) => {
      if (!event.persisted) mount.dispose();
    });
  } catch {
    figure.classList.remove('is-ready');
    host.replaceChildren();
  }
}

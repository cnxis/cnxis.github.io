import { ShaderMount } from './paper-shaders/shader-mount.js';
import { ditheringFragmentShader } from './paper-shaders/shaders/dithering.js';

const host = document.querySelector('[data-background]');
if (host) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  try {
    // The requested simplex / 4x4 / 2px preset in the selected inverted palette.
    const mount = new ShaderMount(host, ditheringFragmentShader, {
      u_colorBack: [43 / 255, 43 / 255, 43 / 255, 1],
      u_colorFront: [242 / 255, 241 / 255, 232 / 255, 1],
      u_shape: 1,
      u_type: 3,
      u_pxSize: 2,
      u_scale: 0.6,
      u_rotation: 0,
      u_offsetX: 0,
      u_offsetY: 0,
      u_originX: 0.5,
      u_originY: 0.5,
      u_worldWidth: 0,
      u_worldHeight: 0,
      u_fit: 0,
    }, undefined, reducedMotion.matches ? 0 : 1, 0, 1, 1600000);
    host.classList.add('is-ready');
    reducedMotion.addEventListener('change', (event) => {
      mount.setSpeed(event.matches ? 0 : 1);
    });
    mount.canvasElement.addEventListener('webglcontextlost', () => {
      mount.setSpeed(0);
      host.classList.remove('is-ready');
    });
    addEventListener('pagehide', (event) => {
      if (!event.persisted) mount.dispose();
    });
  } catch {
    host.classList.remove('is-ready');
    host.replaceChildren();
  }
}

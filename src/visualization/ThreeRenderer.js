/**
 * @file ThreeRenderer.js
 * @description Minimal Three.js rendering harness.
 * This is only a basic scene setup; it is meant for quick visual prototypes.
 */

import * as THREE from "three";

/**
 * ThreeRenderer creates a renderer, scene, and camera.
 */
export class ThreeRenderer {
  /**
   * Create a new renderer bundle.
   *
   * @param {Object} [options={}] - Renderer options.
   * @param {number} [options.width=800] - Canvas width.
   * @param {number} [options.height=600] - Canvas height.
   * @param {HTMLElement|null} [options.container=null] - DOM container.
   */
  constructor(options = {}) {
    const {
      width = 800,
      height = 600,
      container = null
    } = options;

    this.width = width;
    this.height = height;
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 10);

    this.renderer = null;
    this.animateHandle = null;
  }

  /**
   * Initialize the WebGL renderer.
   * This method requires a browser environment.
   *
   * @returns {THREE.WebGLRenderer}
   */
  init() {
    if (typeof document === "undefined") {
      throw new Error("ThreeRenderer.init() requires a browser DOM.");
    }

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);

    const mountPoint = this.container ?? document.body;
    mountPoint.appendChild(this.renderer.domElement);
    return this.renderer;
  }

  /**
   * Add a mesh to the scene.
   *
   * @param {THREE.Object3D} object3D - Object to add.
   * @returns {THREE.Object3D}
   */
  add(object3D) {
    this.scene.add(object3D);
    return object3D;
  }

  /**
   * Render a single frame.
   *
   * @returns {void}
   */
  render() {
    if (!this.renderer) {
      throw new Error("Renderer not initialized. Call init() first.");
    }
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Start a simple animation loop.
   *
   * @param {Function} [onFrame=null] - Optional animation hook.
   * @returns {void}
   */
  start(onFrame = null) {
    const loop = () => {
      if (typeof onFrame === "function") onFrame(this);
      this.render();
      this.animateHandle = requestAnimationFrame(loop);
    };
    loop();
  }

  /**
   * Stop the animation loop.
   *
   * @returns {void}
   */
  stop() {
    if (this.animateHandle !== null) {
      cancelAnimationFrame(this.animateHandle);
      this.animateHandle = null;
    }
  }
}

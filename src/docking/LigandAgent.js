/**
 * @file LigandAgent.js
 * @description Ligand pose agent used for the docking search loop.
 * The ligand behaves like a small structure trying to settle into a pocket.
 */

import { Agent } from "../core/Agent.js";

/**
 * LigandAgent stores a list of atom-like points and a pose.
 */
export class LigandAgent extends Agent {
  /**
   * Create a ligand agent.
   *
   * @param {Object} [options={}] - Ligand options.
   * @param {Array<Object>} [options.atoms=[]] - Ligand atom coordinates.
   * @param {{x:number,y:number,z:number}} [options.translation] - Initial translation.
   */
  constructor(options = {}) {
    super({ ...options, name: options.name ?? "LigandAgent" });

    const {
      atoms = [],
      translation = { x: 0, y: 0, z: 0 }
    } = options;

    this.atoms = atoms.map((atom, index) => ({
      index,
      element: atom.element ?? "C",
      x: atom.x ?? 0,
      y: atom.y ?? 0,
      z: atom.z ?? 0
    }));

    this.translation = { ...translation };
    this.rotation = { x: 0, y: 0, z: 0 };
  }

  /**
   * Clone the ligand state.
   *
   * @returns {LigandAgent}
   */
  clone() {
    const cloned = new LigandAgent({
      atoms: this.atoms.map((atom) => ({ ...atom })),
      translation: { ...this.translation }
    });
    cloned.rotation = { ...this.rotation };
    cloned.position = { ...this.position };
    cloned.stepsTaken = this.stepsTaken;
    return cloned;
  }

  /**
   * Translate the ligand by a vector.
   *
   * @param {{x?:number,y?:number,z?:number}} delta - Translation delta.
   * @returns {LigandAgent}
   */
  translate(delta) {
    this.translation.x += delta.x ?? 0;
    this.translation.y += delta.y ?? 0;
    this.translation.z += delta.z ?? 0;
    return this;
  }

  /**
   * Return world-space atom coordinates.
   *
   * @returns {Array<{x:number,y:number,z:number,element:string,index:number}>}
   */
  pose() {
    return this.atoms.map((atom) => ({
      ...atom,
      x: atom.x + this.translation.x,
      y: atom.y + this.translation.y,
      z: atom.z + this.translation.z
    }));
  }

  /**
   * Perform a simple stochastic move.
   *
   * @param {Object} [context={}] - Step context.
   * @returns {{translation:{x:number,y:number,z:number}}}
   */
  step(context = {}) {
    const jitter = () => (Math.random() * 2 - 1) * 0.5;
    this.translate({ x: jitter(), y: jitter(), z: jitter() });
    this.stepsTaken += 1;
    return { translation: { ...this.translation } };
  }
}

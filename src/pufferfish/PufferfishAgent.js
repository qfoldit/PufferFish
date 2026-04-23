/**
 * @file PufferfishAgent.js
 * @description Agent that builds sand structures in the style of a pufferfish nest.
 * The biological inspiration is direct:
 * the fish manipulates its environment to produce a structure that shapes currents.
 * Here the "current" is a loose proxy for objective improvement.
 */

import { Agent } from "../core/Agent.js";

/**
 * PufferfishAgent performs local sand placement and can drift toward a ring pattern.
 */
export class PufferfishAgent extends Agent {
  /**
   * Create a new pufferfish builder.
   *
   * @param {Object} [options={}] - Agent options.
   * @param {number} [options.x=0] - Initial x coordinate.
   * @param {number} [options.y=0] - Initial y coordinate.
   * @param {number} [options.z=0] - Initial z coordinate.
   * @param {number} [options.fins=6] - Number of directional proposals per step.
   * @param {number} [options.intensity=1] - Sand amount placed per build.
   */
  constructor(options = {}) {
    super({ ...options, name: options.name ?? "PufferfishAgent" });
    this.fins = options.fins ?? 6;
    this.intensity = options.intensity ?? 1;
    this.phase = 0;
  }

  /**
   * Choose a direction around the current position.
   * The discrete angular stepping echoes the radial symmetry of a nest.
   *
   * @param {number} index - Direction index.
   * @returns {{dx:number,dy:number}}
   */
  direction(index) {
    const angle = (Math.PI * 2 * index) / this.fins + this.phase;
    return {
      dx: Math.round(Math.cos(angle)),
      dy: Math.round(Math.sin(angle))
    };
  }

  /**
   * Build one or more local ridges on a sand grid.
   *
   * @param {Object} context - Step context.
   * @param {import("./SandGrid.js").SandGrid} context.grid - Sand grid instance.
   * @returns {Array<Object>} Build reports.
   */
  step(context = {}) {
    const { grid } = context;
    if (!grid) return [];

    const reports = [];
    for (let i = 0; i < this.fins; i += 1) {
      const { dx, dy } = this.direction(i);
      const x = this.position.x + dx;
      const y = this.position.y + dy;
      reports.push(grid.buildStep({ x, y }, { amount: this.intensity }));
    }

    this.phase += Math.PI / Math.max(1, this.fins);
    this.stepsTaken += 1;
    return reports;
  }

  /**
   * Return a human-readable description of the agent.
   *
   * @returns {string}
   */
  describe() {
    return `${this.name} at (${this.position.x}, ${this.position.y}) building ${this.fins} directional ridges.`;
  }
}

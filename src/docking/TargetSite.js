/**
 * @file TargetSite.js
 * @description Minimal target-site model for docking experiments.
 * A target site is a geometric pocket that a ligand tries to occupy.
 */

export class TargetSite {
  /**
   * Create a target site.
   *
   * @param {Object} [options={}] - Target options.
   * @param {Array<{x:number,y:number,z?:number}>} [options.points=[]] - Pocket anchor points.
   * @param {number} [options.radius=4] - Effective pocket radius.
   */
  constructor(options = {}) {
    const {
      points = [],
      radius = 4
    } = options;

    this.points = points.map((p) => ({
      x: p.x ?? 0,
      y: p.y ?? 0,
      z: p.z ?? 0
    }));
    this.radius = radius;
  }

  /**
   * Find the geometric center of the pocket.
   *
   * @returns {{x:number,y:number,z:number}}
   */
  center() {
    if (this.points.length === 0) return { x: 0, y: 0, z: 0 };

    const sum = this.points.reduce((acc, p) => {
      acc.x += p.x;
      acc.y += p.y;
      acc.z += p.z;
      return acc;
    }, { x: 0, y: 0, z: 0 });

    return {
      x: sum.x / this.points.length,
      y: sum.y / this.points.length,
      z: sum.z / this.points.length
    };
  }

  /**
   * Estimate whether a point lies within the binding pocket.
   *
   * @param {{x:number,y:number,z?:number}} point - Probe point.
   * @returns {boolean}
   */
  contains(point) {
    const c = this.center();
    const dx = (point.x ?? 0) - c.x;
    const dy = (point.y ?? 0) - c.y;
    const dz = (point.z ?? 0) - c.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    return distance <= this.radius;
  }
}

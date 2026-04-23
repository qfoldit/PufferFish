/**
 * @file EnergyGrid.js
 * @description Simplified molecular energy grid using a Lennard-Jones-like potential.
 * This module intentionally compresses the idea of atomic interaction into a readable form.
 * In the pufferfish metaphor, the energy grid is the underwater terrain:
 * folding tries to place residues so the configuration sits in a lower-energy basin.
 */

/**
 * EnergyGrid computes pairwise energies on a 2D or pseudo-3D lattice.
 */
export class EnergyGrid {
  /**
   * Create a new energy grid.
   *
   * @param {Object} [options={}] - Grid options.
   * @param {number} [options.epsilon=1] - Depth of the potential well.
   * @param {number} [options.sigma=1] - Distance at which the potential is zero.
   */
  constructor(options = {}) {
    const {
      epsilon = 1,
      sigma = 1
    } = options;

    this.epsilon = epsilon;
    this.sigma = sigma;
  }

  /**
   * Compute a Lennard-Jones-style interaction between two points.
   * The formula is a compact teaching approximation:
   * V(r) = 4ε[(σ/r)^12 - (σ/r)^6]
   *
   * @param {{x:number,y:number,z?:number}} a - First point.
   * @param {{x:number,y:number,z?:number}} b - Second point.
   * @returns {number} Potential energy contribution.
   */
  lennardJones(a, b) {
    const dx = (a.x ?? 0) - (b.x ?? 0);
    const dy = (a.y ?? 0) - (b.y ?? 0);
    const dz = (a.z ?? 0) - (b.z ?? 0);
    const r = Math.max(1e-6, Math.sqrt(dx * dx + dy * dy + dz * dz));

    const sr6 = (this.sigma / r) ** 6;
    const sr12 = sr6 * sr6;
    return 4 * this.epsilon * (sr12 - sr6);
  }

  /**
   * Compute the total energy of a list of residues or atoms.
   *
   * @param {Array<{x:number,y:number,z?:number}>} points - Molecular points.
   * @returns {number}
   */
  totalEnergy(points) {
    let energy = 0;
    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        energy += this.lennardJones(points[i], points[j]);
      }
    }
    return energy;
  }

  /**
   * Compute a simple contact map for educational inspection.
   *
   * @param {Array<{x:number,y:number,z?:number}>} points - Molecular points.
   * @param {number} [cutoff=2] - Contact cutoff distance.
   * @returns {number[][]}
   */
  contactMap(points, cutoff = 2) {
    return points.map((a, i) =>
      points.map((b, j) => {
        if (i === j) return 0;
        const dx = (a.x ?? 0) - (b.x ?? 0);
        const dy = (a.y ?? 0) - (b.y ?? 0);
        const dz = (a.z ?? 0) - (b.z ?? 0);
        const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return r <= cutoff ? 1 : 0;
      })
    );
  }
}

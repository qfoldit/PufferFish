/**
 * @file AminoAcidChain.js
 * @description Lightweight amino acid chain representation used by the folding loop.
 * This is not a full atomistic model. Instead, it gives us a controllable backbone
 * that can be moved, scored, and annealed.
 */

/**
 * AminoAcidChain stores residues as simple point objects.
 */
export class AminoAcidChain {
  /**
   * Create a chain.
   *
   * @param {Object} [options={}] - Chain options.
   * @param {Array<Object>} [options.residues=[]] - Residue list.
   */
  constructor(options = {}) {
    const { residues = [] } = options;
    this.residues = residues.map((residue, index) => ({
      index,
      type: residue.type ?? "X",
      x: residue.x ?? index,
      y: residue.y ?? 0,
      z: residue.z ?? 0
    }));
  }

  /**
   * Create a simple straight chain from residue labels.
   *
   * @param {string[]} sequence - Residue sequence.
   * @returns {AminoAcidChain}
   */
  static fromSequence(sequence) {
    return new AminoAcidChain({
      residues: sequence.map((type, index) => ({ type, x: index, y: 0, z: 0 }))
    });
  }

  /**
   * Deep clone the chain.
   *
   * @returns {AminoAcidChain}
   */
  clone() {
    return new AminoAcidChain({
      residues: this.residues.map((residue) => ({ ...residue }))
    });
  }

  /**
   * Shift one residue by a delta vector.
   *
   * @param {number} index - Residue index.
   * @param {{x?:number,y?:number,z?:number}} delta - Movement delta.
   * @returns {AminoAcidChain}
   */
  perturb(index, delta) {
    const residue = this.residues[index];
    if (!residue) return this;

    residue.x += delta.x ?? 0;
    residue.y += delta.y ?? 0;
    residue.z += delta.z ?? 0;
    return this;
  }

  /**
   * Return the chain as a list of points for scoring.
   *
   * @returns {Array<{x:number,y:number,z:number,type:string,index:number}>}
   */
  toPoints() {
    return this.residues.map((residue) => ({ ...residue }));
  }

  /**
   * Compute a rough backbone span.
   *
   * @returns {{min:{x:number,y:number,z:number},max:{x:number,y:number,z:number}}}
   */
  bounds() {
    const xs = this.residues.map((r) => r.x);
    const ys = this.residues.map((r) => r.y);
    const zs = this.residues.map((r) => r.z);

    return {
      min: {
        x: Math.min(...xs),
        y: Math.min(...ys),
        z: Math.min(...zs)
      },
      max: {
        x: Math.max(...xs),
        y: Math.max(...ys),
        z: Math.max(...zs)
      }
    };
  }
}

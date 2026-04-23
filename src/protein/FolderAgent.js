/**
 * @file FolderAgent.js
 * @description Simulated annealing-based folding agent.
 * The metaphor: a pufferfish reshapes its surroundings to create favorable structure.
 * Folding does the same thing with a molecular chain:
 * it proposes small deformations, scores them, and keeps them when they lower the energy
 * or when thermal noise makes exploration worthwhile.
 */

import { Agent } from "../core/Agent.js";
import { AminoAcidChain } from "./AminoAcidChain.js";
import { EnergyGrid } from "./EnergyGrid.js";

/**
 * FolderAgent searches for low-energy chain conformations.
 */
export class FolderAgent extends Agent {
  /**
   * Create a folding agent.
   *
   * @param {Object} [options={}] - Folding options.
   * @param {AminoAcidChain} [options.chain] - Initial chain.
   * @param {EnergyGrid} [options.energyGrid] - Energy model.
   * @param {number} [options.temperature=10] - Initial annealing temperature.
   * @param {number} [options.coolingRate=0.95] - Multiplicative cooling factor.
   * @param {number} [options.stepSize=1] - Maximum perturbation magnitude.
   */
  constructor(options = {}) {
    super({ ...options, name: options.name ?? "FolderAgent" });
    this.chain = options.chain ?? new AminoAcidChain();
    this.energyGrid = options.energyGrid ?? new EnergyGrid();
    this.temperature = options.temperature ?? 10;
    this.coolingRate = options.coolingRate ?? 0.95;
    this.stepSize = options.stepSize ?? 1;
    this.bestChain = this.chain.clone();
    this.bestEnergy = this.energyGrid.totalEnergy(this.bestChain.toPoints());
  }

  /**
   * Generate a random perturbation vector.
   *
   * @returns {{x:number,y:number,z:number}}
   */
  randomDelta() {
    const pick = () => (Math.random() * 2 - 1) * this.stepSize;
    return { x: pick(), y: pick(), z: pick() };
  }

  /**
   * Compute acceptance probability for a proposed move.
   *
   * @param {number} currentEnergy - Current energy.
   * @param {number} proposedEnergy - Proposed energy.
   * @returns {boolean}
   */
  acceptMove(currentEnergy, proposedEnergy) {
    if (proposedEnergy <= currentEnergy) return true;
    const delta = proposedEnergy - currentEnergy;
    const probability = Math.exp(-delta / Math.max(1e-9, this.temperature));
    return Math.random() < probability;
  }

  /**
   * Execute one folding step.
   *
   * @param {Object} [context={}] - Step context.
   * @returns {Object} Folding summary.
   */
  step(context = {}) {
    const chainBefore = this.chain.clone();
    const currentEnergy = this.energyGrid.totalEnergy(chainBefore.toPoints());

    const candidate = chainBefore.clone();
    const residueIndex = Math.floor(Math.random() * Math.max(1, candidate.residues.length));
    candidate.perturb(residueIndex, this.randomDelta());

    const proposedEnergy = this.energyGrid.totalEnergy(candidate.toPoints());
    const accepted = this.acceptMove(currentEnergy, proposedEnergy);

    if (accepted) {
      this.chain = candidate;
    }

    const activeEnergy = accepted ? proposedEnergy : currentEnergy;
    if (activeEnergy < this.bestEnergy) {
      this.bestEnergy = activeEnergy;
      this.bestChain = (accepted ? candidate : chainBefore).clone();
    }

    this.temperature *= this.coolingRate;
    this.stepsTaken += 1;

    return {
      stepIndex: context.stepIndex ?? null,
      accepted,
      residueIndex,
      currentEnergy,
      proposedEnergy,
      activeEnergy,
      bestEnergy: this.bestEnergy,
      temperature: this.temperature
    };
  }
}

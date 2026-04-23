/**
 * @file protein_folding.js
 * @description Demonstration of the simplified protein folding loop.
 * The chain begins in a stretched pose and the FolderAgent performs
 * annealed search steps to seek lower energy conformations.
 */

import { AminoAcidChain, EnergyGrid, FolderAgent } from "../src/index.js";

const chain = AminoAcidChain.fromSequence(["A", "L", "G", "S", "V", "T", "L"]);
const energyGrid = new EnergyGrid({ epsilon: 0.8, sigma: 1.2 });
const folder = new FolderAgent({
  chain,
  energyGrid,
  temperature: 8,
  coolingRate: 0.9,
  stepSize: 0.75
});

for (let i = 0; i < 25; i += 1) {
  const summary = folder.step({ stepIndex: i });
  console.log(summary);
}

console.log("Best energy:", folder.bestEnergy);
console.log("Best chain:", folder.bestChain.toPoints());

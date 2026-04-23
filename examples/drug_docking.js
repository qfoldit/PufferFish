/**
 * @file drug_docking.js
 * @description Demonstration of the simplified docking loop.
 * The ligand moves around a target site and the score estimates how well the pose fits.
 */

import { TargetSite, LigandAgent, Scoring } from "../src/index.js";

const targetSite = new TargetSite({
  radius: 4,
  points: [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 }
  ]
});

const ligand = new LigandAgent({
  atoms: [
    { element: "C", x: 0, y: 0, z: 0 },
    { element: "N", x: 1, y: 0, z: 0 },
    { element: "O", x: 0, y: 1, z: 0 }
  ],
  translation: { x: 3, y: 3, z: 0 }
});

const scoring = new Scoring({ clashWeight: 2.5, distanceWeight: 1, contactBonus: 1.5 });

for (let i = 0; i < 20; i += 1) {
  ligand.step();
  const pose = ligand.pose();
  const result = scoring.score(pose, targetSite);
  console.log({ step: i, score: result.score, details: result.details });
}

/**
 * @file basic_sand.js
 * @description Minimal pufferfish sand-building example.
 * This example shows the metaphor in its purest form:
 * the agent lays down radial structure on a grid to shape the world around it.
 */

import { SandGrid, PufferfishAgent } from "../src/index.js";

const grid = new SandGrid({ size: 21, center: { x: 10, y: 10 } });
const agent = new PufferfishAgent({ x: 10, y: 10, fins: 6, intensity: 1 });

for (let i = 0; i < 8; i += 1) {
  console.log(agent.step({ grid }));
}

console.log("Final sand matrix:");
console.log(grid.toMatrix());

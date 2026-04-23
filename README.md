# 🐡 PupperFish – Architect Pufferfish Algorithm

![](https://qfoldit.github.io/img/1/logo/PupperFish_1.png)

A JavaScript library that simulates the nest‑building behavior of the white‑spotted pufferfish (*Torquigener albomaculosus*). <br>
*PupperFish* is a small ES module library that turns a biological metaphor into a computational loop. <br>

Based on the paper:

> Mizuuchi R., Kawase H., Shin H., Iwai D., Kondo S.  
> **Simple rules for construction of a geometric nest structure by pufferfish**  
> *Scientific Reports*, 8, Article number: 12366 (2018).  
> [DOI: 10.1038/s41598-018-30857-0](https://doi.org/10.1038/s41598-018-30857-0)

## Installation

```bash
npm install pupperfish

```

---

The metaphor is inspired by the white-spotted pufferfish, which builds radial sand structures to shape local flow. In this library, that behavior becomes a general strategy for moving matter and information toward lower-energy states:

- **Sand ridge building** becomes a generic spatial optimization loop.
- **Protein folding** becomes energy minimization on a simplified Lennard-Jones-style grid.
- **Drug docking** becomes a score-guided placement search around a target site.
- **Quantum optimization** is represented as a remote-call adapter for a theoretical Qiskit-style API.

## Install

```bash
npm install
```

## Run examples

```bash
npm run example:sand
npm run example:protein
npm run example:docking
```

## Core ideas

### Pufferfish metaphor
A pufferfish creates structure in its environment to change currents and attract attention. PupperFish borrows that idea: an agent repeatedly modifies its local neighborhood to improve a system objective. In the sand model, this is visual and geometric. In the protein and docking models, the same idea becomes an energy or score search.

### Protein folding
The folding modules use a compact energy landscape:
- atoms or residues are placed on a 2D grid for clarity,
- interactions are estimated with a Lennard-Jones-like potential,
- candidate conformations are accepted using a Metropolis criterion,
- temperature decreases through simulated annealing.

This is not a replacement for full molecular simulation software. It is a lightweight teaching and prototyping scaffold.

### Docking
Docking uses:
- a target site representation,
- a ligand pose model,
- a pseudo-Vina scoring function combining distance, clash, and fit terms.

### Quantum optimization
The quantum optimizer is an adapter around `axios`. It is written to talk to a theoretical Qiskit API endpoint. By default it uses a placeholder URL, so you can wire it to your own backend.

## Example usage

```js
import { SandGrid, PufferfishAgent } from "../src/index.js";

const grid = new SandGrid({ size: 31, center: { x: 15, y: 15 } });
const agent = new PufferfishAgent({ x: 15, y: 15 });

for (let step = 0; step < 20; step += 1) {
  agent.build(grid);
}

console.log(grid.toMatrix());
```

## Notes

The library is organized as a clean ES6 module tree:

- `src/core/`
- `src/pufferfish/`
- `src/protein/`
- `src/docking/`
- `src/quantum/`
- `src/visualization/`

This project is intentionally educational and architectural. <br> 
The physics and biology are simplified so the code stays readable and easy to extend. <br>
Every file is heavily commented in English so the metaphor remains easy to follow and extend.

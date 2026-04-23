## 🐡 PupperFish – Architect PufferFish Algorithm (Torquigener albomaculosus)

![](https://qfoldit.github.io/img/1/logo/PupperFish_1.png)

A JavaScript library that simulates the nest‑building behavior of the white‑spotted pufferfish (*Torquigener albomaculosus*). <br>
*PupperFish* is a small ES module library that turns a biological metaphor into a computational loop. <br>

This is a modular part of the qFoldIT ecosystem.

Based on the papers:

> Mizuuchi R., Kawase H., Shin H., Iwai D., Kondo S.  
> **Simple rules for construction of a geometric nest structure by pufferfish**  
> *Scientific Reports*, 8, Article number: 12366 (2018).  
> [DOI: 10.1038/s41598-018-30857-0](https://doi.org/10.1038/s41598-018-30857-0)

> Kawase H., Kitajima Y., Iwai D.  
> **3D model of the geometric nest structure, the "mystery circle," constructed by pufferfish**  
> *Scientific Data*, 9, Article number: 378 (2022).  
> [DOI: 10.1038/s41597-022-01466-4](https://doi.org/10.1038/s41597-022-01466-4)

The first paper revealed the simple local rules that produce the radial nest. The second work delivers the first quantified 3D models of the complete structure and shows that its valleys always channel water and fine-grained particles toward the centre – a biomimetic principle applicable to architecture and fluid engineering.

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

---

# PupperFish

It translates the pufferfish nest-building metaphor into a reusable simulation stack:
a biological agent shapes its environment, a molecular agent lowers energy, a docking agent scores fit, and a cloud renderer delivers the world to many client types.

## What this version adds

This version is organized around qFoldIT as a multi-layer platform:

- **Open world / digital twin layer** for MАС «Снежинка»
- **Cloud streaming layer** for maximum reach
- **Device profiles** for desktop, mobile, SmartTV, AR smart glasses, and other lean-back or spatial clients
- **Scientific subgames** for folding, docking, and quantum-assisted optimization
- **Visualization adapters** for Three.js and server-side rendering contracts

The core idea stays the same: simple rules can create complex structure.

## qFoldIT context

In qFoldIT, PupperFish is the structural engine that supports the player-facing world.

The game can present:
- exploration of the Arctic digital twin,
- laboratory missions,
- protein folding tasks,
- drug docking tasks,
- races,
- tournaments,
- remote cloud sessions on low-power devices,
- SmartTV and AR client layouts.

## Install

```bash
npm install
```

## Run examples

```bash
npm run example:sand
npm run example:protein
npm run example:docking
npm run example:tv
npm run example:ar
```

## Module overview

### Core
- `Environment` stores simulation state.
- `Agent` provides a reusable actor base class.
- `Simulation` orchestrates steps and event hooks.

### Pufferfish
- `SandGrid` models the radial sand field.
- `PufferfishAgent` builds nest-like structures and geometric rings.

### Protein
- `EnergyGrid` computes a Lennard-Jones-style energy.
- `AminoAcidChain` stores residue positions.
- `FolderAgent` performs Metropolis / simulated annealing search.

### Docking
- `TargetSite` represents the binding pocket.
- `LigandAgent` manages ligand pose.
- `Scoring` computes pseudo-Vina-style fit.

### Quantum
- `QuantumOptimizer` is an axios-based adapter for a theoretical Qiskit API.

### Visualization and cloud
- `ThreeRenderer` creates a local Three.js scene.
- `CloudSession` and `CloudRenderer` describe server-side rendering workflows.
- `DeviceProfile` and `InputProfile` adapt the experience to TV, AR, mobile, and desktop.

### qFoldIT world
- `WorldBlueprint` describes the MАС «Снежинка» world as a modular activity map.

## SmartTV and AR design notes

### SmartTV
SmartTV mode should be:
- controller-first,
- readable from distance,
- low-density,
- high-contrast,
- UI-light,
- cloud-streaming friendly.

### AR smart glasses
AR mode should be:
- minimal,
- spatial,
- gaze-friendly,
- gesture-friendly,
- comfort-focused,
- optimized for short interactions and overlays.

The library does not assume a specific headset SDK. Instead, it provides profiles and render plans that can be bound to native or web clients.

## Example usage

```js
import { SandGrid, PufferfishAgent, DeviceProfile } from "../src/index.js";

const device = DeviceProfile.smartTV();
const grid = new SandGrid({ size: 31 });
const agent = new PufferfishAgent({ x: 15, y: 15, pattern: "mystery_circle" });

agent.step({ grid, deviceProfile: device });

console.log(grid.toMatrix());
```

## Notes

This repository is a modular scaffold, not a finished production game client.
The code is intentionally explicit and heavily commented so qFoldIT can grow from prototype to platform without losing architectural clarity.

## 🐡 PupperFish – Architect PufferFish Algorithm (Torquigener albomaculosus)

![](https://qfoldit.github.io/img/1/logo/PupperFish_1.png)

A JavaScript library that simulates the nest‑building behavior of the white‑spotted pufferfish (*Torquigener albomaculosus*).  
*PupperFish* turns a biological metaphor into a computational loop and is a core part of the **qFoldIT** ecosystem.

## Scientific foundations

Based on two complementary research works:

> Mizuuchi R., Kawase H., Shin H., Iwai D., Kondo S.  
> **Simple rules for construction of a geometric nest structure by pufferfish**  
> *Scientific Reports*, 8, Article number: 12366 (2018).  
> [DOI: 10.1038/s41598-018-30857-0](https://doi.org/10.1038/s41598-018-30857-0)

> Kawase H., Kitajima Y., Iwai D.  
> **3D model of the geometric nest structure, the "mystery circle," constructed by pufferfish**  
> *Scientific Data*, 9, Article number: 378 (2022).  
> [DOI: 10.1038/s41597-022-01466-4](https://doi.org/10.1038/s41597-022-01466-4)

- The first paper revealed the simple local rules that spontaneously generate the radial nest pattern.  
- The second work delivered the first quantified 3D models and demonstrated that the nest’s valleys always channel water and fine particles toward the centre – a biomimetic principle applicable to architecture and fluid engineering.

## Metaphor & capabilities

The pufferfish builds radial sand structures that shape local flow. PupperFish generalises this behaviour: an agent repeatedly modifies its local environment to improve a system-wide objective.

- **Sand ridge building** → spatial optimisation loop  
- **Protein folding** → energy minimisation on a Lennard‑Jones‑style grid (Metropolis / simulated annealing)  
- **Drug docking** → score‑guided placement search around a target site (pseudo‑Vina scoring)  
- **Quantum optimisation** → remote‑call adapter for a theoretical Qiskit API

## Installation & examples

```bash
npm install pupperfish
```

After cloning the repository, install dependencies and run the examples:

```bash
npm install
npm run example:sand
npm run example:protein
npm run example:docking
npm run example:tv        # SmartTV layout
npm run example:ar        # AR glasses profile
```

## Module overview

```
src/
  core/           – Environment, Agent, Simulation base classes
  pufferfish/     – SandGrid, PufferfishAgent (nest construction)
  protein/        – EnergyGrid, AminoAcidChain, FolderAgent
  docking/        – TargetSite, LigandAgent, Scoring
  quantum/        – QuantumOptimizer (axios adapter)
  visualization/  – ThreeRenderer, CloudSession, CloudRenderer, DeviceProfile
  world/          – WorldBlueprint for the qFoldIT Arctic digital twin
```

### Core ideas in detail

**Pufferfish metaphor**  
An agent modifies its local neighbourhood repeatedly; the global pattern emerges from simple rules. Used literally in the sand model and translated into energy/score search for molecules.

**Protein folding**  
Residues are placed on a 2D grid; interactions are approximated by a Lennard‑Jones‑like potential; Metropolis criterion and simulated annealing drive the search. *Lightweight teaching scaffold, not a replacement for full molecular dynamics.*

**Docking**  
Ligand poses are evaluated with a pseudo‑Vina scoring function that combines distance, clash, and fit terms. The agent iteratively adjusts the pose to improve the score.

**Quantum optimisation**  
An adapter around `axios` that communicates with a theoretical Qiskit API; replace the placeholder URL with your own backend.

## qFoldIT context

In qFoldIT, PupperFish serves as the structural engine. The platform can present:

- exploration of the Arctic digital twin (станция «Снежинка»),
- laboratory missions,
- protein folding and drug docking tasks,
- races and tournaments,
- cloud‑streamed sessions on low‑power devices,
- SmartTV and AR client layouts.

### What this version adds

- Open world / digital twin layer for МАС «Снежинка»
- Cloud streaming layer with server‑side rendering
- Device profiles for desktop, mobile, SmartTV, AR smart glasses
- Scientific subgames (folding, docking, quantum‑assisted optimisation)
- Visualization adapters for Three.js and cloud rendering

## SmartTV & AR design notes

**SmartTV**  
Controller‑first, readable from distance, low‑density, high‑contrast, UI‑light, cloud‑streaming friendly.

**AR smart glasses**  
Minimal, spatial, gaze‑ and gesture‑friendly, comfort‑focused, optimised for short interactions and overlays.

The library does not depend on a specific headset SDK – it provides profiles and render plans that can be bound to native or web clients.

## Example usage (sand grid with device profile)

```js
import { SandGrid, PufferfishAgent, DeviceProfile } from 'pupperfish';

const device = DeviceProfile.smartTV();
const grid = new SandGrid({ size: 31 });
const agent = new PufferfishAgent({ x: 15, y: 15, pattern: 'mystery_circle' });

agent.step({ grid, deviceProfile: device });
console.log(grid.toMatrix());
```

## Notes

This repository is an educational and architectural scaffold, not a finished production game client.  
The physics and biology are simplified to keep the code readable and easy to extend.  
Every file is heavily commented, and the module boundaries are designed to grow from prototype to platform without losing clarity.

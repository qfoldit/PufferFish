/**
 * @file Scoring.js
 * @description Pseudo-Vina-like scoring logic for docking.
 * Real docking engines are much more sophisticated; this file keeps the logic compact
 * so the library remains approachable and hackable.
 */

import { TargetSite } from "./TargetSite.js";

/**
 * Scoring computes a fit score between a ligand pose and a target site.
 */
export class Scoring {
  /**
   * Create a scoring model.
   *
   * @param {Object} [options={}] - Scoring options.
   * @param {number} [options.clashWeight=2] - Penalty for close contacts.
   * @param {number} [options.distanceWeight=1] - Penalty for missing the pocket center.
   * @param {number} [options.contactBonus=1] - Bonus for within-pocket placement.
   */
  constructor(options = {}) {
    const {
      clashWeight = 2,
      distanceWeight = 1,
      contactBonus = 1
    } = options;

    this.clashWeight = clashWeight;
    this.distanceWeight = distanceWeight;
    this.contactBonus = contactBonus;
  }

  /**
   * Compute Euclidean distance between two points.
   *
   * @param {{x:number,y:number,z:number}} a - Point A.
   * @param {{x:number,y:number,z:number}} b - Point B.
   * @returns {number}
   */
  distance(a, b) {
    const dx = (a.x ?? 0) - (b.x ?? 0);
    const dy = (a.y ?? 0) - (b.y ?? 0);
    const dz = (a.z ?? 0) - (b.z ?? 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Score a ligand pose against a target site.
   * Lower scores are better, matching the intuition used by many docking tools.
   *
   * @param {Array<{x:number,y:number,z:number}>} pose - Ligand atom positions.
   * @param {TargetSite} targetSite - Target site.
   * @returns {{score:number,details:Object}}
   */
  score(pose, targetSite) {
    const siteCenter = targetSite.center();

    let centerDistance = 0;
    let clashPenalty = 0;
    let contactCount = 0;

    for (const atom of pose) {
      const distanceToCenter = this.distance(atom, siteCenter);
      centerDistance += distanceToCenter;

      if (targetSite.contains(atom)) {
        contactCount += 1;
      } else {
        clashPenalty += Math.max(0, distanceToCenter - targetSite.radius);
      }
    }

    const averageDistance = pose.length > 0 ? centerDistance / pose.length : 0;
    const fitScore =
      (averageDistance * this.distanceWeight) +
      (clashPenalty * this.clashWeight) -
      (contactCount * this.contactBonus);

    return {
      score: fitScore,
      details: {
        siteCenter,
        averageDistance,
        clashPenalty,
        contactCount
      }
    };
  }
}

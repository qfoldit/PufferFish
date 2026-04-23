/**
 * @file SandGrid.js
 * @description A simple 2D radial sand lattice inspired by pufferfish nest building.
 * The pufferfish metaphor is important here:
 * the fish is not "solving" a mathematical equation directly.
 * Instead, it repeatedly moves grains into a structured pattern that changes flow.
 * PupperFish uses that same idea as a spatial optimization loop.
 */

/**
 * SandGrid stores sand height on a square lattice.
 */
export class SandGrid {
  /**
   * Create a new sand grid.
   *
   * @param {Object} [options={}] - Grid options.
   * @param {number} [options.size=21] - Width and height of the grid.
   * @param {{x:number,y:number}} [options.center] - Logical center position.
   * @param {number} [options.initialHeight=0] - Initial sand height.
   */
  constructor(options = {}) {
    const {
      size = 21,
      center = { x: Math.floor(size / 2), y: Math.floor(size / 2) },
      initialHeight = 0
    } = options;

    this.size = size;
    this.center = { ...center };
    this.cells = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => initialHeight)
    );
    this.history = [];
  }

  /**
   * Check whether a grid coordinate is valid.
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate - Y coordinate.
   * @returns {boolean}
   */
  inBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.size && y < this.size;
  }

  /**
   * Read the sand height at a coordinate.
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @returns {number}
   */
  get(x, y) {
    return this.inBounds(x, y) ? this.cells[y][x] : 0;
  }

  /**
   * Write a sand height value at a coordinate.
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} value - Height value.
   * @returns {number}
   */
  set(x, y, value) {
    if (!this.inBounds(x, y)) return 0;
    this.cells[y][x] = value;
    this.history.push({ type: "set", x, y, value, timestamp: Date.now() });
    return value;
  }

  /**
   * Add sand to a coordinate.
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} amount - Sand amount.
   * @returns {number} New height.
   */
  add(x, y, amount = 1) {
    const next = this.get(x, y) + amount;
    return this.set(x, y, next);
  }

  /**
   * Subtract sand from a coordinate, without allowing negative heights.
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} amount - Sand amount.
   * @returns {number} New height.
   */
  remove(x, y, amount = 1) {
    const next = Math.max(0, this.get(x, y) - amount);
    return this.set(x, y, next);
  }

  /**
   * Return all valid neighboring coordinates in a 4-neighborhood.
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @returns {Array<{x:number,y:number}>}
   */
  neighbors(x, y) {
    return [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 }
    ].filter((p) => this.inBounds(p.x, p.y));
  }

  /**
   * Compute a radial bias score that makes the grid behave like a pufferfish nest.
   * Cells farther from the center are mildly encouraged to hold more sand,
   * producing a ring-like structure that can model flow control patterns.
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @returns {number}
   */
  radialBias(x, y) {
    const dx = x - this.center.x;
    const dy = y - this.center.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Apply one pufferfish-like build step from a chosen position.
   *
   * @param {{x:number,y:number}} position - Agent position.
   * @param {Object} [options={}] - Build options.
   * @param {number} [options.amount=1] - Sand amount to place.
   * @returns {Object} A small build report.
   */
  buildStep(position, options = {}) {
    const { amount = 1 } = options;
    const { x, y } = position;
    if (!this.inBounds(x, y)) {
      return { applied: false, reason: "out_of_bounds" };
    }

    const before = this.get(x, y);
    const after = this.add(x, y, amount);

    return {
      applied: true,
      x,
      y,
      before,
      after,
      radialBias: this.radialBias(x, y)
    };
  }

  /**
   * Convert the grid to a plain matrix.
   *
   * @returns {number[][]}
   */
  toMatrix() {
    return this.cells.map((row) => [...row]);
  }
}

/**
 * @file Agent.js
 * @description Base agent class used by all simulations.
 * A PupperFish agent is anything that can inspect a local neighborhood,
 * propose a move, and commit that move if it improves the objective.
 */

/**
 * Agent stores a position, a label, and a minimal lifecycle.
 */
export class Agent {
  /**
   * Create a new agent.
   *
   * @param {Object} [options={}] - Agent options.
   * @param {string} [options.id] - Optional identifier.
   * @param {string} [options.name="Agent"] - Human-readable name.
   * @param {number} [options.x=0] - X coordinate.
   * @param {number} [options.y=0] - Y coordinate.
   * @param {number} [options.z=0] - Z coordinate.
   */
  constructor(options = {}) {
    const {
      id = crypto.randomUUID?.() ?? `agent_${Math.random().toString(16).slice(2)}`,
      name = "Agent",
      x = 0,
      y = 0,
      z = 0
    } = options;

    this.id = id;
    this.name = name;
    this.position = { x, y, z };
    this.alive = true;
    this.stepsTaken = 0;
  }

  /**
   * Update the agent position.
   *
   * @param {number} x - New x coordinate.
   * @param {number} y - New y coordinate.
   * @param {number} [z=0] - New z coordinate.
   * @returns {Agent}
   */
  moveTo(x, y, z = 0) {
    this.position = { x, y, z };
    this.stepsTaken += 1;
    return this;
  }

  /**
   * Perform one simulation step.
   * Subclasses should override this method.
   *
   * @param {Object} context - Arbitrary simulation context.
   * @returns {any}
   */
  step(context = {}) {
    return context;
  }

  /**
   * Return a plain object snapshot of the agent.
   *
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      position: { ...this.position },
      alive: this.alive,
      stepsTaken: this.stepsTaken
    };
  }
}

/**
 * @file Environment.js
 * @description Base environment abstraction shared by all PupperFish subsystems.
 * The environment acts like the water-and-sand stage around the pufferfish:
 * agents do not exist in isolation, they always act inside a stateful world.
 */

/**
 * Environment is a lightweight mutable container for simulation state.
 * It stores named layers and a history of changes so derived classes can
 * implement sand dynamics, molecular state, docking state, or any other domain.
 */
export class Environment {
  /**
   * Create a new environment.
   *
   * @param {Object} [options={}] - Initialization options.
   * @param {string} [options.name="Environment"] - Human-readable environment name.
   * @param {number} [options.width=0] - Optional logical width.
   * @param {number} [options.height=0] - Optional logical height.
   * @param {any} [options.initialState={}] - Initial serializable state.
   */
  constructor(options = {}) {
    const {
      name = "Environment",
      width = 0,
      height = 0,
      initialState = {}
    } = options;

    this.name = name;
    this.width = width;
    this.height = height;
    this.state = structuredClone(initialState);
    this.history = [];
  }

  /**
   * Store a key/value pair in the environment state.
   *
   * @param {string} key - State key.
   * @param {any} value - State value.
   * @returns {any} The stored value.
   */
  set(key, value) {
    this.state[key] = value;
    this.history.push({
      type: "set",
      key,
      value: structuredClone(value),
      timestamp: Date.now()
    });
    return value;
  }

  /**
   * Retrieve a value from the environment state.
   *
   * @param {string} key - State key.
   * @param {any} [fallback=null] - Value returned when the key is missing.
   * @returns {any}
   */
  get(key, fallback = null) {
    return Object.prototype.hasOwnProperty.call(this.state, key)
      ? this.state[key]
      : fallback;
  }

  /**
   * Remove a key from the environment state.
   *
   * @param {string} key - State key to delete.
   * @returns {boolean} True when the key existed.
   */
  delete(key) {
    const existed = Object.prototype.hasOwnProperty.call(this.state, key);
    if (existed) {
      delete this.state[key];
      this.history.push({
        type: "delete",
        key,
        timestamp: Date.now()
      });
    }
    return existed;
  }

  /**
   * Reset the environment to an empty state.
   *
   * @returns {Environment} The current instance.
   */
  reset() {
    this.state = {};
    this.history.push({
      type: "reset",
      timestamp: Date.now()
    });
    return this;
  }

  /**
   * Produce a serializable snapshot of the environment.
   *
   * @returns {Object}
   */
  snapshot() {
    return {
      name: this.name,
      width: this.width,
      height: this.height,
      state: structuredClone(this.state),
      history: structuredClone(this.history)
    };
  }
}

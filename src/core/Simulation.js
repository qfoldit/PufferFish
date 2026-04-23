/**
 * @file Simulation.js
 * @description Generic simulation loop shared by pufferfish, protein, and docking workflows.
 * The loop is intentionally small: PupperFish favors clear control flow over hidden magic.
 */

import { Environment } from "./Environment.js";

/**
 * Simulation manages the environment, agents, time, and events.
 */
export class Simulation {
  /**
   * Create a new simulation.
   *
   * @param {Object} [options={}] - Simulation options.
   * @param {Environment} [options.environment=new Environment()] - Environment instance.
   * @param {Array<Object>} [options.agents=[]] - Initial agents.
   * @param {number} [options.maxSteps=100] - Maximum number of steps.
   * @param {Function} [options.onStep=null] - Optional hook called after each step.
   */
  constructor(options = {}) {
    const {
      environment = new Environment(),
      agents = [],
      maxSteps = 100,
      onStep = null
    } = options;

    this.environment = environment;
    this.agents = [...agents];
    this.maxSteps = maxSteps;
    this.onStep = onStep;
    this.stepIndex = 0;
    this.log = [];
  }

  /**
   * Add an agent to the simulation.
   *
   * @param {Object} agent - Agent instance.
   * @returns {Simulation}
   */
  addAgent(agent) {
    this.agents.push(agent);
    return this;
  }

  /**
   * Run a single simulation step.
   *
   * @param {Object} [context={}] - Context passed to every agent.
   * @returns {Object} Step summary.
   */
  step(context = {}) {
    const stepContext = {
      ...context,
      stepIndex: this.stepIndex,
      environment: this.environment,
      simulation: this
    };

    const agentResults = this.agents.map((agent) => {
      if (agent?.alive === false) return null;
      return typeof agent.step === "function" ? agent.step(stepContext) : null;
    });

    const summary = {
      stepIndex: this.stepIndex,
      agentResults
    };

    this.log.push(summary);

    if (typeof this.onStep === "function") {
      this.onStep(summary, this);
    }

    this.stepIndex += 1;
    return summary;
  }

  /**
   * Run the simulation for a fixed number of steps.
   *
   * @param {number} [steps=this.maxSteps] - Number of steps to run.
   * @param {Object} [context={}] - Shared context.
   * @returns {Array<Object>} Step summaries.
   */
  run(steps = this.maxSteps, context = {}) {
    const summaries = [];
    for (let i = 0; i < steps; i += 1) {
      summaries.push(this.step(context));
    }
    return summaries;
  }
}

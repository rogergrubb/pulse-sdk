/**
 * Pulse SDK — main entry point.
 *
 * Real-time ambient geo-presence in three function calls. See the full spec
 * at https://mypulse.city/sdk.
 *
 * @packageDocumentation
 */

import type {
  PulseConfig,
  Position,
  SubscribeQuery,
  SubscribeCallback,
  Unsubscribe,
  RenderOpts,
  PulseRenderView,
} from "./types.js";

export type {
  PulseConfig,
  Position,
  NearbyPulse,
  SubscribeQuery,
  SubscribeCallback,
  Unsubscribe,
  RenderOpts,
  PulseRenderView,
} from "./types.js";

const NOT_IMPLEMENTED =
  "not yet implemented — see spec at mypulse.city/sdk";

/**
 * Pulse client. One instance per user session.
 *
 * @example
 * ```ts
 * const pulse = new Pulse({ apiKey: "pk_live_...", userId: "user_42" });
 * await pulse.emit({ lat: 37.7749, lon: -122.4194 });
 * const unsubscribe = pulse.subscribe({ radiusMiles: 20 }, (pulses) => {
 *   console.log(pulses);
 * });
 * ```
 */
export class Pulse {
  /** The config this client was constructed with. Read-only at runtime. */
  public readonly config: Readonly<PulseConfig>;

  constructor(config: PulseConfig) {
    if (!config || typeof config !== "object") {
      throw new Error("Pulse: config is required");
    }
    if (!config.apiKey || typeof config.apiKey !== "string") {
      throw new Error("Pulse: config.apiKey is required");
    }
    if (!config.userId || typeof config.userId !== "string") {
      throw new Error("Pulse: config.userId is required");
    }
    this.config = Object.freeze({ ...config });
  }

  /**
   * Broadcast the user's current presence. Idempotent — safe to call as often
   * as the device location updates.
   *
   * @throws Until v0.2 ships, throws "not yet implemented".
   */
  public emit(position: Position): Promise<void> {
    void position;
    throw new Error(NOT_IMPLEMENTED);
  }

  /**
   * Stream nearby pulses. Server-side filters by geo-bounding box for efficiency.
   *
   * @returns An unsubscribe function. Call it to stop receiving updates.
   * @throws Until v0.2 ships, throws "not yet implemented".
   */
  public subscribe(
    query: SubscribeQuery,
    callback: SubscribeCallback,
  ): Unsubscribe {
    void query;
    void callback;
    throw new Error(NOT_IMPLEMENTED);
  }

  /**
   * Drop a complete 3D pulse view into any DOM element. Three.js is bundled
   * internally — `three` is an optional peer dependency only for advanced
   * tree-shaking use cases.
   *
   * @throws Until v0.2 ships, throws "not yet implemented".
   */
  public renderInto(
    element: HTMLElement,
    opts?: RenderOpts,
  ): PulseRenderView {
    void element;
    void opts;
    throw new Error(NOT_IMPLEMENTED);
  }

  /**
   * Tear down the client. Closes WebSocket connections, unsubscribes all
   * active streams, and releases the WebGL context.
   */
  public destroy(): void {
    throw new Error(NOT_IMPLEMENTED);
  }
}

export default Pulse;

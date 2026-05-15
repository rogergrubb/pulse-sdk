/**
 * Pulse SDK — public type surface (v0.1)
 *
 * These types are the contract for `@mypulsecity/sdk`. They MUST match the
 * spec at https://mypulse.city/sdk exactly. Breaking changes require a major
 * version bump and a 12-month deprecation runway per the SDK versioning policy.
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * Client construction config. Passed once to `new Pulse(config)`.
 */
export type PulseConfig = {
  /** Publishable API key. `pk_live_...` or `pk_test_...`. Grab one at mypulse.city/dev. */
  apiKey: string;
  /** Your app's user ID. Opaque to Pulse — never resolved against your user table. */
  userId: string;
  /** Data residency. Defaults to `"auto"`. */
  region?: "us" | "eu" | "auto";
  /** Location precision. `"coarse"` (±100m, default) or `"precise"` (opt-in, ±5m). */
  privacy?: "coarse" | "precise";
  /** Verbose console logging for development. Defaults to `false`. */
  debug?: boolean;
};

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

/**
 * A presence broadcast. Passed to `pulse.emit(position)`.
 */
export type Position = {
  lat: number;
  lon: number;
  /** Meters above WGS84 ellipsoid. Optional. */
  altitude?: number;
  /** Hex color (`#rrggbb`) for the pulse beam. */
  color?: string;
  /** Display name shown on pulse hover. */
  label?: string;
  /** 0..1, default 1. Controls beam brightness/height. */
  intensity?: number;
  /** App-specific data attached to the pulse. Used by `SubscribeQuery.filters.metadata`. */
  metadata?: Record<string, unknown>;
  /** Auto-expire if no re-emit within this window. Default 30 seconds. */
  ttlSeconds?: number;
};

// ---------------------------------------------------------------------------
// Subscribe
// ---------------------------------------------------------------------------

/**
 * Query passed to `pulse.subscribe(query, callback)`.
 * Server-side filters by geo-bounding box before streaming to the client.
 */
export type SubscribeQuery = {
  /** Search radius in miles. Default 20. */
  radiusMiles?: number;
  /** Search center. Defaults to last-emitted position. */
  center?: { lat: number; lon: number };
  filters?: {
    /** Exact-match metadata filter, e.g. `{ team: "red" }`. */
    metadata?: Record<string, unknown>;
    /** Whitelist of user IDs to include. */
    userIds?: string[];
    /** Blacklist of user IDs to hide (e.g. blocked users). */
    excludeUserIds?: string[];
  };
  /** Minimum interval between callback fires (ms). Default 250. */
  throttleMs?: number;
};

/**
 * A pulse delivered to a `subscribe` callback.
 */
export type NearbyPulse = {
  userId: string;
  lat: number;
  lon: number;
  distanceMiles: number;
  /** 0 = North, 90 = East. */
  bearingDegrees: number;
  color: string;
  label: string;
  intensity: number;
  metadata: Record<string, unknown>;
  /** Unix milliseconds. */
  lastSeen: number;
};

/**
 * Callback signature for `pulse.subscribe`.
 */
export type SubscribeCallback = (pulses: NearbyPulse[]) => void;

/**
 * Returned by `pulse.subscribe(query, callback)`. Call to stop receiving updates.
 */
export type Unsubscribe = () => void;

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

/**
 * Options passed to `pulse.renderInto(element, opts)`.
 */
export type RenderOpts = {
  /** Center the camera on the emitting user. Default true. */
  centerOnUser?: boolean;
  /** Rendered range in miles. Default 20. */
  range?: number;
  /** Visual style of the presence layer. */
  style?: "sky-beams" | "ground-pins" | "minimap" | "globe";
  /** Color theme. `"auto"` matches the user's OS preference. */
  theme?: "dark" | "light" | "auto";
  /** Camera control mode. */
  controls?: "orbit" | "first-person" | "locked";
  /** Show distance text next to each pulse. Default true. */
  showDistanceLabels?: boolean;
  /** Fired when the user clicks a pulse in the scene. */
  onPulseClick?: (pulse: NearbyPulse) => void;
  /** Fired when the user changes the rendered range via UI controls. */
  onRangeChange?: (miles: number) => void;
};

/**
 * Handle returned by `pulse.renderInto`. Use to programmatically control
 * the rendered view or tear it down on unmount.
 */
export type PulseRenderView = {
  /** Update the rendered range in miles. */
  setRange: (miles: number) => void;
  /** Tear down the WebGL context and remove DOM children. */
  destroy: () => void;
};

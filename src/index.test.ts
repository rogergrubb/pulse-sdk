import { describe, it, expect } from "vitest";
import Pulse from "./index.js";
import type { NearbyPulse, Position, SubscribeQuery } from "./index.js";

describe("Pulse — public API surface", () => {
  it("instantiates with a minimal valid config", () => {
    const pulse = new Pulse({
      apiKey: "pk_test_abc123",
      userId: "user_42",
    });

    expect(pulse).toBeInstanceOf(Pulse);
    expect(pulse.config.apiKey).toBe("pk_test_abc123");
    expect(pulse.config.userId).toBe("user_42");
  });

  it("exposes emit() with the correct signature and stub behavior", () => {
    const pulse = new Pulse({ apiKey: "pk_test_x", userId: "u1" });

    const position: Position = {
      lat: 37.7749,
      lon: -122.4194,
      color: "#ff6b35",
      label: "rojelio",
    };

    expect(typeof pulse.emit).toBe("function");
    expect(pulse.emit.length).toBe(1);
    expect(() => pulse.emit(position)).toThrow(/not yet implemented/);
  });

  it("exposes subscribe() whose callback receives NearbyPulse[]", () => {
    const pulse = new Pulse({ apiKey: "pk_test_x", userId: "u1" });

    const query: SubscribeQuery = { radiusMiles: 20 };
    const callback = (pulses: NearbyPulse[]): void => {
      // Type-level assertion that the callback shape matches the spec.
      void pulses;
    };

    expect(typeof pulse.subscribe).toBe("function");
    expect(pulse.subscribe.length).toBe(2);
    // Once implemented, subscribe must return an Unsubscribe (() => void).
    // For now, the stub throws — that's the contract during scaffolding.
    expect(() => pulse.subscribe(query, callback)).toThrow(
      /not yet implemented/,
    );
  });
});

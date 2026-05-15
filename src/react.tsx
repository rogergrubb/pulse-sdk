"use client";

/**
 * Pulse SDK — official React wrapper.
 *
 * @example
 * ```tsx
 * import { PulseView } from "@mypulsecity/sdk/react";
 *
 * <PulseView
 *   apiKey="pk_live_..."
 *   userId="user_42"
 *   range={20}
 *   style="sky-beams"
 *   onPulseClick={(p) => navigate(`/profile/${p.userId}`)}
 * />
 * ```
 */

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Pulse } from "./index.js";
import type {
  PulseConfig,
  RenderOpts,
  PulseRenderView,
} from "./types.js";

/**
 * Props for `<PulseView />`. Combines `RenderOpts` (the visual config the SDK
 * understands) with the auth fields needed to construct a Pulse client.
 *
 * Note: `RenderOpts.style` is the *visual* style (`"sky-beams"`, etc.). The
 * host `<div>`'s inline CSS is exposed via `containerStyle` to avoid the
 * name collision.
 */
export type PulseViewProps = RenderOpts & {
  /** Publishable API key. */
  apiKey: PulseConfig["apiKey"];
  /** Your app's user ID. */
  userId: PulseConfig["userId"];
  /** Data residency. */
  region?: PulseConfig["region"];
  /** Location precision. */
  privacy?: PulseConfig["privacy"];
  /** Verbose console logging. */
  debug?: PulseConfig["debug"];
  /** className applied to the host div. */
  className?: string;
  /** Inline CSS applied to the host div. Defaults to a 100% w/h block. */
  containerStyle?: CSSProperties;
};

const DEFAULT_HOST_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
};

/**
 * Drop-in 3D pulse view for React apps. Instantiates a Pulse client on mount
 * and tears it down on unmount.
 */
export function PulseView(props: PulseViewProps): JSX.Element {
  const {
    apiKey,
    userId,
    region,
    privacy,
    debug,
    className,
    containerStyle,
    centerOnUser,
    range,
    style,
    theme,
    controls,
    showDistanceLabels,
    onPulseClick,
    onRangeChange,
  } = props;

  const hostRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<Pulse | null>(null);
  const viewRef = useRef<PulseRenderView | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const client = new Pulse({
      apiKey,
      userId,
      region,
      privacy,
      debug,
    });
    clientRef.current = client;

    const renderOpts: RenderOpts = {
      centerOnUser,
      range,
      style,
      theme,
      controls,
      showDistanceLabels,
      onPulseClick,
      onRangeChange,
    };

    try {
      viewRef.current = client.renderInto(host, renderOpts);
    } catch (err) {
      // Stub stage: renderInto throws "not yet implemented". Surface it via
      // the debug logger but don't crash the host app's render tree.
      if (debug) {
        // eslint-disable-next-line no-console
        console.warn("[PulseView]", err);
      }
    }

    return () => {
      try {
        viewRef.current?.destroy();
      } catch {
        /* stub phase: destroy throws */
      }
      viewRef.current = null;
      try {
        clientRef.current?.destroy();
      } catch {
        /* stub phase: destroy throws */
      }
      clientRef.current = null;
    };
    // Re-mount only when auth/transport-level config changes. Render options
    // are applied via the secondary effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, userId, region, privacy, debug]);

  // Apply range changes without re-mounting.
  useEffect(() => {
    if (typeof range !== "number") return;
    try {
      viewRef.current?.setRange(range);
    } catch {
      /* swallow during stub phase */
    }
  }, [range]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={containerStyle ?? DEFAULT_HOST_STYLE}
      data-pulse-view=""
    />
  );
}

export default PulseView;

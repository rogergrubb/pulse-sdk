# @mypulsecity/sdk

> Real-time ambient geo-presence SDK — see your users from the horizon.

Three function calls. Ten lines of code. A planetary-scale, beautifully-rendered, GPS-aware presence layer in your product before lunch.

---

## Install

```bash
npm install @mypulsecity/sdk
```

Or via CDN:

```html
<script src="https://cdn.mypulse.city/sdk/v1/pulse.min.js"></script>
```

---

## Quick start

```js
import Pulse from "@mypulsecity/sdk";

const pulse = new Pulse({
  apiKey: "pk_live_abc123", // grab one at mypulse.city/dev
  userId: "user_42",
});

await pulse.emit({ lat: 37.7749, lon: -122.4194, color: "#ff6b35", label: "rojelio" });

pulse.subscribe({ radiusMiles: 20 }, (pulses) => {
  console.log(`${pulses.length} pulses within 20 miles`);
});

pulse.renderInto(document.getElementById("pulse-view"), {
  centerOnUser: true,
  range: 20,
  style: "sky-beams",
});
```

---

## React

```jsx
import { PulseView } from "@mypulsecity/sdk/react";

<PulseView
  apiKey="pk_live_..."
  userId="user_42"
  range={20}
  style="sky-beams"
  onPulseClick={(p) => navigate(`/profile/${p.userId}`)}
/>;
```

---

## API reference (brief)

### `new Pulse(config)`

`config: PulseConfig` — `{ apiKey, userId, region?, privacy?, debug? }`.

### `pulse.emit(position)`

Broadcast presence. `Position` accepts `lat`, `lon`, and optional `altitude`, `color`, `label`, `intensity`, `metadata`, `ttlSeconds`. Idempotent.

### `pulse.subscribe(query, callback)`

Live stream of nearby pulses. Returns an `unsubscribe()` function. `query` accepts `radiusMiles`, `center`, `filters`, `throttleMs`.

### `pulse.renderInto(element, opts)`

Drop a 3D pulse view into any DOM element. Returns `{ setRange, destroy }`. `opts` accepts `centerOnUser`, `range`, `style`, `theme`, `controls`, `showDistanceLabels`, `onPulseClick`, `onRangeChange`.

### `pulse.destroy()`

Tear down all connections, subscriptions, and WebGL contexts.

---

## Privacy

Coarse location (±100m) by default. Users opt in to precise (±5m). No background tracking, ever. See [the privacy posture](https://mypulse.city/dev) for the full GDPR/CCPA/SOC 2 stance.

---

## Full docs

[mypulse.city/dev](https://mypulse.city/dev)

---

## License

MIT — Copyright (c) 2026 Number One Son Software Development, LLC.

# Date, Time, and DateTime Functionality

This repo contains a lot of utilities which work with dates, times, etc.

- the `asDate()` and `asDateTime()` functions are important to know and understand. They can be found at:

    - /modules/runtime/src/datetime/asDate.ts
    - /modules/runtime/src/datetime/asDateTime.ts

- The `asDateTime()` is a bit more involved as it's function is to convert any `DateLike` variant to a Javascript Date object (which has no concept of the origination timezone).
- To give it some view into this we've added the `DatePlus` interface which allows a few additional properties to be set which describe the originating environment.
- If the originating environment has a way to capture the Timezone offset or IANA timezone name then we try to keep this context

## Plan

Please look at the current implementation along with the `asDateTime.test.ts` test file. From there let's:

- build out a more complete set of tests for the test file
- run the runtime tests (`pnpm test asDateTime`) and type tests `typed test asDateTime` to see what is working and what needs attention
- 


## Timezone Awareness

### MomentJS

```ts
// Core Moment keeps the numeric offset found in the text
const m = moment("2024-01-15T12:34:56.789+01:00");

m.utcOffset();   // 60  (minutes)
m.format("Z");   // "+01:00"
```

For real time-zone work (IANA names, DST rules, conversions) you must add the moment-timezone add-on:

```ts
import moment from "moment-timezone";

const berlin = moment.tz("2024-01-15T12:34:56.789", "Europe/Berlin");
const nyc    = berlin.clone().tz("America/New_York");

nyc.format();   // 2024-01-15T06:34:56-05:00
nyc.tz();       // "America/New_York"
```


### `date-fns`

Detecting which version you're deal with:

```ts
// rough-and-ready: works in every JS runtime
export function whichDateFnsFlavor(d: unknown): "v4" | "v3" | "not-a-date" {
  if (!(d instanceof Date)) return "not-a-date";

  const tag = Object.prototype.toString.call(d); // -> "[object Date]" | "[object TZDate]"
  if (tag === "[object TZDate]" ||
      // fallback for minified/bundled code:
      (d as any).constructor?.name === "TZDate" ||
      "timeZone" in (d as any)) {
    return "v4";
  }

  return "v3";            // vanilla Date OR v3+date-fns-tz helper
}
```

#### Versions ≤ 3.x  (use date-fns-tz)

```ts
import { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } from "date-fns-tz";

const berlin = utcToZonedTime(new Date(), "Europe/Berlin");
formatInTimeZone(berlin, "Europe/Berlin", "yyyy-MM-dd HH:mmXXX"); // string in that zone
```

#### Versions 4.x (Sept 2024) (first class zones)

```ts
import { TZDate } from "@date-fns/tz";
import { addHours } from "date-fns";

const d = new TZDate(2024, 0, 15, "Europe/Berlin"); // 2024-01-15
d.timeZone;   // "Europe/Berlin"
d.offset;     // 60  (minutes)

// All normal date-fns functions understand TZDate:
addHours(d, 2);          // respects DST & zone
```

- The new TZDate type remembers the IANA zone and its daylight-saving rules while staying compatible with the rest of date-fns.

### Luxon

the main issue here is the user will have had to set the `setZone` parameter to `true` or we'll not be getting _source_ timezone info but instead the _local_ timezone.

We'll throw away this context if the `zoneName` is the same the local `zoneName`.

```ts
import { DateTime } from "luxon";

// Parse and *keep* the zone/offset that appears in the string
const dt = DateTime.fromISO(
  "2024-01-15T12:34:56.789+01:00",
  { setZone: true }          // <-- **important**
);

// --- reading it back ---------------------------------
dt.offset          // 60        (minutes, so +01:00)
dt.offsetNameShort // "UTC+1"  (human-readable)
dt.zoneName        // "UTC+1"  (Luxon represents this as a FixedOffsetZone)
```

### Day.js

```ts
import { DateTime } from "luxon";

// Parse and *keep* the zone/offset that appears in the string
const dt = DateTime.fromISO(
  "2024-01-15T12:34:56.789+01:00",
  { setZone: true }          // <-- **important**
);

// --- reading it back ---------------------------------
dt.offset          // 60        (minutes, so +01:00)
dt.offsetNameShort // "UTC+1"  (human-readable)
dt.zoneName        // "UTC+1"  (Luxon represents this as a FixedOffsetZone)
```


### Temporal (stage 3)

Temporal distinguishes offset and zone; you can:

- include a bracketed zone in the input, or
- attach the desired zone afterward.

```ts
import { Temporal } from "@js-temporal/polyfill";

// Option A – include a bracketed zone name (recommended)
const zdt = Temporal.ZonedDateTime.from(
  "2024-01-15T12:34:56.789+01:00[UTC+01:00]"
);

zdt.offset      // "+01:00"
zdt.timeZone.id // "UTC+01:00"
```

If your input string only has an offset (no bracketed zone), parse as an Instant first and then attach the offset as a time zone:

```ts
const src     = "2024-01-15T12:34:56.789+01:00";
const instant = Temporal.Instant.from(src);        // absolute instant
const zdt     = instant.toZonedDateTimeISO("+01:00");

zdt.offset      // "+01:00"
zdt.timeZone.id // "UTC+01:00"
```


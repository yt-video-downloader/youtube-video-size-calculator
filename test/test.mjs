import assert from "node:assert/strict";
import { parseDuration, estimate, formatMB, fits } from "../docs/size.js";

assert.equal(parseDuration("10"), 600);
assert.equal(parseDuration("2.5"), 150);
assert.equal(parseDuration("10:35"), 635);
assert.equal(parseDuration("1:02:03"), 3723);
assert.equal(parseDuration("1h 20m"), 4800);
assert.equal(parseDuration("45 min"), 2700);
assert.equal(parseDuration("90s"), 90);
assert.equal(parseDuration(""), null);
assert.equal(parseDuration("abc"), null);
assert.equal(parseDuration("10:75"), null);

const ten = estimate(600, 0);
assert.equal(ten.length, 4);
assert.equal(Math.round(ten[0].lowMB), 150);
assert.equal(Math.round(ten[0].highMB), 300);
assert.equal(Math.round(estimate(600, 1)[1].mb), 130);
assert.equal(Math.round(estimate(600, 0.5)[3].mb), 25);
assert.deepEqual(estimate(0), []);

assert.equal(formatMB(1800), "1.8 GB");
assert.equal(formatMB(150.4), "150 MB");
assert.equal(formatMB(4.25), "4.3 MB");
assert.equal(fits(64, 110), 581);
assert.equal(fits(0, 10), 0);

console.log("all checks passed");

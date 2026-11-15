import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { menus } from "../src/data/menu.js";
test("15 menu have distinct local JPEG photographs available offline", () => {
  assert.equal(new Set(menus.map((menu) => menu.image)).size, 15);
  assert.equal(
    readdirSync(new URL("../public/images/", import.meta.url)).filter((name) =>
      name.endsWith(".jpg"),
    ).length,
    15,
  );
  for (const menu of menus) {
    const image = readFileSync(
      new URL(`../public${menu.image}`, import.meta.url),
    );
    assert.ok(image.length > 10000);
    assert.equal(image.readUInt16BE(0), 0xffd8);
  }
});

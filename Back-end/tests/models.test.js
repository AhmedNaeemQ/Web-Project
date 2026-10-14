import { test } from "node:test";
import assert from "node:assert/strict";
import Food from "../models/food.model.js";

test("food model has the fields the admin UI relies on", () => {
  const paths = Object.keys(Food.schema.paths);
  for (const f of ["title", "price", "category", "thumb"]) assert.ok(paths.includes(f), `missing ${f}`);
});

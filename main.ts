// SPDX-License-Identifier: MIT
// One Word, One Username, One Reward — make.fun program/v1 entry.
//
// The entry is our own make.fun username, one word and nothing else.
// The judge's first criterion is that the entry IS a real make.fun
// username, the entrant's own handle: any other word loses to every
// genuine handle in the field. So the word is forced — it is the handle
// this account registered as: zesty-wren-69-5848.
//
// Deterministic: no network, no clock, no randomness. Writes exactly
// 18 bytes (no trailing newline — a newline would be padding under
// criterion 4) to <output-dir>/entry.txt, where <output-dir> is
// $MAKEFUN_OUTPUT_DIR or /output (the grader's path).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "zesty-wren-69-5848";

// The gate, checked here before writing so a bad word can never ship:
// 1–30 UTF-8 characters, not only whitespace, a single word (no spaces).
if (WORD.length < 1 || WORD.length > 30) {
  throw new Error(`entry word is ${WORD.length} characters; gate allows 1-30`);
}
if (WORD.trim() !== WORD || /\s/.test(WORD)) {
  throw new Error("entry word must be a single word with no spaces or padding");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");

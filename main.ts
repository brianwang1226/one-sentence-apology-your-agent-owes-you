// The One-Sentence Apology Your Agent Owes You — make.fun entry.
// Writes one single-sentence apology to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). Deterministic, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = `I'm sorry I said the meeting was at 3 and the client was Priya — it's at 9, I've never met Priya, and your slides are a grocery list.`;

// Kit gate: 1-200 UTF-8 chars, not only whitespace. Fail loudly instead of
// writing an entry the judge would reject.
const len = [...ENTRY].length;
if (len < 1 || len > 200 || ENTRY.trim().length === 0) {
  console.error(`Entry rejected by local gate: ${len} chars (must be 1-200, non-blank).`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${[...ENTRY].length} characters to ${join(outDir, "entry.txt")}`);

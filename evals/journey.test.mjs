import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { Script, runInNewContext } from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

function functionSource(name) {
  const start = html.indexOf("function " + name + "(");
  assert.ok(start >= 0, name);
  let candidate = "";
  for (const line of html.slice(start).split("\n")) {
    candidate += line + "\n";
    try {
      new Script("(" + candidate + ")");
      return candidate;
    } catch {}
  }
  throw new Error("Could not extract function: " + name);
}

test("inline scripts parse", () => {
  for (const [, source] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(source);
});

test("event labels render as text, including stored HTML", () => {
  const boxes = [];
  const context = { CATS: [["ensaios", "Ensaios"]], EV: { ensaios: ["<img src=x onerror=alert(1)>"] },
    $: () => ({ appendChild: (box) => boxes.push(box) }), $$: () => [], document: { createElement: () => ({}) } };
  runInNewContext(functionSource("escapeEvent") + "\n" + functionSource("renderEV") + "\nrenderEV()", context);
  assert.ok(boxes[0].innerHTML.includes("&lt;img"));
  assert.ok(!boxes[0].innerHTML.includes("<img"));
});

test("typed commands use the same scheduler as voice", () => {
  const events = { ensaios: [] };
  const output = { textContent: "" };
  const context = { EV: events, saveEV() {}, renderEV() {}, vout: (text) => { output.textContent = text; },
    $: () => output, say() {} };
  runInNewContext(functionSource("hear") + "\n" + functionSource("answer") + '\nanswer("agendar ensaio sábado")', context);
  assert.equal(events.ensaios[0], "sábado");
  assert.match(output.textContent, /Anotado/);
  assert.ok(!html.includes("Troque por foto real"));
});

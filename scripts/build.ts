import { copyFile } from "fs/promises";
import builtins from "builtin-modules";
import esbuild from "esbuild";

const EXTERNAL_DEPENDENCIES: string[] = [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins,
];

const esbuildContext = await esbuild.context({
    external: EXTERNAL_DEPENDENCIES,
    entryPoints: ["src/main.ts"],
    outfile: "dist/main.js",
    treeShaking: true,
    sourcemap: false,
    target: "es2018",
    format: "cjs",
    bundle: true,
});

await esbuildContext.rebuild();

await copyFile("manifest.json", "dist/manifest.json");
await copyFile("styles.css", "dist/styles.css");

process.exit(0);

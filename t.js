/**
 * Automatically adds `"use client";` to React component files
 * that use client-only hooks like useEffect, useState, useRef, etc.
 *
 * Run: node add-use-client.js
 */

// import fs from "fs";
const fs = require("fs");
const path = require("path");
// import path from "path";

const COMPONENTS_DIR = path.resolve("./src/context/");

// Keywords that indicate client behavior
const CLIENT_KEYWORDS = [
  "useEffect",
  "useState",
  "useRef",
  "useRouter",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "navigator",
  "createContext",
];

function isClientComponent(content) {
  return CLIENT_KEYWORDS.some((kw) => content.includes(kw));
}

function hasUseClient(content) {
  return (
    content.trimStart().startsWith('"use client";') ||
    content.trimStart().startsWith("'use client';")
  );
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (![".tsx", ".jsx", ".ts", ".js"].includes(ext)) return;

  const content = fs.readFileSync(filePath, "utf8");
  if (hasUseClient(content)) return;

  if (isClientComponent(content)) {
    const updated = `"use client";\n${content}`;
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Added "use client" to: ${filePath}`);
  }
}

function walkDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

// Run script
if (fs.existsSync(COMPONENTS_DIR)) {
  console.log(`🚀 Scanning ${COMPONENTS_DIR} for client components...`);
  walkDir(COMPONENTS_DIR);
  console.log("✅ Done!");
} else {
  console.error("❌ Folder ./components not found!");
}

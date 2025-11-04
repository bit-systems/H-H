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

const ROOT_DIR = "./src"; // 👈 change this to your source folder if needed
const TARGET = 'from "next/router"';
const REPLACEMENT = 'from "next/navigation"';

function processFile(filePath) {
  if (!/\.(js|jsx|ts|tsx)$/.test(filePath)) return;
  if (filePath.split(path.sep).includes("pages")) return;

  const content = fs.readFileSync(filePath, "utf8");
  if (content.includes(TARGET)) {
    const updated = content.replace(TARGET, REPLACEMENT);
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

function walkDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and .next
      if (["node_modules", ".next"].includes(entry.name)) continue;
      walkDir(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

console.log("🔍 Scanning and replacing imports...");
walkDir(ROOT_DIR);
console.log("✅ Replacement complete!");

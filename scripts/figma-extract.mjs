/**
 * Figma REST API - Get Full Node Tree with CSS
 *
 * Usage:
 * 1. Add your Figma token to .env.figma file
 * 2. Run: node scripts/figma-extract.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load token from .env.figma
function loadEnv() {
  try {
    const envPath = resolve(__dirname, "../.env.figma");
    const envContent = readFileSync(envPath, "utf-8");
    const lines = envContent.split("\n");
    for (const line of lines) {
      if (line.startsWith("#") || !line.includes("=")) continue;
      const [key, ...valueParts] = line.split("=");
      const value = valueParts.join("=").trim();
      if (
        key.trim() === "FIGMA_TOKEN" &&
        value &&
        value !== "your_token_here"
      ) {
        return value;
      }
    }
  } catch (e) {
    // File not found
  }
  return process.env.FIGMA_TOKEN;
}

const FIGMA_FILE_KEY = "i2JD5CfMgttyQqmDY5v72Z";
const TARGET_NODE_ID = "52:184";

const FIGMA_TOKEN = loadEnv();

if (!FIGMA_TOKEN || FIGMA_TOKEN === "your_token_here") {
  console.error("❌ Please set FIGMA_TOKEN in .env.figma file");
  console.log("   1. Open .env.figma");
  console.log('   2. Replace "your_token_here" with your actual token');
  console.log(
    "   Get token from: https://www.figma.com/developers/api#access-tokens",
  );
  process.exit(1);
}

async function fetchFigmaNode(fileKey, nodeId) {
  const encodedNodeId = encodeURIComponent(nodeId);
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodedNodeId}&geometry=paths&plugin_data=shared`;

  console.log(`📡 Fetching node ${nodeId} from Figma API...`);

  const response = await fetch(url, {
    headers: {
      "X-Figma-Token": FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Figma API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

function extractNodeTree(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const result = {
    id: node.id,
    name: node.name,
    type: node.type,
    // Layout properties
    layout: {
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      x: node.absoluteBoundingBox?.x,
      y: node.absoluteBoundingBox?.y,
    },
    // Style properties
    styles: {},
    // Children
    children: [],
  };

  // Extract fills (background)
  if (node.fills && node.fills.length > 0) {
    result.styles.fills = node.fills.map((fill) => ({
      type: fill.type,
      color: fill.color
        ? `rgba(${Math.round(fill.color.r * 255)}, ${Math.round(fill.color.g * 255)}, ${Math.round(fill.color.b * 255)}, ${fill.color.a || 1})`
        : null,
      opacity: fill.opacity,
      gradientStops: fill.gradientStops,
      visible: fill.visible,
    }));
  }

  // Extract strokes (border)
  if (node.strokes && node.strokes.length > 0) {
    result.styles.strokes = node.strokes.map((stroke) => ({
      type: stroke.type,
      color: stroke.color
        ? `rgba(${Math.round(stroke.color.r * 255)}, ${Math.round(stroke.color.g * 255)}, ${Math.round(stroke.color.b * 255)}, ${stroke.color.a || 1})`
        : null,
    }));
    result.styles.strokeWeight = node.strokeWeight;
  }

  // Extract corner radius
  if (node.cornerRadius !== undefined) {
    result.styles.cornerRadius = node.cornerRadius;
  }
  if (node.rectangleCornerRadii) {
    result.styles.rectangleCornerRadii = node.rectangleCornerRadii;
  }

  // Extract effects (shadows, blur)
  if (node.effects && node.effects.length > 0) {
    result.styles.effects = node.effects.map((effect) => ({
      type: effect.type,
      color: effect.color
        ? `rgba(${Math.round(effect.color.r * 255)}, ${Math.round(effect.color.g * 255)}, ${Math.round(effect.color.b * 255)}, ${effect.color.a || 1})`
        : null,
      offset: effect.offset,
      radius: effect.radius,
      spread: effect.spread,
      visible: effect.visible,
    }));
  }

  // Extract padding/layout
  if (node.paddingLeft !== undefined) {
    result.styles.padding = {
      top: node.paddingTop,
      right: node.paddingRight,
      bottom: node.paddingBottom,
      left: node.paddingLeft,
    };
  }

  // Extract gap
  if (node.itemSpacing !== undefined) {
    result.styles.gap = node.itemSpacing;
  }

  // Extract layout mode
  if (node.layoutMode) {
    result.styles.layoutMode = node.layoutMode;
    result.styles.primaryAxisAlignItems = node.primaryAxisAlignItems;
    result.styles.counterAxisAlignItems = node.counterAxisAlignItems;
  }

  // Extract text styles
  if (node.type === "TEXT") {
    result.styles.text = {
      characters: node.characters,
      fontSize: node.style?.fontSize,
      fontFamily: node.style?.fontFamily,
      fontWeight: node.style?.fontWeight,
      lineHeightPx: node.style?.lineHeightPx,
      letterSpacing: node.style?.letterSpacing,
      textAlignHorizontal: node.style?.textAlignHorizontal,
    };
  }

  // Recursively extract children
  if (node.children && node.children.length > 0) {
    result.children = node.children.map((child) =>
      extractNodeTree(child, depth + 1),
    );
  }

  return result;
}

function printTree(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const size =
    node.layout.width && node.layout.height
      ? `${node.layout.width}x${node.layout.height}`
      : "";

  console.log(`${indent}├─ [${node.id}] ${node.name} (${node.type}) ${size}`);

  // Print key styles
  if (node.styles.fills?.length > 0) {
    const bg = node.styles.fills
      .filter((f) => f.visible !== false)
      .map((f) => f.color || f.type)
      .join(", ");
    if (bg) console.log(`${indent}   bg: ${bg}`);
  }
  if (node.styles.cornerRadius) {
    console.log(`${indent}   radius: ${node.styles.cornerRadius}px`);
  }
  if (node.styles.effects?.length > 0) {
    const effects = node.styles.effects
      .filter((e) => e.visible !== false)
      .map((e) => e.type)
      .join(", ");
    if (effects) console.log(`${indent}   effects: ${effects}`);
  }
  if (node.styles.text) {
    console.log(
      `${indent}   text: "${node.styles.text.characters}" (${node.styles.text.fontSize}px)`,
    );
  }

  // Recurse
  if (node.children) {
    node.children.forEach((child) => printTree(child, depth + 1));
  }
}

async function main() {
  try {
    const data = await fetchFigmaNode(FIGMA_FILE_KEY, TARGET_NODE_ID);

    const nodeData = data.nodes[TARGET_NODE_ID];
    if (!nodeData || !nodeData.document) {
      throw new Error("Node not found in response");
    }

    console.log("\n✅ Successfully fetched node data!\n");

    // Extract structured tree
    const tree = extractNodeTree(nodeData.document);

    // Print tree structure
    console.log("📦 Node Tree Structure:");
    console.log("========================\n");
    printTree(tree);

    // Create debug folder if not exists
    const fs = await import("fs");
    const path = await import("path");
    const debugDir = path.resolve(__dirname, "../.figma-debug");
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }

    // Generate filename with timestamp and node name
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:-]/g, "");
    const nodeName = tree.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const nodeIdSafe = TARGET_NODE_ID.replace(":", "-");

    // Save processed tree
    const treeOutputPath = path.resolve(
      debugDir,
      `${nodeName}_${nodeIdSafe}_tree.json`,
    );
    fs.writeFileSync(treeOutputPath, JSON.stringify(tree, null, 2));
    console.log(`\n💾 Processed tree saved to: ${treeOutputPath}`);

    // Save raw API response
    const rawOutputPath = path.resolve(
      debugDir,
      `${nodeName}_${nodeIdSafe}_raw.json`,
    );
    fs.writeFileSync(rawOutputPath, JSON.stringify(data, null, 2));
    console.log(`💾 Raw API response saved to: ${rawOutputPath}`);

    // Also save to root for quick access (legacy)
    const legacyPath = path.resolve(__dirname, "../figma-node-tree.json");
    fs.writeFileSync(legacyPath, JSON.stringify(tree, null, 2));
    console.log(`💾 Legacy path: ${legacyPath}`);

    // Count nodes
    function countNodes(node) {
      let count = 1;
      if (node.children) {
        node.children.forEach((child) => (count += countNodes(child)));
      }
      return count;
    }
    console.log(`\n📊 Total nodes: ${countNodes(tree)}`);

    console.log("\n📁 Debug files location: .figma-debug/");
    console.log("   (This folder is gitignored)\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();

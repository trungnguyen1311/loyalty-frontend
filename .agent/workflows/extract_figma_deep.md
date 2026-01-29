---
workflow_id: mcp-figma-exhaustive-deep-dive
description: Perform an exhaustive Figma data extraction combining REST API + MCP to ensure complete, untruncated design data.
---

# Figma Deep Extract Workflow v2.0

**HYBRID APPROACH: REST API + MCP**

To ensure **ABSOLUTELY NO DATA IS MISSED** and **NO GUESSING** occurs, the agent MUST strictly follow ALL steps below.

---

## Prerequisites

1. **Figma Token**: Ensure `.env.figma` has valid `FIGMA_TOKEN`
2. **Script**: `scripts/figma-extract.mjs` must exist
3. **Figma Desktop App**: Must be open with target file active (for MCP)

---

## Phase 1: Data Collection (Before Coding)

### Step 1.1: REST API - Full Tree Extraction (No Truncation)

**WHY**: MCP `get_design_context` bị truncate với components lớn. REST API lấy TOÀN BỘ nodes.

1. **Update Script Target**:
   - Edit `scripts/figma-extract.mjs`:
     - Set `FIGMA_FILE_KEY` = file key từ URL
     - Set `TARGET_NODE_ID` = node ID từ URL (format: `33:3750`)

2. **Run Script**:

   ```bash
   node scripts/figma-extract.mjs
   ```

3. **Output**: `figma-node-tree.json` chứa:
   - Full recursive children (không bị cắt)
   - Layout: width, height, x, y
   - Fills: background colors, gradients
   - Strokes: borders
   - Effects: shadows, blur
   - Padding, gap, layoutMode
   - Typography: fontSize, fontFamily, fontWeight, lineHeight

4. **Keep File Open**: Reference this JSON throughout coding

---

### Step 1.2: MCP - Variable Definitions (Token Names → Values)

**WHY**: REST API cho raw values. MCP cho TOKEN NAMES dùng trong design system.

1. **Invoke `get_variable_defs`** for target node:

   ```
   mcp_figma-dev-mode-mcp-server_get_variable_defs(nodeId: "33:3750")
   ```

2. **Extract ALL tokens**:
   - Colors: `Surface/primary_med_em`, `Text/high_em`, etc.
   - Spacing: `Space/xs`, `Space/md`, `Space/xl`, etc.
   - Typography: `Para/semibold`, `Caption 1/medium`, etc.
   - Radius: `Radius/component/radius_sm`, `Radius/big_component/radius_md`
   - Effects: `Elevation/e3`, `Component_effect/primary_default`

3. **Save Token Map**: Keep reference for variable synchronization

---

### Step 1.3: MCP - Key Element CSS (For Complex Styles)

**WHY**: REST API thiếu một số CSS details (border colors với gradient, exact blur values).

1. **Identify Key Elements** từ JSON tree:
   - Root container
   - Interactive states (selected, hover)
   - Buttons (primary, secondary)
   - Input fields
   - Any element with complex effects

2. **For Each Key Element**:
   - Có Designer select element đó trong Figma Desktop
   - Invoke `get_design_context` với nodeId trống (lấy selected)
   - HOẶC invoke với specific nodeId nếu biết

3. **Save CSS Snippets**: Giữ lại các CSS quan trọng từ MCP response

---

### Step 1.4: MCP - Screenshot for Visual Reference

**Invoke `get_screenshot`** để có hình ảnh tham chiếu:

```
mcp_figma-dev-mode-mcp-server_get_screenshot(nodeId: "33:3750")
```

---

## Phase 2: Token Synchronization (TRƯỚC KHI CODE)

### Step 2.1: Audit Existing Configuration

1. **Read config files**:
   - `src/index.css` - CSS variables
   - `tailwind.config.js` - Tailwind color/spacing mappings

2. **Compare with Token Map** từ Step 1.2

---

### Step 2.2: FORCE ADD Missing Variables

**STRICTLY PROHIBITED**: DO NOT use raw hex values in components!

For EACH missing token:

1. **Add CSS Variable** to `src/index.css`:

   ```css
   :root {
     --surface-primary-med-em: #796bff;
     --text-base-em: #c3c6cc;
     /* ... */
   }
   ```

2. **Add Tailwind Mapping** to `tailwind.config.js`:

   ```js
   colors: {
     surfacePrimaryMedEm: "var(--surface-primary-med-em)",
     textBaseEm: "var(--text-base-em)",
   }
   ```

3. **Add Shadow Utilities** if needed:
   ```js
   boxShadow: {
     'e3': '0 20px 20px -12px rgba(0,0,0,0.03), 0 3px 3px -1.5px rgba(0,0,0,0.03), 0 1px 1px -0.5px rgba(0,0,0,0.03)',
   }
   ```

---

## Phase 3: Implementation (NOW You Can Code)

### Step 3.1: Container First

1. **Check Root Node** trong JSON:
   - `cornerRadius` → `rounded-[Xpx]`
   - `fills` → `bg-*` or gradient
   - `effects` → `shadow-*`
   - `strokes` → `border-*`
   - `padding` → `p-*`

2. **NEVER ASSUME DEFAULTS**:
   - Figma có shadow → Code PHẢI có shadow
   - Figma có bg-white → Code PHẢI có bg-white

---

### Step 3.2: Traverse Tree Top-Down

For EACH node in JSON tree:

1. **Check Type**:
   - `FRAME` / `GROUP` → Layout wrapper, check fills/effects
   - `INSTANCE` → Component, full styling
   - `TEXT` → Typography styling
   - `VECTOR` → Icon/graphic

2. **Map Styles**:
   | JSON Property | CSS/Tailwind |
   |---------------|--------------|
   | `cornerRadius` | `rounded-[Xpx]` |
   | `fills[].color` | `bg-[color]` or token class |
   | `strokes` + `strokeWeight` | `border border-[color]` |
   | `effects[].type: "DROP_SHADOW"` | `shadow-*` |
   | `effects[].type: "INNER_SHADOW"` | Custom box-shadow inset |
   | `effects[].type: "BACKGROUND_BLUR"` | `backdrop-blur-[Xpx]` |
   | `padding` | `p-[Xpx]` or directional |
   | `gap` | `gap-[Xpx]` |
   | `layoutMode: "HORIZONTAL"` | `flex flex-row` |
   | `layoutMode: "VERTICAL"` | `flex flex-col` |
   | `primaryAxisAlignItems` | `justify-*` |
   | `counterAxisAlignItems` | `items-*` |

---

### Step 3.3: Text Elements

For each `type: "TEXT"` node:

- `fontSize` → `text-[Xpx]`
- `fontWeight` → `font-*` (400=normal, 500=medium, 600=semibold)
- `lineHeightPx` → `leading-[Xpx]`
- `fills[].color` → `text-[color]`
- `characters` → Actual text content

---

### Step 3.4: Interactive States

**REST API chỉ có 1 state**. Cho interactive states (hover, selected):

1. **Check MCP `get_design_context`** từ Step 1.3
2. **Hoặc yêu cầu Designer copy CSS** từ Figma Dev Mode panel
3. **Không được đoán** - phải có data rõ ràng

---

## Phase 4: Cross-Validation

### Step 4.1: Compare Sources

| Data Point | REST API JSON   | MCP Variable   | Use Which?                   |
| ---------- | --------------- | -------------- | ---------------------------- |
| Colors     | Raw RGBA        | Token name     | Token name → Use token class |
| Spacing    | Raw px          | Token name     | Token name → Use token class |
| Typography | Raw values      | Font style ref | Match to token               |
| Effects    | Detailed values | Effect names   | Combine both                 |

### Step 4.2: Resolve Conflicts

- **MCP Variable exists** → Always use the token name
- **Only raw value** → Check if a close token exists, if not, add new token
- **Different values** → Trust MCP Variable (design system source of truth)

---

## Failure Handling Rules

### ❌ NEVER DO:

1. Hardcode hex values when token exists
2. Guess dimensions not in data
3. Assume transparency for containers
4. Skip shadows/borders visible in Figma
5. Use truncated MCP data without verification

### ✅ ALWAYS DO:

1. Reference JSON file for exact values
2. Use token classes from tailwind config
3. Cross-check MCP variables with JSON raw values
4. Ask for clarification if data is missing
5. Test visual output against Figma screenshot

---

## Quick Reference: Data Sources

| What                 | Primary Source                           | Fallback                    |
| -------------------- | ---------------------------------------- | --------------------------- |
| Full tree structure  | REST API JSON                            | -                           |
| Variable/Token names | MCP `get_variable_defs`                  | -                           |
| Complex element CSS  | MCP `get_design_context` (specific node) | Designer copy from Dev Mode |
| Interactive states   | Designer copy from Dev Mode              | MCP `get_design_context`    |
| Visual reference     | MCP `get_screenshot`                     | -                           |

---

## TL;DR Checklist

- [ ] Run REST API script → `figma-node-tree.json`
- [ ] Get MCP `get_variable_defs` → Token map
- [ ] Get MCP `get_design_context` for key elements
- [ ] Sync all tokens to `index.css` + `tailwind.config.js`
- [ ] Code container first (root node styles)
- [ ] Traverse tree, map each node's styles
- [ ] Verify against screenshot
- [ ] NO hardcoded values, NO guessing

## 5. Next Step: Implementation Rules

Once data extraction is complete, you MUST proceed to the Implementation Rules to ensure code quality:
-> View `.agent/workflows/figma-implementation-rules.md`

---
workflow_id: mcp-figma-exhaustive-deep-dive
description: Perform an exhaustive Figma data extraction to guarantee accurate Text Overrides and complete coverage of all child nodes, preventing fallback to default component content.
---

To ensure **ABSOLUTELY NO DATA IS MISSED** (hidden text, icons, SVGs, nested components), the agent MUST strictly follow the **Exhaustive Deep Dive** procedure below.

---

## Step 1: Full Tree Scan (Recursive X-Ray)

- Invoke `mcp_figma_desktop_get_metadata`.
- **MANDATORY**: Recursively traverse **ALL levels** of the Figma DOM tree.  
  Stopping at depth 1 is strictly forbidden.
- **IGNORE** any node where `hidden="true"` — these represent intentionally disabled or unused design elements.

---

## Step 2: Expand & Fetch All Strategy

- The agent MUST NOT subjectively judge whether a node is “important”.
- Every **VISIBLE** node is considered critical.
- For each **NON-HIDDEN** child node discovered in Step 1 (especially `INSTANCE`, `FRAME`, `GROUP`):
  - Determine whether it contains `TEXT` or `VECTOR / SVG` content.
  - If the node is a `VECTOR` or icon-like `INSTANCE`:
    - Extract the full SVG path or export data.
    - Use `get_design_context` or `get_screenshot` if visual confirmation is required.
  - If the node is `TEXT`:
    - Extract the actual rendered string value.
    - Extract the full text style (font family, size, weight, color).

---

## Step 3: Text Override Resolution

- Invoke `get_design_context` for every **VISIBLE node cluster**.
- Pay special attention to:
  - Input fields
  - List items
  - Repeated components  
    These frequently contain **text overrides** that differ from the base component definition.
- The agent MUST retrieve the **actual text displayed on screen**, not the default component value.
- **IGNORE** all nodes where `hidden="true"`.

---

## Step 4: Cross Verification (Double Check)

- Compare all extracted text values against the visual output from `get_screenshot`.
- If the screenshot contains text (e.g. `"ABC"`) that does NOT appear in the extracted data:
  - Continue drilling down into the corresponding subtree.
  - Repeat recursive extraction until the source node is found.

---

## Step 5: Aggregation

- The final output MUST be a JSON structure that:
  - Preserves the exact hierarchical structure of the Figma document.
  - Accurately represents parent–child relationships.
  - Contains all resolved text, vector, and style data.

---

## FAILURE HANDLING RULES (STRICT)

- If MCP data is incomplete, inconsistent, or missing required properties:
  - **STOP the implementation immediately**
  - Explicitly report the missing `nodeId` or property.
- If a screenshot mismatch is detected:
  - Re-run a recursive scan on the affected subtree.
  - If the data still cannot be resolved, declare:
    - `Unresolvable Override`
- **NEVER** silently fallback to guessing, estimation, or default values.

- **STRICT ZERO-GUESSING POLICY**:
  - Every single design value (font-size, line-height, spacing, border-radius, etc.) **MUST** be pulled directly from the JSON field of the MCP response.
  - Guessing based on "intuition", "visual balance", or "similar elements" is strictly forbidden.
  - If a value seems inconsistent, re-extract and verify, but NEVER assume.

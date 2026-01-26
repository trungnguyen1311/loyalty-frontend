# Skill: 1:1 Figma-to-Code Implementation

## Objective

Convert Figma designs into React + TailwindCSS code with **absolute 1:1 precision (Pixel Perfect)** based on technical specifications retrieved via MCP.

## MANDATORY Rules (Strict Compliance)

### 1. Source of Truth

- **NO GUESSING**: Never estimate colors, spacing, or dimensions by looking at images.
- **USE MCP TOOLS**: Only use parameters returned by Figma MCP tools: `get_design_context`, `get_metadata`, and `get_variable_defs`.
- **Node ID Extraction**: Extract the exact `node-id` from the provided Figma link (e.g., `27-324` becomes `27:324`) to query data.

### 2. Color Management & Tailwind Config

- **Config Synchronization**: Before writing code, inspect `tailwind.config.js`.
- **Color Addition Workflow**:
  1. Retrieve the HEX code from Figma MCP.
  2. Check if this color already exists in `tailwind.config.js`.
  3. If **NOT FOUND**: You MUST update `tailwind.config.js` (add to the `brand` object or relevant category) before using it.
  4. If **FOUND**: Use the corresponding Tailwind class (e.g., `text-brand-primary`).
- **Standard Colors Only**: Do not use default Tailwind colors (e.g., `text-gray-700`) unless the Figma parameters explicitly specify that color code. Never use raw HEX codes in the UI code; they must be mapped through the config.

### 3. Spacing & Layout

- **MCP Standards**: Apply exact `gap`, `padding`, and `margin` values from metadata.
- **No Manual Balancing**: Do not adjust spacing to "make it look balanced." If Figma says X px, code X px (e.g., `gap-[14px]`).
- **AutoLayout Faithful**: Replicate the `flex`, `items-center`, `justify-between` structure exactly as defined in Figma's AutoLayout.

### 4. Typography & Dimensions

- **Detailed Parameters**: Copy exact `font-size`, `line-height`, `font-weight`, and `letter-spacing`.
- **Weight Mapping**: `Regular` = 400, `Medium` = 500, `SemiBold` = 600, `Bold` = 700.

### 5. No Subjective Optimization

- **NO "Modernization"**: Do not "improve" the UI based on modern design trends or personal preference.
- **1:1 Accuracy**: The sole goal is for the code to be a technical clone of the MCP data.

## Execution Workflow

1. **STEP 1**: Receive Figma link + extract `nodeId`.
2. **STEP 2**: Run `get_design_context` and `get_variable_defs` to get the structure and tokens.
3. **STEP 3**: Cross-check colors with `tailwind.config.js`. Update the config if necessary.
4. **STEP 4**: Write UI code using config classes for colors and exact pixel values for spacing.
5. **STEP 5**: Self-verify layers and compare MCP metadata with the final code to ensure 0px deviation.

---

**CRITICAL:** Any deviation from MCP specifications is a violation of this skill.

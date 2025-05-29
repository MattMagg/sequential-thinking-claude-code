# mcp-sequentialthinking-tools (Enhanced Edition)

An enhanced version of the original [mcp-sequentialthinking-tools](https://github.com/spences10/mcp-sequentialthinking-tools) by Scott Spence, which was adapted from the [MCP Sequential Thinking Server](https://github.com/modelcontextprotocol/servers/blob/main/src/sequentialthinking/index.ts).

This enhanced edition transforms the original framework into an intelligent tool recommendation system with:
- **26 pre-configured tools** including all Claude Code tools
- **Automatic tool recommendations** based on thought content
- **Deep integration** with [Basic Memory MCP](https://github.com/basicmachines-co/basic-memory) for knowledge management
- **Pattern-based intelligence** that suggests the right tools at the right time

> **Credits**: Original repository by [Scott Spence](https://github.com/spences10). Basic Memory tools from [Basic Machines Co](https://github.com/basicmachines-co). Enhanced with permission.

<a href="https://glama.ai/mcp/servers/zl990kfusy">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/zl990kfusy/badge" />
</a>

A Model Context Protocol (MCP) server that combines sequential
thinking with tool usage suggestions. For each step in the
problem-solving process, it provides confidence scores and rationale
for tools that could be used, based on tools available in your environment.

## What's New in This Enhanced Edition

### 🚀 Key Improvements
- **Auto-recommends tools** based on your thought content (no manual specification needed!)
- **26 pre-integrated tools** ready to use out of the box
- **Intelligent pattern matching** that understands context
- **Basic Memory integration** for persistent knowledge management

### 📦 Included Tool Sets

#### Claude Code Tools (17 tools)
- File operations: `Read`, `Write`, `Edit`, `MultiEdit`, `LS`, `Glob`, `Grep`
- Execution: `Bash`, `Agent`
- Notebooks: `NotebookRead`, `NotebookEdit`
- Web: `WebFetch`, `WebSearch`
- Tasks: `TodoRead`, `TodoWrite`
- Special: `StickerRequest`

#### Basic Memory Tools (9 tools)
- `mcp__basic-memory__write_note` - Record knowledge
- `mcp__basic-memory__read_note` - Access saved information
- `mcp__basic-memory__search_notes` - Search your knowledge base
- `mcp__basic-memory__build_context` - Follow knowledge connections
- And more...

## Original Features (Enhanced)

- 🤔 Dynamic and reflective problem-solving through sequential thoughts
- 🔄 Flexible thinking process that adapts and evolves
- 🌳 Support for branching and revision of thoughts
- 🛠️ **NEW: Automatic tool suggestions based on thought content**
- 📊 **ENHANCED: Pre-configured confidence scores for each tool**
- 🔍 **ENHANCED: Context-aware rationale generation**
- 📝 Step tracking with expected outcomes
- 🔄 Progress monitoring with previous and remaining steps
- 🎯 **ENHANCED: Intelligent alternative tool suggestions**

## How It Works

### Original Behavior
The original server provided a framework for tool recommendations but required manual tool specification.

### Enhanced Behavior
This version **automatically analyzes your thoughts** and recommends appropriate tools:

```typescript
// You think: "I need to save this important decision"
// Server automatically recommends: mcp__basic-memory__write_note (0.95 confidence)

// You think: "Search for all TODO comments" 
// Server automatically recommends: Grep (0.85), Agent (0.75)

// You think: "I want some Claude stickers!"
// Server automatically recommends: StickerRequest (0.95)
```

Each recommendation includes:
- **Confidence score** (0-1) based on pattern matching
- **Clear rationale** explaining why the tool fits
- **Priority level** for execution order
- **Alternative tools** that could also work

The enhanced pattern matching understands context like:
- "record", "save", "document" → Basic Memory write_note
- "read", "examine", "check" → Read tool
- "multiple edits" → MultiEdit tool
- "run", "execute" → Bash tool

## Example Usage

Here's an example of how the server guides tool usage:

```json
{
	"thought": "Initial research step to understand what universal reactivity means in Svelte 5",
	"current_step": {
		"step_description": "Gather initial information about Svelte 5's universal reactivity",
		"expected_outcome": "Clear understanding of universal reactivity concept",
		"recommended_tools": [
			{
				"tool_name": "search_docs",
				"confidence": 0.9,
				"rationale": "Search Svelte documentation for official information",
				"priority": 1
			},
			{
				"tool_name": "tavily_search",
				"confidence": 0.8,
				"rationale": "Get additional context from reliable sources",
				"priority": 2
			}
		],
		"next_step_conditions": [
			"Verify information accuracy",
			"Look for implementation details"
		]
	},
	"thought_number": 1,
	"total_thoughts": 5,
	"next_thought_needed": true
}
```

The server tracks your progress and supports:

- Creating branches to explore different approaches
- Revising previous thoughts with new information
- Maintaining context across multiple steps
- Suggesting next steps based on current findings

## Configuration

This server requires configuration through your MCP client. Here are
examples for different environments:

### Cline Configuration

Add this to your Cline MCP settings:

```json
{
	"mcpServers": {
		"mcp-sequentialthinking-tools": {
			"command": "npx",
			"args": ["-y", "mcp-sequentialthinking-tools"]
		}
	}
}
```

### Claude Desktop with WSL Configuration

For WSL environments, add this to your Claude Desktop configuration:

```json
{
	"mcpServers": {
		"mcp-sequentialthinking-tools": {
			"command": "wsl.exe",
			"args": [
				"bash",
				"-c",
				"source ~/.nvm/nvm.sh && /home/username/.nvm/versions/node/v20.12.1/bin/npx mcp-sequentialthinking-tools"
			]
		}
	}
}
```

## API

The server implements a single MCP tool with configurable parameters:

### sequentialthinking_tools

A tool for dynamic and reflective problem-solving through thoughts,
with intelligent tool recommendations.

Parameters:

- `thought` (string, required): Your current thinking step
- `next_thought_needed` (boolean, required): Whether another thought
  step is needed
- `thought_number` (integer, required): Current thought number
- `total_thoughts` (integer, required): Estimated total thoughts
  needed
- `is_revision` (boolean, optional): Whether this revises previous
  thinking
- `revises_thought` (integer, optional): Which thought is being
  reconsidered
- `branch_from_thought` (integer, optional): Branching point thought
  number
- `branch_id` (string, optional): Branch identifier
- `needs_more_thoughts` (boolean, optional): If more thoughts are
  needed
- `current_step` (object, optional): Current step recommendation with:
  - `step_description`: What needs to be done
  - `recommended_tools`: Array of tool recommendations with confidence
    scores
  - `expected_outcome`: What to expect from this step
  - `next_step_conditions`: Conditions for next step
- `previous_steps` (array, optional): Steps already recommended
- `remaining_steps` (array, optional): High-level descriptions of
  upcoming steps

## Development

### Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm build
```

4. Run in development mode:

```bash
pnpm dev
```

### Publishing

The project uses changesets for version management. To publish:

1. Create a changeset:

```bash
pnpm changeset
```

2. Version the package:

```bash
pnpm changeset version
```

3. Publish to npm:

```bash
pnpm release
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on the
  [Model Context Protocol](https://github.com/modelcontextprotocol)
- Adapted from the
  [MCP Sequential Thinking Server](https://github.com/modelcontextprotocol/servers/blob/main/src/sequentialthinking/index.ts)

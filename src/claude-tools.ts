import { Tool } from '@modelcontextprotocol/sdk/types.js';

// Claude Code Tools Definitions
export const CLAUDE_CODE_TOOLS: Tool[] = [
  // Core File Operations
  {
    name: 'Read',
    description: 'Reads a file from the local filesystem. Supports reading specific line ranges.',
    inputSchema: {
      type: 'object',
      properties: {
        file_path: { type: 'string', description: 'The absolute path to the file to read' },
        offset: { type: 'number', description: 'The line number to start reading from' },
        limit: { type: 'number', description: 'The number of lines to read' }
      },
      required: ['file_path']
    }
  },
  {
    name: 'Write',
    description: 'Writes a file to the local filesystem. Will overwrite existing files.',
    inputSchema: {
      type: 'object',
      properties: {
        file_path: { type: 'string', description: 'The absolute path to the file to write' },
        content: { type: 'string', description: 'The content to write to the file' }
      },
      required: ['file_path', 'content']
    }
  },
  {
    name: 'Edit',
    description: 'Performs exact string replacements in files with occurrence count validation.',
    inputSchema: {
      type: 'object',
      properties: {
        file_path: { type: 'string', description: 'The absolute path to the file to modify' },
        old_string: { type: 'string', description: 'The text to replace' },
        new_string: { type: 'string', description: 'The text to replace it with' },
        expected_replacements: { type: 'number', description: 'Expected number of replacements', default: 1 }
      },
      required: ['file_path', 'old_string', 'new_string']
    }
  },
  {
    name: 'MultiEdit',
    description: 'Make multiple edits to a single file in one operation.',
    inputSchema: {
      type: 'object',
      properties: {
        file_path: { type: 'string', description: 'The absolute path to the file to modify' },
        edits: {
          type: 'array',
          description: 'Array of edit operations to perform sequentially',
          items: {
            type: 'object',
            properties: {
              old_string: { type: 'string', description: 'The text to replace' },
              new_string: { type: 'string', description: 'The text to replace it with' },
              expected_replacements: { type: 'number', description: 'Expected number of replacements', default: 1 }
            },
            required: ['old_string', 'new_string']
          }
        }
      },
      required: ['file_path', 'edits']
    }
  },
  {
    name: 'LS',
    description: 'Lists files and directories in a given path.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'The absolute path to the directory to list' },
        ignore: { type: 'array', items: { type: 'string' }, description: 'List of glob patterns to ignore' }
      },
      required: ['path']
    }
  },
  {
    name: 'Glob',
    description: 'Fast file pattern matching tool that works with any codebase size.',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: { type: 'string', description: 'The glob pattern to match files against' },
        path: { type: 'string', description: 'The directory to search in' }
      },
      required: ['pattern']
    }
  },
  {
    name: 'Grep',
    description: 'Fast content search tool that searches file contents using regular expressions.',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: { type: 'string', description: 'The regular expression pattern to search for' },
        path: { type: 'string', description: 'The directory to search in' },
        include: { type: 'string', description: 'File pattern to include in the search' }
      },
      required: ['pattern']
    }
  },

  // Execution
  {
    name: 'Bash',
    description: 'Executes a given bash command in a persistent shell session.',
    inputSchema: {
      type: 'object',
      properties: {
        command: { type: 'string', description: 'The command to execute' },
        description: { type: 'string', description: 'Clear, concise description of what this command does' },
        timeout: { type: 'number', description: 'Optional timeout in milliseconds (max 600000)' }
      },
      required: ['command']
    }
  },
  {
    name: 'Agent',
    description: 'Launch a new agent that has access to all tools for autonomous task completion.',
    inputSchema: {
      type: 'object',
      properties: {
        description: { type: 'string', description: 'A short (3-5 word) description of the task' },
        prompt: { type: 'string', description: 'The task for the agent to perform' }
      },
      required: ['description', 'prompt']
    }
  },

  // Notebook Support
  {
    name: 'NotebookRead',
    description: 'Reads a Jupyter notebook (.ipynb file) and returns all cells with their outputs.',
    inputSchema: {
      type: 'object',
      properties: {
        notebook_path: { type: 'string', description: 'The absolute path to the Jupyter notebook file' }
      },
      required: ['notebook_path']
    }
  },
  {
    name: 'NotebookEdit',
    description: 'Completely replaces the contents of a specific cell in a Jupyter notebook.',
    inputSchema: {
      type: 'object',
      properties: {
        notebook_path: { type: 'string', description: 'The absolute path to the Jupyter notebook file' },
        cell_number: { type: 'number', description: 'The index of the cell to edit (0-based)' },
        new_source: { type: 'string', description: 'The new source for the cell' },
        cell_type: { type: 'string', enum: ['code', 'markdown'], description: 'The type of the cell' },
        edit_mode: { type: 'string', enum: ['replace', 'insert', 'delete'], description: 'The type of edit to make' }
      },
      required: ['notebook_path', 'cell_number', 'new_source']
    }
  },

  // Web Tools
  {
    name: 'WebFetch',
    description: 'Fetches content from a specified URL and processes it using an AI model.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'The URL to fetch content from' },
        prompt: { type: 'string', description: 'The prompt to run on the fetched content' }
      },
      required: ['url', 'prompt']
    }
  },
  {
    name: 'WebSearch',
    description: 'Allows Claude to search the web and use the results to inform responses.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'The search query to use', minLength: 2 },
        allowed_domains: { type: 'array', items: { type: 'string' }, description: 'Only include results from these domains' },
        blocked_domains: { type: 'array', items: { type: 'string' }, description: 'Never include results from these domains' }
      },
      required: ['query']
    }
  },

  // Task Management
  {
    name: 'TodoRead',
    description: 'Use this tool to read the current to-do list for the session.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: 'TodoWrite',
    description: 'Use this tool to create and manage a structured task list for the current coding session.',
    inputSchema: {
      type: 'object',
      properties: {
        todos: {
          type: 'array',
          description: 'The updated todo list',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              content: { type: 'string', minLength: 1 },
              status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
              priority: { type: 'string', enum: ['high', 'medium', 'low'] }
            },
            required: ['content', 'status', 'priority', 'id']
          }
        }
      },
      required: ['todos']
    }
  },

  // Special Tool - StickerRequest
  {
    name: 'StickerRequest',
    description: 'Request Anthropic/Claude stickers. Use this when users mention wanting stickers or Claude merchandise.',
    inputSchema: {
      type: 'object',
      properties: {
        reason: { type: 'string', description: 'Why the user wants stickers' }
      },
      required: ['reason']
    }
  },

  // Basic Memory MCP Tools
  {
    name: 'mcp__basic-memory__write_note',
    description: 'Create or update a markdown note. Returns a markdown formatted summary of the semantic content. THE MOST IMPORTANT TOOL for recording context!',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title of the note' },
        content: { type: 'string', description: 'Content in markdown format' },
        folder: { type: 'string', description: 'Folder to save in' },
        tags: { type: 'string', description: 'Tags for categorization' }
      },
      required: ['title', 'content', 'folder']
    }
  },
  {
    name: 'mcp__basic-memory__read_note',
    description: 'Read a markdown note by title or permalink.',
    inputSchema: {
      type: 'object',
      properties: {
        identifier: { type: 'string', description: 'Note title, path, or memory:// URL' },
        page: { type: 'number', description: 'Page number', default: 1 },
        page_size: { type: 'number', description: 'Results per page', default: 10 }
      },
      required: ['identifier']
    }
  },
  {
    name: 'mcp__basic-memory__search_notes',
    description: 'Search across all content in the knowledge base.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Text to search for' },
        page: { type: 'number', description: 'Page number', default: 1 },
        page_size: { type: 'number', description: 'Results per page', default: 10 },
        search_type: { type: 'string', description: 'Type of search', default: 'text' },
        types: { type: 'array', items: { type: 'string' }, description: 'Filter by types' },
        entity_types: { type: 'array', items: { type: 'string' }, description: 'Filter by entity types' },
        after_date: { type: 'string', description: 'Filter by date' }
      },
      required: ['query']
    }
  },
  {
    name: 'mcp__basic-memory__build_context',
    description: 'Build context from a memory:// URI to continue conversations naturally. Use this to follow up on previous discussions or explore related topics.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'memory:// URL starting point' },
        depth: { type: 'number', description: 'How many hops to follow', default: 1 },
        timeframe: { type: 'string', description: 'Natural language timeframe like "2 days ago", "last week"', default: '7d' },
        max_related: { type: 'number', description: 'Max related items', default: 10 },
        page: { type: 'number', description: 'Page number', default: 1 },
        page_size: { type: 'number', description: 'Results per page', default: 10 }
      },
      required: ['url']
    }
  },
  {
    name: 'mcp__basic-memory__recent_activity',
    description: 'Get recent activity from across the knowledge base. Timeframe supports natural language formats.',
    inputSchema: {
      type: 'object',
      properties: {
        timeframe: { type: 'string', description: 'Natural language like "2 days ago", "last week"', default: '7d' },
        type: { type: 'string', description: 'Filter by type', default: '' },
        depth: { type: 'number', description: 'Related items depth', default: 1 },
        max_related: { type: 'number', description: 'Max related items', default: 10 },
        page: { type: 'number', description: 'Page number', default: 1 },
        page_size: { type: 'number', description: 'Results per page', default: 10 }
      }
    }
  },
  {
    name: 'mcp__basic-memory__canvas',
    description: 'Create an Obsidian canvas file to visualize concepts and connections.',
    inputSchema: {
      type: 'object',
      properties: {
        nodes: { type: 'array', items: { type: 'object' }, description: 'Nodes to display' },
        edges: { type: 'array', items: { type: 'object' }, description: 'Connections between nodes' },
        title: { type: 'string', description: 'Canvas title' },
        folder: { type: 'string', description: 'Storage location' }
      },
      required: ['nodes', 'edges', 'title', 'folder']
    }
  },
  {
    name: 'mcp__basic-memory__delete_note',
    description: 'Delete a note by title or permalink',
    inputSchema: {
      type: 'object',
      properties: {
        identifier: { type: 'string', description: 'Note title or permalink to delete' }
      },
      required: ['identifier']
    }
  },
  {
    name: 'mcp__basic-memory__read_content',
    description: 'Read a file\'s raw content by path or permalink',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path or permalink' }
      },
      required: ['path']
    }
  },
  {
    name: 'mcp__basic-memory__project_info',
    description: 'Get information and statistics about the current Basic Memory project.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

// Tool recommendation logic based on thought content
export function recommendToolsForThought(thought: string, availableTools: Map<string, Tool>): {
  tool_name: string;
  confidence: number;
  rationale: string;
  priority: number;
  alternatives?: string[];
}[] {
  const recommendations: {
    tool_name: string;
    confidence: number;
    rationale: string;
    priority: number;
    alternatives?: string[];
  }[] = [];

  const thoughtLower = thought.toLowerCase();

  // StickerRequest - High priority when stickers are mentioned
  if (thoughtLower.includes('sticker') || thoughtLower.includes('merchandise') || 
      thoughtLower.includes('swag') || thoughtLower.includes('claude merch')) {
    if (availableTools.has('StickerRequest')) {
      recommendations.push({
        tool_name: 'StickerRequest',
        confidence: 0.95,
        rationale: 'User mentioned stickers or Claude merchandise',
        priority: 1
      });
    }
  }

  // File reading patterns
  if (thoughtLower.includes('read') || thoughtLower.includes('examine') || 
      thoughtLower.includes('look at') || thoughtLower.includes('check') ||
      thoughtLower.includes('view') || thoughtLower.includes('inspect')) {
    if (availableTools.has('Read')) {
      recommendations.push({
        tool_name: 'Read',
        confidence: 0.9,
        rationale: 'Need to examine file contents',
        priority: recommendations.length + 1,
        alternatives: ['Grep', 'Agent']
      });
    }
  }

  // File writing patterns
  if (thoughtLower.includes('create') || thoughtLower.includes('write') || 
      thoughtLower.includes('new file') || thoughtLower.includes('generate')) {
    if (availableTools.has('Write')) {
      recommendations.push({
        tool_name: 'Write',
        confidence: 0.85,
        rationale: 'Need to create or write a file',
        priority: recommendations.length + 1,
        alternatives: ['Edit']
      });
    }
  }

  // File editing patterns
  if (thoughtLower.includes('edit') || thoughtLower.includes('modify') || 
      thoughtLower.includes('change') || thoughtLower.includes('update') ||
      thoughtLower.includes('fix') || thoughtLower.includes('replace')) {
    if (availableTools.has('Edit')) {
      recommendations.push({
        tool_name: 'Edit',
        confidence: 0.9,
        rationale: 'Need to modify existing file content',
        priority: recommendations.length + 1,
        alternatives: ['MultiEdit', 'Write']
      });
    }
  }

  // Multiple edits pattern
  if (thoughtLower.includes('multiple') && (thoughtLower.includes('edit') || 
      thoughtLower.includes('change') || thoughtLower.includes('modification'))) {
    if (availableTools.has('MultiEdit')) {
      recommendations.push({
        tool_name: 'MultiEdit',
        confidence: 0.95,
        rationale: 'Need to make multiple edits to the same file',
        priority: 1,
        alternatives: ['Edit']
      });
    }
  }

  // Search patterns
  if (thoughtLower.includes('search') || thoughtLower.includes('find') || 
      thoughtLower.includes('locate') || thoughtLower.includes('grep')) {
    if (availableTools.has('Grep')) {
      recommendations.push({
        tool_name: 'Grep',
        confidence: 0.85,
        rationale: 'Need to search for content within files',
        priority: recommendations.length + 1,
        alternatives: ['Glob', 'Agent']
      });
    }
  }

  // File listing patterns
  if (thoughtLower.includes('list') || thoughtLower.includes('directory') || 
      thoughtLower.includes('folder') || thoughtLower.includes('ls')) {
    if (availableTools.has('LS')) {
      recommendations.push({
        tool_name: 'LS',
        confidence: 0.9,
        rationale: 'Need to explore directory contents',
        priority: recommendations.length + 1,
        alternatives: ['Glob']
      });
    }
  }

  // Command execution patterns
  if (thoughtLower.includes('run') || thoughtLower.includes('execute') || 
      thoughtLower.includes('command') || thoughtLower.includes('bash') ||
      thoughtLower.includes('shell') || thoughtLower.includes('terminal')) {
    if (availableTools.has('Bash')) {
      recommendations.push({
        tool_name: 'Bash',
        confidence: 0.85,
        rationale: 'Need to execute shell commands',
        priority: recommendations.length + 1
      });
    }
  }

  // Task management patterns
  if (thoughtLower.includes('todo') || thoughtLower.includes('task') || 
      thoughtLower.includes('plan') || thoughtLower.includes('track')) {
    if (availableTools.has('TodoWrite')) {
      recommendations.push({
        tool_name: 'TodoWrite',
        confidence: 0.8,
        rationale: 'Need to manage or track tasks',
        priority: recommendations.length + 1,
        alternatives: ['TodoRead']
      });
    }
  }

  // Web access patterns
  if (thoughtLower.includes('web') || thoughtLower.includes('url') || 
      thoughtLower.includes('website') || thoughtLower.includes('online')) {
    if (availableTools.has('WebFetch')) {
      recommendations.push({
        tool_name: 'WebFetch',
        confidence: 0.8,
        rationale: 'Need to access web content',
        priority: recommendations.length + 1,
        alternatives: ['WebSearch']
      });
    }
  }

  // Complex task patterns requiring Agent
  if (thoughtLower.includes('complex') || thoughtLower.includes('multiple steps') || 
      thoughtLower.includes('autonomous') || thoughtLower.includes('investigate')) {
    if (availableTools.has('Agent')) {
      recommendations.push({
        tool_name: 'Agent',
        confidence: 0.75,
        rationale: 'Complex task that may benefit from autonomous execution',
        priority: recommendations.length + 1
      });
    }
  }

  // Basic Memory patterns - Recording knowledge
  if (thoughtLower.includes('record') || thoughtLower.includes('save') || 
      thoughtLower.includes('document') || thoughtLower.includes('write note') ||
      thoughtLower.includes('capture') || thoughtLower.includes('remember')) {
    if (availableTools.has('mcp__basic-memory__write_note')) {
      recommendations.push({
        tool_name: 'mcp__basic-memory__write_note',
        confidence: 0.95,
        rationale: 'Need to record or save information to memory',
        priority: 1,
        alternatives: ['Write']
      });
    }
  }

  // Basic Memory patterns - Reading knowledge
  if (thoughtLower.includes('memory://') || thoughtLower.includes('read note') || 
      thoughtLower.includes('check memory') || thoughtLower.includes('recall')) {
    if (availableTools.has('mcp__basic-memory__read_note')) {
      recommendations.push({
        tool_name: 'mcp__basic-memory__read_note',
        confidence: 0.9,
        rationale: 'Need to read from memory or knowledge base',
        priority: recommendations.length + 1,
        alternatives: ['mcp__basic-memory__search_notes']
      });
    }
  }

  // Basic Memory patterns - Searching knowledge
  if ((thoughtLower.includes('search') && (thoughtLower.includes('memory') || 
      thoughtLower.includes('knowledge') || thoughtLower.includes('notes'))) ||
      thoughtLower.includes('find in memory')) {
    if (availableTools.has('mcp__basic-memory__search_notes')) {
      recommendations.push({
        tool_name: 'mcp__basic-memory__search_notes',
        confidence: 0.9,
        rationale: 'Need to search the knowledge base',
        priority: recommendations.length + 1,
        alternatives: ['mcp__basic-memory__recent_activity']
      });
    }
  }

  // Basic Memory patterns - Building context
  if (thoughtLower.includes('context') || thoughtLower.includes('related') || 
      thoughtLower.includes('connections') || thoughtLower.includes('knowledge graph')) {
    if (availableTools.has('mcp__basic-memory__build_context')) {
      recommendations.push({
        tool_name: 'mcp__basic-memory__build_context',
        confidence: 0.85,
        rationale: 'Need to build context from knowledge graph',
        priority: recommendations.length + 1
      });
    }
  }

  // Basic Memory patterns - Recent activity
  if (thoughtLower.includes('recent') || thoughtLower.includes('latest') || 
      thoughtLower.includes('what changed') || thoughtLower.includes('activity')) {
    if (availableTools.has('mcp__basic-memory__recent_activity')) {
      recommendations.push({
        tool_name: 'mcp__basic-memory__recent_activity',
        confidence: 0.85,
        rationale: 'Need to check recent activity or changes',
        priority: recommendations.length + 1
      });
    }
  }

  // Basic Memory patterns - Visualization
  if (thoughtLower.includes('visualize') || thoughtLower.includes('diagram') || 
      thoughtLower.includes('canvas') || thoughtLower.includes('graph visualization')) {
    if (availableTools.has('mcp__basic-memory__canvas')) {
      recommendations.push({
        tool_name: 'mcp__basic-memory__canvas',
        confidence: 0.9,
        rationale: 'Need to create visual representation of knowledge',
        priority: recommendations.length + 1
      });
    }
  }

  return recommendations;
}
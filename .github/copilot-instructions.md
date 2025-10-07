# Playwright MCP Test Automation Workspace

This is a Playwright test automation project designed for AI-assisted test generation, debugging, and planning using Model Context Protocol (MCP) integration with specialized chat modes.

## Project Architecture

This is a **structured Playwright project** with specialized AI agent workflows:

- `tests/` - Test specifications (currently contains minimal seed file)
- `pages/` - Page object models (empty, ready for implementation)  
- `components/` - Reusable component abstractions (empty, ready for implementation)
- `utils/` - Test utilities and helpers (empty, ready for implementation)
- `specs/` - Test planning documents (empty, used by planning workflow)

## Key Workflows

### AI-Assisted Test Development
This project uses **three specialized AI agents** via custom chat modes:

1. **🎭 Planner** (`.github/chatmodes/ 🎭 planner.chatmode.md`)
   - Explores web applications and creates comprehensive test plans
   - Saves test plans as markdown files in `specs/` directory
   - Use for: "Create test scenarios for [URL]"

2. **🎭 Generator** (`.github/chatmodes/🎭 generator.chatmode.md`)  
   - Converts test plans into working Playwright code
   - Uses real browser automation during code generation
   - Saves tests to appropriate spec files in `tests/`
   - Use for: "Generate test from scenario [description]"

3. **🎭 Healer** (`.github/chatmodes/🎭 healer.chatmode.md`)
   - Debugs and fixes failing tests systematically
   - Uses live browser debugging with MCP tools
   - Iterates until tests pass cleanly
   - Use for: "Fix failing test [test-name]"

### MCP Integration
The project includes **Playwright MCP server** configuration (`.vscode/mcp.json`) enabling:
- Live browser interaction during test development
- Real-time debugging of test failures  
- Interactive test scenario validation

## Test Structure Conventions

### Test Organization
```typescript
// Pattern: tests/{feature-area}.spec.ts
test.describe('Feature Area', () => {
  test('specific scenario', async ({ page }) => {
    // Implementation
  });
});
```

### Configuration Settings
- **Test directory**: `./tests`
- **Parallel execution**: Enabled (`fullyParallel: true`)
- **Browser targets**: Chromium, Firefox, WebKit
- **Trace collection**: On first retry only
- **Reporter**: HTML reports

### CI/CD Integration
GitHub Actions workflow (`.github/workflows/playwright.yml`):
- Runs on push/PR to main/master branches
- Uses Ubuntu with Node LTS
- Installs Playwright with dependencies via `npx playwright install --with-deps`
- Uploads test reports as artifacts

## Development Patterns

### Page Object Model (Intended)
While `pages/` and `components/` directories are empty, the project structure supports:
- Page objects in `pages/` following `{feature}.page.ts` naming
- Reusable components in `components/` following `{component}.ts` naming
- Utilities in `utils/` for common test helpers

### Test Planning Workflow
1. Use **Planner agent** to explore target application and generate test scenarios
2. Save comprehensive test plans in `specs/` directory
3. Use **Generator agent** to convert plans into executable Playwright tests
4. Use **Healer agent** when tests fail or need debugging

### Best Practices for This Project
- **Always use MCP integration** - The agents rely on live browser interaction
- **Start with planning** - Generate test scenarios before writing code
- **Use describe blocks** - Group related tests logically
- **Reference specs** - Include spec file references in generated tests
- **Iterative debugging** - Use Healer agent for systematic test fixes

## Common Commands

```bash
# Run all tests
npx playwright test

# Run specific test file  
npx playwright test tests/login.spec.ts

# Run tests with UI mode for debugging
npx playwright test --ui

# Install browsers
npx playwright install --with-deps
```

## AI Agent Usage Examples

- "Use planner agent to create test scenarios for https://example.com/login"
- "Generate test from the login scenario in specs/login-plan.md"  
- "Use healer agent to debug the failing user-registration test"
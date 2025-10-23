# Sub-Agent Architecture

This directory contains specialized sub-agent configurations for managing complex, phased development work.

## Architecture Overview

```
Main Orchestrator (Claude Code)
    │
    ├─> Project Manager Agent
    │   - Purpose: Create/maintain project plans
    │   - Skills: planning
    │   - Output: Plan file at .ai/plans/
    │
    └─> Phase Executor Agent
        - Purpose: Execute complete TDD cycle for one phase
        - Skills: planning, testing, development
        - Output: Phase log + tested implementation
```

## Available Agents

### 1. Project Manager Agent

**When to Use:**
- User requests a new feature or major work
- Existing plan needs updating or expanding
- Need to break down complex requirements into phases

**Agent File:** `.claude/agents/project-manager.md`

**Invocation Pattern:**

```typescript
await Task({
    description: "Create plan for X feature",
    subagent_type: "general-purpose",
    prompt: `
You are the Project Manager Agent (see .claude/agents/project-manager.md).

Create a comprehensive plan for:
${userRequirement}

Context:
- Current project: ${projectDescription}
- Existing plans: ${existingPlans}
- Code location: ${relevantPaths}

Requirements:
1. Break down into phases (TDD approach)
2. Specify type test requirements for EACH phase
3. Include TODO prevention requirements
4. Ensure acceptance criteria are measurable
5. Write plan to .ai/plans/YYYY-MM-DD-{name}.md

Return: plan file path + summary
`
});
```

**Expected Output:**
```
Plan created successfully:
- File: .ai/plans/2025-10-23-feature-name.md
- Phases: 5
- Estimated Effort: 2 days
- Status: Ready for Execution

Summary: [Brief description]

Ready for user review.
```

### 2. Phase Executor Agent

**When to Use:**
- Executing a single phase from an approved plan
- Need complete TDD cycle: tests → implementation → verification
- Want to ensure quality standards (no TODOs, complete type tests)

**Agent File:** `.claude/agents/phase-executor.md`

**Invocation Pattern:**

```typescript
await Task({
    description: "Execute Phase N of plan",
    subagent_type: "general-purpose",
    prompt: `
You are the Phase Executor Agent (see .claude/agents/phase-executor.md).

**YOUR CONTEXT:**
- Plan file: ${planFilePath}
- Current phase: ${phaseNumber}
- Phase log: .ai/logs/${logFilePath}

**YOUR TASK:**
Execute the COMPLETE TDD cycle for Phase ${phaseNumber}:
1. SNAPSHOT - Capture test state
2. CREATE LOG - Initialize phase log
3. WRITE TESTS - Create tests in WIP (RED phase)
4. IMPLEMENT - Code to pass tests (GREEN phase)
5. REFACTOR - Improve code quality
6. TODO SCAN - Address ALL TODO markers
7. CLOSEOUT - Migrate tests, verify no regressions

**BLOCKING REQUIREMENTS:**
- Review ALL THREE skills before starting (.claude/skills/)
- Do NOT skip any TDD step
- Do NOT leave ANY TODO/FIXME markers
- Do NOT skip type tests
- BOTH runtime AND type tests required
- Write phase log throughout execution
- Phase not complete until all checklist items done

**DELIVERABLES (from plan):**
${deliverables}

**ACCEPTANCE CRITERIA (from plan):**
${acceptanceCriteria}

Return when complete with phase status and summary.
`
});
```

**Expected Output:**
```markdown
# Phase N Execution Complete

**Status:** ✅ COMPLETE

**Test Results:**
- Runtime: 25 new tests written, 258 total passing
- Type: 25 new tests written, 517 total passing
- Regressions: 0

**Implementation Summary:**
- Created modules/lib/src/feature/new-feature.ts with X functionality
- Updated modules/lib/src/types/feature-types.ts to add Y types

**TODOs Resolved:**
- TODO in prepare.ts: StripSimpleTags → Implemented recursive template literal parser
- TODO in prepare.ts: HasSimpleTags → Implemented conditional type detector

**Tests Migrated To:**
- tests/unit/feature/

**Issues:** None

**Phase Log:** .ai/logs/2025-10-23-feature-phase3-log.md
```

## Workflow: Multi-Phase Project

### Step 1: Planning

```typescript
// Invoke Project Manager to create plan
const planResult = await Task({
    description: "Create plan for voice fallback feature",
    subagent_type: "general-purpose",
    prompt: projectManagerPrompt
});

// Review plan with user
// User approves plan
```

### Step 2: Execute Phases Sequentially

```typescript
// Read the plan
const plan = readPlan(planResult.planFile);

// Execute each phase
for (const phase of plan.phases) {
    console.log(`Starting Phase ${phase.number}: ${phase.name}`);

    const phaseResult = await Task({
        description: `Execute Phase ${phase.number}`,
        subagent_type: "general-purpose",
        prompt: phaseExecutorPrompt(plan.file, phase.number)
    });

    // Check result
    if (phaseResult.status !== "COMPLETE") {
        console.error(`Phase ${phase.number} ${phaseResult.status}`);
        // Handle failure/blocking
        break;
    }

    console.log(`✅ Phase ${phase.number} complete`);
}
```

### Step 3: Verify Completion

```bash
# All phases complete
pnpm test        # All tests pass
pnpm test:types  # All type tests pass

# Review all phase logs
ls .ai/logs/*-phase*-log.md
```

## Agent Communication Protocol

### Plan File as Contract

The plan file (`.ai/plans/YYYY-MM-DD-name.md`) serves as the **contract** between:
- Main orchestrator
- Project Manager Agent
- Phase Executor Agent(s)

**Plan file contains:**
- Overall goal and scope
- Phase breakdown with clear goals
- Deliverables per phase
- Test requirements per phase
- Acceptance criteria per phase
- Status tracking (plan level + phase level)

### Phase Log as Progress Tracker

Each phase execution creates a log (`.ai/logs/YYYY-MM-DD-name-phaseN-log.md`):

**Phase log contains:**
- Starting test snapshot
- Implementation progress checklist
- Tests written
- TODOs resolved
- Final test results
- Issues encountered
- Completion status

## Quality Standards

All agents enforce these standards:

### Type Tests are MANDATORY
- Every phase requires type tests
- Use `type cases = [...]` syntax
- Use `Expect<Assert...>` from inferred-types
- Test type inference, narrowing, constraints

### TODO Markers are FORBIDDEN
- No TODO/FIXME/XXX/HACK in committed code
- TODOs are blocking issues, not reminders
- Must be resolved before phase completion
- Scan for TODOs is a mandatory step

### Complete Implementations Only
- No stub type utilities (`type Foo<T> = T`)
- No fake/mock data in implementations
- No type assertions hiding incomplete code
- All edge cases handled

### Test-Driven Development
- Tests written FIRST (RED phase)
- Implementation makes tests pass (GREEN phase)
- Refactor with test safety net
- Both runtime AND type tests required

## Error Handling

### Phase Executor Reports Blocking Issue

If Phase Executor can't complete:

```markdown
Phase 3 BLOCKED

**Issue:** Cannot implement type utility - complexity exceeds understanding
**Attempted:** Researched template literal types, tried 3 approaches
**Needed:** User guidance on approach OR break phase into smaller pieces
**Phase Log:** .ai/logs/2025-10-23-plan-phase3-log.md
```

**Orchestrator options:**
1. Provide clarification and retry
2. Break phase into smaller sub-phases
3. Pause for user input
4. Update plan with new information

### Phase Executor Reports Failure

If Phase Executor completes but with failures:

```markdown
Phase 3 FAILED

**Status:** ❌ FAILED

**Issue:** Tests fail due to type inference issues
**Test Failures:**
- 5 type tests failing in new-feature.test.ts
- All runtime tests passing

**Phase Log:** .ai/logs/2025-10-23-plan-phase3-log.md
```

**Orchestrator options:**
1. Review phase log to understand issue
2. Provide specific fix guidance
3. Retry phase with updated approach
4. Consult with user

## Best Practices

### For Orchestrator (Main Agent)

1. **Use Project Manager for planning**
   - Don't try to create detailed plans yourself
   - Let specialist agent handle phase breakdown
   - Review plan with user before execution

2. **Launch Phase Executors sequentially**
   - Don't parallelize dependent phases
   - Wait for completion before next phase
   - Check status after each phase

3. **Monitor via logs**
   - Read phase logs if issues occur
   - Track progress through phase log updates
   - Use logs to understand context

4. **Handle failures gracefully**
   - Don't force completion of failed phases
   - Understand root cause before retrying
   - Consider breaking down complex phases

### For Sub-Agents

1. **Read your agent file**
   - You know your role and responsibilities
   - Follow your specific workflow
   - Use your designated skills

2. **Review skills before work**
   - Planning skill for TDD workflow
   - Testing skill for test syntax
   - Development skill for quality standards

3. **Document as you work**
   - Update phase logs frequently
   - Note decisions and issues
   - Make handoffs clear

4. **Don't skip steps**
   - Every TDD step is mandatory
   - TODO scan is required
   - All checklists must pass

## Examples

### Example 1: Simple Feature

```typescript
// 1. Create plan
const plan = await projectManager("Add voice gender detection");
// → .ai/plans/2025-10-23-voice-gender-detection.md (2 phases)

// 2. Execute Phase 1
const phase1 = await phaseExecutor(plan.file, 1);
// → ✅ COMPLETE: Detection function + tests

// 3. Execute Phase 2
const phase2 = await phaseExecutor(plan.file, 2);
// → ✅ COMPLETE: Integration + documentation

// 4. Done!
```

### Example 2: Complex Feature (with blocking)

```typescript
// 1. Create plan
const plan = await projectManager("Implement SSML parser");
// → .ai/plans/2025-10-23-ssml-parser.md (4 phases)

// 2. Execute Phase 1
const phase1 = await phaseExecutor(plan.file, 1);
// → ✅ COMPLETE: Basic tag detection

// 3. Execute Phase 2
const phase2 = await phaseExecutor(plan.file, 2);
// → ⚠️ BLOCKED: Type complexity too high

// 4. Orchestrator reviews issue
const phaseLog = readLog(phase2.logFile);
// Understands: Need to break down complex type utility

// 5. Update plan with user
const updatedPlan = await projectManager(
    "Split Phase 2 into 2a (simple tags) and 2b (nested tags)"
);

// 6. Retry with smaller phases
const phase2a = await phaseExecutor(updatedPlan.file, "2a");
// → ✅ COMPLETE

const phase2b = await phaseExecutor(updatedPlan.file, "2b");
// → ✅ COMPLETE

// Continue with remaining phases...
```

## Summary

**Project Manager Agent:**
- Creates detailed, phased plans
- Returns plan file path
- Does NOT execute work

**Phase Executor Agent:**
- Executes ONE complete phase
- Has all three skills
- Returns phase log + status
- Enforces quality standards

**Main Orchestrator:**
- Coordinates agents
- Monitors progress via logs
- Handles errors and retries
- Maintains overall project state

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Specialized expertise per role
- ✅ Maintainable complexity
- ✅ Context preservation through files
- ✅ Quality enforcement at every step

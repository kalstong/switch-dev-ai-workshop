---
name: create-github-issue
description: >
  Create a well-structured GitHub Issue using the gh CLI. Use this skill whenever the user wants to
  create, file, open, or log a GitHub issue — including bug reports, feature requests, tasks, or
  any work item they want tracked. Also trigger when the user says things like "open a ticket",
  "file an issue", "log this as a bug", "we should track this", or describes a problem/idea and
  wants it captured in GitHub. Even if they don't say "issue" explicitly, if the intent is clearly
  to create a trackable work item on GitHub, use this skill.
---

# Create GitHub Issue

Create GitHub Issues with a consistent, readable template using the `gh` CLI.

## Prerequisites

The `gh` CLI must be installed and authenticated. If `gh auth status` fails, tell the user to run `gh auth login` first.

## Workflow

### 1. Understand the request

Read the user's description carefully. Identify:
- What type of work this is (bug, feature, task, improvement, documentation, etc.)
- The core problem or goal
- Any context, constraints, or acceptance criteria they mentioned

### 2. Draft the issue

Write a title and body using this template structure:

```markdown
## Summary
One or two sentences describing the issue clearly and concisely.

## Context
Why this matters — the motivation, background, or how the problem was discovered.
Include reproduction steps here if it's a bug.

## Acceptance Criteria
- [ ] First concrete, verifiable criterion
- [ ] Second criterion
- [ ] ...
```

Adapt the template naturally to the content:
- For bugs, the Context section should include steps to reproduce, environment details, and expected vs actual behavior.
- For features, Context should cover the motivation and any design considerations.
- For small tasks, a shorter Context is fine — don't pad it.
- Acceptance criteria should be specific and checkable, not vague ("works correctly" is bad, "returns 200 for authenticated users" is good).

### 3. Suggest labels

Based on the issue content, suggest appropriate labels from this common set:
- `bug` — Something broken or behaving incorrectly
- `enhancement` — New feature or improvement to existing functionality
- `documentation` — Documentation additions or fixes
- `good first issue` — Simple enough for a newcomer
- `help wanted` — Extra attention or help is needed
- `question` — Needs discussion or clarification
- `refactor` — Code improvement without behavior change
- `testing` — Test coverage additions or fixes

Check which labels actually exist in the repo with `gh label list` before suggesting. Only suggest labels that exist — don't create new ones without asking. If none of the repo's labels fit well, say so and offer to create one.

### 4. Confirm with the user

Show the full draft — title, body, and suggested labels — and ask the user to confirm or request changes. Do not create the issue until the user approves.

Format the preview clearly so the user can scan it:

```
Title: <the title>
Labels: <comma-separated labels>

<the full body in markdown>
```

### 5. Create the issue

Once approved, create with:

```bash
gh issue create \
  --title "<title>" \
  --body "$(cat <<'EOF'
<body content>
EOF
)" \
  --label "<label1>,<label2>"
```

Use a HEREDOC for the body to preserve formatting. After creation, share the issue URL with the user.

## Writing guidelines

- **Titles** should be imperative and specific: "Add rate limiting to /api/auth endpoint", not "Rate limiting" or "Issue with auth".
- **Summary** is for the reader who has 10 seconds — they should understand the issue without reading further.
- **Context** is for the person who picks up the work — give them enough to start without asking questions.
- **Acceptance criteria** define "done" — if all boxes are checked, the issue is resolved.

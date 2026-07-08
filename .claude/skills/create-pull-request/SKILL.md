---
name: create-pull-request
description: Create a GitHub pull request with a consistent format. The PR title always includes the related issue number. Use this skill whenever the user wants to create, open, or submit a pull request, or says things like "open a PR", "submit for review", "create a PR for this issue", or references merging their work. Also trigger when the user finishes implementation work and wants to send it upstream.
---

# Create Pull Request

Create GitHub pull requests with a consistent template using the GitHub MCP server tools. PR titles always reference the related issue number.

## Tools Used

This skill uses the GitHub MCP tools. Load them via ToolSearch before use:
- `mcp__github__create_pull_request` — create the PR
- `mcp__github__list_branches` — verify the branch exists on remote
- `mcp__github__get_file_contents` — check for PR templates in the repo

Use `git` commands via Bash for local operations (branch name, commit log, push).

## Workflow

### 1. Detect the issue number

Get the current branch name with `git branch --show-current` and try to extract the issue number. Common patterns:
- `feat/6-bootstrap-app` → `#6`
- `fix/12-auth-bug` → `#12`
- `issue-42-add-logging` → `#42`
- `6-bootstrap-app` → `#6`

Look for the first number in the branch name that likely represents an issue number. If the branch name doesn't contain a clear issue number (e.g., `main`, `develop`, `my-feature`), ask the user which issue this PR relates to.

### 2. Gather context

Run these commands to understand what's being submitted:

```bash
git log --oneline main..HEAD
git diff main...HEAD --stat
```

Use the commit history and diff to understand the scope of changes.

### 3. Draft the PR

**Title format:** `#<issue> - <short description>`

Keep the description under 60 characters. Use lowercase, imperative mood.

Examples:
- `#6 - bootstrap React + Tailwind + shadcn/ui app`
- `#12 - fix auth redirect loop on expired tokens`
- `#3 - add API endpoint reference to README`

**Body template:**

```markdown
## Summary
Closes #<issue-number>

- <what changed and why, 1-3 bullets>

## Test Plan
- [ ] <how to verify>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

Keep it concise. The summary bullets should explain the "what and why", not list every file touched.

### 4. Confirm with the user

Show the full draft — title, body, and target branch — and ask the user to confirm or request changes. Do not create the PR until the user approves.

### 5. Create the PR

Once approved:

1. Push the branch if it hasn't been pushed yet: `git push -u origin HEAD`
2. Determine the repo owner and name from `git remote get-url origin`
3. Use `mcp__github__create_pull_request` to create the PR with:
   - `owner` and `repo` parsed from the remote URL
   - `title` — the formatted PR title
   - `body` — the PR body from the template
   - `head` — the current branch name
   - `base` — the target branch (usually `main`)
4. Share the PR URL with the user from the tool response.

### 6. Review the PR

After the PR is created, invoke the `review-pull-request` skill to review it. Pass the owner, repo, and pull request number from the creation response. This posts inline review comments on the PR automatically so the user gets immediate feedback on their changes.

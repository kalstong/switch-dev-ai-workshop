---
name: review-pull-request
description: Review a GitHub pull request for correctness, security, and style issues, posting inline comments via the GitHub MCP tools. Use this skill whenever the user wants to review a PR, says things like "review this PR", "check PR #42", "look at this pull request", "review my changes", or provides a PR URL or number to evaluate. Also trigger when another skill (like create-pull-request) delegates a review after PR creation.
---

# Review Pull Request

Review a GitHub pull request and post inline findings as review comments using the GitHub MCP tools. Catches bugs, security issues, and style problems before human reviewers look at it.

## Tools Used

Load these via ToolSearch before use:
- `mcp__github__pull_request_read` — read the PR diff, files, and metadata
- `mcp__github__pull_request_review_write` — create and submit reviews
- `mcp__github__add_comment_to_pending_review` — add inline comments

## Inputs

The skill needs an `owner`, `repo`, and `pullNumber`. These can come from:
- A PR URL (e.g., `https://github.com/owner/repo/pull/42`) — parse owner, repo, and number from it
- A PR number (e.g., `#42` or `42`) — combine with `git remote get-url origin` to get owner and repo
- Context from the create-pull-request skill, which passes these values after creating a PR

If none of these are provided, ask the user.

## Workflow

### 1. Fetch the PR context

Use `mcp__github__pull_request_read` to gather information:

1. `method: get` — get PR metadata (title, description, author, base/head branches)
2. `method: get_diff` — get the full diff
3. `method: get_files` — get the list of changed files with stats

### 2. Analyze the changes

Review the diff with these priorities (most to least critical):

- **Correctness** — bugs, logic errors, off-by-one mistakes, race conditions, missing null checks, incorrect return values
- **Security** — exposed secrets, injection risks (SQL, XSS, command), missing input validation, insecure defaults
- **Completeness** — missing error handling, incomplete implementations, TODOs or FIXMEs left in code, missing tests for new logic
- **Style** — dead code, unnecessary complexity, naming inconsistencies, code that could be simplified

Focus on actionable findings. Skip nitpicks like whitespace or import ordering — those belong in a linter, not a review.

### 3. Post the review

Use the GitHub MCP pending review workflow so all comments appear as a single review (not individual comments scattered over time):

**Step 1 — Create a pending review:**
```
mcp__github__pull_request_review_write
  method: create
  owner, repo, pullNumber
```
Do not pass `event` — omitting it keeps the review pending so you can add comments before submitting.

**Step 2 — Add inline comments for each finding:**
```
mcp__github__add_comment_to_pending_review
  owner, repo, pullNumber
  path: <file path relative to repo root>
  line: <line number in the new version of the file>
  side: RIGHT
  subjectType: LINE
  body: <finding description>
```

Format each comment body clearly:
- Start with a severity tag: `🔴 Bug:`, `🟡 Warning:`, or `💡 Suggestion:`
- Describe the issue in one sentence
- If applicable, show a fix or alternative

For multi-line issues, use `startLine` and `line` to highlight the range.

**Step 3 — Submit the review:**
```
mcp__github__pull_request_review_write
  method: submit_pending
  owner, repo, pullNumber
  event: COMMENT
  body: <summary>
```

Use `COMMENT` as the event — this surfaces findings without blocking the PR. The summary should state how many issues were found and their severity breakdown.

If no issues are found, still submit the review with a body like "Reviewed — no issues found." so there's a record the PR was checked.

### 4. Summarize for the user

After posting the review, give the user a brief recap in the conversation:
- Total findings and breakdown by severity
- The most critical finding (if any)
- Whether the PR looks ready for human review or needs fixes first

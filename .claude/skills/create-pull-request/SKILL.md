---
name: create-pull-request
description: >
  Create a GitHub pull request with a structured title that includes the issue number.
  Use this skill whenever the user wants to create a PR, open a pull request,
  submit changes for review, or says things like "create a PR", "open a pull request",
  "submit this for review", "PR for issue #X", or "let's get this merged".
  Also trigger when the user has finished implementing an issue and needs to
  open a PR — even if they don't explicitly say "pull request".
---

# Create Pull Request

Create GitHub pull requests for the `kalstong/switch-dev-ai-workshop` repository
with a standardized title format that references the related issue number.

## Workflow

### 1. Gather context

Before creating the PR, collect what you need:

- **Current branch**: run `git branch --show-current` to confirm you're not on `main`
- **Related issue**: ask the user which issue this PR addresses (if not already clear).
  Look up the issue to pull context for the PR description.
- **Changes**: run `git log main..HEAD --oneline` and `git diff main...HEAD --stat`
  to understand what changed

If the user is still on `main`, help them create a feature branch first using the
convention `feat/<issue-number>-<short-slug>` (e.g., `feat/6-bootstrap-web-app`).

### 2. Check branch is pushed

Make sure all commits are pushed to the remote:

```bash
git status
git push -u origin <branch-name>
```

Always confirm with the user before pushing.

### 3. Draft the PR

#### Title format

```
#<issue-number> - <short description>
```

Rules:
- Always start with `#` followed by the issue number
- Follow with ` - ` (space-dash-space) as separator
- Keep the description under 60 characters
- Use lowercase, imperative mood: "add", "fix", "update", "remove"

Examples:
- `#6 - bootstrap React + Tailwind + shadcn/ui + Express app`
- `#12 - fix authentication redirect loop`
- `#3 - add presenter notes export to PDF`

#### PR body template

Use this template for the description:

```markdown
## Summary
<1-3 bullet points describing what this PR does and why>

Closes #<issue-number>

## Changes
<Bulleted list of the key changes, grouped by area if needed>

## Test plan
- [ ] <Step to verify the change works>
- [ ] <Another verification step>
- [ ] <Edge case to check>
```

Guidelines:
- The **summary** should give a reviewer enough context to understand the PR
  without reading every line of code. Link the issue with `Closes #N` so it
  auto-closes when merged.
- The **changes** section highlights what's important — don't list every file,
  focus on the meaningful decisions (new dependencies, architectural choices,
  API changes).
- The **test plan** should be actionable steps a reviewer can follow to verify
  the change works. Include edge cases worth checking.

### 4. Confirm with the user

Show the drafted PR (title + body) and ask for confirmation before creating it.
The user might want to adjust scope, add context, or change the test plan.

### 5. Create the PR

```bash
gh pr create \
  --title "<title>" \
  --body "<body>" \
  --base main
```

After creation, share the PR URL with the user.

### 6. Review the PR

Once the PR is created, invoke the `review-pull-request` skill to run a review
on the newly opened PR. This gives the user an immediate sanity check — catching
issues before a human reviewer sees them.

## Branch naming convention

When a branch needs to be created, use this format:

```
<type>/<issue-number>-<short-slug>
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`

Examples:
- `feat/6-bootstrap-web-app`
- `fix/12-auth-redirect`
- `chore/15-update-deps`

## Label guidance

If the repository has labels configured, apply them based on the change type:
- `enhancement` for new features
- `bug` for fixes
- `documentation` for docs-only changes

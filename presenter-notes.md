# AI for Developers — Presenter Notes

## Slide 1: Title

Welcome everyone. This presentation covers the landscape of AI for developers — from foundational concepts to practical tools you can use today. The goal is to give you a mental model for how all these pieces fit together, so you can start building with AI confidently.

---

## Slide 2: What is an LLM?

Start by grounding the audience. Most people have *used* ChatGPT but don't know what's under the hood.

**Key points:**
- An LLM is a neural network trained on massive text datasets to predict the next token
- "Large" refers to the number of parameters — billions of learned weights
- They don't *understand* language the way we do — they model statistical patterns in text at a scale that produces emergent reasoning-like behavior
- Examples: Claude (Anthropic), GPT (OpenAI), Gemini (Google), Llama (Meta)

**Analogy:** Think of it like autocomplete on your phone, but scaled up by a factor of a million — so much scale that it starts to look like reasoning.

---

## Slide 3: How LLMs Think

This is where it gets technical. Keep it accessible — use visuals if possible.

**Key points:**
- **Tokens**: LLMs don't read words — they read tokens (subword units). "understanding" might be 2-3 tokens. This matters because you're billed per token and context windows are measured in tokens.
- **Context window**: The amount of text the model can "see" at once. Claude has up to 200K tokens (~500 pages). Bigger isn't always better — relevant context matters more than volume.
- **Temperature**: Controls randomness. 0 = deterministic (same input → same output). 1 = creative/varied. For code generation, use low temperature. For brainstorming, go higher.

**Demo idea:** Show the same prompt with temperature 0 vs 1 side by side.

---

## Slide 4: Prompting Techniques

This is the most immediately actionable slide. Everyone can use these techniques today.

**Key points:**
- **Zero-shot**: Just ask directly. "Translate this to Spanish." Works for simple tasks.
- **Few-shot**: Give examples first. "Here are 3 examples of good commit messages: [...]. Now write one for this diff." Dramatically improves output quality.
- **Chain-of-thought**: Ask the model to reason step by step. "Think through this problem step by step before giving the answer." Unlocks complex reasoning.
- **System prompts**: Set the persona and constraints upfront. "You are a senior code reviewer. Focus only on security issues."

**Tip for the audience:** The #1 skill in working with AI is learning to write good prompts. It's not magic — it's clear communication.

---

## Slide 5: What is an Agent?

This is where the paradigm shifts from "AI as a tool" to "AI as a collaborator."

**Key points:**
- A traditional LLM call is stateless: prompt in, response out, done
- An agent is an LLM that can *act*: it has a loop of observe → think → act → observe
- Agents can use tools (read files, run commands, call APIs), make decisions, and work through multi-step tasks
- The key difference: agents have *autonomy* within boundaries you set

**Example:** "Fix this bug" to an agent vs. a chatbot. The chatbot gives you advice. The agent reads the code, writes a fix, runs the tests, and iterates until they pass.

---

## Slide 6: Sub-Agents & Orchestration

Build on the previous slide — now we're talking about systems of agents.

**Key points:**
- A single agent hits limits on complex tasks — context gets too long, focus drifts
- Solution: break work into sub-agents, each with a focused job
- **Orchestrator pattern**: A main agent delegates to specialized sub-agents (one researches, one codes, one reviews)
- **Fan-out pattern**: Run multiple agents in parallel for independent tasks
- Sub-agents can have different models, tools, and permission levels

**Real-world example:** Claude Code uses sub-agents — an Explore agent for searching code, a Plan agent for architecture, specialized agents for different task types. Each is optimized for its role.

---

## Slide 7: Skills & Commands

This connects the abstract "agent" concept to concrete developer workflows.

**Key points:**
- **Skills**: Packaged capabilities an agent can invoke — like plugins. A skill bundles a prompt, instructions, and tool access for a specific task (code review, generating docs, creating slide decks)
- **Commands**: User-facing entry points that trigger skills or workflows. Like CLI commands but for your AI assistant
- Skills are composable — a "deploy" skill might internally use a "test" skill and a "build" skill
- This is how you customize AI tools for your team's specific workflows

**Why it matters:** Skills turn a general-purpose AI into a domain expert for your codebase.

---

## Slide 8: MCP — Model Context Protocol

This is newer and more technical. Frame it as "USB for AI."

**Key points:**
- MCP is an open protocol (created by Anthropic) that standardizes how AI models connect to external tools and data sources
- Before MCP: every AI tool had its own custom integration for every service. N×M problem.
- With MCP: tools expose a standard interface, any AI client can connect. N+M problem.
- **Servers** provide tools/resources (e.g., a GitHub MCP server, a database MCP server)
- **Clients** consume them (Claude Code, IDEs, custom apps)

**Analogy:** Before USB, every device had its own connector. MCP is USB for AI — one standard protocol that lets any AI connect to any tool.

**Example:** With a GitHub MCP server, Claude can create PRs, read issues, and manage repos. With a Slack MCP server, it can read and send messages. Same AI, pluggable capabilities.

---

## Slide 9: Tool Use & Function Calling

Closely related to MCP but more fundamental.

**Key points:**
- Tool use is the mechanism that lets LLMs interact with the real world
- You define tools as structured schemas (name, description, parameters)
- The model decides *when* to call a tool and *what arguments* to pass
- The system executes the tool and returns results to the model
- This is what makes agents possible — without tools, models can only generate text

**Key insight for the audience:** The model doesn't execute code itself. It generates a structured request ("call function X with arguments Y"), your code executes it, and returns the result. The model is the brain; tools are the hands.

**Security note:** Always validate tool calls. The model suggests actions; your code decides what's actually allowed.

---

## Slide 10: RAG — Retrieval-Augmented Generation

This solves one of the biggest problems with LLMs: they don't know your data.

**Key points:**
- LLMs have a knowledge cutoff — they don't know about your codebase, your docs, or yesterday's data
- RAG = retrieve relevant context from your data, then pass it to the model with the question
- **How it works**: embed your documents into vectors → store in a vector database → when a question comes in, find similar documents → include them in the prompt
- This is how you build AI that knows about *your* stuff without fine-tuning the model

**When to use RAG vs. fine-tuning:**
- RAG: when your data changes frequently, when you need citations, when you want to control what the model sees
- Fine-tuning: when you need to change the model's *style* or *behavior*, not just its knowledge

---

## Slide 11: AI-Assisted Coding

This is the demo slide — show, don't tell.

**Key points:**
- AI coding tools exist on a spectrum: autocomplete → chat → agents
- **Autocomplete** (Copilot, Cody): inline suggestions as you type
- **Chat** (Claude.ai, ChatGPT): ask questions, get code snippets
- **Agents** (Claude Code, Cursor, Windsurf): autonomous coding — read files, write code, run tests, iterate
- The agent approach is the frontier — it doesn't just suggest code, it *develops* features

**Live demo suggestions:**
1. Show Claude Code fixing a bug end-to-end
2. Show it creating a feature from a natural language description
3. Show it running tests and iterating on failures

**Message to the audience:** These tools don't replace developers — they amplify you. The developers who learn to work *with* AI effectively will be the most productive.

---

## Slide 12: Limitations & Guardrails

Important to be honest about what doesn't work. Builds credibility.

**Key points:**
- **Hallucinations**: Models confidently generate false information. They don't "know" they're wrong. Always verify critical outputs.
- **Bias**: Training data contains biases → model outputs contain biases. Be aware, especially in hiring, medical, legal contexts.
- **Context limits**: Even 200K tokens isn't infinite. Models can lose track of details in very long conversations.
- **Guardrails matter**: In production, validate outputs, set boundaries, use structured outputs, implement human-in-the-loop for high-stakes decisions

**The rule:** Trust but verify. AI is a power tool, not an oracle. You wouldn't ship code without tests — don't ship AI outputs without validation.

---

## Slide 13: AI & Your Career

The slide they'll remember most. Speak directly to their concerns.

**Key points:**
- AI won't replace developers — but developers who use AI will outperform those who don't
- **Skills to invest in now**: prompt engineering, understanding AI architectures, building with AI APIs, evaluating AI outputs critically
- The abstractions are moving up: from writing every line → to describing intent and guiding AI
- Being a great collaborator with AI is a *new skill* — it rewards clear thinking, good communication, and strong engineering judgment
- The best time to learn this is now, at the start of your career

**Encourage experimentation:** Build something with an AI API this week. Use Claude Code on a side project. Break things. The learning curve is gentler than you think.

---

## Slide 14: Closing / What's Next

End with energy and clear next steps.

**Key points:**
- Recap the landscape: LLMs → Prompting → Agents → Tools → MCP → RAG
- The field is moving fast — what's cutting edge today will be baseline tomorrow
- Resources to explore:
  - docs.anthropic.com — Claude documentation
  - modelcontextprotocol.io — MCP specification
  - github.com/anthropics/claude-code — Claude Code
- Start building today — the best way to learn AI is to use AI

**Closing line suggestion:** "The developers who will shape the next decade aren't the ones who know the most about AI — they're the ones who start building with it today. You're already here. Now go build something."

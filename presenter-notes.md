# AI for Developers — Presenter Notes

**Presenter:** Ricardo Silva
**Date:** 2026
**Navigation:** Arrow keys or swipe to advance slides

---

## Slide 1 — Title: AI for Developers

- Welcome the audience and introduce yourself.
- Set expectations: this is a technical overview aimed at developers entering the AI space.
- Mention that the session covers foundational concepts, practical tools, and the current ecosystem.
- Encourage questions throughout — this is a workshop, not a lecture.

---

## Slide 2 — What is an LLM?

- Start with the acronym: Large Language Model.
- Explain that LLMs are trained on enormous datasets (books, websites, code repositories, conversations) to learn statistical patterns in language.
- **Scale:** Models like Claude, GPT-4, and Llama have billions of parameters — think of parameters as the "knobs" the model has tuned during training.
- **Key insight:** LLMs don't "understand" — they predict the most likely next piece of text given everything before it. But this prediction is so good it produces reasoning, creativity, and problem-solving.
- **Capabilities to highlight:** Writing code, answering questions, summarizing documents, translating languages, analyzing data.
- **Analogy:** Think of it like autocomplete on your phone, but scaled up by orders of magnitude.

---

## Slide 3 — How LLMs Work

- Walk through the diagram left to right.
- **Tokens:** Text is broken into chunks called tokens. "Hello world" might be 2 tokens, but "authentication" could be 2-3 tokens. On average, 1 token ≈ 4 characters.
- **Context window:** The maximum number of tokens the model can process at once. Claude's context is up to 200K tokens — roughly a 500-page book. This defines how much information you can feed in a single request.
- **Temperature:** A parameter you control. At 0, the model always picks the most probable next token (deterministic). At 1, it samples more broadly (creative/varied). For code generation, use low temperature. For brainstorming, go higher.
- **Transformer:** The core architecture. Mention "attention mechanism" — the model can focus on relevant parts of the input regardless of distance. No need to go deep into math; just convey that this is what makes LLMs powerful.

---

## Slide 4 — Prompt Engineering

- This is the most immediately actionable slide for the audience.
- **Zero-shot:** Just ask directly. "Translate this to French." Works for simple, well-defined tasks.
- **Few-shot:** Provide 2-3 examples of input → output. The model learns the pattern and applies it. Great for formatting, classification, or when the task is ambiguous.
- **Chain-of-thought:** Adding "think step by step" or "explain your reasoning" dramatically improves accuracy on math, logic, and multi-step problems. The model shows its work.
- **System prompts:** Set the model's role and behavior at the start. "You are a senior Python developer who writes clean, well-tested code."
- **Best practices:** Emphasize being specific about output format (JSON, markdown, bullet points). Providing constraints ("under 200 words", "use only standard library"). Breaking complex requests into sequential steps.
- **Live demo idea:** Show the same question with a vague prompt vs. a well-crafted prompt and compare outputs.

---

## Slide 5 — What is an Agent?

- An agent is the next evolution beyond "chat with an LLM."
- **Key difference:** A regular LLM call is one-shot (prompt in, response out). An agent runs in a loop — it observes, thinks, acts, and evaluates, repeating until the task is complete.
- Walk through the flow diagram:
  1. **Observe** — Read the current state (file contents, error messages, user input)
  2. **Think/Plan** — Decide what to do next
  3. **Act** — Call a tool (run a command, edit a file, search the web)
  4. **Evaluate** — Did it work? Is the task done?
  5. **Loop or finish** — Continue if needed, stop if done
- **Example:** "Fix the failing test in auth.py" — the agent reads the test, reads the source, identifies the bug, edits the file, runs the test, confirms it passes.
- **Autonomy spectrum:** From simple (one tool call) to complex (multi-step research and implementation).

---

## Slide 6 — Agents & Sub-Agents

- When tasks get complex, a single agent hits limits (context size, specialization).
- **Orchestrator pattern:** A parent agent breaks the task into sub-tasks and delegates to specialized child agents.
- **Real-world examples:**
  - A code review agent spawns a security reviewer, a performance reviewer, and a style reviewer — each focuses on their domain.
  - A research agent delegates to a web search agent, a code search agent, and a summarizer.
- **Isolation:** Each sub-agent has its own context window. This means the parent doesn't get overwhelmed with details — it only gets back summaries.
- **Parallelism:** Independent sub-agents can run at the same time, dramatically speeding up complex tasks.
- **Tradeoff:** More agents = more API calls = more cost. Design your agent hierarchy thoughtfully.

---

## Slide 7 — Skills & Commands

- **Skills** are pre-packaged capabilities — think of them as "plugins" for an agent.
  - A skill bundles together: instructions (how to do the task), tool access (what the agent can use), and context (domain knowledge).
  - Examples: code review, data visualization, document generation, security scanning.
  - Custom skills let teams encode their own processes and standards.
- **Commands** are the user interface for triggering skills and workflows.
  - Slash commands like `/review`, `/init`, `/help` are shortcuts that activate specific behaviors.
  - They reduce the need for verbose prompts — the command loads the right instructions automatically.
- **Analogy:** Skills are like functions in a library. Commands are like the CLI that calls them.
- **For the audience:** As developers, you can create your own skills to automate repetitive workflows in your team.

---

## Slide 8 — Tool Use & Function Calling

- This is how LLMs interact with the real world beyond text.
- Walk through the flow:
  1. User sends a prompt that requires external action
  2. The LLM recognizes it needs a tool and emits a structured function call (JSON with name + arguments)
  3. The host system executes the tool (API call, database query, file read/write, shell command)
  4. The result is returned to the LLM as context
  5. The LLM uses the result to formulate its response
- **Key point:** The LLM doesn't execute tools directly — it describes what to call, and the host system decides whether to allow it.
- **Security:** There's always a permission layer. The human (or the host system) controls what the agent can actually do.
- **Examples:** Reading a file, running a test suite, querying a database, calling a REST API, searching the web.
- **Structured outputs:** Tools return structured data (JSON), not just text. This makes the results reliable and parseable.

---

## Slide 9 — Model Context Protocol (MCP)

- MCP is an **open standard** (think of it like USB for AI tools).
- **Problem it solves:** Every AI tool had its own way to connect to data sources. MCP provides one universal interface.
- Walk through the diagram:
  - The MCP server sits in the middle
  - External systems (databases, APIs, file systems, dev tools) connect as MCP resources
  - Any AI client that speaks MCP can access all connected resources
- **Three primitives:**
  - **Tools** — Functions the model can call (run query, create file)
  - **Resources** — Data the model can read (file contents, API schemas)
  - **Prompts** — Reusable prompt templates
- **Why it matters:** Build one MCP server for your internal tool, and it works with Claude, VS Code, any MCP-compatible client.
- **For developers:** You can build MCP servers in Python, TypeScript, or any language. The spec is open source.

---

## Slide 10 — RAG (Retrieval-Augmented Generation)

- RAG solves a fundamental LLM limitation: the model's knowledge has a cutoff date and doesn't include your private data.
- Walk through the diagram:
  1. User asks a question
  2. The system converts the question into a vector (embedding) and searches a vector database for relevant documents
  3. The retrieved documents are injected as context alongside the question
  4. The LLM answers using both its training AND your specific data
- **Embeddings:** Numerical representations of text that capture semantic meaning. "Dog" and "puppy" have similar embeddings even though the words are different.
- **Vector databases:** Specialized stores optimized for similarity search (Pinecone, Chroma, pgvector, Weaviate).
- **Benefits:** Reduces hallucinations (the model has real sources). Keeps answers current (update the database, not the model). Works with proprietary data without fine-tuning.
- **Use cases:** Internal documentation search, customer support, legal document analysis, codebase Q&A.

---

## Slide 11 — The AI Ecosystem

- Quick tour of the current landscape — help the audience orient themselves.
- **Claude (Anthropic):** Strong at reasoning, coding, and long-context tasks. Emphasis on safety and reliability.
- **GPT (OpenAI):** Widely adopted, large ecosystem, strong general capabilities.
- **Gemini (Google):** Multimodal (text, image, video, audio), integrated with Google services.
- **Llama (Meta):** Open-weight — you can download and run it yourself. Great for privacy-sensitive use cases.
- **Mistral:** European company, strong open models, good balance of size vs. capability.
- **Grok (xAI):** Newer entrant, real-time data integration.
- **Hosted vs. Open:** Hosted models (Claude, GPT) are easiest to start with — API call and go. Open models (Llama, Mistral) give you full control but require infrastructure.
- **How to choose:** Consider your requirements for cost, latency, privacy, capability, and licensing. No single model is best at everything.

---

## Slide 12 — Closing: Start Building

- The best way to learn AI is to build with it.
- **Call to action:** Pick one project idea and start prototyping this week.
  - Build a CLI tool that uses an LLM API
  - Create a RAG pipeline over your notes or documentation
  - Experiment with an agent framework
  - Build an MCP server for a tool your team uses
- **AI-assisted development:** Use AI tools (Claude Code, GitHub Copilot, Cursor) in your daily workflow right now — the fastest way to understand the technology is to use it.
- **Stay current:** The field moves fast. Follow release blogs, experiment with new models, join developer communities.
- Open the floor for Q&A.
- Thank the audience for attending.

---

## General Presentation Tips

- **Pacing:** Spend more time on slides 4-6 (prompt engineering, agents, sub-agents) as these are the most practically useful.
- **Demos:** If possible, do live demos after slides 4, 8, and 9 to make concepts concrete.
- **Audience engagement:** Ask the audience about their experience with AI tools early on to gauge the room.
- **Time allocation (60 min suggested):**
  - Slides 1-3: 10 min (foundations)
  - Slides 4-6: 15 min (prompts and agents)
  - Slides 7-9: 15 min (tools, skills, MCP)
  - Slides 10-11: 10 min (RAG and ecosystem)
  - Slide 12 + Q&A: 10 min

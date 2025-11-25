# The Meta-Coding Agent: How I Accidentally Invented the Self-Improving AI Engineer

For the past few months I’ve been working in a way that feels almost like cheating.

I tell my coding agent (Claude 3.5/Opus in Cursor, usually) about a bug or unwanted behavior in my production agent.  
I don’t write a single eval.  
I don’t collect a dataset by hand.  
I don’t manually iterate the prompt ten times while running `eval_suite.py` over and over.

I just say:

“Hey, the assistant is using way too many emojis in production, especially on these five user messages. Fix it.”

And thirty-to-sixty minutes later the problem is solved, a new eval has been automatically written and added to the repo, the prompt is updated, the tests are green, and the behavior is fixed in production.

Sometimes the agent even finds worse examples than the ones I gave it, adds them to the eval set, and hardens the behavior against regression.

I’ve done this for:

- “Stop giving external links, only use internal docs”
- “Stop being overly apologetic when the user is clearly trolling”
- “Make the tone more professional when the user message is longer than 300 words”
- “Never say ‘as an AI language model I cannot…’ – just refuse politely”

Every single time, the coding agent did the entire OODA loop by itself: observe the bad behavior → create examples → measure → change the prompt → measure again → repeat until fixed → commit the new eval so it never regresses.

I kept telling people about this pattern and everyone would nod politely, but I could tell they didn’t really get why this was a big deal. So here’s my attempt to clearly explain what’s actually happening and why it changes everything.

### The Old Way (2023–Early 2025)

1. You notice a problem in production  
2. You (the human) try to reproduce it locally  
3 You manually collect 5–50 examples that trigger the bad behavior  
4 You write an LLM-as-judge prompt or a programmatic eval  
5 You run the eval suite, see the score  
6 You tweak the system prompt  
7 You run the eval suite again  
8 Repeat steps 6–7 until you’re happy or tired  
9 You copy-paste the final prompt into the code and ship  
10 Optional: you add the new eval to the repo so it doesn’t regress (most people skip this because it’s tedious)

This loop takes hours or days for non-trivial problems.

### The New Way (My Current Workflow)

I give a single instruction to my coding agent (the agent that has full read/write access to the repo and can run the production agent locally):

“Users are complaining we use too many emojis. Here are five messages where it’s especially bad. Reduce emoji usage while still okay to use them when the user uses many. Add an eval so this never regresses.”

That’s it.

The coding agent now does:

1. Runs the production agent on the five messages → counts emojis → confirms the problem is real  
2. Generates 20–50 additional queries that might trigger high emoji usage (it literally brainstorms “what kind of user inputs make humans use lots of emojis?”)  
3. Runs the production agent on those → keeps the ones where emoji density is high  
4. Writes a tiny eval (usually a regex + character count + LLM judge fallback)  
5. Starts iterating the system prompt (or retrieval strategy, temperature, etc.)  
6. After every change it re-runs the now ~30-example eval set  
7. Stops when emoji density is ≤ some reasonable threshold AND the responses still look natural  
8. Commits the prompt change + the new eval file with a commit message like “fix: reduce emoji spam (auto-eval added)”

The key insight: the coding agent is already an LLM.  
It doesn’t need a separate “LLM as judge” because it can just look at the output and say “yep, that still has 9 emojis in 50 words, that’s bad.”

It is simultaneously:

- the coder  
- the tester  
- the judge  
- the prompt optimizer  
- the dataset curator

It is a full-stack self-improving loop in a single agent.

### Why This Is Different From Normal Evals

Traditional eval suites are static. You have to anticipate every failure mode in advance.

This system creates ad-hoc, comparative, end-to-end evals on the fly, exactly for the problem you’re facing right now.

Want to reduce hallucinations on medical questions? The agent will:

- Search your logs or knowledge base for real medical questions  
- Run the current agent → save the ones with sources  
- Automatically write a judge that checks “did every factual claim have a citation from the allowed domain?”  
- Iterate the prompt until the judge is happy

You never had to write that judge yourself. And next week when a new failure mode appears, it will write a new judge.

### Technical Implementation (It’s Stupidly Simple)

You only need three things:

1. A coding agent that can:
   - Read/write your repo
   - Run your production agent locally (just import and call the function)
   - Run arbitrary code (for programmatic evals)

2. A very short “meta-prompt” you paste at the top of every session:

```
You are a senior AI engineer with full access to this repository.
Your job is to fix production issues in the agent.
When I describe a problem:
- Reproduce it with the provided examples
- Generate additional examples if needed
- Write an eval that catches this problem
- Iterate the prompt/code until the eval passes
- Commit both the fix and the new eval
Never ask for permission, just do it.
```

3. (Optional but recommended) A tiny Python function like:

```python
def run_production_agent(messages: list[dict]) -> str:
    return chat_completion(messages=messages, system_prompt=CURRENT_SYSTEM_PROMPT)
```

That’s literally it.

I’ve been running this loop for months and it feels like having a 10x AI engineer sitting next to me who never gets tired and never context-switches.

### Naming This Thing

I’ve been struggling to name this pattern. Some options:

- Meta-Coding Agent
- Self-Evaling Coder
- Autonomous AI Engineer
- Eval-Bootstrapping Agent
- The “Fix It” Agent

None of them feel quite right. I’m leaning toward Meta-Coding Agent because it operates one level above the production agent, using the production agent as a tool to evaluate itself.

### Why This Feels Like a Phase Change

We’re moving from:

“Humans design evals → LLMs pass evals”

to

“LLMs create their own evals → LLMs improve themselves → humans just describe the desired outcome”

The human stops being the bottleneck on evaluation design. The human becomes the product manager: “Make it funnier.” “Make it more concise.” “Make it never give tax advice.”

And the agent figures out how to measure and achieve that.

We’re one small step away from fully autonomous agent maintenance.

If you give the agent access to production logs (anonymized), it can even find the problems itself without you telling it. I haven’t turned that on yet… but I will.

### Try It Yourself

Next time you have an annoying agent behavior:

1. Open Cursor / Windsurf / whatever coding agent you use
2. Paste the meta-prompt above
3. Say: “The assistant keeps saying ‘I’m an AI language model’ in refusals. Make it stop while keeping refusals safe. Add an eval.”

Then sit back and watch.

You’ll never want to go back to manual prompt iteration again.

This isn’t a research paper. It’s not complex. It’s just removing the arbitrary wall we put between “coding agent” and “evaluation system.”

The wall was never necessary.

The coding agent can be the evaluation system.

And when that clicks, everything accelerates.

Welcome to the next gear.
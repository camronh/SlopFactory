## Your Coding Agent Should Also Be Your Evaluator

There is a missing layer in the usual AI stack.

We all talk about:

* Production agent
* Evals layer on top
* Coding assistant on the side (Cursor, Claude Code, Codex, etc.)

What I stumbled into recently is a fourth piece:
a **meta-evaluator agent** that lives inside your coding assistant and can actually run your production agent, build evals on the fly, tune prompts, and ship fixes end to end.

It is the difference between:

> “I noticed my agent is using too many emojis, I guess I need to build a custom eval suite for that.”

and

> “I tell my coding agent there is an emoji problem, and it hunts for failing examples, builds a dataset, writes a judge, tunes the prompt, verifies the fix, and snapshots the whole thing into the eval suite.”

This is not just “LLM as a judge.”
It is “LLM as judge, prompt engineer, eval ops engineer, and regression test author,” all wrapped into the same coding agent you already use.

---

## The usual stack, and why it breaks for real problems

The normal architecture looks something like this:

1. **Production agent**
   The thing users talk to. It calls tools, uses RAG, handles workflows, etc.

2. **Evals layer**
   A pipeline that:

   * Has datasets of inputs and expected behaviors
   * Optionally uses an LLM as a judge
   * Gives you scores, dashboards, and regressions

3. **Coding agent**
   Cursor, Claude Code, Codex, whatever you use to:

   * Read your codebase
   * Implement new features
   * Tweak prompts
   * Run tests

This works fine for clean, well structured tasks: “answer this FAQ accurately,” “choose the right tool,” “follow policy X.”

It breaks for problems like these:

* “The agent is using **too many** emojis.”
* “The agent sometimes replies with **external links** instead of internal ones.”
* “Tone is a bit **too casual**, but only in certain contexts.”

You can try:

* A programmatic rule (count emojis, count links)
* A handcrafted LLM judge
* A pairwise ranking setup

But all of these have the same issue:

They live in a **vacuum**.
The judge sees a single message and scores it.

What you really want is something like:

> “Take my current production agent, run these queries, see how it behaves, then change the prompt and see if the behavior moved in the right direction, relative to the original.”

That “relative to the original” piece is exactly what typical eval stacks do not give you easily, especially for weird, ad hoc issues.

---

## The idea: a meta-evaluator agent

The idea is:

Use your coding agent as a **stateful meta-evaluator** that can:

1. Run your production agent with arbitrary inputs
2. Inspect the outputs
3. Edit code and prompts directly
4. Build tiny, targeted datasets out of real failures
5. Spin up a quick LLM-as-judge or programmatic check
6. Iterate until the problem is fixed
7. Persist the dataset and judge into your “official” eval suite

You give it a single instruction like:

> “Our guest-facing agent is using too many emojis. Fix that behavior without making the agent completely dry, and keep emojis if the guest is using them first.”

Then the meta-evaluator agent does the rest.

---

## Example 1: The “too many emojis” problem

Take the emoji case.

You notice in production that the agent is a little cringe. Every response has multiple emojis. You might like some emojis, but not this many, and not in every context.

Traditionally you would have to:

* Collect real conversations where the emoji usage feels wrong
* Label them
* Design an evaluation: programmatic counting, or LLM judge
* Tweak the system prompt or style prompt
* Re-run the eval suite until scores look right

With a meta-evaluator agent, the workflow becomes:

1. **Describe the issue once**
   You tell your coding agent:

   * What the problem is (too many emojis)
   * Roughly what “good” looks like
   * Optionally a few queries that tend to trigger the problem

2. **Reproduce the issue**
   The coding agent calls your production agent with those queries:

   * Logs the outputs
   * Measures emoji usage
   * Confirms “yes, this is a reproducible issue”

3. **Build an ad hoc dataset**
   It turns those runs into a tiny dataset:

   ```json
   {
     "input": "Guest query here",
     "original_output": "Response with too many emojis",
     "metrics": {
       "emoji_count": 7,
       "emoji_per_100_chars": 12.0
     }
   }
   ```

4. **Draft a judge**
   It writes either:

   * A programmatic heuristic (emoji count, but with context rules)
   * Or a small LLM-as-judge prompt like:
     “Score this reply from 1 to 5 based on whether emoji usage feels natural, given the guest’s tone.”

5. **Edit the prompt**
   Now it edits the actual production prompt in code:

   * Adds style guidance about emojis
   * Adjusts examples
   * Maybe splits system prompts for different channels

6. **Re-run and compare before vs after**
   Crucially, it does **comparative** evaluation:

   * Original outputs vs new outputs for the same inputs
   * Checks “did emoji usage move toward the target behavior”
   * Makes sure we did not destroy warmth or friendliness

7. **Snapshot into the real eval suite**
   Once the results look good:

   * The agent writes these examples plus the judge into your main eval dataset
   * Now “emoji sanity” is a regression guard forever

You did not design the judge by hand.
You did not format JSON by hand.
You did not manually wire an eval pipeline.

You just described the problem and inspected the final PR.

---

## Example 2: The “only internal links” problem

A second example shows the other superpower: **discovery**.

Problem:
You want your agent to only return internal URLs, never external ones.

The issue: you do not even know what user queries cause external links. You just see a couple in the wild and think “this is bad.”

The meta-evaluator agent can:

1. Hit your **knowledge base** directly to find documents that have external links.
2. From those, infer **queries** that are likely to trigger those documents through RAG.
3. Call the **production agent** with those queries until it actually emits external links.
4. Turn those runs into a dataset of “bad” behavior.
5. Write a tiny evaluator that checks responses for external domains.
6. Tune prompts, tool configs, or post processing to block external links.
7. Re-run the same queries and verify that:

   * External links disappeared
   * Answers are still useful
8. Persist the dataset and evaluator into your official evals.

This is not a general “benchmark” that you would share on the internet.
It is a hyper specific, high leverage, local evaluation that only exists because your meta-evaluator was able to poke at your system end to end.

---

## What the meta-evaluator is actually doing

If you look at it structurally, the meta-evaluator agent is doing a repeatable loop:

1. **Understand the task**
   Parse your natural language description of the problem and constraints.

2. **Wire a harness around the production agent**
   Use existing SDK or HTTP endpoints to:

   * Call the agent with arbitrary inputs
   * Capture outputs and metadata

3. **Find or generate failing cases**

   * Use provided queries, or
   * Search the KB and construct plausible queries, or
   * Mine logs if you expose them

4. **Turn raw failures into a dataset**

   * Store inputs, outputs, and any relevant context
   * Compute simple metrics when possible

5. **Create an evaluation**

   * Programmatic metrics for simple things (links, emojis, length)
   * LLM judge prompt for nuanced things (tone, helpfulness)

6. **Modify the system**

   * Edit prompts in code
   * Adjust tool schemas
   * Tweak routing logic

7. **Re-run and compare**

   * Run the same dataset before and after
   * Compare metrics and judge scores
   * Ensure behavior improved along the axis you care about

8. **Freeze artifacts**

   * Save dataset files
   * Save judge definition
   * Optionally register them in your main eval runner

9. **Self-check the judge**
   This is an important one. Because the meta-evaluator is aligned to the whole task, it can:

   * Spot when the judge is rewarding obviously wrong behavior
   * Correct or re-prompt the judge
   * Treat the judge as just another component to optimize

This is not a separate MLOps service.
It is literally your coding agent orchestrating all of this.

---

## Why this is not just “LLM as a judge”

There are a few key differences.

1. **Not in a vacuum**
   Normal judges see one example at a time.
   The meta-evaluator sees:

   * The original behavior
   * The modified behavior
   * The evolution of the prompt
   * The actual codebase and architecture

2. **Comparative by default**
   Pairwise evals usually ask “which answer is better.”
   Here the question is closer to:

   * “Did this change move us closer to the behavior we want, on this slice of traffic.”
     That is a different mindset.

3. **Ad hoc and local**
   Many of the highest leverage fixes are weirdly specific:

   * That one channel with too many emojis
   * That one template that leaks external URLs
   * That one edge case for refunds
     You will never build a general benchmark for these.
     A meta-evaluator shines exactly on these local problems.

4. **Judge alignment is part of the job**
   The meta-evaluator does not assume the judge is correct.
   It can inspect the judge’s decisions and say:

   * “You gave this a 5, but this still has external links.”
   * “You marked this as low emoji usage, but it clearly overuses them relative to the guest.”
     Then it updates the judge.

5. **Prompt automation by default**
   You get DSPy style benefits without committing to a full training stack.

   * The agent proposes prompt edits
   * Evaluates them
   * Keeps iterating to improve the metric you care about

---

## How this changes my workflow

Before this pattern, fixing subtle behavior issues looked like:

1. Notice a problem in production
2. Manually hunt for failing examples
3. Hand build a dataset
4. Hand design a judge or metric
5. Hand wire an eval runner
6. Manually tweak prompts in the repo
7. Rerun the evals
8. Repeat until happy

Now it looks closer to:

1. Notice a problem in production
2. Open my coding agent and describe the problem clearly
3. Let the meta-evaluator do the rest
4. Review:

   * The new dataset it discovered or built
   * The judge definition
   * The prompt or code changes
   * The before and after metrics
5. Approve and ship

It basically turns “eval ops plus prompt engineering” into a task I describe, not a pipeline I maintain by hand every time.

---

## Why this matters

A few reasons this feels like a real shift for me:

* It **collapses layers** of the stack:
  Coding assistant, evaluator, judge author, dataset builder, and prompt tuner become one agent.

* It **matches how we actually work**:
  Real work is not “run this benchmark every day.”
  Real work is “this specific behavior is wrong, please fix it and make sure it does not regress.”

* It **scales across issues**:
  Once the pattern exists, you can reuse it for tone, safety, formatting, link policies, RAG retrieval quality, and more.

* It **keeps humans in the right loop**:
  I still review the diffs, the datasets, and the scores.
  I just do not spend hours wiring glue code and one off scripts.

---

## Where this goes next

Some directions that feel interesting:

* Generalize the harness so the meta-evaluator can plug into any agent, not just one product.
* Formalize the artifacts it produces, so every “fix session” leaves behind a clean dataset plus judge.
* Add basic scheduling, so it can re-run these tiny eval suites on new models or new versions.
* Explore how far this goes toward true RL on top of production behavior, without a full RL stack.

For now, I am already using this as a day to day tool:

I describe a behavior issue once, and my coding agent acts as a meta-evaluator that:

* Finds failing examples
* Designs a small eval for that behavior
* Modifies prompts or code
* Verifies that the change helps
* Freezes the result into my eval suite

That is the core idea.
Your coding agent should not just write code.
It should observe your agent, judge it, and help it grow up.

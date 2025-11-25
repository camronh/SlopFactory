import { GalleryItem, Category, ModelId } from '../../../types';

import claudeOpus45Output from './claude-opus-4.5.md?raw';
import claudeOpus41Output from './claude-opus-4.1.md?raw';
import gpt51Output from './gpt-5.1.md?raw';
import grok41Output from './grok-4.1.md?raw';
import geminiProOutput from './gemini-3-pro-preview.md?raw';

export const test: GalleryItem = {
  id: 'blog-1',
  slug: 'meta-evaluator-blog',
  title: 'Meta-Evaluator Pattern Blog Post',
  description: 'A blog post explaining how coding agents can act as meta-evaluators for AI product development.',
  prompt: `Okay, so I've had kind of a breakthrough lately, and it's very, very, very hard for me to explain the concept in understandable English, but man, it's really revolutionary in my opinion. I kind of want to do a blog about it just because that's how I think would be the best way to explain the concept. But yeah, let me just dive into it, and then we can refine it a little bit more. So the concept is around having this kind of meta-evaluator agent in your coding agent. And so if you're building an AI product, you have your evals layer, which is like right above your agent. And then recently, my breakthrough has been this agent that's kind of a layer above that. And so that would be your coding agent, like Codex, or Cursor, or Cloud Code, or whatever. Like the coding agent you have that's helping you write the code. The breakthrough is having that agent work as kind of an evaluator at the same time as being a coding agent. See, like even now I'm doing a bad job of explaining it. So let me just talk about the use case. So if you're a typical AI engineer, you're building an AI product, you would build the agent underneath. So let's call that the production agent, just to simplify it. Then you have evals on top of that. And so evals, let's assume for now, we're going with a use case that requires an LLM as a judge. So let's just go with the use case of reducing the amount of emojis. So let's say you have an AI product in production, but it's using too many emojis. So typically, how would you solve this? You couldn't really do evals, because then you'd have to have an LLM as a judge, specifically for detecting emojis. Or you can use it programmatic and have like a rule-based system where you have a certain amount of emojis or certain amount of emojis per character or something like that, which is also not a great fit, you know? Like if someone comes into the chat and they use a bunch of emojis, shouldn't the agent use emojis back? You know? So it's only like when it's appropriate and in a certain use case. So let's say I have these five prompts, where if we go into the agent and you say, any of these five things, since I've tried them in production, I don't like how many emojis they use, right? You couldn't really do an eval for that. So what do you do? Well, with my system, you have this kind of meta-evaluator. So your Claude code or whatever, let's call it the coding agent, your coding agent would have the ability to run your production agent with certain queries and inputs. And so what you could task your agent, your coding agent, to do is first try the queries that I tried. So you can see how many emojis there are. Then change the prompt. You should give your agent the ability to change the prompts. It's in the code anyway, it's just a code change. Give the agent the ability to change the prompt and then try those same queries again. And so with a single prompt of telling the agent what the issue is, that you're getting too many emojis, your agent is able to whip up a quick like ad hoc evaluation because it in itself can act as the LLM as a judge by invoking the agent with the queries, then making the changes, and re-evaluating. And now there's a ton of benefits to this, which is, first of all, you can do like your judge is not in a vacuum. You know, if you write an LLM as a judge, it takes in the certain content and it produces the score in a vacuum. There's not really a way to say, did this reduce the amount of emojis from the original request? That's not really an easy evaluation to write. You know, it kind of falls into pairwise evaluation, but not really because pairwise, you pick the better one. We're not really looking for the better one, we're looking for the one that solves the problem better. So it's kind of like this ad hoc evaluation that doesn't exist. You know, you couldn't just add it to a data set. And so you have these kind of comparative evals, you have ad hoc evals, so there you don't have to write a bunch of code to get these evals running and all that stuff. And if you want, at the end, like once you get things working, or even in the middle of the process, like once it sees that the issue is easy to replicate and replicates with these certain queries, maybe it adds those to the data set of evals in another use case, maybe a different use case. And so you could freeze that behavior. And then the good thing about that is your coding agent could also, like let's say it whips up a small data set, whips up a small LLM as a judge, runs the evaluations. It can also, since it has this kind of meta understanding, it can see if the judge is aligned. So if the judge is giving scores that the coding agent wouldn't give, it can correct the judge because it's aligned kind of to the full task end to end versus being in a vacuum like the judge. So it unlocks that capability too. And it can iterate, so like it can keep on trying prompts, so you get like DSPY benefits of like this prompt automation. Yeah, it's been insanely helpful for me, but I just I'm having a really hard time conceptualizing it so that I can explain it to other people. I don't think they really get the gravity of this, you know. Before this, I would have to, yeah, like I said, I would have to do all kinds of stuff. I'd have to write evaluations, I'd have to write data sets, I'd have to, you know, build a judge, run the suite, change the prompt, run the suite again until I get good results, and then ship. But like this thing can do all that end to end, and it can build the data set for me. So like if I say I have an issue, it can jump in and like if I don't give it specific inputs that would produce the issue, it can dig around and find those itself. Like I had one scenario where we need to prevent the agent from providing external links and only provide internal links. Well, I don't know what queries make the agent provide external links, so I just gave the task directly to my agent. It hit the knowledge base directly until it found results that included external links. Then it hit the agent, the production agent, with queries that it would expect to get an external link in the response, and then kept trying until it actually did get external links in the response. Then it added all those to a data set, wrote a quick evaluator that checks for external links, and then started working on the prompt, and then solved it, and then shipped it. Like it did the entire thing for me, and it's great work because it's automation as far as prompting. I'm a big fan of prompt automation. I don't believe that humans should be prompt engineering much longer just because of the fickleness of these prompts. So yeah, like I said, just a huge revolution, but I just can't figure out how to explain it in a clear, like, explainable way so that people really understand the impact of this. You write the blog`,
  category: Category.CREATIVE,
  isImage: false,
  variants: [
    {
      modelId: ModelId.CLAUDE_OPUS_45,
      output: claudeOpus45Output,
      timestamp: Date.parse('2025-11-25T12:00:00')
    },
    {
      modelId: ModelId.CLAUDE_OPUS_41,
      output: claudeOpus41Output,
      timestamp: Date.parse('2025-11-25T11:30:00')
    },
    {
      modelId: ModelId.GPT_51,
      output: gpt51Output,
      timestamp: Date.parse('2025-11-25T11:00:00')
    },
    {
      modelId: ModelId.GROK_41,
      output: grok41Output,
      timestamp: Date.parse('2025-11-25T10:00:00')
    },
    {
      modelId: ModelId.GEMINI_PRO,
      output: geminiProOutput,
      timestamp: Date.parse('2025-11-25T09:00:00')
    }
  ]
};

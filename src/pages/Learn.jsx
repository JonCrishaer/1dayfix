import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  BookOpen, Zap, ArrowLeft, CheckCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const lessons = [
  {
    id: 'cycles',
    title: 'The 4 Cycles of Progress',
    description: 'Understand the non-linear nature of growth and productivity',
    duration: '20 min',
    xp: 200,
    sections: [
      {
        title: 'Why Progress Isn\'t Linear',
        content: `Most people think progress is a straight line. You work hard every single day, and you make consistent gains. But that's not how the human brain works. That's not how growth works.

Think about fitness. You don't go to the gym for 10 years and build the same amount of muscle every year. In your first year, you build a lot because you're new—your body responds quickly to stimulus. But then you hit plateaus. You need more intensity. You bulk and cut. Life happens and you get thrown off for a year. The next year you regain motivation and you're hyper-disciplined, gaining more in year 10 than you did in year 3.

The same holds true for productivity, business, relationships, and every area of life that matters.

Progress comes in CYCLES. And understanding these cycles is the difference between someone who burns out after 3 months and someone who builds a billion-dollar company.`
      },
      {
        title: 'Cycle 1: Perplexity — Being Lost',
        content: `This is the first cycle. Perplexity is feeling lost and confused.

You're at the start of the story. You haven't set the scene or found your mission. You don't know what to do next. You're overwhelmed by options. Or you're stuck in a job you hate. Or you're scrolling social media because you don't know what else to do.

Most people get TRAPPED in this cycle. And here's the dangerous part—they don't even realize it.

The moment they sense boredom, they fill it with distraction. TikTok. YouTube. Texting friends. Refreshing email. The brain is addicted to stimulation, so it tricks you into thinking you're being productive. You're not. You're just numb.

The perplexity cycle is uncomfortable, but it's necessary. You need to feel lost to know that you need to find something.

HOW TO ESCAPE: The only way out is through BOREDOM. You have to sit with discomfort. Turn off notifications. Close the apps. Let your mind get bored enough that it starts asking real questions: "What do I actually want? What problem do I want to solve? Who do I want to become?"

Once curiosity sparks, you've entered the next cycle.`
      },
      {
        title: 'Cycle 2: Curiosity — Exploring',
        content: `Now you've identified a problem. Maybe it's the job that's holding you back. Maybe it's your health. Maybe it's your skills. You become CURIOUS about solutions.

At this point, your mind sees a pivotal transformation of perspective. You start noticing information everywhere that relates to your new interest. You'll see YouTube recommendations about business. You'll see ads for courses on your problem. Your brain is now TUNED to this frequency.

You start exposing yourself to new environments. You join Discord communities. You follow people on Twitter. You buy courses (sometimes too many). You read books. You experiment.

Here's the key: SHINY OBJECT SYNDROME IS GOOD in this phase. Try everything. Don't worry about picking one thing. Your job is to explore and let ideas accumulate in your brain.

This phase is about QUANTITY OF INPUTS, not quality of execution. You're looking for the thing that makes you unable to put it down. The thing you think about before bed. The thing you wake up thinking about.

Most people try one thing, it gets hard, and they quit. Or they jump to the next shiny object within a week. But in the curiosity cycle, jumping around is EXACTLY what you should do. You're searching for your north star.

This phase typically lasts 1-3 months. When you find the thing, you'll KNOW.`
      },
      {
        title: 'Cycle 3: Intensity — All In',
        content: `The climax of the story.

You've found your thing. And now you go ALL IN.

The 3-6 months blur together. You're in pure flow state. You work 12 hours a day without thinking about it. You forget to eat. You wake up early, work late, and do it all again. It's the most fulfilling and exhausting thing you've ever done.

In fitness, this is when you're disciplined with diet and training. Every decision centers around the goal. In relationships, it's the honeymoon phase—all you want to do is be with that person. In business, it's building and launching—you're obsessed.

THIS IS WHEN YOU PULL 12-HOUR DAYS. Not before. Not during the other cycles. NOW.

But here's what most people get wrong: they try to sustain this forever. They burn out. They lose relationships. They destroy their health. They think discipline means never stopping.

Wrong.

A lion hunts intensely, then rests completely. That's the sustainable model.

You MUST know when to pull out of the intensity cycle. You also MUST know how to transition out without relapsing to old habits.

Don't push the bulk until you're fat. Don't cut until you're scrawny and losing muscle. Don't get so obsessed with work that you become desperate and needy with people. Don't sacrifice your health for short-term revenue gains.

The intensity cycle is about making MAXIMUM progress in a SHORT WINDOW. It's not about sustaining maximum effort forever.`
      },
      {
        title: 'Cycle 4: Consistency — Maintaining Gains',
        content: `After intensity comes consistency.

NO, consistency is not everything. Consistency is a tool to MAINTAIN progress, not MAKE progress.

Stagnation isn't maintaining progress. Stagnation is death.

In the consistency phase, you drop down to 4 hours of high-priority work per day. Enough time to experiment for the next intensity phase. Enough time to maintain the higher baseline you just created.

For content creation, consistency means posting regularly. But if you're just posting the same thing over and over with no innovation, you'll plateau. The consistency cycle is when you maintain your growth while staying fresh.

For business, consistency is when you hit a new revenue baseline and you execute the core tasks that maintain it. You don't try to 10x again immediately. You consolidate. You build systems. You reinvest in infrastructure.

For fitness, consistency is when you maintain muscle mass after the bulk. You're not trying to add 20 pounds. You're maintaining what you built.

Here's the critical insight: You have NOTHING to be consistent on if you haven't gone through the other cycles.

If you're stuck in perplexity, consistency won't help. You need curiosity. If you're in the middle of intensity, consistency will kill your momentum. You need to stay intense.

The consistency cycle is about bringing your baseline UP and staying there until you're ready for the next intensity cycle.`
      },
      {
        title: 'Putting It All Together',
        content: `So the model looks like this:

1. PERPLEXITY (months 1-3): You're lost. You sit with boredom. Your mind gets curious.

2. CURIOSITY (months 3-6): You explore everything related to your interest. You try 10 different things. You read, you experiment, you join communities.

3. INTENSITY (months 6-12): You find THE ONE THING and you go all in. You work harder than you ever have. You make more progress in 6 months than most people do in 3 years.

4. CONSISTENCY (months 12-18): You've achieved something. Now you maintain it. You consolidate. You optimize. You stay at this higher baseline.

Then the cycle repeats. You get curious about a NEW problem. You explore. You find the next thing. You go intense. You maintain.

Over 5-10 years, each cycle pushes you to a new baseline. Each cycle is shorter but more impactful than the last because you're building on previous progress.

This is how you transform your life. Not by grinding 12-hour days forever. But by understanding that progress comes in SEASONS. Each season has a purpose. Respect the season you're in.`
      }
    ]
  },
  {
    id: 'focus-blockers',
    title: 'Remove Your Focus Blockers',
    description: 'Identify and eliminate what prevents deep work',
    duration: '18 min',
    xp: 180,
    sections: [
      {
        title: 'Why You Can\'t Focus',
        content: `Let's be honest. You probably can't focus for more than 20 minutes without your mind wandering.

It's not a character flaw. It's not because you lack discipline. It's because your environment, your body, and your digital life are all conspiring against focus.

The moment you sit down to work on something important, a notification pings. Your stomach rumbles. You remember an email you didn't send. Your leg gets itchy. A browser tab catches your eye.

These aren't distractions—they're FOCUS BLOCKERS.

A focus blocker is anything that prevents you from entering and maintaining a state of deep focus. Some are digital. Some are physical. Some are internal.

And here's the key: You can't just "willpower" your way through them. You have to REMOVE them.

Your brain has limited resources. If you're constantly fighting distractions with willpower, you'll exhaust yourself. Instead, design your environment so that focus is the path of least resistance.`
      },
      {
        title: 'Digital Blockers — The Biggest Problem',
        content: `Your phone is a focus blocker.

Not in a judgmental way. It's literally designed to be one. Billions of dollars have been spent by the smartest engineers in the world to make your phone as addictive as possible.

Every notification is a small dopamine hit. Every social media feed is engineered to keep you scrolling. Every app is optimized to steal your attention.

And the worst part? You think you're being productive.

You check Slack "just for a second." You refresh email "just to see." You open TikTok "just for 3 minutes." Before you know it, 45 minutes have passed and you've accomplished nothing.

THE FIX: Physical separation. Put your phone in another room. Not on silent. In another room. Out of sight, out of mind.

Your browser is another focus blocker. Email, Twitter, Reddit, YouTube, news sites—they're all designed to capture your attention.

THE FIX: Use website blockers during focus hours. Apps like Freedom, Cold Turkey, or even just browser extensions that block sites for specific time windows.

Netflix, Discord, Slack—these are all focus blockers if you're using them during deep work.

THE FIX: Close them. Completely close them. Don't minimize. Don't put them in the background. CLOSE them.

The rule is simple: If it's not directly related to the work you're doing, it shouldn't be visible or accessible during focus time.`
      },
      {
        title: 'Environmental Blockers — Your Space Matters',
        content: `A messy workspace is a focus blocker.

When your desk is cluttered with papers, coffee cups, old notes, and random objects, your brain is processing all of that visual information. It's a tiny drain, but when you're trying to do your best thinking, it adds up.

THE FIX: Clean your desk before every focus session. Not perfect. Just clear. Remove everything that's not necessary for the work.

Noise is a focus blocker. If you live in a city, if you have roommates, if there's construction outside, if there's someone watching TV in the next room—these all steal focus.

THE FIX: Use noise-canceling headphones. Even if there's no music playing, the act of putting them on signals to your brain that it's time to focus. And they block ambient noise.

Poor lighting is a focus blocker. If your workspace is dim or too bright, it strains your eyes and triggers fatigue.

THE FIX: Get good lighting. Natural light is best. If that's not possible, get a bright desk lamp. Your eyes should be comfortable.

Temperature is a focus blocker. If you're too hot or too cold, your body is fighting the environment instead of doing work.

THE FIX: Adjust the temperature or dress appropriately. It's a small thing but it matters.`
      },
      {
        title: 'Physical Blockers — Your Body Matters',
        content: `Hunger is a focus blocker. You can't think clearly when your stomach is empty. Your brain needs fuel.

THE FIX: Eat something substantial BEFORE your focus session. Not candy. Not coffee. Real food with protein and carbs. This provides sustained energy.

Dehydration is a focus blocker. A dry mouth and dry brain can't focus.

THE FIX: Have water at your desk. Drink throughout the session.

Sleep deprivation is the mother of all focus blockers. If you didn't sleep well, you can forget about deep focus for the day.

THE FIX: Sleep 7-8 hours. Non-negotiable. This is more important than working late.

Caffeine addiction is a tricky blocker. You become dependent on it, and without it you can't function. But too much and you're jittery and anxious.

THE FIX: Use caffeine strategically. Have coffee AFTER eating something. Don't drink it on an empty stomach. Limit to 1-2 cups before 2pm.

Physical tension—tight shoulders, sore neck, bad posture—is a blocker. Your body is uncomfortable so your mind is half-focused on the discomfort.

THE FIX: Stretch before your session. Sit properly. Stand up and move around between focus blocks.`
      },
      {
        title: 'Mental/Emotional Blockers — The Hardest Ones',
        content: `Fear is a focus blocker. Fear of failure, fear of judgment, fear of not being good enough. These create resistance that keeps you from even starting.

THE FIX: Acknowledge it. Don't try to eliminate fear. Just acknowledge that it exists, and then do the work anyway.

Perfectionism is a focus blocker. You're so worried about getting it right that you can't move forward.

THE FIX: Set a time limit. You're not trying to create a masterpiece. You're trying to make progress. Done is better than perfect.

Unclear goals are a focus blocker. If you don't know what you're trying to accomplish, you can't stay focused.

THE FIX: Before every session, write down EXACTLY what you're trying to accomplish. Not "work on the project." But "write 1000 words on chapter 3" or "create mockups for the homepage."

Overwhelm is a focus blocker. When the task feels too big, your brain shuts down.

THE FIX: Break it into smaller pieces. Focus on just the next one. You don't have to build the whole product. Just the next feature.`
      },
      {
        title: 'Create Your Focus Fortress',
        content: `Once you understand your focus blockers, you can design a "focus fortress"—an environment and routine optimized for deep work.

It looks like this:

BEFORE YOU START:
- Phone in another room
- Computer browser cleaned of distractions
- Desk cleared and organized
- Lighting adjusted
- Temperature comfortable
- Stomach fed
- Water at hand
- Clear 1-3 hour block of uninterrupted time
- Exact task written down

DURING FOCUS:
- Headphones on (music or silence)
- Notifications silenced
- Email/Slack closed
- Only the work in front of you

AFTER FOCUS:
- Move around
- Drink water
- Take a real break
- Record what you accomplished

This is not a complex system. It's just removing obstacles so that focus becomes the path of least resistance.

Most people try to force focus through willpower. You can't. But you can remove the things that prevent it.`
      }
    ]
  },
  {
    id: 'deep-work',
    title: 'The Deep Work Routine',
    description: 'Structure your day for maximum output',
    duration: '22 min',
    xp: 220,
    sections: [
      {
        title: 'The One Thing You Need to Know',
        content: `Your mind is a supercomputer. Your attention is the RAM.

RAM—random access memory—is one of the most important parts of a computer. It determines performance. More programs and browser tabs open? Slower performance.

This is identical to your focus.

Humans can consciously process around 50 bits of information per second. Compare that to the 11 million bits your brain processes unconsciously from skills you've learned.

That 50 bits per second is incredibly precious. You have limited conscious bandwidth.

In your lifetime, that adds up to about 125 billion bits of conscious information.

125 billion.

That's your ticking time bomb. You either invest those conscious bits into building a better future, or you let distractions clog them up like browser tabs on a dying computer.

For most people, on an average day, those 125 billion bits are being split between:
- Anxious thoughts about the future
- Regrets about the past
- An internal cry to break out of their conditioned way of living
- A chaotic list of mixed-priority tasks

The moment they open their phone in the morning, those precious bits get scattered.

The deep work routine is about CONSOLIDATING your conscious attention on what matters most.`
      },
      {
        title: 'Principle 1: Low Entropy Work',
        content: `Entropy is the measure of disorder.

The Second Law of Thermodynamics says that in any natural process, total entropy tends to increase over time UNLESS effort is put into maintaining order.

This applies to your mind.

If you don't put effort into maintaining your mental clarity, you will slowly drown in chaos. You don't stay the same. You dig yourself deeper into a hole.

This is called PSYCHIC ENTROPY. Your mind tends toward disorder.

If you don't clean your mental room, it turns into a disgusting troll cave. You become overwhelmed. Anxious. Depressed. Scattered.

The goal of the deep work routine is to do your BEST work when entropy is LOW.

When is entropy low? At the beginning of the day. Before your mind gets cluttered with a thousand micro-decisions and notifications.

THE FIX: Do your most important work FIRST THING. Before email. Before Slack. Before anything else.

For most people, the first 2-4 hours of the day is prime time. Your brain is fresh. Your willpower is high. Your focus is naturally strong.

Protect this time. Guard it like a dragon guards gold.

This is where you do deep work. This is where you make real progress.`
      },
      {
        title: 'Principle 2: Quantify Your Most Important Tasks',
        content: `Your most important tasks are not maintenance. They are the ones that MOVE THE NEEDLE toward the life you're building.

They're the ones that if not completed, you'll stagnate or move backward.

But here's the problem: Most people don't know what their MITs are. They have a list of 20 things that need to be done. Everything feels important. Everything feels urgent.

But you can't do 20 things with excellence.

THE RULE: Pick 2-3 most important tasks per day. That's it.

Not 5. Not 10. Two or three.

These are the tasks that demand the most mental energy. These are the deep work tasks.

Now here's the critical part: QUANTIFY THEM.

Instead of "write my newsletter," have "write 1000 words."
Instead of "work on the product," have "create the login page."
Instead of "get healthy," have "do 30 minutes of strength training."

Quantification does three things:
1. It clarifies exactly what you need to accomplish
2. It creates a feedback loop so you can see progress
3. It prevents your mind from wandering because you have a clear target

Most people fail at deep work because their goals are vague. You can't maintain focus on "work on my business." But you CAN focus on "write 3 product pages."

That clarity triggers flow state.`
      },
      {
        title: 'Principle 3: The Challenging Deadline',
        content: `Here's a fact: Your brain has limited capacity for deep, focused work each day.

Research suggests it's 3-5 hours of REAL deep work. Not distracted work. Real, intense focus.

Most people try to stretch this. They think if they work 8-10 hours, they'll get more done. But after 3-5 hours, the quality drops. You're moving the mouse but not actually thinking deeply.

Better approach: TIME BLOCKS.

For each of your 2-3 most important tasks, assign a specific time block. 60-90 minutes usually.

Here's the magic: That 60-90 minute deadline is usually NOT enough time.

Why is that good?

Because when you don't have enough time, you can't overthink. You can't procrastinate. You can't edit as you go. You just HAVE to write/build/create.

This triggers the Zeigarnik Effect—your mind wants to finish open loops. So even after the timer goes off, you'll find yourself thinking about the task. You'll want to finish it.

The deadline creates urgency, which kills perfectionism and procrastination.

THE FRAMEWORK:
- 9:00-10:00am: Deep work session 1 (60 minutes on MIT #1)
- 10:00-10:15am: Non-work task (eat breakfast, move, meditate)
- 10:15-11:15am: Deep work session 2 (60 minutes on MIT #2)
- 11:15-11:30am: Non-work task
- 11:30-12:30pm: Deep work session 3 (60 minutes on MIT #3)
- 12:30pm onward: Everything else (email, meetings, admin tasks)

Notice the non-work tasks between blocks. This is intentional.

If you don't have a reason to STOP working, you'll keep going. And work that loses urgency becomes unfocused work. You're just spinning wheels.

But if you have important non-work stuff to do, you have a reason to protect your focus time.`
      },
      {
        title: 'Principle 4: Match Skill to Challenge',
        content: `Boredom and anxiety are both focus killers.

BOREDOM happens when the challenge is too low for your skill level. The task feels easy, so your mind wanders. You think about other things. You get distracted.

ANXIETY happens when the challenge is too high for your skill level. The task feels impossible, so you panic. Your focus turns inward to negative thoughts.

The sweet spot—FLOW STATE—happens when skill matches challenge.

The task should be slightly harder than what you can currently do, but not so hard that you panic.

This is why quantification matters so much. "Write 1000 words in 60 minutes" might be easy for some people and hard for others. YOU need to calibrate the difficulty to your current skill level.

If you're a beginner writer, maybe 500 words in 60 minutes is the right challenge.
If you're experienced, maybe 2000 words is right.

The task should stretch you, but not break you.

THE RULE: If you find yourself getting bored, make the task harder. Set a faster deadline. Aim for higher quality. Increase the scope.

If you find yourself getting anxious, make the task easier. Extend the deadline. Break it into smaller pieces. Lower the scope.

This constant calibration is how you stay in flow.`
      },
      {
        title: 'Putting It Together: Your Daily Routine',
        content: `So your deep work routine looks like this:

NIGHT BEFORE:
- Decide your 2-3 MIT for tomorrow
- Write them down with specific quantification
- Block your calendar

MORNING:
- No email, no Slack, no news
- Eat something real
- Get to your workspace before you check anything else

9:00-10:00 AM: Deep work session 1
- This is YOUR most important task
- Timer set for 60 minutes
- Phone off
- Do not check anything
- Just work

10:00-10:15 AM: Break
- Move around
- Eat something
- Use the bathroom
- Don't check email

10:15-11:15 AM: Deep work session 2
- Second most important task
- Same rules as session 1

11:15-11:30 AM: Break
- Real break, not doomscroll
- Stretch, walk, breathe

11:30-12:30 PM: Deep work session 3 (or shallow work)
- Some people can do 3 sessions
- Some people can only do 2
- Know yourself

12:30 PM+: Everything else
- Email
- Slack
- Meetings
- Admin tasks
- This is shallow work, not deep work

THE GOAL: Accomplish your 2-3 most important tasks before lunch. Before you're mentally fatigued. Before the world has pulled your attention in 100 directions.

By 12:30 PM, you've moved the needle. You've made real progress. You've done deep work.

Everything after that is maintenance.

Most people work backwards. They handle emails and meetings all morning, then try to do deep work when they're already mentally fried. That's why they can't focus.

This routine is the opposite. It respects your limited deep work capacity and uses it on what matters most.

And here's the beautiful part: Once you establish this routine, it becomes AUTOMATIC. You don't need willpower. You don't need motivation. You just follow the system.

The system does the thinking for you.`
      }
    ]
  },
  {
    id: 'flow-state',
    title: 'Entering Flow State',
    description: 'Make your work feel like a video game',
    duration: '20 min',
    xp: 200,
    sections: [
      {
        title: 'Why Video Games Are So Addictive',
        content: `You can play a video game for 8 hours straight without checking your phone.

You can't do that with work.

Why?

Because video games are engineered to trigger flow state. And flow state is the most addictive state the human brain can experience.

Video games work because they have three critical elements:

1. CLEAR GOALS: You always know what you're supposed to do. Save the princess. Defeat the boss. Complete the quest. There's no ambiguity.

2. IMMEDIATE FEEDBACK: You always know how you're doing. Your score goes up. Your character levels up. Enemies disappear. You can SEE progress in real-time.

3. BALANCED DIFFICULTY: The game is always slightly harder than your current skill level. When you get too good, the game gets harder. When you struggle, it gives you tools to improve.

Under these three conditions, your brain enters FLOW STATE. Time disappears. Self-doubt disappears. You're completely immersed in the task.

The problem? Most work doesn't have these elements.

Your boss doesn't tell you "good job" in real-time. Your progress isn't visible. And the difficulty isn't calibrated to your skill level.

But here's the solution: You can replicate video game mechanics in your actual work.`
      },
      {
        title: 'The Flow State Framework',
        content: `Flow state happens when you have:

1. A clear, specific goal (not vague, specific)
2. Immediate feedback (can you see progress?)
3. Challenge matched to skill (it\'s hard but not impossible)

Let's apply this to actual work.

CLEAR GOAL:
Not "work on the project"
But "complete the database schema for the user authentication system"

Not "write content"
But "write 1000 words on the topic 'How to Start a Business' in a casual, conversational tone"

Not "exercise"
But "Do 5x5 squats at 185 pounds"

The specificity matters. Your brain can't flow toward a vague target.

IMMEDIATE FEEDBACK:
This is where most people fail.

If you're writing, you need to see word count. Not at the end. DURING.
If you're coding, you need to see tests pass. Build the feature in small increments that you can verify.
If you're designing, you need to see mockups coming together.

The feedback needs to be IMMEDIATE and VISIBLE.

Without it, your brain is working in the dark. Is this right? Am I going the right direction? It's exhausting.

MATCHED DIFFICULTY:
The task should make you stretch slightly beyond your current abilities, but not so far that you panic.

If you write 500 words per hour with ease, challenging yourself to write 1000 words per hour creates flow.

If you can't write 100 words per hour, writing 1000 is panic, not flow.

Know your baseline. Then challenge yourself slightly beyond it.

And importantly, ADJUST as you improve. Last month, 1000 words felt hard. This month, it feels easy. So now you aim for 1500.`
      },
      {
        title: 'The Order in Consciousness',
        content: `Flow state is characterized by what researchers call "order in consciousness."

Instead of a thousand competing thoughts—anxiety about the future, regrets about the past, worry about money—your mind is ORDERED. All of your attention is flowing toward the task.

This is incredibly powerful.

When you're in this state, you're not thinking about whether you're good enough. You're not overthinking every decision. You're just creating.

Mihaly Csikszentmihalyi, who researched flow extensively, said: "The optimal state of inner experience is one in which there is order in consciousness. This happens when psychic energy—or attention—is invested in realistic goals, and when skills match the opportunities for action."

Translation: Flow happens when you have a clear goal that challenges your skills without overwhelming them.

The magic is that THIS ALONE solves the motivation problem. Most people think they lack motivation. They don't. They lack clear, challenging goals.

Give someone a clear goal that matches their skill level, and they'll naturally want to pursue it. Motivation follows clarity.

This is why the deep work routine works. By defining your 2-3 MITs with specific quantification, you create the conditions for flow state.`
      },
      {
        title: 'The Zeigarnik Effect',
        content: `The Zeigarnik Effect is a psychological phenomenon where unfinished tasks stay in your mind.

Your brain naturally wants to complete things.

When you close your laptop after an unfinished task, your brain keeps working on it. In the shower, you think about it. Walking to get coffee, you think about it. Before bed, you think about it.

This is GOOD for deep work.

This is why the 60-90 minute focused work block works so well.

Usually, 60 minutes isn't enough time to fully complete the task. So you stop with it still unfinished. Your brain keeps working on it. Your subconscious continues processing.

The next day, you sit down and you're already HALFWAY into the flow state because your brain was working on it all night.

This is how you maintain momentum.

THE RULE: Always end your work session with the task still unfinished. Not crashed. Just in the middle of something interesting. This keeps your brain engaged and makes it easier to restart the next day.

Most people try to finish everything before stopping. This is backwards. It's harder to restart because your brain has already "completed" the task.

Instead, stop in the middle. Leave a note for yourself about what to do next. Your future self will thank you.`
      },
      {
        title: 'Protecting Your Flow',
        content: `Once you enter flow, you need to protect it.

Here's what kills flow:

1. INTERRUPTIONS: A notification. A message. Someone walking by. These snap you out of flow instantly.

2. CONTEXT SWITCHING: Moving from one task to another. Your brain needs time to get back into flow.

3. UNCLEAR NEXT STEPS: When you don't know what to do next, you lose momentum. The brain has to switch to "problem-solving mode" instead of "execution mode."

4. PERFECTIONISM: Constantly editing, redoing, second-guessing yourself. This prevents forward momentum.

PROTECTION STRATEGIES:

- Phone completely off (not on silent, OFF)
- Headphones on (with or without music)
- Tell others you're in a focus session (close Slack, turn off email)
- Have the NEXT step written down BEFORE you start
- Set a timer (the deadline creates urgency)
- Don't edit while creating (first draft all the way through, edit later)
- Take breaks BETWEEN sessions, not during

When you protect your flow time, 60 minutes of work produces the same results as 4 hours of distracted work.

That's not an exaggeration. It's the difference between deep focus and shallow work.`
      },
      {
        title: 'Making Work Like Play',
        content: `The ultimate goal is to make your actual work feel like a video game.

This is possible. It requires:

1. Quantified goals (you know exactly what you're aiming for)
2. Visible progress (you can see yourself getting better/further)
3. Appropriate difficulty (it challenges you without overwhelming you)
4. Frequent wins (you complete small tasks regularly)
5. Clear narrative (you understand why you're doing this, how it fits into the bigger picture)

When these are in place, work becomes play.

You stop needing external motivation. You stop forcing yourself. You actually WANT to do it.

And when you do it, you enter flow state. Time disappears. You make incredible progress.

This is the power of the deep work routine combined with flow state mechanics.

You're not just working harder. You're working in a completely different way. In a way that actually feels good.`
      }
    ]
  },
  {
    id: 'seasons-intensity',
    title: 'Seasons of Intensity',
    description: 'When and how to go all in',
    duration: '18 min',
    xp: 180,
    sections: [
      {
        title: 'You Won\'t Find Rare Results in an Average Life',
        content: `If you feel lost, tired, and can't focus on making progress toward the life you promised yourself, sometimes the only thing you can do is flip the switch.

Create a glitch in the matrix.

Become a completely different person.

In the span of 90 days, you can accomplish more than most people accomplish in 3 years. But it requires entering an intensity season.

An intensity season is a period where you basically commit to one primary goal. You reorganize your entire life around it. You work long hours. You say no to everything else. You forget to eat. You work weekends.

For 3-6 months, you're ALL IN.

But here's what makes it different from just "being disciplined": It's a SEASON. It has a beginning, middle, and end. You're not trying to sustain this forever.

A lion hunts intensely. It runs down prey, uses all its energy, captures the meal. Then it rests for days. It doesn't hunt continuously.

That's the model.

You have seasons of intensity, followed by seasons of maintenance and recovery.

Most people either:
1. Never go intense (they stay comfortable, make small gains)
2. Stay intense forever (they burn out, lose everything, collapse)

The key is knowing WHEN to go intense, HOW to go intense, and WHEN to stop.`
      },
      {
        title: 'When to Start an Intensity Season',
        content: `Not every time is the right time to go all in.

You need certain conditions:

1. YOU'VE FOUND YOUR THING: You've gone through the curiosity cycle. You've explored. You've found the one project/goal/business that you can't put down. It's not "should." It's "have to."

2. TIMING IN YOUR LIFE: You don't have major responsibilities that would prevent intense work. No major family obligations. No health issues. You have the bandwidth.

3. YOU HAVE CLARITY: You know exactly what you're trying to accomplish. Not vague. Specific. "Launch a SaaS business with recurring revenue" is vague. "Build and launch a no-code tool that saves freelancers 5 hours/week on invoicing, and get 100 paying customers" is specific.

4. YOU HAVE A RUNWAY: You have money saved, or income, or support that allows you to focus. You can't go intense on a business if you're stressed about rent.

5. YOU'RE MENTALLY READY: You're willing to sacrifice social time, leisure, relaxation for 3-6 months. This isn't something to enter lightly.

If all these conditions are met, you go intense.

If they're not, don't. Keep exploring. Get prepared. Build your runway. Find your tribe. Don't force intensity.

Bad timing + going intense = burnout`
      },
      {
        title: 'The Intensity Protocol',
        content: `When you enter an intensity season, here's how to do it right:

PHASE 1: THE RESET (Week 1)
- Clear your calendar of everything non-essential
- Communicate with people in your life that you're going all in
- Set up your environment (workspace, schedule, support systems)
- Define your goal in specific terms
- Break your goal into 3-month, 1-month, and weekly milestones

PHASE 2: THE GRIND (Weeks 2-12)
- Work 10-14 hour days
- Use the deep work routine for your peak hours
- Use admin/shallow work for your other hours
- Eat real food, sleep 7+ hours (don't sacrifice these)
- Track progress daily
- Adjust course weekly based on what's working

PHASE 3: THE PLATEAU (Weeks 13+)
- You've been doing this for 3+ months
- Progress is slowing
- You're more tired
- This is normal

TWO OPTIONS:
A) You've accomplished your goal. Move to the consistency season.
B) You haven't. You can extend for 3 more months, or you can shift to a new season.

KEY RULES DURING INTENSITY:
1. Sleep 7+ hours (no negotiation)
2. Eat real meals (no living on coffee and energy drinks)
3. Move your body (walks, exercise, stretching)
4. Still see the people closest to you (even if less frequently)
5. Track your progress (daily wins matter)

Don't sacrifice health for productivity. You can't sustain intensity on fumes.`
      },
      {
        title: 'The Dangerous Part: Knowing When to Stop',
        content: `This is where most people fail.

They enter intensity. They make amazing progress. They feel ALIVE. They feel like they're finally doing something that MATTERS.

And then they can't stop.

They keep pushing. 14-hour days become 16-hour days. They stop sleeping. They stop eating properly. They stop seeing people. They're on a high and they think they can maintain it forever.

You can't.

Intensity is a sprint, not a marathon.

If you push intensity too far, you burnout. And burnout doesn't just mean you're tired. It means you lose your ability to work. You become depressed. Anxious. Everything feels meaningless.

THE RULE: After 3-6 months of intensity, you MUST transition to consistency.

Even if you haven't hit your goal. Even if you feel like you could push further. Stop.

This is hard because intensity feels good. You're making progress. Your life has purpose. It's intoxicating.

But the purpose of intensity is to move you to a NEW BASELINE. Not to create a new permanent state.

When you stop intensity, you'll feel a drop. A letdown. This is normal. Expect it. Plan for it.

You transition to consistency—4 hours of high-quality work per day, the other time for life, relationships, health, reflection.

This new baseline is HIGHER than where you started. You've accomplished something. Now you maintain it.`
      },
      {
        title: 'The Transition: From Intensity to Consistency',
        content: `This is the hardest phase.

You've been working 12-hour days for 6 months. You've built something. It's working. Now you're supposed to... work less?

It feels wrong.

But if you don't transition properly, you lose it all.

THE TRANSITION PROTOCOL (2-4 weeks):

WEEK 1: Gradual reduction
- Go from 12 hours to 10 hours
- Use the extra 2 hours for life stuff (sleep, relationships, health)

WEEK 2: Continue reduction
- Go from 10 hours to 8 hours
- Keep building the life stuff

WEEK 3: Hit consistency level
- 4-6 hours of deep work
- The rest for life, relationships, personal growth
- You're now in consistency mode

KEY: Don't do this abruptly. Your body and mind are used to intensity. A sudden drop creates a vacuum. Gradual transition allows you to adjust.

Also: The things you put BACK into your life (relationships, hobbies, health) become the new focus. These prevent the letdown from being too hard.

When you transition well, the intensity you built becomes the new foundation. And you get to enjoy the other parts of life too.

When you transition badly (either by stopping abruptly or by never stopping), you either burn out or you maintain the intensity and eventually everything crashes.`
      },
      {
        title: 'Making Intensity Seasons a Practice',
        content: `The goal is to cycle through these seasons multiple times in your life.

First cycle (ages 25-30):
- Find your thing
- Go intense on it
- Build something
- Transition to consistency

Second cycle (ages 30-35):
- Get curious about something new
- Go intense again
- Build something bigger
- Transition to consistency

Each cycle builds on the last. Each intensity season is shorter but more impactful. Each consistency level is higher.

In 10-20 years, you look back and you've accomplished remarkable things. Not by grinding 12-hour days forever. But by cycling through seasons with intention.

The people who accomplish rare things understand this rhythm.

They know when to go all in. They know how to protect themselves during intensity. They know when to pull back. They know how to transition. And then they do it again.

This is how you transform your life without burning out.`
      }
    ]
  }
];

export default function Learn() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const queryClient = useQueryClient();

  const { data: progress } = useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const user = await base44.auth.me();
      const records = await base44.entities.UserProgress.filter({ created_by: user.email });
      return records[0];
    }
  });

  const updateProgressMutation = useMutation({
    mutationFn: (data) => base44.entities.UserProgress.update(progress?.id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProgress'] })
  });

  const completedLessons = progress?.achievements?.filter(a => a.startsWith('lesson_')) || [];

  const handleCompleteLesson = () => {
    const lessonAchievement = `lesson_${selectedLesson.id}`;
    if (!completedLessons.includes(lessonAchievement)) {
      const newXp = (progress?.total_xp || 0) + selectedLesson.xp;
      const newLevel = Math.floor(newXp / 500) + 1;
      updateProgressMutation.mutate({
        total_xp: newXp,
        level: newLevel,
        achievements: [...(progress?.achievements || []), lessonAchievement]
      });
    }
    setSelectedLesson(null);
    setExpandedSections({});
  };

  const isLessonCompleted = (lessonId) => completedLessons.includes(`lesson_${lessonId}`);

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedLesson ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold">Training Center</h1>
                </div>
                <p className="text-gray-600">Master the techniques of deep focus</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="text-gray-700">
                    {completedLessons.length} of {lessons.length} completed
                  </span>
                  <div className="h-2 flex-1 max-w-xs bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black"
                      style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <motion.button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    whileHover={{ scale: 1.01 }}
                    className="w-full text-left p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-black">
                            {lesson.title}
                          </h3>
                          {isLessonCompleted(lesson.id) && (
                            <CheckCircle className="w-5 h-5 text-black" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>{lesson.duration}</span>
                          <span>+{lesson.xp} XP</span>
                          <span>{lesson.sections.length} sections</span>
                        </div>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isLessonCompleted(lesson.id) ? 'bg-black text-white' : 'bg-gray-100'
                      }`}>
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => { 
                  setSelectedLesson(null); 
                  setExpandedSections({});
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to lessons
              </button>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-black">{selectedLesson.title}</h2>
                      <p className="text-sm text-gray-600 mt-1">{selectedLesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{selectedLesson.duration}</span>
                    <span>+{selectedLesson.xp} XP</span>
                    <span>{selectedLesson.sections.length} sections</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {selectedLesson.sections.map((section, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <h3 className="text-lg font-semibold text-black">{section.title}</h3>
                        {expandedSections[index] ? (
                          <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedSections[index] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 px-6 pb-6"
                          >
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {section.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200 flex gap-3">
                  <Button
                    onClick={() => { 
                      setSelectedLesson(null); 
                      setExpandedSections({});
                    }}
                    variant="outline"
                    className="border-gray-300 text-black hover:bg-gray-100"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleCompleteLesson}
                    className="bg-black hover:bg-gray-900 text-white ml-auto"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Lesson (+{selectedLesson.xp} XP)
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
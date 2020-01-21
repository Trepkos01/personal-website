---
title: "The Technical Phase"
tags: ["personal development", "career", "interview"]
date: "2020-01-21"
featuredImage: "./featured.jpg"
featured: "false"
description: "The most notorious phase encountered in the interview process for a technology worker is the daunting technical phase which can come in a multitude of varieties which I'll briefly describe in this post (and also how to prepare)."
type: "post"
category: "Career"
project: ""
series: "Software Developer Career Tips"
---

**Photo By:** [Kaleidico](https://unsplash.com/@kaleidico)

Well, here we are. We're about to undergo the series of interviews (in-person or otherwise) that will ultimately determine our possible future at the company. If you haven't already, you will face your technical challenges during this phase. In some cases, you may be given (usually an easy) technical assessment before you reach this point via some online coding assessment platform such as HackerRank or LeetCode with varying limitations on language and time allowed and a series of test cases that allow you to easily debug and evaluate edge cases and whatnot.

These technical challenges I will separate into three generalized categories:

- Algorithm/Programming Challenges
- System Design Questions
- Technical Short Answer/Programming Language-Specific Questions

In the past, most new graduates typically only faced algorithm/programming challenges and possibly some programming language specific questions while more senior positions covered less algorithm-focused questions and more system design related questions. This was based on the idea that new graduates would ultimately be completely unfamiliar with system design given their limited professional experience while more senior developers should understand that broader scope of system design.

Jokes on us. Nowadays, it is expected that you be proficient in all three categories at many companies. 

**First, the algorithm/programming challenges....**

As the hiring pool becomes more saturated with new graduates, it becomes more crucial for companies to incorporate these challenges to better filter candidates and avoid false positives (candidates that appear competent but ultimately are not suited for their role). Simply saying that you have programmed and/or showing your degree (or boot camp certificate) to prove your skills is simply not enough, you must be able to demonstrate it. 

Not only must you demonstrate it, but you must demonstrate it in an environment under the scrutiny of complete strangers who, depending on their personality, may have very little regard for your personal anxiety and nervousness as they pick apart every move or step that you take while attempting to solve the problem. For those that dreaded being called to the whiteboard to solve a problem in front of your jeering classmates, this is the professional version. But it beats having to solve esoteric riddles or Fermi problems like in the past.

In addition to your technical skills, you must be able to **(1) communicate your thought process clearly to your interviewers and take their suggestions or hints seriously** and **(2) write your code on a white board**. The second can be especially difficult if you normally do not write code (or anything on an upright whiteboard) or even write anything at all (I pretty much type everything and my handwriting isn't particularly good anyway). One common tip is to begin the top left corner to allow yourself as much space as possible for your solution. 

Different companies may be strict in which language they would allow to solve such problems, others may be strict on syntax, while others may be more loose in their allowance of minor syntax errors or even allow pseudo-code to simply outline the concepts used. 

It all differs! Some companies may allow you to use generic data structures such as linked lists, stacks, queues, hash tables or generic algorithms such as sort while others may require that you implement the data structure itself before using it to help solve the problem. Do these algorithm questions necessarily translate to your ability to work effectively in your job position, usually not, but many companies use them as a pseudo-IQ test to help filter through candidates (and to also monitor your general approach and behavior when solving a problem).

This aspect of the interview process for software developers has become so prevalent that an entire second market of resources has been generated to help prepare candidates.

**Some of the most popular books for simply practicing these types of programs are:**

- **Cracking the Coding Interview (CTCI)**
	- This has been the de facto standard resource for programming interview preparation for years now. It is a great introductory resource for these encounters and it may be the only resource that you'll ever need for many companies. However, due to its popularity, many of the more prestigious companies avoid questions that are very similar to those contained within this book. In a way, it has unfortunately raised the bar even higher at those companies.
- **Elements of Programming Interviews (EPI)**
	- You could start with either book, but many view CTCI as an introductory resource and EPI as the much more challenging step-up. Typically you can complete CTCI much quicker than EPI, if nothing else, you can simply completely work through both books.

**For further reading on data structures and algorithms, the following books come heavily recommended:**

- **Introduction to Algorithms (CLRS)**
	- This is typically the textbook of choice for the Introduction to Algorithms class for most undergraduate programs.
- **The Algorithm Design Manual**
	- This book includes valuable sections that outline "war stories" or real world applications and encounters where algorithms were utilized in a pragmatic manner.


The following are online free platforms that allow you to practice programming problems:

- www.leetcode.com
	- Easily the most popular online resource for candidates to practice programming problems and compare the performance of their solutions. Problems are categorized by their difficulty level and other metrics (such as solution acceptance rate), and problem category. 
	- Some people are unsure on how to start on this platform especially when they're just starting out studying these problems. Many would recommend simply starting with easy problems, sorting by acceptance rate, and setting an arbitrary number of completed solutions to accomplish before moving to the next difficulty level and so forth.
	- For those wanting to immediately jump into the most useful problems, a user at teamblind.com curated a list of 75 of the most useful problems at: https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU
	- https://leetcode.com/list/xoqag3yj/
- www.hackerrank.com
	- Similar to above, this is an interactive coding assessment platform that can also be used as a study material (it is also commonly used to evaluate candidates remotely during the screening process for a lot of companies).

It's all about volume. As you perform more and more of these problems, your mind begins to be able to pick out certain patterns and traits that help you determine the right approach to a given problem. 

How would I recommend studying based on the above information? It depends on your timetable and your available time. However this is what I would recommend.

- I would recommend starting with CTCI since it is the most introductory-friendly and it discusses a lot of other softer interview-related concepts that the other resources neglect to cover in favor of more technical content. It also provides a lot of helpful material to re-familiarize yourself with different data structures and algorithms if it's been a while since you've encountered them directly. 
- Next, I would go through EPI (sans the advanced problems). Their book has different recommended approaches based on your time frame.
- Once you have completed CTCI/EPI (sans the advanced problems), I would recommend starting with the 75 curated problems linked above on LeetCode.
- Once you have completed the previous bullet points, I would just work continuously through the LeetCode problems using the method of starting with acceptance rate but I would split time between medium and hard problems (or perhaps a 3:2 ratio). Or you could focus on areas where you're weaker (recursion, dynamic programming, etc).
- You could begin tossing the more advance problems of EPI and CTCI into the mix as you begin to add many of the LeetCode Hard problems to your completed list.
- The Algorithm Design Manual book can be a bit of technical reading on the side whereas the CLRS book can simply be a resource to dive a bit deeper into certain algorithms and data structures.

LeetCode is the last step simply because it would take the longest to fully exhaust given the ever-increasing number of problems available to solve.

Like I said, volume is key, but it also ideal to have a universal approach when practicing these problems. 

For example (based on the problem), allow yourself a set amount of time to fully solve the problem (this can vary based on difficulty). Perhaps, even within this range, you can explicitly set aside an introductory period to simply review the problem description or develop your solution before implementation. Practice talking through your solution out loud (this can seem silly). Start with a naive or brute force solution (perhaps one that doesn't even involve programming), determine edge cases, and then refine your solution in iterations.

Save your solutions to quickly review if needed. Keep track of your progress when working through problems and note your own progress on the problem. If you completed it easily enough to a satisfactorily manner, then note that. If you didn't complete it and needed to review the solution after the allowed time then note that so you can revisit the problem and try again. Resist any urge to look up a solution otherwise.

This can be a bit of a grind, but it is what it is.
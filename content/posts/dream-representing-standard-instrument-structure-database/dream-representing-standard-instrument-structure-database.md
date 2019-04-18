---
title: "DREAM Series: Representing the Standard Instrument structure in the database."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-04-18"
featuredImage: "./featured.jpg"
featured: "false"
description: "Generalizing the structure of the workhorse assessment instrument in the new system, the Standard Instrument."
type: "post"
category: "Software Development"
project: ""
---
In earlier posts, I discussed at length the utility of **Assessment Instruments** and their role in collecting data in the system for the purpose of assessing the effectiveness of the various degree programs in preparing students in their respective fields in accordance with national and regional standards. I detailed how these instruments were handled in the old system, namely each instrument has its own database table and associated file responsible for generating the page responsible for handling the instruments' behavior and submission and the issues that this design presented in the old system. I also grouped assessment instruments into three distinct types: **Attendance Instruments, Capture Hours Instruments**, and **Standard Instruments** and proceeded to describe the nature of the **Attendance Instrument** and **Capture Hours Instrument**. However, the most complicated instrument is the **Standard Instrument** and it makes up roughly 95% of all assessment instruments within the system.

In the old system, many of the instruments follow a similar structure, similar to a survey. This structure is stored in the instrument's specific table where the questions in the instrument are stored as individual fields. The downfalls of this are obvious, any changes to the instrument would require the table structure to change as well. Also, instruments consisting of many questions would require many fields and often it would be difficult to determine what questions were associated with which fields and so forth.

A submission of the instrument would be represented as a row in the instrument's table. Sometimes submissions would differ by a field's value (e.g., Midterm, Final) that wouldn't be explicitly set by the evaluator but implicitly by the code executed when the instrument was submitted based upon certain conditions (the date of the submission). Sometimes, it would be difficult to determine the evaluator of the instrument's submission as two separate evaluators would be attached to the same submission however each evaluator would only be responsible for a portion of the submission.

Also, the value of the question's response would differ. Most questions required a radio button to be selected, similar to a multiple choice test, others required a text response, others had a numeric input. Some choices would result in an email to be sent to the student or evaluatee (such as a low score choice) and the presentation of the form would change according to specific properties such as the course or term (certain questions would be hidden or shown based on the course and term). This change would be handled within the instrument's code itself.

**The first change is that I wanted to be able to represent the instrument's structure, behavior, and submissions in a static collection of tables rather than requiring a new database table to be created for each new instrument.**

Additionally, I wanted a static collection of files, self-contained in a module, to handle Standard Instrument creation, modification, previewing, submission, and individual reports so new instruments also wouldn't require adding a additional files to application's source structure.

**So first, how can I generalize the structure of a Standard Instrument.**

Each instrument is an ordered collection of questions (which I will call indicators, since in many cases the text isn't in question form). And sometimes submissions will share multiple rows of information and differ by a field's value ('Midterm', 'Final') and this value is implicitly determined. Therefore, I conceptualized this behavior as stages where each stage has a collection of indicators.

**The resulting structure:**

**Instrument**
- Stage 1
-- Indicator 1
-- Indicator 2
-- Indicator 3
-- Indicator 4
....
- Stage 2
-- Indicator 1
-- Indicator 2
...

**This structure could be easily stored in two tables.**
- The first table could store the stage information which would include the instrument it belongs to and its description. (i.e., 'Midterm', 'Final')
- The second table could store the indicator information which would contain the stage that the indicator belonged to and the text to be displayed for that indicator, and the order index of the indicator (so we can control the order that indicators appear within a stage).

However, there is more information that needs to be attached to an indicator. Namely, what kind of indicator this is? 

 - For some instruments, all indicators are multiple choice and share    the same choices. Other instruments share the same multiple choices' values but the text of the choices differ per indicator. Each value of a choice is a number (e.g., '1 - Poor, 2 - Okay, 3 - Good').  
- Some indicators are simply text fields (e.g., 'Comments').  
- Some indicators are number fields which different ranges that represent    different things (e.g., '50-60 = Fail', '60-70' = D').  
 - Some indicators only have two or three explicit text choices/values (e.g.,  'Pass, Fail'). 
 - Some indicators take a date value as the response type.

Therefore, each indicator has a type: **rubric, text, number, select, date**.

The **rubric** type is the multiple choices where each choice is a numerical value and associated label. These are often shared between multiple instruments so they can be handled as a separate entity altogether in two additional tables.

- A rubric table which holds the rubric's description. 
- A table that holds the rubric choices, mainly the numerical value and its corresponding label, and if the choice is a 'flagged' choice or not.

The relationships between indicators and rubrics could be stored in a separate table.

Next, the **number** type indicator could be handled in a separate table that would store the overarching min/max range of the scores, the step-value, and the ID of the indicator. This could be further expanded into sub-ranges in a separate table that would store the sub-range's min/max values, and the description of range and if the range is 'flagged'.

The **select** type indicator, similarly could be stored in a separate table which would store the select option's label and value, if the option should be 'flagged' or not and what indicator these options should belong to.

**With the following database tables, the structure of all previous instruments and future instruments following similar functionality could be stored:**

- A standard instrument stage table responsible for storing stage-specific information such as the stage description.
- A standard instrument indicator table responsible for storing the order information of an indicator, its text, its type, which stage it belongs to, the message to be sent if a flagged response is chosen.
- A rubric table for storing the rubric information such as its description.
- A rubric choices table for storing the rubric choice information such as its label and numerical value, and if it is a flagged choice or not.
- In some cases, indicators share rubrics but there is additional text to be displayed next to the choices that is indicator specific, a separate table to store this indicator and rubric-choice specific property as well.
- A table for storing the relationships between indicators and rubrics.
- A table for storing the number information for number-type indicators such as the min/max of the range and the step-value.
- A table for storing the sub-range number information for number-type indicators such as the min/max of the range, the description of the range, and if the range is 'flagged' or not. (i.e., if the evaluator submits a score within a 'flagged' range, that indicator and choice will be added to an email sent to the evaluatee detailing flagged choices in the submission.)
- A table for storing the select option information for select-type indicators such as the option, value, and 'flagged' status for a select choice belonging to a specific indicator.
- A table for storing the subheader information, these are simply text components that are typically used as dividers between indicators on a stage.

Sure, this may be a lot of tables to store the structure and behavior of the standard instruments, however, as new standard instruments are added, the number of tables do not change. Better yet, a user, with the permission to do so, can create and modify standard instruments by interacting with the system rather than requiring a developer to create a new database table and new source file to handle the additional standard instrument.

More on this creation process and handling access permissions for the standard instruments in future posts.
---
title: "The Integrity Reports"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-06-17"
featuredImage: "./featured.jpg"
featured: "false"
description: "Other reports commonly found within the assessment system are those responsible for generating information about missing data that should be collected through the assessment system such as assessment instrument submissions, background checks, and insurance checks."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---

The next collection of reports, I title the **Integrity Reports**, primarily because they concern missing information in the system. The three primary use cases in the old system is the **Expired Insurance Report**, **Background Check Report**, and **Late Reports**. Both the **Expired Insurance Report** and the **Background Check Report** concern student information, more importantly it reports a list of students whose background check information is missing in the system and a list of students who are either missing insurance information or their insurance has expired. In both reports, the user can narrow the list down to students who are enrolled in a selection of courses, placed at a collection of districts, within a span of academic terms.

Though the **Background Check** and **Expired Insurance Reports** are fairly straightforward, the **Late Report** is much more involved. The **Late Report** is responsible for showing what instrument submissions are missing (and their specific stages if a standard instrument is involved). 

The user chooses a specific **course** and **term** and **instrument**. Based on these choices, the report determines which evaluators are responsible for submitting that instrument(and stage) based on the access rules for that instrument(and stage). It uses these access rules to contrast with the list of current submissions for that instrument in that course and that term to determine the list of evaluators who have not submitted the instrument yet.

Access rules were introduced in previous blog posts and are responsible for controlling the access to certain instruments and other system components.

**For example:**

*The user chooses Instrument 1, HIST 101, and Fall 2010.*

There exists the following access rules...

*Instrument 1 - HIST 101 - Fall 2010 - Faculty - ...*
*Instrument 1 - HIST 101 - Fall 2010 - Site Supervisor - ...*

This tells the report that we're expecting submissions of Instrument 1 by both Faculty and Site Supervisors. Therefore, we look at our current submissions for Instrument 1 in HIST 101 for the term Fall 2010 and we compare it to the enrollments for HIST 101 and Fall 2010 and report back the missing submissions based on this information.

In the old system, all of this, including the expected submission rules for each individual instrument was hard-coded on a very large and confusing source file. However, in the new system, this behavior is simply dependent on the access rules that are defined in the database by a user interacting with the system. 



---
title: "DREAM Series: Access Permissions for Instruments"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-04-15"
featuredImage: "./featured.jpg"
featured: "false"
description: "Accommodating the multitude of access properties for instrument access and submission in the form of a collection of individual rules that must be satisfied."
type: "post"
category: "Software Development"
project: ""
--- 

In the old system, access to instruments was determined by an enrollment's course, an enrollment's term, the accessing user's user role, and even a date window. The relationships between instruments and courses were stored in two separate tables while the behavior for access based on academic term, accessing user's role, student's program, and student's emphasis, and even date spans were hard coded in the instrument's file responsible for controlling the behavior of the instrument.

Instead of splitting this behavior between the database and the code itself, I decided to move all of these characteristics into the database allowing an administrative user to modify these permissions accordingly. The code's responsibility would be to only interpret this information and control access to the page accordingly.

Therefore I moved the start and stop dates of the access window into the centralized instrument table from the earlier post and created five additional tables to store the relationships between instruments and courses, instruments and terms, and instruments and user roles, instruments and programs, and instruments and emphases. This would work reasonably well except as I would discover, the nature of the instrument's access permission was a bit more complicated.

**A simplified example:**

Let's say we had an instrument 1.

Instrument is available in courses: **COURSE 101, COURSE 102, COURSE 103**
Instrument is available in terms: **Fall, Spring, Summer**
Instrument is available for user roles: **Role 1, Role 2, Role 3**

These relationships are stored in their respective tables.

A user belonging to **Role 1** who is supervising **COURSE 101** in **Fall** has the ability to submit the instrument. This is ideal. However, we don't want the same user to submit the instrument in the **Fall** for **COURSE 102**, we want a user belonging to **Role 2** to submit the instrument for that course and term but the user is also supervising for **COURSE 102** as well.

However, since the user's role and the enrollment's term and enrollment's course can be all be found in the respective tables storing the relationships between the instrument and those characteristics, the user would also see and have permission to access the instrument in **COURSE 102** as well. Since the user could see the presence of this instrument, they would feel the responsibility to submit the instrument for that course as well.

Therefore, this approach to access permissions needed a way to be stored in the database.

A user should only have access to the instrument if they have THIS role AND the enrollment was for THIS course AND the enrollment was for THIS term. These permissions would also need to be extended to include the student's program and the student's emphasis.

This lead to the development of the access rule, a structure stored in one separate table rather than multiple tables storing the relationships between instruments and different properties. 

**An access rule followed the following structure:**
- The instrument.
- The term that the instrument is available in.
- The course that the instrument is available in.
- The user role that can access the instrument.
- The program of the student that the instrument is submitted for.
- The emphasis of the student that the instrument is submitted for.
- The start date and end date of the window of dates that the instrument is accessible within.
- If the this access is bound to enrollments only.

**This structure was capable of representing the following logic.**

The instrument is only able to be accessed by users with **Role 1** in an enrollment during **Term 1** for **Course 1** for students belonging to **Program 1** and an emphasis in **Emphasis 1** between the dates of **Start Date** and **End Date.**

If a certain attribute of the rule was left unspecified then any possibility satisfied the requirement.  Unspecified attributes could be treated as a wildcard.

**For example, a rule of type:**

Instrument 1 - No Term - Role 1 - Course 1 - No Program - No Emphasis - No Start/End Date - Enrollment Access Only 

**Could be interpreted as:**

**Instrument 1** should be available to users belonging to **Role 1** in **Course 1** for any student in any term at any point through **supervised enrollments only**.

And an administrative user could add/remove these access rules and effectively control the ever-changing accessibility permission landscape of assessment instruments without ever touching the source code itself.

If an instrument did not have any access rules, then the instrument would be unreachable. 

On both pages which show available instruments to submit (the enrollment data entry page, the student's overview page for enrollment-less submissions) and the page responsible for the submission of the instrument, the access rules for the instrument are reviewed and the page determines if the characteristics of the approach can be satisfied by a specific access rule and displays the page or list of instruments accordingly.
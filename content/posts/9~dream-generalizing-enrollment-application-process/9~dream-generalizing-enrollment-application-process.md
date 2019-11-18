---
title: "Generalizing the enrollment application process."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-04-01"
featuredImage: "./featured.jpg"
featured: "false"
description: "Student users submit an application for approval to generate their enrollments but each program has their own specific structure for this application? I determine the ideal way to generalize this process, allowing each program to create and change their enrollment application with the constant shifting requirements."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---

In the old system, several programs had different processes where students would submit a **Placement Application**, this application would be reviewed by a faculty or staff user who would then approve the application to effectively generate an enrollment loosely based on the details of that application.

Predictably, different programs had different requirements for this application and because of the different structure of these applications, each form had its own separate page/source file. My goal was to take the functionality and features of each of these application, generalize them enough, and place them within a single file responsible for handling all possible customized cases. I would call this the **Enrollment Application**.

This would require a user capable of determining the structure of the application specific to the program that the application was related to. I would call this the **Enrollment Application Settings** and these details would determine the behavior of the file responsible for the **Enrollment Application**. The rest of the process would remain the same, there would be an interface for a user to view/review and modifying any necessary details required to generate an enrollment based on the **Enrollment Application**.

**All enrollment applications share some similar features such as:**

- The ability to choose the term for the enrollment.
- The ability to choose the course for the enrollment.

**However, enrollment applications for different programs differed by the following:**

- Specific text response questions relevant to that program. (i.e., 'Do you own a laptop?')
- The ability to choose your own placement site, clinical instructor, and even additional supervisor (if necessary).
- Any activities or services planned to be performed within the enrollment.

**In my attempt to generalize these options enough to account for all possible cases, the enrollment application settings would allow the user to do the following:**

- Determine if the student can select their own term for the enrollment application.
-- Or if not, what the default term(s) should be for that enrollment application.
- Determine if the student can select their own courses for the enrollment application.
-- If so, can they only select a single course per enrollment application or multiple courses.
-- If not, then what are the default course(s) for that enrollment application.
- Can the student choose their clinical instructor or placement site?
- Can the student choose their own additional supervisor?
-- If so, how many additional supervisors should they be able to choose and what are the user roles of those supervisors?
- Should the enrollment application be available currently?
- Should the enrollment application only be available during a window of time?
-- If so, what are the start and end dates of this window?
 - Any activities to be attached to the enrollment application that the student can check off before submission.
 - Any text response questions that can be asked on the enrollment application settings.

These **Enrollment Application Settings** would be unique to each program and determine both the structure and the behavior of the **Enrollment Application**. Once the student submits the form, it would generate either one or multiple enrollment applications (depending on chosen courses/terms) which would be reviewed by a user who would finalize the details of the application before 'approving' or 'rejecting' the application; the former would generate an enrollment based on the details provided by both the application and those provided by the user who reviewed the enrollment application.

The newly generated enrollment would now be available with all other enrollments (even those created ad-hoc through the interface allowing one to to do so) and also available for gathering information on that student.



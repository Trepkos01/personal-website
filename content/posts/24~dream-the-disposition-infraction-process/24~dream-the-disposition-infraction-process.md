---
title: "The Disposition Infraction Process"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-05-23"
featuredImage: "./featured.jpg"
featured: "false"
description: "The design requirements call for the ability to facilitate the formal disposition infraction process within the new system. However, each program follows a different process so I need to generalize it enough so that a user can build their program-specific process within the system."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---
As the old system grew and became more popular, it began to take on more functionality than simply collecting assessment-related information. Some of this functionality included adding a secondary enrollment-bound evaluation system that allowed Clinical Instructors, University Supervisors, and Students to effectively rate each other, their placement site, and their respective program based on that tracked enrollment. Another functional feature was a feedback system that allowed Clinical Instructor to provide feedback to their supervised Students for specific enrollments. Both of these features also used a similar access rules as the assessment instruments responsible for collecting assessment data. Also, the ability to view Placements information on an actual geographical map using Google's Maps API. And the ability to send mass email messages through the system to large subsets of users.

But one of the most complicated and interesting non-assessment-related functionality in the old system was the disposition infraction process. In the old system, one of the programs wanted a way to facilitate their formal disposition infraction process in the system, allowing faculty users to monitor the process and interact with it in a centralized location. 

**An example of this process followed a multiple strike-like sequence:**
- 1st Strike - Faculty member chooses which disposition indicators the student violated and any additional comments.
- 2nd Strike - A meeting between the student and specific faculty and staff to discuss the incident and prior incidents and the outcome going forward.
- 3rd Strike - Another meeting between the student and specific faculty and staff and possibly higher up administration to determine if the student should be dismissed from the program.
- At any point in the above process, the student can submit an appeal that can be contemplated by the faculty and staff.

In the old system, this entire process was completely hard-coded each step of the way. If the process changed, the code would have to be changed. For specific steps, emails would be sent out to notify faculty, staff, and the student. These email addresses were also hard-coded (with the exception being the student's of course). 

As this feature in the old system became more popular, other programs became interested in moving their own disposition infraction process to the system; however each program used a different process. Great.

So in the new system, I needed a way to create a solution general enough that it could accommodate the requirements of each program's process.

**First**, I knew that all of the program began their process similarly, there would be a collection of rules that on the initial disposition infraction submission could be marked as violated. These rules differed per program so I would need a separate interface responsible for adding these rules or indicators on a per-program basis. 

**Second,** after the initial infraction submission, emails would be sent out to specific personnel including the faculty/staff who originally submitted the infraction. This also differed per program. So the same user responsible for adding the disposition indicators would also need to be able to detail which users would receive email notification for general disposition infraction process actions, also on a per program basis.

**Third,** each program's disposition infraction process have different instructions that would need to be available to both students and faculty depending on the program of the student that the process was being started for. The same user responsible for controlling the per-program details above would be responsible for this as well.

**Fourth,** each program has specific possible outcome choices for the resulting disposition infraction meeting. The same user above would also be responsible for managing these outcome choices. 

In the old system, everything from the indicators to the outcomes and possible appeals would be collected in a single row of data (often with empty fields depending on length of the process). 

**This is less than ideal. I would have a central disposition infraction table that would have the primary information regarding the process such as:**
- The student that committed the infraction and thus started the process.
- The faculty that observed the infraction and formally started the process.
- The submission information.
- The student's signature that the process had been started.
- The status of process (e.g., 'ended', 'not ended')

**In relation to this table would be a table that stored the disposition indicator responses information that such as the following:**
- The disposition indicators violated in this infraction process.
- Any additional comments.

**In relation to the original disposition table, any disposition meeting related information such as:**
- Possible outcome.
- Outcome comments.
- Student's signature on the meeting outcome.

**Also in relation to the original disposition table, any appeal information and its resulting outcome meeting information.**
- Appeal reason
- Meeting on appeal's outcome.
-  Meeting comments.
- Student's signature on meeting outcome.

**Originally, the process would go like this:**
- Faculty/Staff would submit an initial disposition infraction by choosing the violated indicators generated by the student's program and provide any additional comments.
- The Student would submit their signature indicating that they acknowledge the disposition infraction.
- The Faculty/Staff can close the process formally and provide their closing comments.
	- **Or** the Faculty/Staff can initialize a meeting, indicate the outcome of the meeting and await the student to provide their signature to the meeting's outcome.
- The Student can either submit their signature to the meeting's outcome thus ending their participation in the process.
	- **Or** the student can submit an appeal to the meeting's outcome thus prompting another meeting and resulting outcome.
	- The above appeal/meeting outcome portion of the process can go on continuously until one of the designated faculty/staff formally closes the process or the student submits their signature to the meeting's outcome.

Each program's disposition infraction process followed a similar structure, only differing primarily on the allowed amount of appeals (or even if appeals are allowed in the first place). Therefore the program's faculty/staff could close the process at any point based on their protocol.

Eventually, it was determined to decouple of the disposition infraction initial submission from the disposition infraction meeting process entirely. Essentially, a student could have # disposition infractions before a disposition infraction meeting is officially started.

**The following tables were needed to facilitate this customize-able behavior in the new system:**
- Table to hold program-specific disposition indicators.
- Table to hold program-specific disposition infraction process instructions.
- Table to hold program-specific disposition infraction meeting possible outcomes.
- Table to hold the program-specific personnel to email for general disposition infraction actions.
- Table to hold the program-specific personnel to email for the appeal-related actions.

**The following tables were needed to actually store the information collected in the process:**
- The table responsible for storing the primary disposition infraction submission information.
- The table responsible for storing the disposition indicator responses for the above submission.
- The table responsible for storing the disposition infraction meeting process's primary information.
- The table responsible for storing the appeals and resulting meeting information for each disposition infraction meeting.

Now each program can build up their unique disposition infraction process within the new system and also control the meeting process itself.
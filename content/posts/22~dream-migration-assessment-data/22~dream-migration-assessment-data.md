---
title: "DREAM Series: Data Migration of Assessment Data, User Accounts, and More"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-05-17"
featuredImage: "./featured.jpg"
featured: "false"
description: "The last steps in the migration process involve migrating the greatest amount of information, the assessment information. Once that information has been migrated over. It is time to finally migrate over the actual registered user accounts to this new system."
type: "post"
category: "Software Development"
project: "dream"
---
In the previous blog entries on the data migration process, I discussed the steps necessary to either create new information in the new assessment system's database system based on behavior and structure that had been previously hard-coded in the old assessment system **OR** migrating existing information by both cleaning the information and restructuring it to fit consistently with the new system's database structure. The previous **9** steps were responsible for creating the organization's structure within the system (e.g., department, programs, courses, terms, etc), migrating over the existing content information (schools, institutes, students, faculty, clinical instructors, etc), and also the enrollments information. 

All of this information is necessary for the following steps that I discuss in this post.

### Creating the assessment instruments in the new system.

In the old system, the structure and behavior of the assessment instruments is embedded in the source files responsible for generating those instruments. In the new system, this information is to be held in the database system and only a static collection of files are responsible for interpreting this data and executing the correct behavior and structure. 

So in this step, each existing instrument from the old system would need to be created rather than migrated over.  This is roughly 108 instruments, the majority being of the type, "Standard". 

### Migrating over the responses to the assessment instruments

Easily the biggest portion of the migration process which also takes the longest to complete. This part of the process migrates over all of the responses for the above assessment instruments. This involves taking information from **72** database tables and migrating this information to **6** database tables.

**The six tables were responsible for the following:**

- A table responsible for storing the Standard Instrument submission-specific information.
- A table responsible for storing the Standard Instrument indicator response-specific information. (Submissions have responses)
- A table responsible for storing the Attendance Instrument submission-specific information.
- A table responsible for storing the Attendance Instrument date response-specific information. 
- A table responsible for storing the Capture Hours Instrument submission-specific information.
- A table responsible for storing the Capture Hours Instrument hours entry-specific information.

In the old system's database system, for each table containing submissions to a Standard Instrument; each row of information typically corresponded to a submission and depending on the structure of the instrument, a certain collection of fields correspond the responses to indicators.

When creating the submission, the migration would look up the information for the evaluator and evaluatee based on certain fields in the old system's row of information. In the old system, there typically would be associated course and term information with the row of response data, this would be used to look up the enrollment associated with the submission for the submission's information in the new system. If the enrollment can not be found for some unknown reason, it would be created in the process of creating the submission information for the new system.

There were also exceptions where the old system's information had placeholder or unintelligible information that needed to be treated differently or removed outright. This information is dependent on both the migration of previous enrollments and previous content information such as students, faculty, and clinical instructors.

After this long step, though it's completely hands off past executing a script, all of the assessment information from the old system is now present, clean, and structured correctly within the new system.

### Migrating over the Enrollment Evaluation Surveys

This is the "Field Experience/Enrollment Evaluation" surveys that students, clinical instructors, and faculty can use to effectively grade each other, the program of the enrollment, and the placement site of the enrollment. These surveys are bound by the enrollment and the results can be used to effectively rate and rank students, faculty, clinical instructors, programs, and placement sites.

The surveys themselves are actually structured within the code of the old system. In the new system, this is moved to the database, allowing a user to make changes and add new questions without changing the source code itself. Since this information is in the code itself in the old system, it is created rather than migrated over.

### Migrating over the Enrollment Evaluation Survey Responses

Unlike the survey themselves, this information is contained within the old system's database system. This information is contained in **10** database tables:

- A table for storing clinical instructor rank-related information.
- A table for storing student on clinical instructor responses.
- A table for storing faculty on clinical instructor responses.
- A table for storing student rank-related information.
- A table for storing clinical instructor on student responses.
- A table for storing faculty on student responses.
- A table for storing faculty rank-related information.
- A table for storing student on faculty responses.
- A table for storing clinical instructor on faculty responses.
- A table for storing clinical instructor and student on program responses.

This information is stored in one single database table.

### Migrating over the Feedback responses.

Another feature in the old system was the ability for students to submit feedback to their clinical instructor which the clinical instructor can respond to. This functionality is present within the Message Center in the new system and old Feedback information had to be migrated over as well.

This was probably the most straightforward migration since it follows a simple 1-to-1 migration pattern from one table to another table. There were minor table structure changes but nothing that required significant restructuring of the data being migrated.

### Migrating over the Disposition Infraction Instruments

In the old system, the disposition infraction process allowed faculty to submit infractions for students based upon their program-specific criteria. A common trend, the behavior and structure (the specific indicators) were stored in the old system's code and would need to be recreated within the database of the new system to allow it to be customized by a non-technical user within the new system.

### Migrating over the Disposition Infractions

Once the disposition infraction instruments have been created within the new system. The prior processes could be migrated over.

### Migrating over the User Accounts

The final step in the migration process. All of the important and relevant information from the old system has been either created within the new system or clean, migrated over and restructured within the new system. Therefore, the final bow on the process is migrating over the user accounts to the new system, allowing the previous users to have the ability to access the new system. 

This would be a little tricky but thankfully the migration would only take information from one table in the old system.

This process begins with two steps.

1. Creating each new user account in the new system by using the information from the old system's user accounts.
	2. Since passwords were obviously not stored in plain text and the hashing algorithm in the new system is significantly different, a new password would need to be generated for each newly created user account.

2. Linking each user account to its corresponding user information within the system and assigning the correct user role based on their user role in the old system.

### Conclusion

After this final step, the data migration is finally complete and since each step (of which there are 17) are simple scripts; the process can be executed over and over to effectively reset the testing data during development and it is also available for the final deployment of the new system when the old system becomes officially deprecated.
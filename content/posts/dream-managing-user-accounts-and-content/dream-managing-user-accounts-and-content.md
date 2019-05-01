---
title: "DREAM Series: Managing user accounts from within and content management."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-03-25"
featuredImage: "./featured.jpg"
featured: "false"
description: "Allowing administrative ability to govern user accounts and restructuring the content managed by the new system."
type: "post"
category: "Software Development"
project: "dream"
---

One of the key design requirements of the new system was to essentially remove the programmer element from the majority of the functionality of the system. Unless there was a reason for new functionality to be added or problems to be resolved, the system could grow and be managed by the activity of a user within the system itself. In the old system, user account management had to be handled by interacting directly with the database itself. This included tasks such as: **registering a new user account, changing user account details, changing passwords, and manually activating the user account**. In the new system, I allowed these actions to be performed in their own separate module responsible for managing all aspects concerning user accounts.

In the old system, there was a distinction between registered user accounts and their corresponding user details within this system. On registration, the user would choose their role and the system would perform a lookup in the database based on the chosen role to verify that the user account being registered was authentic. This user information was contained in several tables that differed by the type of user: **faculty, staff, clinical instructors, site supervisors, administration, and several student tables that differed by program.** 

In the new system, these entities were merged to differing degrees. Shared demographic information such as **name information, gender, race, birthdate, and basic contact information** that was common for faculty, staff, clinical instructors, and students were placed in one unifying **user demographic** table. On the next level common information between faculty and staff users was placed in a general **faculty** table, common information between all student tables was placed in a general **student** table, and common information between clinical instructors and site supervisors was placed in a general **clinical instructor** table.  Each of these next level tables would reference a single row of **user demographic** information. This would facilitate the cases where a single person or user had both student and faculty information. These cases would involve redundant information in the old system.

For students, in the old system, they would often belong to two or more tables. For example, if a student graduated from an undergraduate program and then entered a graduate program, their information would belong to two separate tables (the undergraduate program and the graduate program). There were also cases where the student information was repeated in the same table and simply differed by one value (such as the program). This was redundant and less than ideal. 

Therefore I extracted the properties for students that were subject to progressive change and multiple instances into their own separate tables. For example, student program information was moved to a separate table that could track the historical progress of the student as they changed programs based on their admission terms. The same was done for the student's residence and campus information.

For faculty, in the old database, title-related information, degree information, and more were simply fields on the same row of information that would often go unused. This information was also broken into their own tables allowing for a one-to-many relationship between the faculty information and the specified property.

For clinical instructors, their place of employment (school or institute) was tracked as well. In the old system, if a clinical instructor switched schools or institutes, this meant changing the value associated with their row of information in the database. This change could affect historical reports since the relationship to their old employment would be lost. By moving this relationship into separate tables, you could track the employment history of the clinical instructor.

Next was the information that was often shared between all types of users in a one-to-many fashion, this included licenses, completed degrees, certifications, organizations, all of which could be associated with the user and not a specific type such as student, faculty, or clinical instructor.

**All in all, this new user information would be represented in the system in the following manner:**

- Table for common user demographic information.
- Table for common general student information referencing the user demographic information.
- Table for common general faculty information referencing the user demographic information.
- Table for common general clinical instructor information referencing the user demographic information.
- Table for historical student program information referencing the general student table. 
- Table for historical student residence information referencing the general student table.
- Table for historical student campus information referencing the general student table.
- Table for faculty program information, which programs the faculty member is a part of.
- Table for faculty title information, what various titles the faculty member had.
- Table for clinical instructor school relationship information.
- Table for clinical instructor institute relationship information.
- Table for clinical instructor title information.
- Table to license information.
- Table for certification information.
- Table for organization information (e,g., honor societies, etc)
- Table to store the relationships between users and licenses.
- Table to store the relationships between users and certifications.
- Table to store the relationships between users and organizations.
- Table to store completed degree information for users.

**Simple Old System Database Example**

*Faculty Table*

|  First Name | Last Name | Birthdate  | Faculty Email | Faculty ID | Title 1 | Title 2
|--|--|--|--|--|--|--|
| John  | Adams  | 01/01/1970 |  john@faculty.com | 1234 | Instructor | Advisor

*Student Table*

|  First Name | Last Name  | Birthdate | Student Email | Student ID | Program
|--|--|--|--|--|--|
| John  | Adams  | 01/01/1970 | john@school.edu | 55555555 | B.A. in History
| John  | Adams  | 01/01/1970 | john@school.edu | 55555555 | M.A. in History

**Simple New System Database Example**

*User Demographic Table*

ID | First Name | Last Name | Birthdate |
|--|--|--|--|
| 1 | John | Adams| 1970-01-01

*General Student Table*

| ID | Student Email | Student ID
|--|--|--|
1 | john@school.edu | 55555555

*Student Program*

| ID | Program
|--|--|
| 1 | B.A. in History
| 1 | M.A. in History

*General Faculty Table*

| ID | Faculty Email | Faculty ID
|--|--|--|
1 | john@faculty.com | 1234

*Faculty Title Table*

| ID | Title
|--|--|
| 1 | Instructor
| 1 | Advisor

For the most part, all of the user information in the old system could be represented in the new system while removing any redundancy and also allowing the potential for more information to be added easily enough. 

However, there was more information to be tracked within the system that needed to be accounted for. For example, depending on the program of the student thus the table they belonged to in the old system, either their **ACT/SAT** or **GRE** scores would be tracked. There were also test scores called **PRAXIS II** scores that were actively tracked in the old system in a separate table entirely. These tests shared a similar structure: a main score and subsequent sub tests and scores. 

Therefore, I created a generalized structure called a **Student Test** which could be used to store the structure of any possible test based on the above. This would combine the **ACT, SAT, PRAXIS** tests and so forth into two tables that stored their structure and other details (such as possible score range, test code, and sub test descriptions). Next, I created a table that would store the students' results for these tests (and sub tests) by referencing the aforementioned tests and sub tests. Now this information could be tracked within the new system and associated with the student information.

Other content information tracked within the system was school information. In the old system, school information was tracked in a single table which sometimes contained duplicate school information that only differed by statistical information involving the school's student and faculty demographics and the year that these statistics were reported.

In the new system, similar to the students, faculty, and clinical instructors, the common school information was moved into its own table whereas the yearly report demographic information was moved to a separate table that referenced the general school information.

The other placement site type, institutes, were moved to a separate table that stored information specific to institutes only. Both schools and institutes had a one-to-many relationship to services that were performed at that site therefore each site type had a separate table to store these relationships as well.

**Incorporating this information in the new system introduced the formation of the following tables:**

- A test table for storing the student test top-level information. (e.g., GRE)
- A sub test able for storing the sub test information. (e.g., GRE Writing)
- A student test score table for storing the results to the test/sub test by the student.
- A general school district table.
- A general school table.
- Tables to store by-year reported statistical demographic and contact information.
- A table to store the relationships between schools and services performed at school.
- A general institute table.
- A table to store the relationships between institutes and services performed at the institute.

**Now all content related information could be represented and tracked within the new system. Better yet, the redundancy of information was removed and there is now more flexibility for growth and information captured (finite fields had been turned into separate tables). Information is now consolidated into self-explanatory buckets (all test scores belong to same tables instead of being mixed in with student information and spread across multiple tables). The system became a lot more robust in its ability to capture and track content information.**

Additional information to be tracked was also added to the new system allowing the system to track post-graduate employment information for students that had graduated from the institution. This included the addition or two tables: one to store the relevant information of the place of employment and another to store the relationship details between the student and the place of employment.

With all of this information, there needed to be a a way to manage and modify the information by the user. Therefore, the interface responsible for searching user information, creating new user information and modifying student, faculty, and clinical instructor information was added. Similarly, the interface for searching, creating, and modifying the other content items (e.g., student tests, schools, institutes, and employment) were created as well. 

Next, student users, faculty users, clinical instructor users, and users that didn't fall into either categories were given a comprehensive overview page that showcased the information that was being tracked within the system. 

All of these functional modules were grouped into a family of modules called "Content Modules".  
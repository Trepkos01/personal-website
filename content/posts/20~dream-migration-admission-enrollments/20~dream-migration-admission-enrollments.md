---
title: "Data Migration of Enrollment and Admission Data"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-05-10"
featuredImage: "./featured.jpg"
featured: "false"
description: "The next step included migrating over the admission tracking system information, enrollment information, user roles and permissions, and lastly the enrollment application settings. All in preparation for the migration of the assessment data itself."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---
In the last post on the data migration process for migrating the existing information from the old system to the new system; I covered the first **6** of **17** stages of the migration process which covers the creation of the organizational structure (e.g., department, programs, courses, terms, campuses) of the institution inside of the new system and migrating all of the content-related information from the old system to the new system (e.g., schools, institutes, students, faculty, clinical instructors, student tests, and more). The data migration process follows a specific order to ensure that relationships between related components are correctly constructed. An object which depends on a reference to another object is not created before the latter object is created and so forth. Also, given the nature of the information within the old system many actions were taken to format, sanitize, and ensure the accuracy and consistency of the information that was migrated over to avoid redundancy and unintelligible information. The information essentially had to be broken down, cleaned thoroughly, and restructured for the new system's database structure.

Once the content information had been migrated over, the next is the migration of **Admission Tracking System Information**.

### Migrating the Admission Tracking System

A late-comer feature of the old system, the admission tracking system was developed in the old system alongside the development of the new system.  As the popularity of the old assessment system grew, it began to take on new responsibilities, one such responsibility was the tracking of admission-related information and statuses for graduate programs for reporting purposes.

This information depends on the existence of prior migrated student and program information. 

**This migration involved moving data from the following tables in the old system:**
- A table responsible for storing the program requirements.
- A table responsible for storing the student's relationship to these requirements.
- A table responsible for storing the student's program admission status.

**Into database tables in the new system such as:**
- A table responsible for storing the centralized student's admission file.
- A table responsible for storing the student's requirement relationships.
- A table responsible for storing the student's program admission status changes.

A lot of the data in the old system was fairly clean and structured in a manner that allowed for an easy transition to the new system.

### Migrating the User Role Information.

Similar to the organizational information, user role information wasn't held in the database of the old system and much of its information (i.e., user roles and their permissions) were hard-coded in the source itself. Therefore, this migration doesn't involve actually migrating anything but simply creating the user roles and their permissions and other details based upon the hard-coded information in the old system.

The main stages of this process was:
- Creating the user role it self. This involved mainly outlining the details such as the user role's title and template (e.g., student, faculty, clinical instructor). However, there were some minor changes to be made such as:
	- In the old system, all undergraduate students fell underneath a universal "Undergraduate Student" role. In the new system, since a student role's program determines certain aspects of functionality in the new system such as which enrollment application they can access, this universal term was broken into its various program-specific equivalents.
- Creating the user role's permissions which also determined which modules the user role had access to from their navigational menu.
- Creating the user roles that the specific user role can create announcements to or email en masse.
- Creating the relationships between programs and user roles, if there are any.
- Adding which widgets would appear on a user role's home page.
- Adding any user role-specific "first log-in agreement requirements".

All of the above details were taken from the source of the old system. This information was also dependent on the prior creation of program information from the first step of the migration process.

### Migrating the Enrollments Information.

One of the bigger migrations, larger than all of the content-related information, is the migration of the historical enrollments information. Largely consisting of migrating all of the information contained in three separate tables in the old system responsible for holding all historical enrollment information differing by minor details (i.e., placement or none placement and programs) into one table in the new system responsible for holding all centralized enrollment information. Thankfully, the process was fairly straightforward and the information did not require too much white-listing and sanitization. The structure of the table in the new system was very similar to the a star schema and therefore the majority of the fields simply referenced rows in other fields so a multitude of look-ups were required when migrating a row of enrollment information.

### Migrating the Enrollment Application Settings Information

Similar to the user role information, none of this information was stored within the database of the old system and was primarily the concern of the source code itself. However, in the new system this behavior was moved out of the code and into the database allowing it to change without the modification of the source code itself (which was responsible simply for interpreting and executing upon the information stored in the database). 

**This creation process constituted of a few steps:**
- Creating the program-specific centralized enrollment application settings.
- Adding the custom text questions to these settings so that they can be responded to when submitting the application.
- Adding any additional supervisor role to an enrollment application.
- Adding any activities to the enrollment application settings, allowing the student submitting the application to choose relevant activities.

### Conclusion

The above **4** steps in the migration process essentially set up the information in the new system that would be critical for these next steps in the migration process; namely, the migration of the assessment data itself (the largest step) and other enrollment-bound information. Those steps will be covered in future posts.
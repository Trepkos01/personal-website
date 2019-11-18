---
title: "Data Migration of Organization and Content Data"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-05-06"
featuredImage: "./featured.jpg"
featured: "false"
description: "As development continued on the new system, I needed to migrate the information from the older system to the new system for both testing and the eventual deployment."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---

In the beginning of the new system's development, two points became painfully obvious.

- As I made changes to the functionality of the new system, I needed an automated way of testing the component that I made changes to without me manually repeating the same steps to test the functionality. 

- I needed some dummy information within the new system to accurately gauge the functionality of the system as it would be once it was formally deployed.

I covered my experience with automated testing in a separate post. (<a href='./dream-automated-testing-python-selenium'>See Here</a>) In this post, I talk about one of the more interesting problems that I would need to resolve with the new system. For starters, I recognized that I would need to create some dummy data within the new system to test its functionality completely, but I also knew that once the new system was to be deployed, the information in the old system would need to be migrated over to the new system.

I could begin working on the facilities responsible for this migration and it would also provide the dummy data that could be used to experiment and work with in the new system. Similar to my initial survey of all the functional requirements of the old system to determine the functionality of the new system, in this case, I would need to review all of the data in the database of the old system and determine how to transfer and restructure it to fit into the database structure of the new system.

The steps would also need to be easily repeatable so that I could wipe the data in the new system after the testing and development phase and perform the migration shortly before the initial deployment of the new system. 

This process began with first collecting a list of the tables in the database of the old system and dismissing any/all database tables that were not actively used in the old system in any capacity (oftentimes these tables were the result of spreadsheet imports and had no further use shortly after their import). 

Next, I would break out the stages of this migration based on the family of modules that the migrated data of that stage would impact and order these stages in the manner that each stage was dependent on the data migrated from the previous stage. This order and other details were collected in a text manual to aid in the repeat-ability of the steps of the migration process.

### So starting out, the first step, creating the organization.

This step didn't involve migrating over existing data from the old system's database, more-so it involved building up the organization structure of the institution in the new system. This created data would be referenced and used further in the migration process hence why this step would need to be the first. 

**This script was responsible for the following:**
- Creating the departments **(There's 4)**.
- Creating the degree programs **(There's 54)**.
- Creating the emphases **(There's 22)**.
- Creating the courses **(There's 59)**.
- Creating the hour types. **(There's 2)**.
- Creating the campuses. **(There's 5)**.
- Creating all the terms between **Fall 2000** and **August Intersession 2020**.
- Creating the one-to-many relationship between department and programs.
- Creating the many-to-many relationship between programs and emphases.
- Creating the many-to-many relationship between programs and courses.
- Creating the many-to-many relationship between terms and courses.
- Creating the hours information for each course.
- Creating the sections for each course.
- Adding activities to various courses.

Most of this information was hard-coded in the source of the old system.

### The second step, migrating over the school, institute, and student tests.

Our first step where we actually migrate over information from the old system's database to this system's database. This step was further broken down into three scripts responsible for migrating over the following the school information, institute information, and student test information respectively.

**Migrating the school information involved migrating the data from two tables:**
- A table that held both the school's basic information and changing demographic information. There would be multiple rows for the same school that only differed by the demographic information and the year that those details were reported.
- A table that held the Lat/Lng coordinates for each school. 

**Into four tables in the new system's database:**
- A table responsible for holding the district information.
- A table responsible for holding the school's basic information.
- Three tables for holding the year-based demographic and other information for the schools.

The query responsible for pulling the school data would need to create a consistency between absentee values which sometimes held different values (actual empty string, 0's, or null values) and a function that was responsible for formatting the phone numbers correctly. 

***Sanitization, consistency, formatting, and white-listing would be a concept revisited several times in this migration process.*** 

**Migrating the institute information was a much simpler process and only involved one table in the old system:**
- A table which held the basic institute information.

**This information was migrated to two tables in the new system:**
- The table responsible for the institute's basic information (name, address, contact details).
- The table responsible for storing the one-to-many relationship between institutes and services.

Migrating the student tests' structures were a bit more difficult. First, the structure for the ACT, SAT, PRAXIS, and other tests whose information was stored directly on the student's information in the old system's database was created ad-hoc first.

**The remaining student tests all came from one table:**
- This table's rows stored a student's results for various PRAXIS II tests. In an odd way, it also stored the structure of the tests themselves and their associated details such as the test name, sub-test names, maximum score, sub-tests maximum scores.
- **But there were problems with the above data:** 
	- First of all, the structure of the tests was represented by the fields of the table (of which there were 8), if a test only had 4 sub-tests then 4 of the fields would be empty. Therefore, the script should only add the four non-empty fields of information as viable sub tests.
	- Next, in many cases there would be no max score given for the test so this would be estimated as the ceiling of the possible test scores for that test; the same for the various subtests.

**This data was migrated over to the new system into two tables:**
- The table responsible for holding the base student test information.
- The table responsible for holding the various sub-test information.

When the scripts were executed, the school, institute, and student test information of the old system was effectively cleaned and restructured in the new system.

### The next step involved migrating over the student information.

**This step would be responsible for migrating over the bulk on student information contained within six tables:**
- Four tables for storing the student's demographic and general information.
	- Each table of student information concerned students belonging to a collection of different programs and their structure differed on certain details that were only relevant to those programs.
- The same student test information table from before, however, now we're concerned with the results rather than the structure.
- A table that stored the student's license numbers.

**This information would be migrated over to eight tables:**
- A table responsible for moving over the student's demographic information.
- A table responsible for the student's general information.
- Three tables responsible for the student's chronological program, residence, and campus information respectively.
- A table that stored individual license information.
- A table responsible for storing the student user's license information.
- A table responsible for storing the student's student test results information.

**There were quite a few obstacles that needed to be overcome to promote a seamless migration of clean and accurate information:**
- Some student information was duplicated between the different student tables in the old system. Typically, this happened when a student changed programs. Therefore, instead of creating a new student in these cases, this would only require an additional entry in the different chronological tables (program, residence, campuses).
- Sometimes the email addresses would be truncated by the table's field length and the remainder would need to be automatically added based on the cutoff point.
- Sometimes the email addresses included the "mailto:" prefix denoting that the original person simply copied a hyperlink when entering the email address originally. This would need to be removed.
- In cases where the email address wasn't known, the original user would simply input some variation of "no-email@...", these variations needed to be handled and treated consistently.
- Other cases, the email value was unintelligible (e.g., 'x', 'null', 'n/a', 'not available'), these cases needed to be flagged in the migration process and handled accordingly and not migrated over to the new system.
- Date format needed to be consistent, often birth dates and other dates would be of form 'mm/dd/YYYY' or 'YYYY-mm-dd', the script would make all dates of the format 'YYYY-mm-dd'.
- Phone numbers would need to be formatted properly.
- **There were many cases where a field's data would need to match the options available in the new system**
	- Example: 'm', 'man', 'male' = "Male", 'f', 'woman', 'female' = "Female"
- There were cases where in a couple of tables two or more fields represented the program information rather than one field. This needed to be handled as well.
- Handling empty values consistently. Sometimes empty values would be either an empty string, the actual string "null" of some capitalization variety, an actual null value, or an 'x'. These would all constitute a null type value in the new system.

**Many of the above obstacles would be encountered in future data migration of other user entity information.**

Once the script responsible for executing this stage in the migration was completed, the new system would have all non-redundant student information in a clean and consistent manner.

### The next step involved migrating over the faculty information.

The process was very similar to the above but concerned only faculty information.

**This faculty information would come from four different tables:**
- A faculty table that held demographic and related information per faculty member.
- A administrative table that held demographic and related information for administration members.
- A staff table that held demographic and related information for each staff member.
- An advisor table that held demographic and related information for each advisor.

**This information would be migrated to four different tables:**
- The base user demographic table.
- The table responsible for holding general faculty information.
- The table responsible for holding faculty title information.
- The table responsible for holding users' degrees information.

**Many of the obstacles above were present here as well. But additionally:**
- If the faculty's demographic information was already migrated (they were previously a student), this demographic information wouldn't be repeated.
- Faculty title and degree information were treated as finite fields associated with their row of information in the old system. Oftentimes these fields would be empty (i.e., 'No degree') or have a value such as: 'no', 'null' which would also translate to 'No Degree', these cases would need to be ignored and only cases where the field had a valid value would be treated in the manner of adding the degree to the faculty user's information.

### The next step involved migrating over the clinical instructor information.

**This step would be responsible for migrating data from two tables:**
- A table storing the clinical instructor's basic information.
- A separate table storing the clinical instructor's information for a separate department.

**This data would be migrated over to twelve tables:**
- The table responsible for storing the basic demographic information.
- The table responsible for storing the general clinical instructor information.
- The two tables responsible for storing the clinical instructor's school and/or institute information respectively.
- The table responsible for storing clinical instructor's title information.
- The table responsible for storing license information.
- The table responsible for storing certification information.
- The table responsible for storing organization information.
- The table responsible for storing users' degrees information.
- The table responsible for storing users' license information.
- The table responsible for storing the users' certification information.
- The table responsible for storing the users' organization information.

This process was handled similar to the previous user entity type migrations with the additional details of the clinical instructor's site information. However, clinical instructors had licenses, certifications, and organizations that would need to be created first ad-hoc in their own tables before being added to the clinical instructor user's information.

This was straightforward for licenses and certification, however a clinical instructor could belong to multiple organizations which would be represented as a string in their field of form: "PBS, CBS, ABC, FOX". 

Thus after every possible organization was created, the clinical instructor's organization field would need to check for matches between the different organizations' abbreviations and the contents of the field itself before creating the relationship between organizations and clinical instructor users in the new system.

Once again, after this script was executed. Non-redundant, consistent, formatted, and sanitized clinical instructor information now populated the new system.

### The next step involved migrating over the principals information.

The last and definitely least of the migration steps that ensured that all principal had their own corresponding user information in the system. Since they were not students, faculty, or clinical instructor, this process involved simply migrating any principal information from the old system's school information table into the base user demographic table in the new system to create a new user entity (this is if the principal wasn't a student or any other user type which would mean that his/her information had already been migrated over).

### Conclusion of the Organization and Content-related Data Migration

After the completion of the previous six steps, all organization and content-related information had been cleaned and restructured into the database system of the new system. This would be the first 6 of 17 steps to complete the entire data creation and migration process.
---
title: "Assessment data gathering through assorted instruments."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-04-12"
featuredImage: "./featured.jpg"
featured: "false"
description: "The most important functionality of an assessment system is the gathering of data for the purpose of assessment, this is the responsibility of the assessment instruments."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
--- 

The purpose of the assessment system is to collect information regarding students for the purpose of assessing the effectiveness of the various programs in accordance to their respective standards that are required for accreditation purposes. The responsibility of this data collection is the enterprise of tools called **Assessment Instruments**.  

In the old system, **Assessment Instruments**, took many forms; mainly specialized surveys where each question had multiple choices (in most cases). The structure of these instruments were also represented identically within the database requiring each instrument (and there were many) to have its own table to store its results where each field in the table represented a question in addition to other details. Anytime a new instrument was to be created, a new table would need to be created based around the structure of the instrument. Additionally, a new PHP file would need to be developed to generate and handle the functionality of the instrument. Similarly, to view the results of a submission would require a new PHP file to display the individual submission of the instrument based around the structure of the instrument as it was represented in the database.

If questions changed on the survey, then the responses of previous submissions for that question would take on new meanings in accordance to that change. If questions were added or removed, these changes would be reflected in the fields of the instrument's database table and those new fields would be empty in previous submissions if new fields/questions were added or historical data would lost if fields/questions were removed.

Another type of instrument within the old system required a student to submit hours and then an evaluator would approve or reject those hours similar to a time sheet, allowing this quantitative hours information to be tracked within the system. And last but not least, were attendance instruments which allowed an evaluator to mark a student's status in relation to specific dates. These types of instruments also had their own individual tables per each instrument. The main workhorse of the system were the survey-like instruments described in the previous paragraph. 

In the old system, there were multiple ways to access an instrument to submit it for a student. Either you could submit it through a course that you were supervising a student in in some capacity (as a faculty or clinical instructor) or in some cases, instruments were accessed from the main menu where you simply supplied the ID of the student that you wanted to submit it for and then choose the appropriate instrument. 

When accessing by courses (or enrollments), the relationship between courses and instruments were stored within the database. However, access based on user role was handled within the source code itself. Similarly, instruments were only accessible within specific date ranges or for specific terms, this was also handled within the source code. Any changes to this access would need to be made within the code itself. There was also a special case where multiple forms essentially were responsible for submitting portions of the same instrument and each form had its own special access requirements. 

Sometimes the date of submission would determine a submitted value of instrument. If an instrument was submitted within a specific date range, its submission would be marked as "Midterm", otherwise it would be automatically marked as "Final". This behavior was also described within the source code and would require the code itself to be modified to change. 

Previewing an instrument would require spoofing faux information when approaching the instrument to bypass its permissions.

**For the new system, I wanted to make the following changes...**

I wanted to disconnect the necessity for a developer to add or modify certain details of an instrument. No longer would a new instrument require additional tables or files to be created. Therefore, all information regarding instruments' structure and responses could be contained within a static collection of tables and files. 

This meant that I would need to create a database structure generalized enough to handle the structure and behavior of all instruments used within the old system. First, this required me to create three distinct types of instruments based on the multitude of instruments within the old system.

1. The **Standard Instrument**, aptly named, this would be the general survey-style instrument prototype that the majority of the old system's instruments are similarly structured.
2. The **Capture Hours Instrument**, this would be the time sheet-style instrument prototype.
3. The **Attendance Instrument**, this would be the date-based instrument prototype. 

Each instrument shared information such as the long/shorthand version of its title, submission instructions, its active/inactive status (which would be the top-most access control mechanism) and its type (e.g., 'standard', 'capture hours', 'attendance').

The management and functionality of each instrument type would self-contained in their own modules. There was a **Standard Instrument Management Module**,  an **Attendance Instrument Management Module**, and a **Capture Hours Instrument Management Module**.  Each module contained the behavior for creating/modifying instrument details, previewing the instrument, submitting instrument details, and viewing individual submission reports for each instrument.

**Capture Hours Instrument**

The Capture Hours Instrument would have dual role types that interacted with the instrument: the evaluatee who would submit the hours and the evaluator that would approve/reject the hours. When a user creates a new Capture Hours Instrument, they would have the ability to designate which user role accessing the instrument would handle which role type within the instrument. 

Another setting that they could modify for each instrument they created is the type of hours (e.g., 'direct', 'indirect') that the evaluatee could select when submitting their hours and if submitted hours would be approved upon submission or pending.

The evaluatee would choose a day, start time, end time, and type of hours and submit it to create an entry that would either be approved by default or pending. When the evaluator accessed the instrument, they would see a listing of entries that they could either approve or reject.

**Attendance Instrument**

The Attendance Instrument also had its own special settings that were generalized enough that similar instruments within the old system could be created within the new system and retain their behavior. For example, when a user created a new Attendance Instrument, they could select the start date and end date that the instrument would span. They could also explicitly determine the select options available to be chosen for each date and if that option would be chosen by default (i.e., I want the choices to default to 'Present'). 

Additionally, there were cases where the attendance instruments differed by the day of the week that the observation would be made. For example, Attendance Instrument 1 should only allow for Mondays, Wednesdays, and Fridays to be marked where as Attendance Instrument 2 should only allow for Tuesdays and Thursdays to be marked. Therefore, the user creating the instrument could explicitly determine which days of the week the instrument should display.

The evaluator accessing the instrument would only see drop-down options explicitly described by the user creating the instrument for each date within the explicit range of dates based on the explicit days of the week for that instrument. Once he submitted the instrument, he could return and change his submission until he no longer had access to that instrument. 

**Standard Instrument**

The next type of instrument is the Standard Instrument, however it deserves a separate blog post.

**Instead of creating a new database table for each new instrument, the instrument information could be stored in the following tables:**

- A monolithic centralized instrument table that stores the shared attributes of each instrument regardless of type.
- A table for storing the different hour types for various **Capture Hours Instruments**.
- A table for storing the different role types for each user role that has access to the various **Capture Hours Instruments**.
- A table for storing the **Capture Hours Instruments** instrument-type specific settings.
- A table for storing the **Attendance Instruments** instrument-type specific settings.
- A table for storing the different status options for the various **Attendance Instruments.**
- A table for storing the weekdays that the various **Attendance Instruments** should observe.

**These tables were responsible for creating the instruments and describing their behavior, but what about the actual responses?**

Each instrument type's submissions are stored in two tables: a submission table and a response table. The submission table stores the primary submission information such as the instrument, evaluator, evaluatee, their user roles, the enrollment (if present), and the submission timestamp (the ID information for these properties that refer to their separate information stored in their respective tables). 

The actual submission responses themselves are stored in the instrument type's separate responses table. Unlike the submission field which differs only slightly by instrument type (evaluator is missing from the Capture Hours Instrument Type submission table); the responses tables for each instrument type only share the instrument submission ID field that refers back to its parent submission.

For example, an attendance response includes the date of observation and the status of the observation. 

A capture hours response is more complicated as it includes the date of the entry, the start and stop times of the entry (used to calculate the total hours of the entry), the type of hours, the status of the hours (e.g., 'pending', 'approved', 'rejected'), the evaluator of the entry (if the entry has been evaluated), and the evaluation timestamp (if the entry has been evaluated). 

**However, all of these submissions and their corresponding responses could all be stored within four additional tables:**

- A table for individual submissions for **Capture Hours Instrument**.
- A table for the **Capture Hours Instruments**' submissions' responses.
- Same as above for **Attendance Instruments**.
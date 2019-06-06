---
title: "DREAM Series: Student Life Cycle Reports"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-06-06"
featuredImage: "./featured.jpg"
featured: "false"
description: "One important functionality of the assessment system is the ability to generate statistical reports for students in each phase of their academic careers such as Admission, Enrollment, and Graduation."
type: "post"
category: "Software Development"
project: "dream"
---

In previous posts, I mainly detailed the components of the new system responsible for actually entering data into the system. However, one of the most important components of the system is the ability to generate reports on the information entered within the system. In previous posts, I detailed the functionality of the ***Standard Instrument Aggregate Reports*** and the ***Standards Aggregate Reports*** both robust reports that exclusively concern the data from the collection of **Standard Assessment Instruments**. Other notable reports are those responsible for detailing individual submission information for **Standard, Capture Hours**, and **Attendance** reports. However, in this post, I will describe many of the smaller reports that were either available in the old system or whose existence was necessitated by the presence of the information the new system.

**I separate these smaller reports into the following groupings:**

- Student Life Cycle Reports
	-- Admission Reports
	-- Enrollment Reports
	-- Graduation Reports
- Statistics Reports
--  Clinical Instructor Statistics Reports
-- Disposition Infraction Statistics Reports
-- Enrollment Statistics Reports
-- Faculty Statistics Reports
- Integrity Reports
-- Expired Insurance Reports
-- Late Reports
-- Background Check Reports
 - Misc. Reports
 -- Admission Documents Tracking Reports
 -- Enrollment Evaluation Reports
 -- Placement Information Reports 

### The Student Life Cycle Reports 

In the old system, there were three reports responsible for displaying statistical information regarding the student information within the system based on certain details of that student at certain stages in their collegiate careers: the admission reports, enrollment reports, and graduation reports.

The primary difference between these reports were the properties that the reports could draw statistical information from. We'll look at each report in detail starting with the **Admission Reports**.

In the old system, a user could generate an **Admission Report** by choosing the academic year (e.g., 2010-2011) and the collection of fields (e.g., gender, race, age, admission category, transfer status, ACT, SAT), and how we wanted the report to structure the report (e.g., simple listings, grouped listings).

Simple Listings were straight forward. Given the field, it would simply display the count or average and count based on the type of fields.

**For example by choosing the fields *Race* and *Age*:**

***Field:** Race*

| Value | Statistic |
|--|--|
| **White** | 10 (33.3%) |
| **Black or African American** | 10 (33.3%) |
| **Asian or Pacific Islander** | 10 (33.3%) |
| **Total:** | 30 |

***Field:** Age*

| Value | Average | Count |
|--|--|--|
| **Age** | 30.3 | 24 |

Grouped Listings were a little more complex as it would essentially group field values and then display the statistical information. 

**Using the same field criterion from above, the Grouped report would look similar to the following:**

| Race | Count | Age |
| -- | -- | -- |
| **White** | 10 | 28 |
| **Black or African American** | 10 | 31 |
| **Asian or Pacific Islander** | 10 | 32 |

*As you can imagine, the more grouped fields chosen, the longer the reports would be to accommodate all possible combination of field values.*

**When creating this report in the new system, I decided to make the following changes:** 

- Instead of limiting the criteria to academic year, the user can specify a range of terms based on their start and end date and capture the information for students admitted to a degree program within that range.

- The user can also filter to draw reports for students admitted to specific programs and emphases within the above range.

- In the old system, the user could generate averages for the following tests: ACT, SAT, PRAXIS. These choices were hard coded in the source for the system. In the new system, the list of possible tests to generate averages from are generated from the list of Student Tests created elsewhere in the system.

**Other fields remained the same as the old system:**
- Gender
- Race
- Age
- Admission Category
- Full/Part-Time
- Campus
- Residence Country
- Residence State
- Residence County
- Admission GPA

Some fields contain discrete categories (e.g., Gender, Race, Admission Categories) whereas others result in averages (e.g., Age, Admission GPA, the various chosen Student Tests); so this distinction needed to be made when handling the information for that field.

Instead of allowing an option to choose **Simple** or **Grouped** listings. 

**The behavior of the report would be the following:**

- The user would choose the range of terms, and a collection of fields of anything from statistical fields (e.g., programs, race, gender) to averages fields (e.g., age, gpa, student tests) and generate the report.
- The initial reports would be separated by programs and emphases with one report that would encompass all programs and emphases.
- The structure of the report would consist of the statistical field values and their counts followed by the averages fields and their averages.
- The user could then proceed to drill down further by selecting the field value, this would result in a new report shown for strictly that program and emphasis (or all programs and emphases) and the averages would be recalculated for for students that share the same field value that the user had chosen when they drilled downed.
- This drill-down method could be further applied until the chain of grouped-by values has been exhausted.
- This drill-down method allows the user to control how they wish to combine field values rather than seeing all possible combinations at once in a lengthy report as the old system did.

This is an example of the Admissions Report but it is the universal behavior for all Student Life Cycle reports. 

The only difference between the reports is how the data is collected (i.e., students admitted between YYYY-mm-dd and YYYY-mm-dd, students graduated between..., students enrolled between...) and some of the fields (i.e., admission GPA vs. graduation GPA).






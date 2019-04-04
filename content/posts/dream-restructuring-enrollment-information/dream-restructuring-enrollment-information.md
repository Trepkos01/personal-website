---

title: "DREAM Series: Restructuring and managing enrollment information."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-03-29"
featuredImage: "./featured.jpg"
featured: "false"
description: "One important functionality of the assessment system is to capture assessment data attached to distinct enrollments or courses. Unfortunately, different programs treat the process of creating and managing these enrollments differently."
type: "post"
category: "Software Development"
project: ""
---

In the old system, faculty and clinical instructors were responsible for submitting assessment data for students enrolled in courses that they were actively supervising in some capacity. These enrollments were separated in three different tables. 

- One table was responsible for storing information for enrollments that actively involved the students being placed at a placement site and supervised by a clinical instructor.
- One table was responsible for storing information for enrollments that did not involve a placement.
- One table was responsible for storing enrollment information for a separate program entirely. This table followed the structure of the first table closely but included some details (additional fields) that were specific to that program.

**The structure of these tables are very similar. They each share the same common details:**

- The academic term (e.g., Fall 2010) of the enrollment.
- The course (e.g., HIST 101) of of the enrollment.
- The section (e.g., Section 1 Oxford) of the enrollment.
- The student who is enrolled in the enrollment.
- The faculty member supervising the course.
- Withdrawal status of the enrollment.

**However, they differ with the following details:**

- Placement Site (e.g., Lakewood High School), in the placement enrollments table.
- Clinical Instructor who is supervising the student placed at the above placement site, same as above.
- Doctoral student supervisor, in the enrollments table for the separate program.
- Several 'activity" fields, in the enrollments table for the separate program.
- 'Clinical', 'Site', and 'Other' Hours fields, in the enrollments table for the separate program.
- 'Pending' and 'Approved' fields that seem to share the same purpose.

Based on the above information, I would need to create the necessary database structure capable of storing this information in a much more generalized fashion.

**First, I created an enrollments table containing the following information:**

- The academic term.
- The course.
- The section.
- The student.
- The faculty supervisor.
- The clinical instructor (optional).
- The placement site (optional).
- The withdrawal date.
- The enrollment status.

**Some additional information in this table that is not found in the original tables include:**

- User roles for students, faculty, clinical instructors which would determine which enrollments were visible to the user based on their current acting role.
- The program information which determines which site type (i.e., school or institute) that the enrollment information references.
- Enrollment grade (an optional detail if the institution decides that they would like to track the grades of the enrollment in the system).

Of course, to avoid redundancy, all fields referencing terms, users, placement sites, programs, and roles simply reference the original information in their respective tables.

**This takes care of most of the details for each enrollment, however to take care of the case where the separate program includes a doctoral student supervisor and multiple activities, I created three additional tables.**

- A table responsible for storing the one-to-many relationship between enrollments and additional supervisors (defined by the system ID for that supervisor and the user role necessary for supervising the enrollment). This allows an administrative user in the system to add multiple additional supervisors to an enrollment rather than simply limiting it to one as the old system did for the doctoral student supervisor.

- A table responsible for storing the one-to-many relationship between enrollments and activities. Similar to the above, by moving this relationship to a separate table allows for more freedom in adding more relationships rather than the hard set number of 'activity fields' associated with a row of enrollment information as found in the old system.

- A table responsible for storing the one-to-many relationship between enrollments and services. This was a new optional relationship added to the system that wasn't actively tracked in the old system. Unlike activities, services do not have a separate table storing their distinct information.

Now the core enrollment information can be tracked within the new system and many of the small peripheral details can be tracked efficiently in separate tables.

Along with the changes in the database, the interface necessary for viewing, managing, creating, and modifying enrollment-specific information was also created. This would allow an administrative user to be able to interact with the enrollment information without accessing the database directly itself, a common theme for the system is allowing users to have somewhat complete control in working with the information within the database.

For users within the system who are interacting with the enrollments as students enrolled or faculty/clinical instructors, their approach would be different. 

In the old system, faculty and clinical instructors responsible for submitting enrollment-bound assessment information for students would first navigate to a page responsible for showing the unique courses that they were currently supervising within that term based on the enrollments they were currently supervising. If they clicked on a course hyperlink, it would bring them to a page that listed the students that they were supervising within that course and a collection of hyperlinks for the instruments they were allowed (or suppose to) to submit for each student.

In the new system, this approach is similar. On the menu of each student role and any other role that has the specified permission is the link necessary for navigating to a page that shows the unique courses that they are either enrolled in (as a student) or currently supervising (as a faculty, clinical instructor, or even as an additional supervisor). This listing is populated based on the current acting user role of the user.

Instead of the next page showing the student supervised within that course and their instruments to submit, it shows the enrollments for that course that they are actively supervising and two separate links: one to navigate to a read-only page showing all of the enrollment-specific information, and one to a "date entry" page which shows the basic enrollment information and the instruments they have access to for submission and any other pathways to enter data specific to that enrollment.

Also on the page showing the list of enrollment supervised is the ability to send a mass email to the students of those enrollments, the clinical instructors of those enrollments, and even the school principals if those enrollments are placement enrollments where their placement sites are schools.
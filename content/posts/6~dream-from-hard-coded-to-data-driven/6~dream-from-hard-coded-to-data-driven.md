---
title: "Organization from a hard-coded solution to a data-driven customizable solution."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-03-22"
featuredImage: "./featured.jpg"
featured: "false"
description: "Separating the structure and content of the system from the code itself to allow for complete customization."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---

When I was initially hired to work on the re-design of the system, I was informed that there had been attempts to take the pre-existing system and essentially custom fit it to work with another institution. During this process, it was discovered that the existing system would be incredibly difficult to mold into a similar solution for another institution since most of the institution-specific behavior was embedded within the code itself. Likewise, it would require the other institution to have a software developer available to make any necessary changes to the system with the introduction of new programs, instruments, and other information.

Therefore, it was my plan to take these hard-coded aspects of the system that determined the structure and behavior of the system and move them to the database. Starting with what I would call the configuration table, the self-explanatory one row table that would contain the most important setup information necessary for the functionality of the system.

**This table included universal settings and labels for the entire system such as:**

- The root URL of the system for absolute URL construction.
- Institution name to be displayed throughout the system and on generated content.
- SMTP mail settings.
- Landing page text and error page text that appears on  all error pages in addition to specific error message.
- Date format for all dates that appear throughout the system.
- Longitude and latitude coordinates of the institution.
- Timezone.
- System message which would appear to all users logged into the system.
- System status level that can control access for all non-administrative users in the system.
- Contact email that is visible throughout the system.
- Academic start month (which is used to determine the academic year of created academic terms based on their start dates, explained further)

Better yet, an administrative user would have the ability to modify these settings if necessary and the effects of these changes would propagate throughout the entire system. With the previous system, many of these changes would require multiple visits to different files and scouring the entire code base to determine that all instances had been correctly modified; typically done by someone with some degree of programming knowledge.

**Next I wanted to create some way for another institution to be able to build up their organization within the system, loosely based on the requirements of our own institution and the existing system.**

To begin this, I would need to identify the main components of the institution's organization, their features, and their relationships with each other. Understanding this took a bit of visiting the existing system and understanding the institution itself and how it interacted with the older system.

It was determined that the institution was comprised of **Departments** which were detailed simply by their name. Each **Department** had one or more degree **Programs** which was detailed by the title of the **Program**  and two attributes: classification (e.g., undergraduate, graduate) and site type (i.e., are students placed and assessed at other schools or institutes).

This organization could easily be represented by three tables. A **Department** table which would contain information specific to each department, **Program** table which would contain the information specific to each program, and a table to store the one-to-many relationship between **Departments** and **Programs** which simply stored the unique ID pairs. 

In the old system, the department and program information were fields in the student's demographic information that were often used for controlling access to certain instruments and for statistical report purposes. In every instance, full-word querying was used within the code itself which made modifying department or program information taxing as changes would need to be manually propagated throughout the entire code base.

In the new system, I broke out both as their own structural components and decoupled the dependence on their descriptive fields such as the department name or program title allowing changes to those details to not affect their relationship or behavior within the code since they would be handled by their ID in both cases (granted their ID values would never be directly referenced in the code itself). ***Essentially the purpose of the code would be to behave according to their relationship represented in the database, agnostic to the values themselves.***

**This was a principle that I had going forward to achieve this strictly data-driven behavior of the system. I did not want any concrete referencing of information held within the database.**

The next components to consider included **Courses** which would have the following attributes: the abbreviated course number (e.g., HIST 101), the long title (e.g., Introduction to History), if a course is a placement course or not (does this course involve a student performing student teaching at a placement site). 

In the old system, courses were simply referred to by their abbreviated course numbers in both the code itself and also within the database in tables where course information was necessary. 

**Courses** could be shared between **Programs** therefore they had a many-to-many relationship with **Programs** thus they would need two tables; one to contain the information specific to each distinct **Course** and one to contain the relationships between a **Course** and **Program** based on their unique ID pairs.

From a temporal approach, another important component were academic terms (e.g., Fall 2010) and academic years (e.g., 2010-2011). These were often referenced for the purpose of querying information based on when it was submitted rather than using conventional date time values or something with a more precise resolution. 

I would combine the two components into one by creating a **Term** component that had the following attributes: a description (e.g., Fall, Summer, August Intersession), the start date and end date of the **Term**, and the starting academic year and ending academic year (i.e., these would be auto-generated during the creation of the **Term** based on the academic start month described in the settings above). The full **Term** description would also be concatenated with the year of its start date (i.e., Fall with a start date of '2010-08-01' would become 'Fall 2010'). 

Allowing a **Term** to be described by a range defined by a start and end date would also allow for easier querying for reporting of items with datetime specific submission properties; it would also allow the system to determine the **Term(s)** currently active based on the current date and adjust its characteristics accordingly. 

**Courses** would only be offered during specific **Terms** (i.e., HIST 101 is only available in Fall 2010) so this relationship would need to be represented within the system in its own table. Therefore, the new tables would include the **Term** table which contained the information for each distinct **Term** and the table responsible for containing the unique ID pairs between **Terms** and **Courses**.
 
 The next component of the institution's organization would be its **Campuses**. In the old system, these were simply a field in the student's demographic information and part of a course's section description. In the system, I would break this detail out into its own component with its own location-specific information and contact information in addition to its name. 

To avoid unnecessary redundancy in the database, I created a separate **State** and **Country** table that could be used for reference purposes in the attributes associated with the **Campus**.  These new tables would also be helpful for any future components with location-based attributes that include **State** and **Country**.

For the most part, campus information was only necessary for reports in the old system. 

So now we have the base components for an institute to represent their organization within the new system. **Departments** have **Programs** which share **Courses** offered in specific **Terms** across multiple **Campuses**. But the old system also utilized some additional properties that would need to be offered within the system as well. 

For example, degree programs had specific emphases. Therefore I created an **Emphasis** component which had a simple description attribute and the two tables responsible for storing the distinct **Emphases** information and the many-to-many relationship between **Programs** and **Emphases**. 

**Courses** also had more properties that needed to be represented within the new system. 

A **Course** had associated **Hours** information. In the old system, this **Hour** information was represented by additional fields related to the **Course** information; however this was neither scalable nor easily customizable. Rather than have two fields titled "Field Experience" and "Credit" with numerical values associated with the **Course** row information in addition to the **Course's** abbreviated information and so forth; I created a separate table titled **Hour** which would contain hour-specific information then another table to represent the relationship between the **Courses** and **Hours** and also the amount of hours to associate with that relationship. This way, a user could add new **Hours** and relationships without having to change the structure of the **Course** table.

**Courses** also had **Activities** therefore I used the same approach as the above by breaking out this relationship in two new tables: one for the **Activity** and one for the relationship between the two components. 

As mentioned above, **Courses** would have many sections associated with it. In the old system, this was represented in tables as a simple text string; but because of this the same information would often be entered inconsistently (i.e., Section 1 Oxford would be Section 1 - Oxford or sometimes just Section 1). I decided to control this to an extent by allowing the user to create sections for a course by supplying a label (e.g., 1, 1A) and campus. This information would be stored in a separate table that contained a reference to the **Course** and the label and campus information of the section.

Therefore, a row of  1 - 5 - 1 would be translated by the system to mean HIST 101 - Section 5 Oxford where the ID for **Course** HIST 101 is 1 and the ID for the  **Campus** Oxford is 1 and the label of the section is 5. This would enforce some consistency in the section's representation (though the label is still open-ended for institutions that prefer other ways of labeling sections such as 1A, B, or something else).

Now the new system can contain all of the organization information and relationships represented in the old system but in a manner that decouples the information from the code itself and allows for the organization to grow,change and change relationships differently based on the interaction between a user and the data rather than a programmer and the code. 

**This included creating the following 18 tables to store this organization information.**

- Configuration
- Department
- Program
- Department-Program
- Emphasis
- Program-Emphasis
- Program-Course
- Course
- Course-Section
- Hour
- Course-Hour
- Activity
- Course-Activity
- Term
- Course-Term
- Campus
- State
- Country

Next was simply creating the interface responsible for modifying this data. This was broken into **six** functional components (which would later become modules): System Settings, Department Information Management, Program Information Management, Course Information Management, Term Information Management, and Campus Information Management.
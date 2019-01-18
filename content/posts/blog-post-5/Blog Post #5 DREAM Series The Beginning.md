---
title: "DREAM Series: The beginning of the design and development of a complete new system."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2018-01-01"
featuredImage: "./featured.jpg"
featured: "false"
--- 
Following the theme of my poor interview experience (See "Nothing Excites You About Technology?"). I was asked to describe my previous/current work experience.  Honestly, I thought that this would be an incredibly exciting topic to delve into over the phone (if not a topic that would require a great deal of time to exhaustively explore). I was in-fact in the twilight period of developing the remaining functionality of this project in the midst of its initial deployment. It would be fantastic to reflect on some of the challenges and design choices I had made from the beginning and if those choices could have been better (yes).

But funnily enough, after being asked to divulge a bit of detail on this experience, the flood of information basically all came at once. I found myself lacking a ideal starting point. Do I simply go over my experience in chronological order? What information is necessary and interesting? What information isn't?

> Where do I start?

During the interview, I basically just pulled a few examples of my professional work from the experience into my mind and began, however, I found myself backtracking because the lack of prerequisite information made the experience detail incomprehensible. 

So this series is to speak to my experience in developing this "DREAM" system in some organized manner. If I'm ever asked to go into detail over my experience, I'll be better prepared in understanding the order of information to present. If the person wishes for more information, I can always refer to this series.

**Now to begin.**

I was hired by the School of Education in 2015 to the position of Systems Analyst III, the position of my previous manager as a graduate assistant. Though a Systems Analyst role make entail many different definitions, I would have a technical role in the maintenance and development of their Online Electronic Assessment System **(EAS)**. I would also have extra-curricular duties such as general data retrieval and report generation for cases outside of the current functionality of their **EAS**. 

When I was hired, I had a graduate assistant underneath my management (my old assistant-ship position). My boss informed me that he had plans to allow other institutions to use our **EAS**, however there were many obstacles that made these plans incredibly difficult. Primarily, the **EAS** was developed in-house and was structured around an even older system that was based upon an Microsoft Access database. This older system defined the back-end structure of the system's MySQL database. The server-side code was a large number of PHP files which were the result of the contributions of many graduate Computer Science students who held the graduate assistant-ship role over the previous years; all stuffed within one directory.

As such, much of the institution details were hard-coded into these files. Nothing was abstracted away or generalized enough for an easy carry-over to another institution. Additionally, new features, data, and changes resulted in extensive changes to the actual procedural code within the PHP files. Scalability became an issue as additional content required additional tables in the back-end and additional files within the main system's directory.

Data within the database was oftentimes either incomplete, unintelligible, or redundant, or a combination of the three. But this was to be expected given the origins of the system. From a user's perspective, the system operated as it should. But underneath, these issues were very apparent; and there would need to be significant architectural changes to allow for the system to become a more open-ended one-size-fits-all solution for other institutions to potentially use.

I was extremely excited to take the reigns of such a task. I would have full autonomy as the single developer and architect of the system; and the idea of creating something that would potentially be useful to many other institutions in the long-run seemed exciting. 

To start things off, I began to list some broad requirements that I had gathered from my conversation with the Dean and my own personal requirements.

- Update the UI of the **EAS** to match the rest of the University's website.
- Allow the **EAS** to be navigable on all possible screen sizes.
- Reduce the amount of back-end additions and changes that would be necessary with the occurrence of additional content. 
- Minimize the amount of technical work needed to modify the content and other details of the **EAS**.
- Minimize the number of file creation and modification needed to affect changes in the **EAS**.
- Generalize the **EAS** enough that the system could be used by other institutions with minimum setup and migration time.
- Sanitize the existing data and remove any occurrence of redundant information. 

I was still in the beginning stages of my own professional career, so this was a fairly large undertaking with my little-to-no experience of taking a project of this scale from design to deployment. I was bound to make mistakes from both an architectural and implementation perspective from my inexperience alone. Unfortunately, being the sole contributor to such a project doesn't allow for the opportunity to learn under the mentor-ship from a more senior person. 

Despite that reality, this would provide a great learning experience.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk4ODcwNjkwNCwtOTQwODI2MjQ0LDczMD
k5ODExNl19
-->
---
title: "DREAM Series: The Standard Instrument Aggregate Reports"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-04-29"
featuredImage: "./featured.jpg"
featured: "false"
description: "Once we have the assessment information present within the system from the multitude of Standard assessment instruments; we are ready to generate reports on this information. One type of these reports is the Standard Instrument Aggregate Reports."
type: "post"
category: "Software Development"
project: ""
---

In previous entries, I discussed the primary functionality of the assessment system; the ability to collect information through components described as assessment instruments of which there are three varieties: Capture Hours, Attendance, and the most common, Standard. Besides the basic report that simply displays the standard instrument's submission. One of the more popular reports in the old system was the **instrument aggregate reports**.

The instrument aggregate reports were an instrument-specific report that simply displayed the # of responses associated with a rubric choice for each indicator for a specific instrument. This report was generated based on either the academic year or academic term and a choice to view reports for responses on students for a specific program or all programs or a combination of both. Additionally, the percentage of responses to a specific indicator's rubric choice was also available to better represent which rubric choices held the majority of responses.

Using this information, users can determine how large groups of students in specific programs for specific terms are scoring on specific indicators for a specific instrument. However, in the old system, since the structure of the instrument was different from instrument to instrument and each instrument had its own database table for its responses; each instrument also had its own aggregate report in its own source file that hard-coded the structure of the instrument to display with the report.

Also, these reports simply worked with Rubric type indicators with discrete rubric choices and did not include any Select or Number type components (as discussed in earlier entries when detailing the generalized structure of the Standard Instrument).

**Once again, my plan was to make the following changes:**

- Consolidate all of the code responsible for producing this aggregate report into a single module that could handle any possible standard instrument created, allowing the user to determine which instrument he/she could generate reports from. Therefore, every time a new instrument is created, a new file responsible for creating the associated aggregate report wouldn't also need to be created.
- Make the report more robust. Given the way that I structured the response data in the new system. I wanted to expand upon the limited term, academic year, and program criteria for generating reports.
	- Instead of selecting a specific term, the user could select multiple terms.
	- Instead of selecting a specific program, the user could select multiple programs.
	- They could also further filter the responses for the report by adding the evaluator and evaluatee's user role (i.e., "we only want responses by Clinical Instructors"), 
	- Or they could specify details of the evaluatee in their criteria such as race and gender.
	- Or broaden their criteria to departments rather than programs, or narrow it to specific emphases in programs.
	- Or additionally, responses belonging to students at a specific campus.
- And more information, in addition to the distribution of responses (and their percentage) for an indicator among-st available rubric choices, you could also have the the total number of reponses for that indicator and the average score for that indicator.
- Number and Select type indicators would also be included, where their Score Sub-ranges and Select Choices would be the distribution points respectively. 
- Text and Date type indicators would also be available on the report but statistical distribution and averages would not be available for this information, users could drill down to view the responses' values.
- The ability to drill down the report further to view the individual responses for an indicator or the individual responses for a specific choice or score range for that indicator.
- And lastly, the ability to filter the responses further based on the score or choice of another indicator by clicking the choice header in the report. (i.e., 'I want to see the aggregate report of all indicators for students who received a '5' on indicator 1).

**This new report would give the user more options to deduce trends and make credible judgments on the aggregate collection of data from various standard instruments. Adding a drill-down ability would add another layer allowing the user the ability to investigate the individual responses for a specific indicator based on the response value of that indicator. Additionally, the user could also view the overall performance on an instrument in relationship to those submissions where a specific response value was received for an indicator.**

**And best yet, there would be no need for a technical developer to add to the source of the system just to accommodate a newly created standard instrument.**
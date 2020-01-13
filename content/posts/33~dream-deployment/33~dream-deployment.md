---
title: "Deployment and Reflections"
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-06-24"
featuredImage: "./featured.jpg"
featured: "false"
description: "The conclusive chapter on the DREAM series which followed many of the design and implementation choices that I encountered and made during its long development. Finally, deployment was at-hand and the system would undergo the full load of interactions which would expose any blind spots that were sure to exist from such a large project developed by only one developer. Despite this, the deployment went incredibly well."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---

In August 2018, the doors finally closed on the old Assessment System. I'm not completely clear on when the old Assessment System was originally released however judging by some comments in the oldest files, I can estimate it dating back to 2010-2011. Relatively young, all things considered. It grew over time to accommodate multiple requirements and additions and modifications from multiple graduate assistants until its final summer in 2018.

Nevertheless, the new Assessment System had formally entered design and development in August 2015 and would formally be deployed in August 2018 to begin the 2018-2019 academic year. Ever since being hired as the full-time employee for the university, my responsibility had been the joint development of this new system and the maintenance of the old system. The data migration process outlined in previous posts would be executed one final time to ensure that all remaining most recent information would be migrated over to the new system prior to launch. 

The previous **Spring** and **Summer** I had conducted workshops with the faculty and staff to help facilitate a smooth transition to the newer system and to also help them familiarize themselves with the new interface; creating a sandbox for them to work within before the system officially launched. The **Winter** before that, I had finished creating a **Usage Manual** totaling nearly *300* pages detailing all of the functionality of the new system in a manner that it could be easily partitioned and distributed in a ***Quick Guide*** format for certain roles; it would serve as a training tool for the aforementioned workshops.

For the most part, all of the functionality for the new system was complete and ready for launch barring a few specialized reports which were later completed and had no bearing on the functions of the system that would be mostly hit. And that was the plan, I wanted to see how the system would bend and where it would basically break with the workload of being hit by hundreds of users. Since the system was very large relative to the number of active developers (i.e., one), this was my best bet of discovering potential issues that I may have overlooked in testing and development. And for the most part, the deployment went smoothly with only superficial issues that required resolution.

**So looking back....**

Though I am tying a bow on this series, it is obvious that the new system will continue to grow in some capacity. There will be new bugs and issues uncovered as the system remains live and continues to be hit consistently. However, in this section I wanted to reflect a bit on some points, things that I may have done differently now, obvious shortcomings, so forth.

For starters, though the entire experience of designing, developing, and deploying a large system as the sole developer is exciting. There are some obvious shortcomings to this approach such as: as a *cowboy coder* you generally do not have to appeal to technical management for your implementation decisions. Some may argue that this is a good thing since constant appeals stifle development, but as a fairly junior developer, you do not have that correctional mentor to expose your blind spots, naivete, or poor design/development decisions. The project progresses and performs to your competence level only. 

You're essentially teaching yourself through your own experience but if you're not careful you'll find that you may artificially limit your domain to only the areas that you're familiar with and not explore possible solutions that lay outside of your immediate expertise. Similarly, as a *cowboy coder*, you do not have the collaborative experience of working on a full software development team that commonly use agile methodologies to perform development sprints, schedule stand-ups, and so forth.

Though, I did use a git-based version control system for the development of the system. Merging branches and pull requests were unnecessary because I was the sole developer on the code base. I had also introduced my own official naming conventions for the various languages and developmental use cases (i.e., file names, directory names, etc) but since I was the only developer, it was almost superfluous. 

From the very beginning, I shied away from using any existing PHP frameworks. I simply did not want to be limited by the framework itself and preferred the simplicity of using vanilla PHP. I also believed that this would make future development and deployment by other institutions easier because it would not require the personnel to learn a framework nor would the system will be dependent on the lifespan and support of the framework. Though I had no interest in reinventing the wheel, I also tried to limit my usage of external libraries primarily depending only on jQuery for client-side interface-related functionality and a couple of PHP libraries for the SMTP batch emailing functionality and HTML sanitation. 

For the most part, the technology stack was incredibly basic and definitely not in vogue with most current web development technology stack. PHP, JavaScript, and MySQL. 

There is a very clear separation in layers for the system with JavaScript and AJAX in combination with PHP Script services responsible for handling dynamic page content, PHP responsible for generating the page itself, and the MySQL database responsible for the structure and storage of the system's information. 

The core functionality of the system is held in its ***modules*** which are directories structured in the following manner:

- module directory
    - javascript directory for holding JS functionality scoped to that module only.
    - templates directory for holding PHP or HTML template files scoped to this module only.
    - classes directory for holding PHP classes scoped to this module only. 
    - The primary landing page PHP file for this module.
    - Any page generation PHP files that contain the business logic for this functionality of pages for this module.
    - Any PHP-based services scripts used by AJAX calls scoped to this module only.

Most of the pages' functionality is fairly straight-forward and could be easily substituted with another server-side language. Most of the pages are simple forms that follow a Post/Redirect/Get pattern and change templates based on the execution of the page.

**The system's structure itself is pretty straightforward.**

- A CSS directory responsible for holding all globally scoped CSS files. (There is a separate responsive CSS file)
- An images directory which stores the globally scoped image files.
- A JavaScript directory for system-wide JS files.
    - A Shared directory for intra-module JS files that are not system-wide.
- A PHP directory for system-wide PHP files.
    - A classes directory for globally scoped PHP classes.
    - A functions directory for globally scoped PHP functions.
    - A services directory for globally scoped PHP services for dynamic content.
- A 'lib' directory for holding external proprietary libraries.
    - A directory for the JS libraries.
    - A directory for the PHP libraries.
- A 'Widgets' directory for storing the individual widget PHP files for the home page.
- An 'Assets' directory for storing information that didn't fall into any other category. (i.e., PDF files)
- A 'Modules' directory for the groups of modules, the key functionality of the system, whose structure is described above.
- Files and templates responsible for the basic external functions and features such as the landing page, registration, logging in, logging out, the home page, and any globally scoped UI components.
- A 'Page Components' directory that is responsible for storing the files for the components that structure every system's page.
    - A 'Footer Components' directory which stores the files responsible for loading the necessary footer content. (i.e., JS scripts and so forth)
    - A 'Header Components' directory which stores the files responsible for loading the head content. (i.e., styles).
    - Other page components include an external/internal header where the internal header has the responsibility of handling any header-prioritized functionality after a user logs in and starts a new PHP session (it is also responsible for security precautions), and a global header and global footer which imports the functionality present on in the header and footer of all system pages.

My original plan during the design and development of the new system was to make it as plug-and-play adaptable as possible, keeping the core functionality and interface within a work space that could be inserted into any institution's existing theme or layout and the organization of the above page components was to ensure this ability.

In the end, the statistical size of the new system could be described in the following way:

| Code | Lines | Files |
|--|--|--|
| **Application Code** | 63684 | 934 |
| **Testing Code** | 18523 | 104 |
| **Database** | 6915 | 1 |
| **Extra** | 47017 | 114 |
| **Total** | **136139** | **1153** |

Are there things that I would have done differently? Sure. There's an adage that says that if you don't look at code that you've written three months prior with some degree of disgust then you haven't grown as a programmer. In hindsight, I wish I would have followed a more disciplined TDD approach. I wish I adhered more-so to Automattic's WordPress PHP Guidelines. But altogether, it's been an enjoyable learning experience and I am happy to contribute a worthwhile and robust solution for my employer and I am also thankful for their allowance of full autonomy and time to ensure the completion of this project for them.
 







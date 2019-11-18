---
title: "User roles, system design, and access control management."
tags: ["dream", "architecture", "legacy code", "computer science", "PHP", "MySQL", "jQuery", "LAMP"]
date: "2019-04-04"
featuredImage: "./featured.jpg"
featured: "false"
description: "One of the key features of the system is the ability to grant and limit the interaction between users and different functionalities of the system. This required revisiting the overall design of the system and how user roles were handled."
type: "post"
category: "Software Development"
project: "dream"
series: "DREAM Series"
---
In the old system, the user was responsible for choosing their user role upon registration. As you may expect, this could be abused such that a user could choose a user role which they didn't actually belong to. This problem was resolved by performing a lookup in various tables based on the chosen user role to verify that the registering user actually chose the correct user role. 

In the new system, user role assignment was completely decoupled from the registration process. It would be the responsibility of another more administrative user to determine the correct user role for a registered user.  General role information was stored in a separate table which detailed the role's title and the template for that role: Student, Faculty, Clinical Instructor, Administrator, Other. This template information governed some basic behavior within the system for each role regardless of any defined permissions. For example, all registered users with information in the system would have access to their own **Overview** page which would show their information collected within the system; however the template would determine if a **Faculty Overview, Student Overview, Clinical Instructor Overview, or Other User Overview** page would be served up. There are other examples where the behavior of a page, or the visibility of certain details on the page would change in response to the template of the user's acting role.

Additionally, in the old system, if the user belonged to two user roles or more then this would necessitate the registration of two user accounts or more with each one associated with a specific user role. Oftentimes this was accomplished by simply prefix-ing the login email address in some manner and then removing the prefix after logging in so that the valid email address was still used within the system itself.

In the new system, the relationship between registered users and specific roles were stored in a separate table allowing a one-to-many relationship between registered users and user roles at the discretion of the administrative user responsible for assigning user roles. Once the user logged in to the new system, they had the ability to switch between their assigned roles while logged in. This choice would define their **Acting Role**.

In the old system, the user role would determine the home page which the user would be redirected to after logging into the system. This home page would simply be a menu populated with choices that defined the different aspects of the system. If you wanted to add additional access to a certain feature in the system for a user role, you would have to manually copy/paste the menu option on the home page for that user role. For added security, many pages would restrict access by a conditional check for the user roles that should have access to that page, therefore you would often have to modify the page's source file to add the new user role to the condition.

**Obviously this wouldn't be ideal following my vision of disconnecting the programmer from the system for all cases except when a new feature would need to be added. I needed a way to basically allow a user to shut on/off access to details and features within the system itself. This is the progression of my design choices.**


In the beginning, I had initially planned for two separate interfaces within the new system. The first interface would be the **Administrative** interface while the second would be the **User** interface. The **Administrative** interface would be accessed by any user with an administrative user role. Its responsibility would be most of the system-oriented tasks of the system such as the system's global settings, creating/modifying the organizational structure of the system (e.g., departments, programs, courses, etc), user role management, and content management (i.e., adding new students, schools, clinical instructors, etc), defining enrollment application settings, and managing user account information. 

The **User** interface would be the interface of the users interacting with the system based upon these changes and what they could see and do were dependent on the actions of the **Administrator**. In my mind, I envisioned something similar to WordPress's Admin/Visitor dualist approach. After about a quarter of the way through implementing the functionality for this **Administrative** interface, I changed course.

I took the functionality of the administrative interface and broke them out into modules, or functional units that were responsible for separate and distinct aspect of the system.

**Instead of:**

- Admin
*-- System Settings
-- User Account Management
-- Role Management
-- Department Management
-- Program Management
-- Course Management
-- Enrollment Application Settings Management
-- ...*
- User
*-- Enrollment Application
-- ...*

**The structure would group the modules into families of modules that were closely related in some manner:**

***- Modules***
**--- System Modules**
*-- System Settings
-- ...*
**--- Account Modules**
*-- User Account Management
-- ...*
**--- Role Modules**
*-- Role Management
-- ...*
**--- Enrollment Modules**
*-- Enrollment Application Settings Management
-- Enrollment Application
-- ...*
**--- Organization Modules**
*-- Department Management
-- Program Management
-- Course Management
-- ...*

An administrative user would have access to all of the modules whereas another user role's access would be defined by their permissions. Role permissions would be defined for a specific role within the **Role Management** module by either an administrative user or a user with a user role with the permission to add or remove permissions from a user role.

Originally, access control was defined similar to how access to system objects were controlled on Linux systems. I would have a bitmask that defined a specific action and for each module, a user role would have a permission level for a given module that could determine what aspects of that module would be available to that user. Within the code itself, bitwise operators would be used to determine the access based on the permission level for that module associated with the user's acting user role.

**As modules became more complex, I abandoned this approach for the following:**

I created a table which would store the individual module information such as the module's name, the module's family, and the landing page for the module.

Next, I created a permissions table which stored individual permissions defined by their actions, the module that they belong to, and if the permission constituted the presence of a menu item on the user's navigational menu. 

For the user responsible for defining the permissions for a specific user role, they would choose which permissions the user had by essentially choosing which actions the user role could perform in the system. If a chosen permission had the menu item option included then a relationship between the role and module which the permission belonged would also be created; this would include the module on the user's navigational menu.

The reasoning for this separation between menu-access and permission is because oftentimes we would want to give the user role access to a specific portion of a module but not the entire module itself. 

For example, given the module **Program Management**:

- **Program Management**
-- View Programs (Module Landing Page)
-- View Program Information
-- Create/Edit Program Information 

We may want to give the user role the ability to view the program's read-only information but not access to the entire module or its landing page which allows the user to view all programs' information. Of course, the user would need further permission to access the "Create/Edit Program Information Page".

When the user attempts to access a page, it would fetch the list of permissions based on the user's acting role. Next, the page itself will check for the presence of certain permissions specific to that page to determine which portions of the page to display accordingly or even if the user role has access to the page altogether.

In this manner, access control is completely dependent on permissions rather than specific user roles, allowing more flexibility to change permissions for different user roles without touching the code.

**As for the navigational menu...**

In the old system, the navigational menu was only present on the home page that the user was redirected to after logging in. If the user wanted to visit another portion of the system that they had access to, they would need to navigate back to this home page to access the navigational menu. 

Obviously, this isn't ideal so I simply made the navigational menu always-present regardless of the user's position in the system. It would be an expandable/collapsible menu that could be hidden from the work space whenever the user did not need to access it. The "Change Role" interface would be a similar always-present header over the work space. If the user chose to change their role, it would redirect them to the home page shortly after changing their role. 

The navigational menu would be a nested menu with individual links to modules constituting the sub menu items of the module family that would constitute the primary base menu items. Each navigational menu would have a default "**Personal**" item which would contain a link to the module responsible for modifying registered user account information. Student user roles would also contain a default menu item labeled "**Current Enrollments**" which would link to their current enrollments (if any) for that current semester.

Now that the menu had been removed from the main portion of the home page, I needed something to fill the empty space. I decided to introduce the concept of **Widgets** or read-only dashboard components that could be added/removed from the user's home page based on their user role. As the system grew, new **Widget** choices could be added.
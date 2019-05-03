---
title: "DREAM Series: Automated Testing with Python and Selenium"
tags: ["dream", "architecture", "legacy code", "computer science", "python", "selenium", "automated testing", "unit tests"]
date: "2019-05-03"
featuredImage: "./featured.jpg"
featured: "false"
description: "As the new assessment system grew in both scope and functionality, I began to explore different avenues to automate repeated tests through the browser's interaction with the user interface."
type: "post"
category: "Software Development"
project: "dream"
--- 
In the beginning of the new system's development, two points became painfully obvious.

- As I made changes to the functionality of the new system, I needed an automated way of testing the component that I made changes to without manually repeating the same steps to test the functionality.
- I needed some dummy information within the new system to accurately gauge the functionality of the system as it would be once it was formally deployed.

For the first point, I settled on using browser-interactive automated testing using Selenium-bindings and corresponding Python scripts. Since this was early in the development of the system, the structure of the system was still fairly small and I was able to effectively recreate this structure in the testing suite using the **Page Object** approach, where each page and its components was represented as a page object.

Each page within the system was represented by a class that inherited its basic functionality from a "Base Page: super class. Similarly, each interactive component on the page was also represented by a class that inherited its basic functionality from a "Base Element" super class. 

The page class was responsible for essentially navigating the web driver (initialized in the test script and passed to the class via its constructor function) to the page via the URL, initializing instances of the page's UI component classes, and defining the class methods responsible for executing various functions on that page. 

The page's UI components had their own individual classes which located the actual HTML element by using a global dictionary. The key in the dictionary would be referenced in the component's class to locate the element in the page and typically never changed, if the page element's ID changed in development, this change would be made to the value in the global dictionary itself and not the key. This way, the component classes in the test scripts were not dependent on the actual ID of the element in the page itself.

**An example of a page object.**
```python
class EmailElement(BasePageElement):
	def __init__(self):
		self.locator = locators["login.email"]
	def __set__(self, obj, val):
		element = selenium_web_driver.find_element_by_id(self.locator)
		element.send_keys(val)
#The password field element.
class PasswordElement(BasePageElement):
	def __init__(self):
		self.locator = locators["login.password"]
	def __set__(self, obj, val):
		element = selenium_web_driver.find_element_by_id(self.locator)
		element.send_keys(val)
#The actual loginPageObject
class LoginPageObject(BasePageObject):
	email = EmailElement()
	password = PasswordElement()
	#Set up the web driver, navigate to the page and assert that the correct page has loaded, if this page has been navigated to from a prior page
	#then pat yourself on the back, otherwise direct the web driver to the page URL.
	def __init__(self, web_driver):
		self.web_driver = web_driver
		try:
			self.assertIn("Login", self.web_driver.title)
		except AssertionError:
			self.web_driver.get(system_url + "login.php")
			self.assertIn("Login", self.web_driver.title)
	#Submit the login credentials.
	def submit(self):
		element = self.web_driver.find_element_by_id("submit")
		element.click()
	def navigate_to_forgot_password(self):
		element = self.web_driver.find_element_by_id(locators["login.forgot"])
		element.click()
```
		
**The Global Dictionary**
```python
#Locators are used to easily identify elements on the webpage.
#[Page].[element]
locators = {}
#-----------------------------------------------------------------#
#						External System							  #
#-----------------------------------------------------------------#
#-- Frontpage Locators --#
locators["frontpage.signin"] = "signin"
locators["frontpage.register"] = "register"
#-- Login Locators --#
locators["login.email"] = "email"
locators["login.password"] = "pass"
locators["login.submit"] = "login"
locators["login.forgot"] = "forgot"
#-- Register Locators --#
locators["register.email"] = "email"
locators["register.password"] = "password"
locators["register.confirm_password"] = "confirm_password"
locators["register.title"] = "title"
locators["register.fname"] = "first_name"
locators["register.lname"] = "last_name"
locators["register.mname"] = "middle_name"
locators["register.submit"] = "submit_button"
#-- Forgot Password Locators --#
locators["forgot_password.email"] = "email"
locators["forgot_password.submit"] = "submit"
```

Different UI components had different behavior and this behavior had to be programmed into the class methods for that UI component. Most were already supported already by Selenium (text fields, number input, select fields), but some UI components such as the datepicker required additional code.

**An example of the datepicker element class:**
```python
    class TermStartField(BasePageElement):
    	def __init__(self):
    		self.locator = locators["term_create_edit.term_start"]
    	def __set__(self, obj, val):
    		pass
    	def __get__(self, obj, cls=None):
    		return self
    	def pick_date(self, day, month, year):
    		#Focus on the date field to bring up date picker widget.
    		element = selenium_web_driver.find_element_by_id(self.locator)
    		element.clear()
    		element.send_keys("")
    		#Get navigational controls.
    		go_previous_month = selenium_web_driver.find_element_by_class_name("ui-icon-circle-triangle-w")
    		go_next_month = selenium_web_driver.find_element_by_class_name("ui-icon-circle-triangle-e")
    		#We first approach the correct year.
    		current_picker_year = int(selenium_web_driver.find_element_by_class_name("ui-datepicker-year").text)
    		while current_picker_year != year:
    			if current_picker_year > year:
    				go_previous_month.click()
    			else:
    				go_next_month.click()
    			go_previous_month = selenium_web_driver.find_element_by_class_name("ui-icon-circle-triangle-w")
    			go_next_month = selenium_web_driver.find_element_by_class_name("ui-icon-circle-triangle-e")
    			current_picker_year = int(selenium_web_driver.find_element_by_class_name("ui-datepicker-year").text)
    		#Next we approach the correct month.
    		current_picker_month = months[selenium_web_driver.find_element_by_class_name("ui-datepicker-month").text]
    		while current_picker_month != month:
    			if current_picker_month > month:
    				go_previous_month.click()
    			else:
    				go_next_month.click()
    			go_previous_month = selenium_web_driver.find_element_by_class_name("ui-icon-circle-triangle-w")
    			go_next_month = selenium_web_driver.find_element_by_class_name("ui-icon-circle-triangle-e")
    			current_picker_month = months[selenium_web_driver.find_element_by_class_name("ui-datepicker-month").text]
    		#Then we select the correct day.	
    		selenium_web_driver.find_element_by_link_text(str(day)).click()
```

This regressive approach to building tests and unit tests is a far-cry from the traditional test-driven development approach; however I was unaware of the concept of TDD at this point in the system's development. I simply wanted a way to test the functionality of normal user interaction with the system and the Selenium bindings seemed best suited to accomplish this.

Once all page objects for the system at this point in development had been created, I created a series of unit tests for each page responsible for testing the most basic use-cases of each page. Next, I created integration tests as a way to test the interaction and integration between multiple modules or functional pages within a single module rather than simply concerning myself with unit tests on a single page. 

Some of these integration would later serve as a utility for the data migration in the future.
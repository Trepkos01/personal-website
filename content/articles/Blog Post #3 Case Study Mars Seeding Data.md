---
title: "Case Study - Seeding Data into a Crowd-Sourced Application."
tags: ["ruby", "mars", "rails", "postgresql"]
---

One of the classic issues with a crowd-sourced web application is the chicken-egg problem of attracting users to generate user-generated content without actually having any user-generated content to begin with. In this example, I attempt to seed the web application with as much information as possible; however given the granular nature of this information (restaurant menus), the extent of this seed data is the relevant restaurant information (name, address).

**The following relevant Ruby/Rails/Ruby Gem and Python/Package versions used in this case study are:**

- **Ruby 2.2.6**
- **Rails 4.2.6**
- **Python 3.4.4**
- **Geocoder 1.22.4**
- **Selenium 2.52.0**
- **Psycopg2 2.6.2**

Starting out, I began my search for a public facing data set of restaurants to utilize for this seeding process. There are probably plenty of purchase-able data sets of restaurant information available, however since I am operating on a total budget of $0; I can not afford to actually purchase a sophisticated data set to utilize in populating my web application. Therefore, my search is limited to sources where this information is readily available to the public; this does carry the added risk of inconsistent, redundant, or incorrect information that would not be normally found in professionally organized data sets. In these scenarios, it is ideal to have a feedback feature allowing users to report such data-specific errors. After scouring the web for such a data set, I managed to find a search engine on the website, http://www.citysearch.com, which would allow me to narrow my search down to location-specific restaurant information.

Next, I would need some way to efficiently extract or scrape the relevant restaurant information from the website. Around the time that I was working on this problem, I was also playing with the selenium bindings for Python on my work project therefore utilizing selenium in a Python script was fresh on my mind and seemed like an interesting approach to scraping the restaurant information from the website.

So this script would take the city, state, and a limit (expressed in the number of restaurants scraped) as command line arguments. Each page of results on this search engine displays 10 results; therefore the limit of restaurants defined on the command line and the number of results per page determines the estimated runtime of the script. On each page load, the restaurant information is scraped from the web page and the resulting restaurants are added to the global array of restaurants.

*In restaurant_web_crawler.py*

  

    # Get the city and two-letter state abbreviation from commandline.  python restaurant_web_crawler memphis tn 3000
	    city = sys.argv[1]
        state_abbrev = sys.argv[2]
	    restaurant_number_estimate = sys.argv[3]
    
    # Download this driver from https://sites.google.com/a/chromium.org/chromedriver/downloads
	    driver = webdriver.Chrome('chromedriver_win32/chromedriver.exe')
	    driver.get("http://www.citysearch.com/search?what=restaurants&where=" + city + "%2C+" + state_abbrev)
    
    # Wait for page to load.
	    driver.implicitly_wait(2)

	    array_of_restaurants = []
	    theoretical_page_limit = int(int(restaurant_number_estimate)/10)

	    print("Finding restaurants for " + city + ", " + state_abbrev)
	    print("Looking for " + restaurant_number_estimate + " restaurants roughly " + str(int(restaurant_number_estimate)/10) + " pages.")

	    for page in range(1, theoretical_page_limit+1):
		    for x in range(1, 11):
    
		    try:
			    grab_page_data(x)
			    driver.implicitly_wait(1)
    
			# Sometimes the page 404s, just reload the page and continue.
		    except NoSuchElementException:
			    driver.get("http://www.citysearch.com/search?what=restaurants&where=" + city + "%2C+" + state_abbrev + "&page=" + str(page))
			    driver.implicitly_wait(1)
    
		    # Try again.
    
		    try:
			    grab_page_data(x)
			    driver.implicitly_wait(1)
		    except NoSuchElementException:
			    # If it fails again, just write the list and exit.
			    write_list_to_file_and_exit(city + "_" + state_abbrev + "_restaurants")
		    
		    next_link = driver.find_element_by_id("pagination.link.next")
		    next_link.click()
	  	    driver.implicitly_wait(2)
    
    write_list_to_file_and_exit(city + "_" + state_abbrev + "_restaurants")

  

The restaurant information is scraped from the page information using the 'xpath' to the page elements containing the name, address, city, and state information for the restaurant. The locational information is then combined in an address string which is geocoded using the geocoder package for Python (there are request limitations based on the provider). This allows me to access the important latitude/longitude information necessary for the geolocational search functionality in the web application for that restaurant. If all of this information is successfully retrieved, a new restaurant object containing this information is added to the array.

*In restaurant_web_crawler.py*

    class restaurant:
    
	    def __init__(self, name, address, lat, lng):
		    self.name = name
	        self.address = address
		    self.lat = lat
		    self.lng = lng
		    
		def grab_page_data(restaurant_no):
		    name = driver.find_element_by_xpath("//*[@id='naturalResults." + str(restaurant_no) + ".name']/div[1]/div/div/h4/span[1]").text
		    address = driver.find_element_by_xpath("//*[@id='naturalResults." + str(restaurant_no) + ".address']/span[1]").text
		    city = driver.find_element_by_xpath("//*[@id='naturalResults." + str(restaurant_no) + ".address']/span[2]").text
		    state = driver.find_element_by_xpath("//*[@id='naturalResults." + str(restaurant_no) + ".address']/span[3]").text
		    
		    if name.find("CLOSED") == -1:
			    location_string = address + " " + city + " " + state
			    location_geocoded = geocoder.google(location_string)
    
			    print(name + " " + location_string + " (" + str(location_geocoded.lat) + "," + str(location_geocoded.lng) + ")\n")
    
			    if location_geocoded.lat != None and location_geocoded.lng != None:
			        array_of_restaurants.append(restaurant(name, location_string, location_geocoded.lat, location_geocoded.lng))

Once the data traversal is complete, the information in the array is stored in a text file which can be used in the future without having to re-execute the process.

*In restaurant_web_crawler.py*

    def write_list_to_file_and_exit(filename):
    
	    target = open(filename + ".txt", 'w')

	    for restaurant in array_of_restaurants:
		    target.write(restaurant.name + ";" + restaurant.address + ";" + str(restaurant.lat) + ";" + str(restaurant.lng) + "\n")
	    target.close()
	    
    exit()

  

When executing this script, I simply used fairly local locations for retrieving restaurant information such as: Oxford, MS, Memphis, TN, Tupelo, MS, Biloxi, MS, etc. I estimated the restaurant limits for these locations by determining at which point the search engine on the website began to primarily return restaurants in neighboring cities rather than the city queried. After executing this script over several local locations; I had multiple text files containing restaurant information which would need to be added to the web application. Therefore I created a second script whose primary purpose was to directly add the restaurant information to the database back-end of the web application (the original implementation actually was a script which individually added each restaurant through the web application's web interface via selenium bindings as well).

*In restaurant_mass_entry.py*

    import psycopg2
    import uuid
    import sys

    try:
	    conn = psycopg2.connect("dbname='' user='' host='' password=''")
    except:
	    print ("I am unable to connect to the database.")
	    
	filename = sys.argv[1]
	with open(filename + ".txt") as f:
	    restaurants = f.readlines()
	    cur = conn.cursor()
	    user_id = "0f1212f3-343d-4f3c-a553-4a695133525f"

    for restaurant in restaurants:
	    id = uuid.uuid4().hex
	    restaurant_details = restaurant.split(";")
	    restaurant_name = restaurant_details[0]
	    address = restaurant_details[1]
	    lat = restaurant_details[2]
	    lng = restaurant_details[3]
	    
	    print("Inserting " + id + " " + restaurant_name + " " + address + " " + lat + "," + lng + " " + user_id)
	    cur.execute("INSERT INTO restaurants (id, restaurant_name, address, lat, lng, active, created_at, updated_at, user_id) VALUES (%s, %s, %s, %s, %s, %s, current_timestamp, current_timestamp, %s)", (id, restaurant_name, address, lat, lng, True, user_id,))
  
    conn.commit()

  

This process was pretty straightforward, I just created a script which read each line of the input file (defined by the command line argument), parse the line on the semicolon delimiter, then execute an INSERT query on the database with the restaurant's information (the tokenized line as an array), and a generated ID for the restaurant, and my user's user ID manually added to the script.

With this all completed, the web application now had 2366 restaurants....and one meal. Progress!

However, there would need to be some method of showing this information to the user or more importantly, showing the locational information to the user. I wanted to add the detail on the home page showing the user exactly how many cities, states were currently covered by the web application's content. To extract this information from the data set, I utilized the following queries on the controller action for the index (landing page) of the web application.

*In app/controllers/main_controller.rb*

  

    def index
	    @current_restaurant_count = Restaurant.all.size
	    @current_meal_count = Meal.all.size
	    locations = ActiveRecord::Base.connection.execute("SELECT DISTINCT substring(address from '[A-Za-z\s]+,\s[A-Z]{2}') AS location FROM restaurants WHERE random() < 0.01 LIMIT 10")
	    locations_result = locations.values
	    @locations_string = locations_result.map{|l| l[0].tr(',','') }.join(",")
	    results = ActiveRecord::Base.connection.execute("SELECT COUNT(DISTINCT substring(address from '[A-Za-z\s]+,\s[A-Z]{2}')) AS num_cities FROM restaurants")
	    @cities_count = results[0]['num_cities']
	    results = ActiveRecord::Base.connection.execute("SELECT COUNT(DISTINCT substring(address from ',\s[A-Z]{2}')) AS num_states FROM restaurants")
	    @states_count = results[0]['num_states']
    end

  

**@current_restaurant_count** and **@current_meal_count,** very straightforwardly, returns the total number of restaurants and meals currently within the system.

    SELECT DISTINCT substring(address from '[A-Za-z\s]+,\s[A-Z]{2}') AS location FROM restaurants WHERE random() < 0.01 LIMIT 10

Above is a query which uses the regular expression **'[A-Za-z\s]+,\s[A-Z]{2}'** to extract the city and state from the address string; the query extracts a random collection of city and states per execution.

On each page load of the main index page of the web application, this collection is generated and translated into a string to be displayed on the main index page.

    SELECT COUNT(DISTINCT substring(address from '[A-Za-z\s]+,\s[A-Z]{2}')) AS num_cities FROM restaurants
    
    SELECT COUNT(DISTINCT substring(address from ',\s[A-Z]{2}')) AS num_states FROM restaurants

The above queries are responsible for returning the current total of distinct cities and distinct states, respectively. The standard ORM of Rails is bypassed to execute these standalone queries.

The above information helps convey the content of the application to new users who navigate to the index page of the website. So now I have a foundation of restaurant information available for the web application as well as the presence of this information communicated directly to the user upon their visitation of the page.

<!--stackedit_data:
eyJoaXN0b3J5IjpbNjQ1MDk2Nzc2LDczMDk5ODExNl19
-->
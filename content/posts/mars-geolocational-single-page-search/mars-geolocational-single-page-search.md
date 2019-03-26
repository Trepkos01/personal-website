---
title: "Case Study - Mars Geolocational Single-Page-Search"
tags: ["mars", "ruby", "rails", "postgresql"]
date: "2016-01-01"
featuredImage: "./featured.jpg"
featured: "false"
description: "Using the Geokit gem package for geocoding locations and geolocational search in a Ruby on Rails application."
type: "post"
category: "Software Development"
project: "mars"
---


 With Mars, a critical functional component is the ability to "Search" for restaurants/meals based on either a supplied location or by capturing the user's current location and to provide this locational search functionality in a single-page-fashion (i.e., without a corresponding page load). This case study is to provide insight on how I approached solving this problem. *Some basic understanding of the Ruby on Rails framework and the Ruby programming language is necessary for navigating the syntax in many of the code snippets. The Geokit ruby gem is utilized for geocoding and querying based upon provided location information.*

**The following relevant Ruby/Rails/Ruby Gem versions used in this case study are:**

 - Ruby 2.2.6 R
 - Rails 4.2.6 
 - Geokit 1.11.0 
 - Geokit-Rails 2.2.0

**First I defined the basic search query's syntatical rules as the following:**

**Case 1 - No Provided Location Information**

	Input: [Restaurant(s)/Meal(s) Keyword Phrase]
In case 1, we would attempt to search for the tokenized keyword phrase within the range of the user's current location by default.

**Case 2 - Provided Location Information**

	Input: [Restaurant(s)/Meal(s) Keyword Phrase] [Location Prepositional Phrase (e.g., "near", "close to", "in", "at"] [Location/Location Descriptor (e.g., "Oxford, MS", "me"]

In case 2, the keyword phrase is followed by a location prepositional word or phrase that denotes that the next portion of the query will consist of a location or a location descriptor.

Despite the rigid search query structuring rules, I tried to make the phrasing as natural as possible in correspondence with traditional English.

**Query examples:**

- "Pizza near me"
- "Rice close to Oxford, MS"
- "Ice Cream"

**The above phrases would all be valid search queries.**

Now that we have defined the functionality of the search component of the website and also the search query structure itself; it is time to actually determine how to handle the geolocational search on the main page of the web application. This functionality is described as *Single-Page-Search*, as-in I want to search without necessarily inducing a pageload on the actual form submission. I also want to be able to capture the user's current location information for the exception that the user does not explicitly provide a location to search upon.

**The following code snippets are taken from the following files:**
- **config/routes.rb** - Defines the structure and routing behavior of the Rails application.
- **app/views/main/index.html.erb** - The corresponding embedded Ruby template for the landing page of the application (the search page).
- **app/assets/javascripts/utilities.js** - Javascript file of jQuery functions which call on each application page's page load.
- **app/views/main/search.js.erb** - The Javascript view that corresponds with the search action in the MainController.
- **app/views/main/_results.erb** - The embedded Ruby partial template called by the search.js file.
- **app/controllers/main_controller.rb** - The controller for the landing page of the application (the search page).
- **app/models/meal.rb** - The meal model file which holds the meal's main search method.
- **app/models/restaurant.rb** - The restaurant model file which holds the restaurant's main search method.

**First, I define the web application's primary "search" action within the web application's routes.rb file.**

*In config/routes.rb:*
```ruby
    post 'main/search', to: 'main#search', as: 'main_search'
    
    get 'main/search', to: 'main#search'
```
The above code essentially defines that any POST/GET request to the URL route will correspond to the *search* action within **MainController** which is the main landing page controller.

This route is given an explicit name or alias, *main_search*, where the usages of *main_search_path* would correspond to the URL path defined above which would call the resulting controller's action.

For example, here is the simple search form which corresponds to the *search* action.

*In app/views/main/index.html.erb*
```html
    <%= form_tag(main_search_path, method: "post", id: "main_search", remote: true) do %>
	    <div id="search_div">
		    <span class="hide_responsive"><%= button_tag("Search", id: "search_button", name: nil, class: "btn btn-primary")%></span>
	    
		    <div id="search_bar" class="form-group has-feedback">
			    <%= text_field_tag :search, params[:search], placeholder: "e.g., ribeye near me, cake near San Diego, CA, spicy tamale", class: "form-control" %>
			    <i class="glyphicon glyphicon-search form-control-feedback responsive_show" style="color: darkgrey"></i>
		    </div>
	    </div>
	    <%= hidden_field_tag "lat", value = ""%>
	    <%= hidden_field_tag "lon", value = ""%>
    <% end %>
 ```   
The important detail above is the two hidden fields, "**lat**", "**lon**", which actually will hold the user's current location.

When the page loads, the following corresponding Javascript/jQuery functions will execute.

*In app/assets/javascripts/utilities.js*
```javascript
    if($('#lat').length && $('#lon').length){
	    if("geolocation" in navigator) {
		    navigator.geolocation.getCurrentPosition(setGeoLocationValues, couldNotGetLocation);
	    }
	    else{
		    couldNotGetLocation();
	    }
    }
    
    function setGeoLocationValues(position){
	    $('#lat').val(position.coords.latitude);
	    $('#lon').val(position.coords.longitude);
    }
    
    function couldNotGetLocation(){
	    $("#inform_user").html("We could not find your current location.");
	}
```
  

By using the geolocation property of the navigation object, we can capture the current location position of the user and set the corresponding latitude/longitude hidden fields accordingly. Using the geolocation property requires consent from the user accessing the web application in addition to a secure HTTPS context in their access to the website to perform correctly.

**Now to allow for single-page-searching we revisit the form above whose general characteristics are detailed by the following line:**

*In app/views/main/index.html.erb*
```html
    <%= form_tag(main_search_path, method: "post", id: "main_search", remote: true) do %>
```
The above portion, "**remote: true**", allows the form submission/action to take place without an actual page refresh or page load.

The action, "search", within the **MainController**, corresponds to a Javascript file rather than a traditional HTML embedded Ruby template file as its accompanying view template.

*In app/views/main/search.js.erb*
```javascript
    $("#search_results").html('<%= escape_javascript(render("results")) %>');
    
    $("#search_results").show();
```
However, this script actually calls the Ruby function ***render*** to render the partial ***results*** template view file which actually shows the results of the action. Where the HTML element with ID ***search_results*** is a container on main search page.

This is a standard workaround in handling client-side single-page requests to the controller's action method without triggering a page load/refresh.

**Below is the actual code of the partial template we are loading from the above Javascript script.**

*In app/views/main/_results.erb*
```html
    <%= @message %>
    
    <br/>
    
    <% if @meals.exists? || @restaurants.exists? %>
	    <hr/>
	    <br/>
	    <br/>
	    <% if @meals.exists? %>
			<div id="meal_search_results" class="listing_box">
			    <b>Showing <%= pluralize(@meals.count, "meal") %>.</b><br/>
		    
			    <table id="meal_results_listing" class="listing_table">
		    
			    <% @meals.each do |meal| %>
				    <%= render partial: "layouts/meal_listing", locals: { meal: meal } %>
			    <% end %>
		    
			    </table>
			    <%= js_will_paginate @meals, param_name: "search_meals_page" %>
		    </div>
		    <br/>
	    <% end %>
    
	    <% if @restaurants.exists? %>
		    <div id="restaurant_search_results" class="listing_box">
			    <b>Showing <%= pluralize(@restaurants.count, "restaurant") %>.</b><br/>
		    
			    <table id="restaurant_results_listing" class="listing_table">
			
				<% @restaurants.each do |restaurant| %>
				    <%= render partial: "layouts/restaurant_listing", locals: { restaurant: restaurant } %>
			    <% end %>
		    
		    </table>
		    <%= js_will_paginate @restaurants, param_name: "search_restaurants_page", :params => {lat:params[:lat], lon:params[:lon], search:params[:search]} %>
	    </div>
    <% end %>
    <% else %>
	    <hr/>
	    <center><b>No meals matching that keyword.</b></center>
    <% end %>
```
The **@restaurants,@meals, @message** variables are described within the actual search action in the main controller.

Now that we have defined how to capture the user's current location and also the mechanics of our single page search; below is the actual definition of the search action attached to the **MainController** which returns the results.

We get the keyword string from the form submission and set the subsequent variables to their default values for future use.

*In app/controllers/main_controller.rb*
```ruby
    def search
	    keyword_string = params[:search]
	    preposition_location = nil
	    remove_token_count = 1
	    use_current_location = false
	    no_location_available = false
```
Next we check for first occurence of the following prepositions prepositions - ***near, close to, in, at***. If the first proposition is ***close to***, we shift the location array two elements to remove the prepositional phrase, otherwise we shift only once.

*In app/controllers/main_controller.rb*
```ruby
    if keyword_string.index(" near ")
	    preposition_location = keyword_string.index(" near ")
    elsif keyword_string.index(" close to ")
	    preposition_location = keyword_string.index(" close to ")
	    remove_token_count = 2
    elsif keyword_string.index(" in ")
	    preposition_location = keyword_string.index(" in ")
    elsif keyword_string.index(" at ")
	    preposition_location = keyword_string.index(" at ")
    End
```   
If a preposition is found, get the location information supplied after the preposition while removing the actual prepositional phrase. Next, re-form the keyword array to exclude the preposition and location information.

Also check if the "**location**" info is actually "**me**" which commonly means current location.

If no preposition is supplied, check to see if the current location lat/lon details are available; if they are, then use the current location, if not, then we have no location information to go by.

*In app/controllers/main_controller.rb*
```ruby
    if preposition_location
	    location_array = keyword_string[preposition_location..-1].split(" ")
	    location_array.shift(remove_token_count)
	    location_substr = location_array.join(" ")
	    keyword_array = keyword_string[0..preposition_location].split
	    if location_substr == "me"
		    if !params[:lat].blank? && !params[:lon].blank?
			    use_current_location = true
		    else
			    no_location_available = true
		    end
	    else
		    @location = location_substr
		    use_current_location = false
	    end
    else
	    if !params[:lat].blank? && !params[:lon].blank?
		    keyword_array = keyword_string.split
		    use_current_location = true
	    else
		    no_location_available = true
		end
    end
```
We have determined which location-based search approach that we're taking. Either we have location information available or we are using the current location information available from the browser(obtained by Javascript and stored in the template). If we're not using the current location and yet we do have location information, try to geocode this location information, if successful, proceed with the search, otherwise inform the user that the information could not be geocoded.

*In app/controllers/main_controller.rb*
```ruby
    if no_location_available
	    @message = "We could not find your current location. Please provide one in your search."
	    @meals = Meal.none
	    @restaurants = Restaurant.none
    elsif use_current_location
	    @message = "Showing results near current location."
	    coordinate_array = Array.new
	    coordinate_array.push(params[:lat])
	    coordinate_array.push(params[:lon])
	    @meals = Meal.main_search(keyword_array, coordinate_array).paginate(page: params[:search_meals_page], :per_page => 10)
	    @restaurants = Restaurant.main_search(keyword_array, coordinate_array).paginate(page: params[:search_restaurants_page], :per_page => 10)
    else
	    geocode_failure = Geokit::Geocoders::MultiGeocoder.geocode(location_substr).full_address.blank?
	    if geocode_failure
		    @message = "Could not process the location #{location_substr}"
		    @meals = Meal.none
		    @restaurants = Restaurant.none
	    else
		    @message = "Showing results near #{location_substr}."
		    @meals = Meal.main_search(keyword_array, location_substr).paginate(page: params[:search_meals_page], :per_page => 10)
		    @restaurants = Restaurant.main_search(keyword_array, location_substr).paginate(page: params[:search_restaurants_page], :per_page => 10)
	    end
    end
```    
Within their corresponding model files, the details of the restaurant/meal search functionality is further defined.

For meals, we first retrieve all of the meals within a 50 mile radius of the provided location then we filter by the provided keywords followed by further narrowing the results by active meals and ordering the corresponding set of meals by their scores.

*In app/models/meal.rb*
```ruby
    def self.main_search(keywords, location)
	    if keywords.size > 0
		    meals = Meal.joins(:restaurant).within(50, :origin => location)
		    .tagged_with(keywords, :any => true, :wild => true)
		    .where(["meals.active = ?", true])
		    meals.sort do |a,b|
			    case
					when a.meal_score < b.meal_score
					    -1
				    when a.meal_score > b.meal_score
						 1
				    else
					    0
				    end
			end
		    return meals
	    else
		    none
	    end
    end
```
  

For restaurants, we take a different approach. First we check to see if the query simply is looking for any case of restaurants, and if so, we return all nearby restaurants in order of their corresponding scores (a composite of their meal scores).

Otherwise, we look for restaurants nearby whose name shares an instance of any keyword provided by the user and we return that result set ordered by their composite scores.

*In app/models/restaurant.rb*
```ruby
    def self.main_search(keywords, location)
	    if keywords.size == 1 && keywords[0].downcase["restaurant"]
		    restaurants = Restaurant.within(50, :origin => location).where(["restaurants.active = ?", true])
		    restaurants.sort do |a,b|
			    case
				    when a.restaurant_composite_score < b.restaurant_composite_score
					    -1
				    when a.restaurant_composite_score > b.restaurant_composite_score
						 1
				    else
					    0
					end
		    end
		    return restaurants
	    elsif keywords.size > 0
		    condition_array = Array.new
		    condition_array.push((['restaurant_name ILIKE ?'] * keywords.size).join(' OR '))
		    keywords.each {|keyword| condition_array.push("%#{keyword}%")}
		    restaurants = Restaurant.within(50, :origin => location)
		    .where(condition_array)
		    .where(["restaurants.active = ?", true])
		    restaurants.sort do |a,b|
		    case
			    when a.restaurant_composite_score < b.restaurant_composite_score
				    -1
			    when a.restaurant_composite_score > b.restaurant_composite_score
				     1
			    else
				    0
				end
		    end
		    return restaurants
	    else
		    none
	    end
    end
```
In summary, we described the syntatical structure of the valid search queries for this application as well as the approach to incorporate geolocational searching (including the default current location behavior).

Next, we determined how to achieve the single-page-search behavior of the main page resulting in the lack of page load/refresh on the execution of the search action. Following that, we explored the specific mechanics of the methods which actually perform the search functionality based on the provided query information by the user.
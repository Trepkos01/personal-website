---
title: "Case Study - Mars Devise Omniauthentication and Social Media Sharing"
tags: ["mars", "ruby", "rails", "postgresql"]
date: "2016-02-01"
featuredImage: "./featured.jpg"
featured: "false"
---

  
One of the features of the Mars web application is the ability to essentially bypass the standard 'devise' (Ruby gem) registration and authentication process by logging in via one of your social media accounts. This omniauthentication approach would allow the user to have one monolithic user account per email address which they could essentially link their Twitter and/or Facebook social media accounts to. This would allow the user three possible avenues for registration and authentication.

 **11-16-18 Warning**: I returned to this application code to find that Facebook had changed Facebook application, this included whitelisting callback URLs and also restricting the ability for web applications to post to a user's wall on their behalf (i.e., the *publish actions* action).  

**The following relevant Ruby/Rails/Ruby Gem versions used in this case study are:**

 - **Ruby 2.2.6** 
 - **Rails 4.2.6** 
 - **Devise 4.2.1** 
 - **Omniauth-Twitter 1.6.0** 
 - **Koala 2.5.0** 
 - **Twitter 6.1.0** 
 - **Bitly 0.9.0**

One of the features of the Mars web application is the ability to essentially bypass the standard '*devise*' (Ruby gem) registration and authentication process by logging in via one of your social media accounts. This omniauthentication approach would allow the user to have one monolithic user account per email address which they could essentially link their Twitter and/or Facebook social media accounts to. This would allow the user three possible avenues for registration and authentication.

Once they have logged in via a social media account, the user would have the ability to share their recommendations on the respective social media platform that they are logged in on.

To accomplish this functionality, I need the following Ruby gems.

*In Gemfile*

    gem 'devise'  # Added devise gem for authentication purposes.
    gem 'omniauth-twitter'  # Omni-authentication with Devise(Facebook, Twitter)
    gem 'omniauth-facebook'  # ^^^
    gem "koala", "~> 2.2"  # Used for interfacing with users' Facebook wall.
    gem "twitter"  # Self-explanatory.
    gem 'bitly', '~> 0.9.0'  # Shorten URL for twitter.

The *devise* gem generated the initial registration/authentication tables, views, and controllers.

Besides the standard generated files by *devise* I made the following adjustments custom for my web application.

First, *devise* by default, creates the user model whose corresponding database table has the auto-increment primary key field, 'id'.

I modified the ***id*** field by changing it to hold a unique alphanumeric ID value.

    t.string :id, null: false, length: 32, primary_key: true

Within the user model file created by devise, I added the following functionality to generate this new custom ID.

*In app/models/user.rb*

  

    require 'securerandom'
    [...]
    before_create :generate_id
    [...]
    
    private
    def generate_id
	    self.id = SecureRandom.uuid
    end

Another component that I wanted to add to the user model is the *deleted_at* datetime field. In this case, the user is able to remove access to his/her account without actually removing the user account record. This would ensure that any information such as recommendations, meals, or restaurants created by the user would remain even if the user was no longer active.

**This would require the additional field for the user:**

    t.datetime :deleted_at

The following model functions are used to achieve this "soft delete" functionality.

*In app/models/user.rb*

  

    # Instead of deleting, indicate the user requested a delete & timestamp it.
    
    def soft_delete
	    update_attribute(:deleted_at, Time.current)
    end
    
    # Ensure user account is active
	
	def active_for_authentication?
	    super && !deleted_at
    end
    
    # Provide a custom message for a deleted account
    
    def inactive_message
	    !deleted_at ? super : :deleted_account
    end

  

Within the devise configuration file, I changed the following configuration settings to allow the user to actively start generating content without confirming their email address immediately.

*In config/initializer/devise.rb*

    config.allow_unconfirmed_access_for = 2.days

This setting would allow the user two days before they would need to formally confirm their email address.

Also, I allowed for the user to optionally provide a user name, otherwise their official username would be created from a combination of their email address (sans domain) and their unique identifier ID.

*In app/models/user.rb*

    before_create :generate_username
    [...]
    private
    
    # Generate a unique username for the user based on their email address and the first 8 values of their unique identifier.
    
    def generate_username
	    self.user_name = "#{self.email[/^[^@]*/]}#{self.id.to_s[0..7]}" if self.user_name.blank?
    end

So with these changes, I had the basic core functionality of registration, authentication, and authorization. However, I needed to incorporate social media into the scheme.

First, I would need to register my web application with the social media platforms which I was targeting, namely Facebook and Twitter.

Both Facebook and Twitter required a "Terms of Service" page and a "Privacy Policy" page. Therefore, I created each as a static page based on templates which were easily found by a simple google search. Facebook had the added bonus of actually requiring a screen capture of the general usage and interaction between the web application and Facebook before authorizing use.

The information I needed from Facebook and Twitter were simply the email address and also their name (in the case of Facebook)/Nickname (in the case of Twitter); this would be utilized for both registration and linking the social media identities to a common user. Once the development teams for each respective social media platform reviewed my requests for information and integration; I had the ability to allow the user to also publish actions (post to Facebook wall, tweet) from the web application. This would allow the user to be able to share their recommendations on the social media platform which they were currently logged in under.

Next, I would need to integrate the registration/authentication process of devise with each social media platform.

Once the web application was registered with Facebook and Twitter, it was time to formally setup the omniauthentication functionality of devise with the application ID and application "secret" provided by each respective social media platform.

*In /config/initializer/devise.rb*

    require "omniauth-facebook"

    config.omniauth :facebook, ENV["FACEBOOK_ID"], ENV["FACEBOOK_SECRET"], scope: 'email publish_actions', info_fields: 'name,email',
    client_options: {
	    site: 'https://graph.facebook.com/v2.6',
	    authorize_url: "https://www.facebook.com/v2.6/dialog/oauth"
    }, token_params: { parse: :json }
    
    config.omniauth :twitter, ENV["TWITTER_ID"], ENV["TWITTER_SECRET"], scope: 'email'

And the following changes needed to be made to the application's routes file to ensure that the omniauthentication process returned to the correct callbacks controller and if the social media service doesn't return a verified email address then the entire process is aborted and the user is prompted.

*In /config/routes.rb*

    devise_for :users, :controllers => { registrations: 'users/registrations', omniauth_callbacks: 'omniauth_callbacks', sessions: "sessions" }
    
    match '/users/:id/verified_email_not_found' => 'users#verified_email_not_found', via: [:get, :patch], :as => :verified_email_not_found

**The omniauth_callbacks controller is defined as:**

***/app/controllers/omniauth_callbacks_controller.rb***

    class OmniauthCallbacksController < Devise::OmniauthCallbacksController
	    def self.provides_callback_for(provider)
		    class_eval %Q{
		    def #{provider}
			    @user = User.find_for_oauth(env["omniauth.auth"], current_user)
			    if @user.persisted?
				    sign_in_and_redirect @user, event: :authentication
				    set_flash_message(:notice, :success, kind: "#{provider}".capitalize) if is_navigational_format?
			    else
				    session["devise.#{provider}_data"] = env["omniauth.auth"]
			        redirect_to new_user_registration_url
			    end
			end
		    }
	    end
    
	    [:twitter, :facebook].each do |provider|
		    provides_callback_for provider
	    end

	    def after_sign_in_path_for(resource)
		    if resource.email_verified?
		       super resource
			else
			    verified_email_not_found_path(resource)
		    end
	    end
    end

**The verified_email_not_found action is defined below:**

*In /app/controllers/users_controller.rb*

    def verified_email_not_found
	    # We could not get a verified email address from Facebook/Twitter to link or create the account.	
	    
	    identity = Identity.find_by(user_id: params[:id])
	    identity.destroy
	    @user.destroy
		redirect_to root_url, notice: 'Could not link social media account.'
    end

  
Next, I created a separate table, ***identity***" which would stored the following social media information for each user who registers their social media account with the application as returned from the social media provider.

- **Their user ID.**

- **Their access token.**

- **Their access secret (if applicable - Twitter uses)**

- **Their actual provider (Facebook, Twitter)**

  

      class CreateIdentities < ActiveRecord::Migration
	    def change
		    create_table :identities do |t|
			    t.string :provider
			    t.string :uid
			    t.belongs_to :user, index: true
			    t.timestamps null: false
		    end
	    end
      end

The user account can have many identities and when the user logs in, the identity that they are using (Facebook, Twitter, Default) is recorded to control access.

This may seem confusing so I will attempt to step-through the registration/authentication process.

On the user registration and user authentication (login) views, there are two links to allow authentication for Facebook and Twitter, respectively.

*In /app/views/devise/registrations/new.html.erb*

    <%= image_tag(image_valid("facebook-clear-90.png"), :alt => "Join with Facebook", :width => "25", :height => "25")%> <%= link_to "Join with Facebook", user_facebook_omniauth_authorize_path %>
    <br/>
    <br/>
    <%= image_tag(image_valid("twitter-clear-90.png"), :alt => "Join with Twitter", :width => "25", :height => "25")%> <%= link_to "Join with Twitter", user_twitter_omniauth_authorize_path %>

**Where user_[provider]_omniauth_authorize_path corresponds to the /users/auth/[provider] path.**

When the user clicks on the above button it will navigate the browser to the corresponding social media application's "***Sign-In***" page. Assuming the user isn't already signed into the social media platform.

Upon a successful authentication, the browser will then navigate back to the /users/auth/twitter/callback? path which corresponds to the OmniauthCallbacksController.

Passing the authentication hash and the "current_user" session value to the "User" model action find_for_oauth

*In /app/controllers/omniauth_callbacks_controller.rb*

  

    [...]
    
    @user = User.find_for_oauth(env["omniauth.auth"], current_user)
    
    [...]

*In /app/models/user.rb*

    def self.find_for_oauth(auth, signed_in_resource = nil)
 
	    # Get the identity and user if they exist
    
	    identity = Identity.find_for_oauth(auth)

  

Which attempts to either lookup the user's identity based on the contents of the authentication hash or create a new identity, it will also update the access information for that user allowing them the ability to perform actions on their social media platform through the web application.

*In /app/models/identity.rb*

    def self.find_for_oauth(auth)
	    identity = find_or_create_by(uid: auth.uid, provider: auth.provider)
	    identity.update_attributes(access_token: auth.credentials.token, access_secret: auth.credentials.secret)
	    return identity
    end

  

Once an identity has been created/found, updated, and returned, we attempt to get the user from the identity.

*In /app/models/user.rb*


    # We are dealing with a new identity that doesn't have a user yet. Else, we have this identity already stored,
    # update the user's current provider and continue.
    
    if user.nil?

	    # Get the email address from the auth hash and find the user with that email address.
    
	    email = auth.info.email
	    user = User.where(:email => email).first if email
   
	    # Sill no user? Create a new one to associate the identity with. Else, associate with
	    # existing user with the new identity and change the current authentication provider to the
	    # provider that we are authenticating with now.
    
	    if user.nil?
		    user = User.new(
			    user_name: auth.info.nickname || auth.info.name,
			    email: email ? email : "#{TEMP_EMAIL_PREFIX}-#{auth.uid}-#{auth.provider}.com",
			    password: Devise.friendly_token[0,20],
			    provider: auth.provider)
    
			    user.skip_confirmation!
		else
		    user.provider = auth.provider
		end
    
	    user.save!
    else
	    user.provider = auth.provider
	    user.save!
    end

  

This is how the user can have multiple social media accounts (or identities) linked to a single user account for the web application and we can record which platform (if any), they are logged in as on the web application.

Once they have logged in on either Facebook or Twitter, I wanted to create a way for the user to share or interact with their social media platform through the application.

The option to share the recommendation does not become available on the page until the user has actually submitted an assessment of the meal and the user has authenticated through a social media provider with the web application.

*In /app/views/meals/show.html.erb*

    <% if @meal_recommendation && (current_user.provider == "facebook" || current_user.provider == "twitter") %>
	    <hr/>
	    <div id = "share_recommendation">		    
		    <h3>Share your recommendation.</h3>
		    <%= form_tag({controller: "meals", action: "share"}, method: "post") do %>
	    		    <% if current_user.provider == "facebook" %>
					    <%= submit_tag("Share on Facebook", name: "share_facebook", class: "btn btn-primary") %>
				    <% elsif current_user.provider == "twitter" %>
					    <%= submit_tag("Share on Twitter", name: "share_twitter", class: "btn btn-primary") %>
				    <% end %>
		    <% end %>
	    </div>
    <% end %>

The following "share" action is defined in the meals' controller file. First, we find the assessment of the meal from the user.

*In /app/controllers/meals_controller.rb*

  

    def share
	    meal = Meal.find(params[:id])
	    restaurant_name = meal.restaurant.restaurant_name
	    restaurant_location = meal.restaurant.address
	    meal_recommendation = meal.meal_recommendations.where("user_id = ?", current_user.id).first
    
    if meal_recommendation.rating
	    recommend_string = "recommends"
    else
	    recommend_string = "does not recommend"
    end

If the logged-in provider is Facebook, I get the access token for their Facebook identity and create a new graph object using the Koala ruby gem which will interact with their Facebook wall. The remainder is creating the corresponding title, content, and link for the wall post. If no meal image is provided, the restaurant image is used (if the restaurant image is available). If neither the meal or restaurant image is provided then the web application logo is used.

*In /app/controllers/meals_controller.rb*

    if params[:share_facebook]
	    # Set up the Koala Facebook graph API.
	    access_token = Identity.where(" user_id = ? AND provider = ? ", current_user.id, "facebook").first.access_token
	    graph = Koala::Facebook::API.new(access_token, ENV["FACEBOOK_SECRET"])
	    
	    # Content information
	    title = current_user.user_name + " " + recommend_string + " this meal on Mars"
	    message = meal.meal_name + " at " + restaurant_name + "(" + restaurant_location + "), " + meal.total_recommendations.to_s + " " + "person".pluralize(meal.total_recommendations) + " recommend" + (meal.total_recommendations == 1 ? "s" : "") + " this meal."
	    link = "https://mars-score.herokuapp.com/restaurants/" + params[:restaurant_id] + "/meals/" + meal.id
    
	    # If the meal image is available, use it, otherwise use the restaurant image. If neither are available, then use the logo image.
		if meal.image_url
		    share_image_url = view_context.image_path(meal.image_url)
	    elsif meal.restaurant.image_url
		    share_image_url = view_context.image_path(meal.restaurant.image_url)
	    else
	        share_image_url = "https://mars-score.herokuapp.com" + view_context.image_path("mars_logo_large.png")
	    end
    
	    # Attempt to post to the user's wall.
	    callback = graph.put_object("me", "feed", {
	   	    :site_name => "Mars",
		    :name => title,
		    :link => link,
		    :description => message,
		    :picture => share_image_url
	    })

  

If Twitter is the social media platform, the process is a bit different. Twitter requires both an access token and also an access secret which is provided during the omniauthentication process and attached to the user's identity.

Also, given the nature of Twitter's tweets (namely the character limit), the URL is shortened using the Bitly ruby gem.

*In /app/controllers/meals_controller.rb*

	else
	    twitter_identity = Identity.where(" user_id = ? AND provider = ? ", current_user.id, "twitter").first
	    access_token = twitter_identity.access_token
	    access_secret = twitter_identity.access_secret
	    client = Twitter::REST::Client.new do |config|
		    config.consumer_key = ENV["TWITTER_ID"]
		    config.consumer_secret = ENV["TWITTER_SECRET"]
	        config.access_token = access_token
		    config.access_token_secret = access_secret
	    end
    
	    Bitly.use_api_version_3
	    bitly = Bitly.new(ENV["BITLY_USERNAME"],ENV["BITLY_KEY"])
	    bitly_url = bitly.shorten("https://mars-score.herokuapp.com/restaurants/" + params[:restaurant_id] + "/meals/" + meal.id)
    
	    begin
		    callback = client.update(recommend_string.capitalize + " " + meal.meal_name + " at " + restaurant_name + "(" + restaurant_location + ") " + bitly_url.short_url)
		    rescue Twitter::Error
		    callback = false
	    end
    end

If the meal recommendation has been successfully shared on the provider's Facebook wall or Twitter feed, the recommendation's "shared" attribute is marked as shared and the user is redirected back to the page of the meal whose recommendation they shared.

*In /app/controllers/meals_controller.rb*

    if callback
	    flash[:success] = "Your recommendation has been shared."
	    meal_recommendation.shared = true
	    meal_recommendation.save!
    else
	    flash[:failure] = "We were unable to share your recommendation."
    end

	redirect_to restaurant_meal_path(params[:restaurant_id],meal.id)

  

So in this case study, we went over the very general details of implementing the devise omniauthentication functionality with the ability of linking multiple social media accounts to one user. Next we covered how I addressed the functionality issue of allowing the user to share their recommendation on the feed of whichever social media platform they are currently logged in as in the web application itself.










<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQyNTMxMjU0LDIyODc0NjY2MCw4MDkxNT
EzNjUsNzMwOTk4MTE2XX0=
-->
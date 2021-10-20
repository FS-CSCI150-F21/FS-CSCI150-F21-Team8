# Readme for Server Local Use

Server currently only works on localhost. 
There will be a provided .env file that has the database URI with user and password to access the database. You must have this to be able to connect to MongoDB Atlas.

Note that you need to install the related dependencies (node_modules is not included) - use npm init to create node_modules and then view the package.json to see dependencies needed.

To send requests to the server in React, you need to install axios using "npm install axios". 
You can then use axios.get, .post., .delete (and other requests that will be added in the future). Make sure to follow the request format (look at routes). Note that routes are tentative / some may be non-functional.




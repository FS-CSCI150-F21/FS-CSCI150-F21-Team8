import axios from 'axios'

// "get" example

const userDisplayName = 'example1' 
// displayName of user we want to get the document of (right now "get" route just uses display name)
// will make it take it other parameters later
// note functions like "get", "post", etc are promises,
// retrieving data from the database is not an instant action like "int a = 10"
// we must wait for database to respond - if successful, promise resolved in "then"
// if failed, "catch" is called


// MAKE SURE THE LOCAL NODE SERVER IS UP:
// open a terminal in vscode, navigate to "server" folder (use "cd server")
// type npm start
// to run this example, open another terminal and navigate to "server/example/" directory
// type "node example.js"

let email = 'notice how this does not change' // see console.log after the .get

axios.get(`http://localhost:5000/user/${userDisplayName}`).then((res)=>{
    console.log('promise resolved')
    console.log(res.data)
    // res.data is retrieved data, usually in comes in the form of a list even if its
    // (so use data[0])
    email = res.data[0].email
}).then(()=>{
    // we can use promise chaining to be able to see the new email value (or you could just log it in the first then, but this is an example of promise chaining)
    // essentially, we wait until the .get promise gets resolved (such that the email value changes)
    // and then console.log it
    console.log("email received:", email)
}).catch((res)=>{
    console.log('catch in cause of failed promise')
})

// because the axios.get does not happen immediately (must retrieve it from database), the email variable will not update,
// even though it occurs "after" the get function in the code
// see the second .then function 
console.log(email)

// i wont put an example for every axios function, look up the documentation for it
// also, make sure to follow the route format - look at the "server/routes/" directory
// follow the corresponding format for the corresponding HTTP request

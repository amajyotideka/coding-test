# Hi there! 🐱‍🚀

We're excited for you to be taking our coding challenge! 

First things first, since this is a front-end coding challenge, we've created a little back-end microservice to assist you. This microservice was written as a [Deno](https://deno.land/) application.

To run the microservice, download and install Deno and run the following command in this directory from the command line:

```
deno run --allow-net server.ts
```

(Note that you have to be sure to specify `--allow-net` to grant the server network access. This is because Deno is [secure by default](https://deno.land/manual/getting_started/permissions). 👌)

The server will start on port 8080. If you need to change this (maybe you're running something else on port 8080), you can specify the port:

```
deno run --allow-net server.ts --port=8081
```

Now, onto the good stuff :rocket:

# The challenge

Using Angular, design a cool user interface that has the following features:
- Users can view a list of all enrollees in the system
- Users should be able to see all of the data related to an enrollee (their id, activation status, name, date of birth)
- Users should be able to tell which enrollees are activated and which are not at a glance
- Users should be able to change the name and activation status of an enrollee
- Users **cannot** modify the id or date of birth of an enrollee

👉 _Treat this code as if it were being deployed in production to be maintained by a team of developers._ 

The rest is up to you! There is no "correct" solution here. Reach into your bag of your tricks and do what you love to do!

You got this! 💪

**💰BONUS CHALLENGE**💰: A developer working on the backend mentioned that one of the enrollees doesn't appear to be working. Getting or modifying this enrollee was causing an internal server error. Sadly, they couldn't remember which enrollee had this issue. Can you fix this?

# Submitting your code
Please create a new repo under your personal github account for this code and send it our way when you're all done!

# The REST API

The API here is nice and simple.

### **GET /enrollees** - fetch all enrollees

Response:
```
[
    {
        "id": string,
        "active": boolean,
        "name": string,
        "dateOfBirth": string
    },
]
```

### **GET /enrollees/{id}** - fetch an enrollee by id

Response:
```
{
    "id": string,
    "active": boolean,
    "name": string,
    "dateOfBirth": string
},
```

### **PUT /enrollees/{id}** - modify an enrollee

Request body:
```
{
    "active": boolean,
    "name": string
    "dateOfBirth": string (optional)
},
```
Response (the modified enrollee is simply returned):
```
{
    "id": string,
    "active": boolean,
    "name": string,
    "dateOfBirth": string
},
```

**Note: We're just storing the list of enrollees in memory here, no database, so any changes you make will be reset when you restart the microservice.**
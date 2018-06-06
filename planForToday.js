// Working Plan for today: Tuesday 29.05.18

let plan = {
    database: true,
    mogoose: "started"
};

obstacles = [
    {
        problem: "I cannot get variable from  .pug template into client JavaScript",
        solution: `JSON.stringify(docs) on server side inside 
        request hanler and sending stringified JSON to client. Therefore client can read JSON data.
        Also (PROBABLY) In PUG reading Javascript variables is working with !{variable} but not #{}`,
        soved: true
    },
    {
        problem: "If I will get object from .pug template. How to store ObjectId value in Javascript",
        solution: "Convert on server side?",
        solved: false
    }
]

// Also there is INCLUDE in PUG which is also can be very helpful. Maybe it can replace block or extend.


// 6:29

db.agencies.insertOne

// Cursor in mongodb
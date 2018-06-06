// On client side or script.js
let form = document.querySelector('form');
let search = document.querySelector('#search');
let urlSearch = 'http://localhost:3000/products?search=${search.value}';
form.addEventListener('submit', function(event){
    event.preventDefault();

    fetch(urlSearch)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // this is callback that have your formatted data after receiving response
            console.log(data);
            console.log(typeof data);
            // here grab html element and display your data
            // Next is approximate code you will change it for your needs
            let someDiv = document.createElement('div');
            someDiv.innerText = data;
            let body = document.body;
            body.appendChild(someDiv);
        });

});

// On server side or index.js
 app.get('/products', function(req, res){
     searchParameter = req.query.search;
    //  I don't know how you doing find() in database so here I'm using ABSTRACT code
    Mongo.ProductsCollection.find({productFieldByWhichYouDoSearch: searchParameter})
        .then(function(data){
            console.log(data); // So you can check data in your cmd console
            res.send(data);
        });
 });
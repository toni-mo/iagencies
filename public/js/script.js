console.log(returnedServices);
// Global scope variables for map and geocoder.
let map, geocoder;
let mapElement;

mapElement = document.getElementById('map');

// Loging agencies returned from server and pug.
console.log(returnedAgencies);
console.log(typeof returnedAgencies);

// Initial Creation of the Map.
function initMap(){

    let mapElement = document.getElementById('map');
    let centerCoords = { lat: 49.8951, lng: -97.1384 }
    let options = { zoom: 15, center: centerCoords };
    
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(mapElement, options);

    // Changing agencies for clientAgencies
    // returnedAgencies.forEach(function(agency){
    //     let marker = new google.maps.Marker({
    //         position: agency.location,
    //         map: map
    //     });
    // });
}

function displayPosition(){
    let address = document.getElementById('address').value;
    alert(address);
    urlToGeoCode = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBsYSmDpDcfvtUrm3aLRz28Ku_NQU542Ig`;
    
    fetch(urlToGeoCode)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data.results);
            console.log(typeof data.results);
            let lng =  data.results[0].geometry.location.lng;
            console.log(lng);
            nearCoords = {
                lng: data.results[0].geometry.location.lng,
                lat: data.results[0].geometry.location.lat
            }
            console.log(nearCoords);
            urlFindNear = `http://localhost:3000/agencies/near?lng=${nearCoords.lng}&lat=${nearCoords.lat}`;
            fetch(urlFindNear)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                    let centerCoords = { lat: nearCoords.lat, lng: nearCoords.lng };
                    let options = { zoom: 15, center: centerCoords };
                    map = new google.maps.Map(mapElement, options);
                    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                    let marker = new google.maps.Marker({
                                position: centerCoords,
                                map: map,
                                icon: image
                            });
                            // var pinColor = "FE7569";
                            // var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                    data.forEach(function(agency){
                        let coordinates = {lat: agency.location.coordinates[1], lng: agency.location.coordinates[0]};
                        let marker = new google.maps.Marker({
                            position: coordinates,
                            map: map
                            // icon: pinImage
                        });
                    })

                });
            // displayAgencyList(data);
        });
}

// Rerendering map, finding location by inserted address. Using Geocoding.
function codeAddress(){
    let address = document.getElementById('address').value;

    alert(address);
    let foundLocation = {
        lat: '',
        lng: ''
    };

    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_API_KEY'
    
    geocoder.geocode({'address': address},  function(results, status){
        // console.log(results);
        if(status == 'OK'){
            map.setCenter(results[0].geometry.location);
            alert(results[0].geometry.location);
            displayPosition(results[0].geometry.location);
            // return results[0].geometry.location;
            foundLocation.lat = results[0].geometry.location.lat();
            foundLocation.lng = results[0].geometry.location.lng();
            // console.log(foundLocation);
            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

    // return foundLocation;
}

let searchAddressBtn = document.querySelector('#search-address');

let displayAgencyList = function(agencyData){

    let centerCoords = { lat: 49.8951, lng: -97.1384 }
    let options = { zoom: 15, center: centerCoords };
    map = new google.maps.Map(mapElement, options);

    
    // console.log(agencyListElement.className);
    // let agencyItemElement = 
    let agencyListElement = document.querySelector('.agencies-list');
    agencyListElement.innerHTML = '';

    agencyData.forEach(function(agency){ 
        
        let coordinates = {lat: agency.location.coordinates[1], lng: agency.location.coordinates[0]}

        let marker = new google.maps.Marker({
            position: coordinates,
            map: map
        });
        
        alert("BANZAI");
        console.log("test");

        
        let agencyItemElement = document.createElement('div');
        let h4 = document.createElement('h4');
        let addressElement = document.createElement('address');
        let aElement = document.createElement('a');

        agencyItemElement.setAttribute('class', 'agency-item');



        h4.innerText = agency.name;
        addressElement.innerHTML = agency.address + '<br>Winnipeg, Manitoba<br>';
        aElement.innerText = agency.website;
        aElement.setAttribute('href', agency.website);
        
        addressElement.appendChild(aElement);
        agencyItemElement.appendChild(h4);
        agencyItemElement.appendChild(addressElement)

        // if simple onlclick, it triggers somehow
        agencyItemElement.addEventListener('click', function(event){
            displayAgencyInfo(agency._id);
        });
        agencyListElement.appendChild(agencyItemElement);

        

    });
};

let newBtn = document.querySelector('#new');
newBtn.addEventListener('click', function(event){
    event.preventDefault();

    
    displayPosition();

});

searchAddressBtn.addEventListener('click', function(event){
    event.preventDefault();

    // This we will save for something else its Geocoding
    // codeAddress();

    // Here should be fetch() with url and values from all checkboxes
    // Lets get all checkboxes

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let chosenServices = [];

    for(let i=0; i < checkboxes.length; i++){
        if(checkboxes[i].checked)
            chosenServices.push(checkboxes[i].value);
    }

    console.log('Chosen services are:');
    console.log(chosenServices);

    // https doesn't work
    let url = new URL('http://localhost:3000/agencies/services');
    let params = {services: chosenServices};
    url.search = new URLSearchParams(params);
    console.log(url);

    // Operation ASSberg
    let urlBase = '/agencies/services?services='
    let serviceTemplate = chosenServices.join('%2C');
    let combinedUrl = urlBase + serviceTemplate;
    // chosenServices.forEach(function(service){
    //     urlTemplate += service;
    // });

    console.log(combinedUrl);

    // fetch('/agencies')
    // .then(function(){
    //     location.href = '/';
    // });

    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(typeof data);
            displayAgencyList(data);
        });
});

// Displaying detailed info on about 
function displayAgencyInfo(agencyId){
    alert(agencyId);
    
    let slctAgencyInfo = document.querySelector('.agency-info');
    let slctAgencyTitle = document.querySelector('.agency-title');
    let slctAgencyAddress = document.querySelector('.agency-address');
    let slctAgencyWebsite = document.querySelector('.agency-website');

    for(let i = 0; i < returnedAgencies.length; i++) {
        if(agencyId == returnedAgencies[i]._id){
            slctAgencyInfo.innerText = "TEST" + returnedAgencies[i].info;
            slctAgencyTitle.innerText = returnedAgencies[i].name;
            slctAgencyAddress.innerText = returnedAgencies[i].address;
            slctAgencyWebsite.innerText = returnedAgencies[i].website;
            slctAgencyWebsite.setAttribute('href', returnedAgencies[i].website);
            // console.log()
        }
    }
}
// Just a function for range input element.
let selectDistance = function(){
    let distance = document.getElementById('distanceRange').value;
    document.getElementById('distanceValue').innerText = distance + 'km';
}
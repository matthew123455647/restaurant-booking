

function getRestaurantData() {
    console.log("aaaa")
    var request = new XMLHttpRequest();
    request.open('GET', "/restaurant", true);
    request.setRequestHeader('Content-Type', 'restaurant/json');
    //This function will be called when data returns from the web api    
    request.onload = function () {
        //get all the movies records into our movie array        
        restaurant_array = JSON.parse(request.responseText);
        //Fetch the comments as well        
        //fetchReviews();
        console.log(restaurant_array) // output to console        
        //call the function so as to display all movies tiles for "Now Showing"
        //fetchReservations();
        //fetchReviews();
        displayRestaurants();
    };

    //This command starts the calling of the movies web api  
    request.send();
}

function displayRestaurants() {
    var table = document.getElementById("restaurants-details");
    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
        var thumbnail = restaurant_array[count].image;
        var title = restaurant_array[count].restaurantName;
        var locations = restaurant_array[count].locations;
        var rating = restaurant_array[count].rating;
        var ratingNumber = parseFloat(rating).toFixed(1); // Convert and round the rating to one decimal place

        // Updated image size
        var cell = '<div class="card" item="' + count + '" style="width: 18%; height: 100%; display: flex; flex-direction: column; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius: 8px; margin: 10px; margin-left: 40px; margin-right: 20px; overflow: hidden;">' +
        '<img class="card-img-top" src="' + thumbnail + '" alt="Card image cap" style="width: 100%; height: 150px; object-fit: cover;">' +
        '<div class="rating-pill" style="align-self: flex-end; padding: 5px 10px; background-color: #FFD700; color: #000; border-radius: 5px; font-weight: bold;">' + ratingNumber + '</div>' +
        '<div class="card-body" style="margin-bottom: 10px;">' +
            '<h5 style="cursor: pointer; color: #333; font-weight: bold; margin: 0;" class="card-title" id="viewclick'+count+'" onclick="viewOneRest(\'' + (JSON.stringify(restaurant_array[count]).replaceAll('\"', '&quot;')).replaceAll('\'', '&apos;')  + '\'); showRestaurantReviews(' + count + ');">' + title + '</h5>' +
            '<p class="card-text" style="color: #777;">' + locations + '</p>' +
        '</div>' +
    '</div>';




        //console.log(cell);
        table.insertAdjacentHTML('beforeend', cell);
    }
}

var currentIndex = 0;
function viewOneRest(data) {
    var selectedResource = JSON.parse(data);
    console.log(selectedResource)
    document.getElementById("restaurantName").innerHTML = selectedResource.restaurantName;
    document.getElementById("description").innerHTML = selectedResource.description;
    document.getElementById("operatingHours").innerHTML = selectedResource.operatingHours;
    document.getElementById("rating").innerHTML = selectedResource.rating;
    document.getElementById("image").src= selectedResource.image;
    //document.getElementById("review").innerHTML = selectedResource.review;

    document.getElementById("locations").innerHTML = selectedResource.locations;
    document.getElementById("contactNo").innerHTML = selectedResource.contactNo;


    currentIndex = selectedResource._id;
    console.log("...." + currentIndex)
    


    $('#restaurantsModal').modal('show');
    }






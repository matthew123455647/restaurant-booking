function searchRestaurantsByName(keyword) {
    var matchedRestaurants = restaurant_array.filter(function (restaurant) {
      // Case-insensitive search by restaurant name
      return restaurant.restaurantName.toLowerCase().includes(keyword.toLowerCase());
    });
  
    return matchedRestaurants;
  }
  
  function displaySearchResults(restaurants) {
    var table = document.getElementById("restaurantsTable");
    table.innerHTML = "";
  
    if (restaurants.length === 0) {
      var noResultsCell = '<div class="col-md-12"><p>No matching restaurants found.</p></div>';
      table.insertAdjacentHTML('beforeend', noResultsCell);
    } else {
      restaurants.forEach(function (restaurant) {
        var thumbnail = restaurant.image;
        var title = restaurant.restaurantName;
        var locations = restaurant.locations;
        var rating = restaurant.rating;
        var ratingNumber = parseFloat(rating).toFixed(1);
  
        var cell = '<div class="card col-md-3" style="display: flex; flex-direction: column;">\
          <img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\
          <div class="rating-pill" style="align-self: flex-end; padding: 5px 10px;">' + ratingNumber + '</div>\
          <div class="card-body" style="margin-bottom: 10px;">\
            <h5 style="cursor:pointer; color: black" class="card-title" data-toggle="modal" data-target="#restaurantsModal">' + title + '</h5>\
            <p class="card-text">' + locations + '</p>\
          </div>\
        </div>';
  
        table.insertAdjacentHTML('beforeend', cell);
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search-bar');
    var searchButton = document.getElementById('search-btn');
  
    searchButton.addEventListener('click', function () {
      var searchTerm = searchInput.value.trim();
      var matchedRestaurants = searchRestaurantsByName(searchTerm);
      displaySearchResults(matchedRestaurants);
    });
  
    searchInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        var searchTerm = searchInput.value.trim();
        var matchedRestaurants = searchRestaurantsByName(searchTerm);
        displaySearchResults(matchedRestaurants);
      }
    });
  });
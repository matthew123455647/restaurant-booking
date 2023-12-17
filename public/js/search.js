document.getElementById("searchInput").addEventListener("input", function (event) {
  event.preventDefault();
  var input = document.getElementById("searchInput").value.toLowerCase();
  console.log(input);
  var table = document.getElementById("restaurants-details");
  table.innerHTML = "";

  for (var count = 0; count < restaurant_array.length; count++) {
      var title = restaurant_array[count].restaurantName.toLowerCase();
      if (title.includes(input)) {
        var thumbnail = restaurant_array[count].image;
        var title = restaurant_array[count].restaurantName;
        var locations = restaurant_array[count].locations;
        var rating = restaurant_array[count].rating;
        var ratingNumber = parseFloat(rating).toFixed(1); // Convert and round the rating to one decimal place

        // Updated image size
        var cell = '<div class="card" style="width: 18%; height: 100%; display: flex; flex-direction: column; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius: 8px; margin: 10px; margin-left: 40px; margin-right: 20px; overflow: hidden;">' +
        '<img class="card-img-top" src="' + thumbnail + '" alt="Card image cap" style="width: 100%; height: 150px; object-fit: cover;">' +
        '<div class="rating-pill" style="align-self: flex-end; padding: 5px 10px; background-color: #FFD700; color: #000; border-radius: 5px; font-weight: bold;">' + ratingNumber + '</div>' +
        '<div class="card-body" style="margin-bottom: 10px;">' +
            '<h5 style="cursor: pointer; color: #333; font-weight: bold; margin: 0;" class="card-title" onclick="viewOneRest(\'' + (JSON.stringify(restaurant_array[count]).replaceAll('\"', '&quot;')).replaceAll('\'', '&apos;')  + '\')">' + title + '</h5>' +
            '<p class="card-text" style="color: #777;">' + locations + '</p>' +
        '</div>' +
    '</div>';
          table.insertAdjacentHTML('beforeend', cell);
      }
  }
});
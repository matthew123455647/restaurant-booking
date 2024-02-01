function fetchReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', "/comment", true);
    request.setRequestHeader('Content-Type', 'application/json');
    //This command starts the calling of the comments api
    request.onload = function () {
        //get all the comments records into our comments array
        review_array = JSON.parse(request.responseText);
        console.log(review_array);
    };

    request.send();
}

//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showRestaurantReviews(item) {
    document.getElementById("review").innerHTML = "No review yet. Create one now";
    // var item = element.getAttribute("item");
    // currentIndex = item;
    document.getElementById("review").textContent = "Review for " + restaurant_array[item].restaurantName;
    document.getElementById("review").textContent = "";

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].restaurantName === restaurant_array[item].restaurantName) {
            console.log("found")
console.log(review_array[i])
console.log(restaurant_array[item]._id)

            selectedRestaurant_id = restaurant_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + review_array[i].review + "</p>               \
                                    <small>by " + review_array[i].username + " @ " + review_array[i].dateOfVisit + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("review").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < review_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/popcorn.png' style='width:50px' />";
            }
            // star += "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' ></i>";
            // star += "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editReviewModal' data-dismiss='modal' item='" + i + "' onClick='editReview(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}


// Submit or send the new comment to the server to be added.
function addReview() {
    var review = new Object();
    review.restaurantName = restaurant_array[currentIndex].restaurantName;

    console.log(review);
    review.username = document.getElementById("username1").value;
    review.review = document.getElementById("userComments").value;
    review.dateOfVisit = document.getElementById("dateOfVisit").value;

    //review.timestamp = document.getElementById("timestamp").value;
    review.rating = rating;

    console.log(review)

    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postReview.open("POST", "/comment", true);

    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.onload = function () {
        console.log("New review sent");

        // Display an alert message
        alert("Review has been added successfully!");
        document.querySelector('.alert').id = 'yourAlertId';

        // After sending the review, fetch updated reviews
        fetchReviews();
    };

    postReview.send(JSON.stringify(review));
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let popcorn of popcorns) {
        popcorn.setAttribute("src", "images/popcorn_bw.png");
    }
    changePopcornImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "images/popcorn.png");
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "images/popcorn.png");
            document.querySelector(classTarget + "[value='2']").setAttribute("src", "images/popcorn.png");
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "images/popcorn.png");
            document.querySelector(classTarget + "[value='2']").setAttribute("src", "images/popcorn.png");
            document.querySelector(classTarget + "[value='3']").setAttribute("src","images/popcorn.png");
            rating = 3;
            break;
    }
}


//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review


//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user comment


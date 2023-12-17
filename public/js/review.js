function fetchReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', "/comment", true);
    request.setRequestHeader('Content-Type', 'comment/json');
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
function showRestaurantReviews(element) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("review").textContent = "Review for " + restaurant_array[item].restaurantName;
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].restaurant_id === restaurant_array[item]._id) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedRestaurant_id = restaurant_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + review_array[i].review + "</p>               \
                                    <small>by " + review_array[i].username + " @ " + review_array[i].timestamp + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < review_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/popcorn.png' style='width:50px' />";
            }
            star += "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' ></i>";
            star += "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editReviewModal' data-dismiss='modal' item='" + i + "' onClick='editReview(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}

function newReview() {
    //Initialise each HTML input elements in the modal window with default value.
    rating = 0;
    document.getElementById("userComments").value = "";
}

// Submit or send the new comment to the server to be added.
function addReview() {
    var review = new Object();
    review.restaurant_id = restaurant_array[currentIndex]._id;
    review.user_id = 
    console.log(review);
    review.username = document.getElementById("username1").value;
    review.review = document.getElementById("userComments").value;
    review.dateOfVisit = document.getElementById("dateOfVisit").value;
    review.image4 = null;
    review.timestamp = null;
    review.rating = rating;
    
    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postReview.open("POST", "/comment", true);

    postReview.setRequestHeader("Content-Type", "comment/json");
    postReview.onload = function () {
        console.log("new review sent");
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
        popcorn.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}


//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review


//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user comment
function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}
//This function sends the Comment data to the server for updating

//This function deletes the selected comment in a specific movi




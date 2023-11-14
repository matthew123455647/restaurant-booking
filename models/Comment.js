class Comment{
    constructor(
        username,
        restaurantName,
        rating,
        review,
        dateOfVisit,
    ) {
        this.username = username;
        this.restaurantName = restaurantName;
        this.rating = rating;
        this.review = review;
        this.dateOfVisit = dateOfVisit;
        this.timestamp = new Date();
    }
}

module.exports = { Comment };

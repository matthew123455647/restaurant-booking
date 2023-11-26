class Comment {
  constructor(
    username,
    restaurantName,
    rating,
    review,
    dateOfVisit,
    timestamp
  ) {
    this.username = username;
    this.restaurantName = restaurantName;
    this.rating = rating;
    this.review = review;
    this.dateOfVisit = dateOfVisit;
    this.timestamp = new Date();
    this.timestamp = timestamp;
  }
}

module.exports = { Comment };

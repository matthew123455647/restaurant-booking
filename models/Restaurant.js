class Restaurant {
  constructor(
    restaurantName,
    description,
    operatingHours,
    rating,
    image,
    locations,
    contactNo,
    review
  ) {
    this.restaurantName = restaurantName;
    this.description = description;
    this.operatingHours = operatingHours;
    this.rating = rating;
    this.image = image;
    this.locations = locations;
    this.contactNo = contactNo;
    this.review = review;
  }
}

module.exports = { Restaurant };

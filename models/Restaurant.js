class Restaurant {
  constructor(
    restaurantName,
    description,
    operatingHours,
    rating,
    image,
    locations,
    contactNo,

  ) {
    this.restaurantName = restaurantName;
    this.description = description;
    this.operatingHours = operatingHours;
    this.rating = rating;
    this.image = image;
    this.locations = locations;
    this.contactNo = contactNo;
  }
}

module.exports = { Restaurant };

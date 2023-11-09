class User {
  constructor(
    email,
    password,
    birthday,
    first_name,
    last_name,
    phone_number,
    profile_picture,
    username
  ) {
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.profile_picture = profile_picture;
    this.username = username;
  }
}
module.exports = { User };

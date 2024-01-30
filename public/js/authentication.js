function login() {
  var response = "";

  var jsonData = new Object();
  jsonData.email = document.getElementById("email").value;
  jsonData.password = document.getElementById("password").value;

  if (jsonData.email == "" || jsonData.password == "") {
    document.getElementById("loginError").innerHTML =
      "All fields are required!";
    return;
  }

  if (jsonData.email.includes("@")) {
    document.getElementById("loginError").innerHTML = "";

    var request = new XMLHttpRequest();

    request.open("POST", "/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      try {
        response = JSON.parse(request.responseText);
        console.log(response);

        if (response.message == "Login successful!") {
          sessionStorage.setItem("email", jsonData.email);
          alert("User authentication successful!");
          window.location.href = "/";
        } else {
          document.getElementById("loginError").innerHTML =
            "Invalid credentials!";
        }
      } catch (loginError) {
        console.loginError(loginError);
        document.getElementById("loginError").innerHTML =
          "Error resetting form";
      }
    };

    request.send(JSON.stringify(jsonData));
  } else {
    // Show validation error
    document.getElementById("loginError").innerHTML =
      "Validation error, email should have @";
  }
}

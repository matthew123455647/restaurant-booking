function viewBookings() {
  var response = "";
  var request = new XMLHttpRequest();
  request.open("GET", "/view-booking", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    var html = "";
    for (var i = 0; i < response.length; i++) {
      html +=
        "<tr>" +
        "<td>" +
        (i + 1) +
        "</td>" +
        "<td>" +
        response[i].username +
        "</td>" +
        "<td>" +
        response[i].rest +
        "</td>" +
        "<td>" +
        response[i].contact +
        "</td>" +
        "<td>" +
        response[i].people +
        "</td>" +
        "<td>" +
        response[i].book_date +
        "</td>" +
        "<td>" +
        '<button type="button" class="btn btn-danger" onclick="deleteBooking(' +
        response[i].id +
        ')"> Delete</button>' +
        "</td>" +
        "</tr>";
    }
    document.getElementById("tableContent").innerHTML = html;
  };
  request.send();
}
function addBooking() {
  var response = "";
  var jsonData = new Object();
  jsonData.username = document.getElementById("username").value;
  jsonData.rest = document.getElementById("rest").value;
  jsonData.contact = document.getElementById("contact").value;
  jsonData.people = document.getElementById("people").value;
  jsonData.book_date = document.getElementById("book_date").value;
  //jsonData.owner = sessionStorage.getItem("email");
  if (
    jsonData.username == "" ||
    jsonData.rest == "" ||
    jsonData.contact == "" ||
    jsonData.people == "" ||
    jsonData.book_date == "" 
  ) {
    document.getElementById("message").innerHTML = "All fields are required!";
    document.getElementById("message").setAttribute("class", "text-danger");
    return;
  }
  var request = new XMLHttpRequest();
  request.open("POST", "/add-booking", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);
    if (response.message == undefined) {
      document.getElementById("message").innerHTML =
        "Added a new Booking at " + jsonData.rest + "!";
        window.location.href = 'booking.html';
      document.getElementById("message").setAttribute("class", "text-success");
      document.getElementById("username").value = "";
      document.getElementById("rest").value = "";
      document.getElementById("contact").value = "";
      document.getElementById("people").value = "";
      document.getElementById("book_date").value = "";
    } else {
      document.getElementById("message").innerHTML = "Unable to add resource!";
      document.getElementById("message").setAttribute("class", "text-danger");
      document.getElementById("message").setAttribute("class", "text-danger");
    }
  };
  request.send(JSON.stringify(jsonData));
}
function deleteBooking(selectedId) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-booking/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == "Resource deleted successfully!") {
    window.location.href = 'booking.html';
    }
    else {
    alert('Unable to delete resource!');
    }
    };
    request.send();
}

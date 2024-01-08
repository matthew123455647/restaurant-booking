async function register() {
  const formData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    birthday: document.getElementById("birthday").value,
    phone_number: document.getElementById("phone_number").value,
    profile_picture: document.getElementById("profile_picture").value,
    username: document.getElementById("username").value,
  };

  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (response.ok) {
    // Display a popup message
    alert(`User ${formData.username} registered successfully!`);

    // Redirect to the home page
    window.location.href = "/";
  } else {
    document.getElementById(
      "message"
    ).innerHTML = `Unable to register user: ${responseData.message}`;
    document.getElementById("message").setAttribute("class", "text-danger");
  }
}

async function login() {
  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (response.ok) {
    // Display a popup message
    alert("Login successful!");

    // Redirect to the home page
    window.location.href = "/";
  } else {
    document.getElementById(
      "message"
    ).innerHTML = `Invalid credentials: ${responseData.message}`;
    document.getElementById("message").setAttribute("class", "text-danger");
  }
}

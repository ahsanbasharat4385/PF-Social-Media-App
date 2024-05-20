function validation(event) {
  event.preventDefault();
  let firstName, lastName, emailAddress, password, confirmPassword;
  firstName = document.getElementById("fname").value;
  lastName = document.getElementById("lname").value;
  emailAddress = document.getElementById("email").value;
  password = document.getElementById("pass").value;
  confirmPassword = document.getElementById("conpass").value;

  // Clear all previous error messages
  document.getElementById("first_name").innerHTML = "";
  document.getElementById("last_name").innerHTML = "";
  document.getElementById("email_address").innerHTML = "";
  document.getElementById("password").innerHTML = "";
  document.getElementById("confirm_password").innerHTML = "";

  let hasError = false;

  // First Name Validation
  if (firstName.trim() === "") {
    document.getElementById("first_name").innerHTML = "First Name is Required";
    hasError = true;
  }

  // Last Name Validation
  if (lastName.trim() === "") {
    document.getElementById("last_name").innerHTML = "Last Name is Required";
    hasError = true;
  }

  // Email Address Validation
  if (emailAddress.trim() === "") {
    document.getElementById("email_address").innerHTML =
      "Email Address is required";
    hasError = true;
  } else if (emailAddress.indexOf("@") <= 0) {
    document.getElementById("email_address").innerHTML = "Invalid email";
    hasError = true;
  } else if (
    emailAddress.charAt(emailAddress.length - 4) !== "." &&
    emailAddress.charAt(emailAddress.length - 3) !== "."
  ) {
    document.getElementById("email_address").innerHTML = "Invalid email";
    hasError = true;
  }

  // Password Validation
  if (password.trim() === "") {
    document.getElementById("password").innerHTML = "Password is Required";
    hasError = true;
  }

  // Confirm Password Validation
  if (confirmPassword.trim() === "") {
    document.getElementById("confirm_password").innerHTML =
      "This field is required";
    hasError = true;
  }
  if (password !== confirmPassword) {
    document.getElementById("confirm_password").innerHTML =
      "Passwords do not match";
    hasError = true;
  }

  if (hasError) {
    return false; // Control the form submittion
  }

  // store data in Local Storage
  let user_record = new Array();
  user_record = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (user_record.some((v) => v.email === emailAddress)) {
    alert("This email is already in use");
    return false;
  } else {
    user_record.push({
      fname: firstName,
      lname: lastName,
      email: emailAddress,
      pass: password,
    });
    localStorage.setItem("users", JSON.stringify(user_record));
    alert("Data is successfully stored in the local storage");
  }
  document.getElementById("myForm").reset();
  return true;
}

function saveData() {
  let emailAddress = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  //if the email and password are empty then they show
  if (emailAddress.trim() === "" || password.trim() === "") {
    document.getElementById(`allErrors`).innerHTML =
      "Please enter your Email and Password";
    return;
  } else {
    document.getElementById(`allErrors`).innerHTML = "";
  }

  let isAuthentication = JSON.parse(localStorage.getItem("users")) || []; //Get data from Local Storage
  // Email Verification
  let checkEmailVarification = isAuthentication.some(
    (v) => v.email === emailAddress
  );

  if (!checkEmailVarification) {
    alert("Email not found. Please create an account.");
    return;
  }
  // Email and Password Matching
  let found = isAuthentication.some(
    (v) => v.email === emailAddress && v.pass === password
  );
  if (found) {
    window.location.href = "../pfsm.html";
  } else {
    document.getElementById(`passwordError`).innerHTML = "";
    document.getElementById(`passwordError`).innerHTML = "Incorrect password";
  }
}

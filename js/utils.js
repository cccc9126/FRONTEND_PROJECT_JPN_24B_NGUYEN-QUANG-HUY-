function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function errorNotice(status) {
  let errorElement = document.getElementById("error");
  if (status == 1) {
    document.getElementById("existing").innerHTML = `
  <p>Password cannot be empty</p>
  <p>Email cannot be empty</p>
  `;
  }
  if (status == 2) {
    document.getElementById("existing").innerHTML = `
 <p>Password cannot be empty</p>
  <p>Email cannot be empty</p>
  `;
  }
  if (status == 3) {
    document.getElementById("existing").innerHTML = `
  <p>Email or password is incorrect</p>
  `;
  }

  errorElement.style.display = "flex";
  errorElement.style.opacity = "1";
  setTimeout(() => {
    errorElement.style.transition = "opacity 1s";
    errorElement.style.opacity = "0";
  }, 2000);
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 2000);
}

function existingNotice() {
  document.getElementById("existing").innerHTML = `
  <p>Email or Username is already taken</p>
  `;
  let errorElement = document.getElementById("error");
  errorElement.style.display = "flex";
  errorElement.style.opacity = "1";
  setTimeout(() => {
    errorElement.style.transition = "opacity 1s";
    errorElement.style.opacity = "0";
  }, 2000);
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 2000);
}

function successNotice() {
  let successElement = document.getElementById("success");
  successElement.style.display = "flex";
  successElement.style.opacity = "1";
  setTimeout(() => {
    successElement.style.transition = "opacity 1s ease-in-out";
    successElement.style.opacity = "0";
  }, 2000);

  setTimeout(() => {
    successElement.style.display = "none";
  }, 3000);
}

function signUp() {
  let email = document.getElementById("email").value.trim();
  let userName = document.getElementById("userName").value.trim();
  let pass = document.getElementById("pass").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (email.length == 0 || userName.length == 0 || pass.length == 0) {
    errorNotice(1);
    return;
  }
  let existingUser = users.find((item) => item.email === email);
  if (existingUser) {
    existingNotice();
    return;
  }
  let newUser = {
    id: users.length + 1,
    username: userName,
    email: email,
    password: pass,
    created_at: new Date().toISOString(),
    boards: [],
  };
  setTimeout(() => {
    window.location = "../page/sign_in.html";
  }, 1000);

  users.push(newUser);
  saveUsers(users);
  successNotice();
}

function signIn() {
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("pass").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (email.length == 0 || pass.length == 0) {
    errorNotice(2);
    return;
  }
  let user = users.find(
    (item) => item.email === email && item.password === pass
  );
  if (user) {
    successNotice();
    setTimeout(() => {
      window.location = "../page/dashBoard.html";
    }, 1000);
  } else {
    errorNotice(3);
  }
}



function createNewBoard() {
  window.location = "./creatNewBoard.html";
}
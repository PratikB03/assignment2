window.addEventListener("beforeunload", () => {
  localStorage.clear();
});

let displayData = () => {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  let storedUser = JSON.parse(localStorage.getItem("users"));
  if (storedUser) {
    storedUser.map(
      (user, index) =>
        (tbody.innerHTML += `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${user.username}</td>
                      <td>${user.email}</td>
                  </tr>`)
    );
  }
};

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let postObject = {
    email,
    password,
    username,
  };
  
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users/");
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(JSON.stringify(postObject));

  xhr.onload = () => {
    if (xhr.status == 201) {
      let storedUser = JSON.parse(localStorage.getItem("users")) || [];
      const existingUsernames = storedUser.map(user => user.username);

      if (!existingUsernames.includes(postObject.username)) {
        storedUser.unshift(postObject);
        localStorage.setItem("users", JSON.stringify(storedUser));
        displayData();
      } else {
        alert("Username already exists.");
      }
    }
  };
});

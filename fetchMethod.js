let usersUl = document.querySelector(".users");
let postsList = document.querySelector(".posts");
let showUsers = document.querySelector(".showUsers");

//fetch users
function init() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((usersJson) => {
      //adding users to the page
      addingUsers(usersJson);
      // At beginning adding posts for user 1 to the page
      fetchingPosts(1);
      //show posts of clicked user
      setupUserClickHandler();
      showHideUsers();
    });
}
// add users and active(at first time)
function addingUsers(users) {
  for (let user of users) {
    let userLi = document.createElement("li");
    userLi.classList.add("data-userId");
    userLi.dataset.userId = user.id;
    // add active to firs user
    if (userLi.dataset.userId === "1") {
      userLi.classList.add("clicked");
    }
    userLi.classList.add("user");
    let userName = document.createElement("p");
    userName.textContent = user.name;
    let userMail = document.createElement("p");
    userMail.textContent = user.email;
    userLi.appendChild(userName);
    userLi.appendChild(userMail);
    usersUl.appendChild(userLi);
  }
}
// fetch and add posts for user
function fetchingPosts(userId) {
  postsList.innerHTML = "";
  fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
    .then((response) => response.json())
    .then((posts) => {
      for (let post of posts) {
        let postElement = document.createElement("li");
        postElement.className = "post";
        let postElementTitle = document.createElement("h4");
        postElementTitle.textContent = post.title;
        let postElementBody = document.createElement("p");
        postElementBody.textContent = post.body;
        postElement.appendChild(postElementTitle);
        postElement.appendChild(postElementBody);
        postsList.appendChild(postElement);
      }
    });
}
//enhanced clicked user (using delegation)
function setupUserClickHandler() {
  usersUl.addEventListener("click", (event) => {
    // Check if the clicked element is a user <li> or contains it
    let clickedUser = event.target.closest("li.user");
    if (clickedUser) {
      // Remove 'clicked' class from all users
      document
        .querySelectorAll(".user")
        .forEach((user) => user.classList.remove("clicked"));
      // Add 'clicked' class to the clicked user
      clickedUser.classList.add("clicked");
      // Fetch and display posts for the clicked user
      fetchingPosts(clickedUser.dataset.userId);
    }
  });
}
//
function showHideUsers() {
  showUsers.addEventListener("click", () => {
    if (showUsers.classList.contains("hide")) {
      showUsers.textContent = "Show All Users";
      document
        .querySelectorAll(".user")
        .forEach((user) => (user.style.display = "none"));
      console.log(document.querySelector(".user.clicked"));
      document.querySelector(".user.clicked").style.display = "block";
      showUsers.classList.remove("hide");
      showUsers.classList.add("show");
    } else if (showUsers.classList.contains("show")) {
      showUsers.textContent = "Hide Other Users";
      document
        .querySelectorAll(".user")
        .forEach((user) => (user.style.display = "block"));
      showUsers.classList.remove("show");
      showUsers.classList.add("hide");
    }
  });
}
//Start Loading users and posts to The Page
init();

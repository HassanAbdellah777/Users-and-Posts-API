let usersUl = document.querySelector(".users");
let postsList = document.querySelector(".posts");
//fetch users
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((usersJson) => {
    addingUsers(usersJson);
    let usersList = document.querySelectorAll(".users li");
    clickedUser(usersList);
  });
// add users and active user function at beginning
function addingUsers(users) {
  for (let user of users) {
    let userLi = document.createElement("li");
    userLi.classList.add("data-userId");
    userLi.dataset.userId = user.id;
    //add active to firs user
    if (userLi.dataset.userId === "1") {
      userLi.classList.add("clicked");
      fetchingPosts(1);
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
//clicked user
function clickedUser(usersList) {
  usersList.forEach((user) => {
    user.addEventListener("click", (el) => {
      usersList.forEach((user) => {
        user.classList.remove("clicked");
      });
      el.target.classList.add("clicked");
      fetchingPosts(el.target.dataset.userId);
      deletePosts();
    });
  });
}
//delete posts
function deletePosts() {
  let posts = document.querySelectorAll(".posts li");
  for (let post of posts) {
    post.remove();
  }
}

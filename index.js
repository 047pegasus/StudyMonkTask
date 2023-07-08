//Function to read flag data from local storage
var flag = JSON.parse(localStorage.getItem('flag')) || false;

let navlinks = document.querySelectorAll("header nav a");

for (const link of navlinks) {
  link.addEventListener("click", smoothScroll);
}

function smoothScroll(event) {
  event.preventDefault();
  const href = this.getAttribute("href");
  document.querySelector(href).scrollIntoView({
    behavior: "smooth"
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-button');

  if (flag) {
    loginButton.innerHTML = 'Logout';
  } else {
    loginButton.innerHTML = 'Login/SignUp';
  }
});

  // Update login/logout button when the page loads
//window.addEventListener('load', updateLoginButton(flag));

function logout(event) {
  event.preventDefault();
  localStorage.removeItem('currentUser');
  flag = false;
  localStorage.setItem('flag', JSON.stringify(flag));
  alert('Logout successful!');
  window.location.href = 'index.html';
}

function logoutCheckEvent(event) {
  flag = JSON.parse(localStorage.getItem('flag')) 
  if (flag) {
    logout(event);
  } else {
    window.location.href = 'login.html';
  }
}

const logcheck = document.getElementById('login-button');
logcheck.addEventListener('click', logoutCheckEvent);


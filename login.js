var flag = false;
var userName="";
// Function to fetch user data from local storage
function fetchUserData() {
    const usersData = JSON.parse(localStorage.getItem('users')) || { users: [] };
    return usersData.users;
  }
  
  // Function to write user data to local storage
  function writeUserData(users) {
    const usersData = { users: users };
    localStorage.setItem('users', JSON.stringify(usersData));
  }
  
  // Function to check if a user exists
  function userExists(username) {
    const users = fetchUserData();
    return users.some(user => user.username === username);
  }
  
  // Function to handle login/register form submission
  async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;
  
    const users = fetchUserData();
    const existingUser = users.find(user => user.username === username);
  
    if (existingUser) {
      if (existingUser.password === password) {
        alert('Login successful!');
        flag = true;
        //Extract username from email
        var index = username.indexOf('@');
        var usernameval = username.substring(0,index);
        userName=usernameval;
        localStorage.setItem('flag', JSON.stringify(flag));
        localStorage.setItem('userName', JSON.stringify(userName));
        window.location.href = 'index.html';
      } else {
        alert('Incorrect password. Please try again.');
      }
    } else {
      const newUser = {
        username: username,
        password: password
      };
  
      users.push(newUser);
      writeUserData(users);
  
      alert('Registration successful! You are now Signed Up!');
      alert('Login successful!');
      flag = true;
      localStorage.setItem('flag', JSON.stringify(flag));
      window.location.href = 'index.html';
    }
  }
  
  // Event listener for login/register form submission
  const registerForm = document.getElementById('login-form');
  registerForm.addEventListener('submit', handleRegister);

  //To set flag in local storage
  //localStorage.setItem('flag', JSON.stringify(flag));

  window.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const searchMenuButton = document.getElementById('search-menu-button');
  
    if (flag) {
      loginButton.innerHTML = 'Logout';
      searchMenuButton.style.display = 'visible';  
    }
     else {
      loginButton.innerHTML = 'Login/SignUp';
      searchMenuButton.style.display = 'none';
    }
  });
var flag = false;
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
  
    if (!(await userExists(username))) {
      const newUser = {
        username: username,
        password: password
      };
  
      const users = fetchUserData();
      users.push(newUser);
  
      writeUserData(users);
  
      alert('Registration successful! You are now signed up and logged in!');
      //To set flag in local storage
      flag =true;
      localStorage.setItem('flag', JSON.stringify(flag));
      window.location.href = 'index.html';
    } else {
      alert('User already exists. Login successful!');
      flag =true;
      localStorage.setItem('flag', JSON.stringify(flag));
      window.location.href = 'index.html';
    }
  }
  
  // Event listener for login/register form submission
  const registerForm = document.getElementById('login-form');
  registerForm.addEventListener('submit', handleRegister);

  //To set flag in local storage
  //localStorage.setItem('flag', JSON.stringify(flag));

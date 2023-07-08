// Function to fetch student data from JSON file
async function fetchStudentData() {
  try {
    const response = await fetch('studentdata.json');
    const data = await response.json();
    return data.students;
  } catch (error) {
    console.error('Error fetching student data:', error);
    return [];
  }
}

// Function to display search results
var flag = JSON.parse(localStorage.getItem('flag')) || false;

function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.innerHTML = '';

  if (results.length === 0) {
    searchResultsContainer.innerText = 'No results found.';
  } else {
    results.forEach(student => {
      const studentCard = document.createElement('div');
      studentCard.classList.add('student-card');
      studentCard.addEventListener('click', () => selectStudent(studentCard, student));
      studentCard.dataset.student = JSON.stringify(student);

      const name = document.createElement('h3');
      name.innerText = student.name;

      const enrollmentId = document.createElement('p');
      enrollmentId.innerText = `Enrollment ID: ${student.enrollmentId}`;

      const comfortableLanguage = document.createElement('p');
      comfortableLanguage.innerText = `Preferred Language: ${student.comfortableLanguage}`;

      const collegeName = document.createElement('p');
      collegeName.innerText = `College Name: ${student.collegeName}`;

      const secondaryLanguage = document.createElement('p');
      secondaryLanguage.innerText = `Secondary Language: ${student.secondaryLanguage}`;

      const preferredJobRole = document.createElement('p');
      preferredJobRole.innerText = `Preferred Job Role: ${student.preferredJobRole}`;

      const location = document.createElement('p');
      location.innerText = `Location: ${student.location}`;

      studentCard.appendChild(name);
      studentCard.appendChild(enrollmentId);
      studentCard.appendChild(comfortableLanguage);
      studentCard.appendChild(collegeName);
      studentCard.appendChild(secondaryLanguage);
      studentCard.appendChild(preferredJobRole);
      studentCard.appendChild(location);

      searchResultsContainer.appendChild(studentCard);
    });
  }
}

// Search function
async function searchStudents() {
  const preferredLanguageInput = document.getElementById('preferred-language');
  const preferredJobRoleInput = document.getElementById('preferred-job-role');
  const locationInput = document.getElementById('location');

  const preferredLanguage = preferredLanguageInput.value.trim().toLowerCase();
  const preferredJobRole = preferredJobRoleInput.value.trim().toLowerCase();
  const location = locationInput.value.trim().toLowerCase();

  const studentData = await fetchStudentData();

  const filteredStudents = studentData.filter(student => {
    const studentPreferredLanguage = student.comfortableLanguage.toLowerCase();
    const studentPreferredJobRole = student.preferredJobRole.toLowerCase();
    const studentLocation = student.location.toLowerCase();

    // Check if any of the parameters match
    return (
      (preferredLanguage === '' || studentPreferredLanguage.includes(preferredLanguage)) &&
      (preferredJobRole === '' || studentPreferredJobRole.includes(preferredJobRole)) &&
      (location === '' || studentLocation.includes(location))
    );
  });

  displaySearchResults(filteredStudents);
}

// Example usage:
document.getElementById('search-button').addEventListener('click', searchStudents);

// Function to clear search results
function clearResults() {
  const searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.innerHTML = '';
}
document.getElementById('clear-button').addEventListener('click', clearResults);

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




// Function to handle student card selection
function selectStudent(card, student) {
  card.classList.toggle('selected');
  student.selected = !student.selected;
}

// Function to export selected candidates to CSV
function exportSelectedCandidates() {
  const selectedStudents = Array.from(document.getElementsByClassName('selected')).map(card => JSON.parse(card.dataset.student));
  if (selectedStudents.length === 0) {
    alert('No students selected!');
    return;
  }
  // Convert selected students to CSV format
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Name,Enrollment ID,Preferred Language,College Name,Preffered Job Role,Location\n';
  selectedStudents.forEach(student => {
    csvContent += `${student.name},${student.enrollmentId},${student.comfortableLanguage},${student.collegeName},${student.preferredJobRole},${student.location}\n`;
  });

  // Create a temporary anchor element to trigger the download
  const link = document.createElement('a');
  link.href = encodeURI(csvContent);
  link.target = '_blank';
  link.download = 'selected_candidates.csv';
  link.click();
}


// Add an event listener to the export button
document.getElementById('export-button').addEventListener('click', exportSelectedCandidates);
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
function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.innerHTML = '';

  if (results.length === 0) {
    searchResultsContainer.innerText = 'No results found.';
  } else {
    results.forEach(student => {
      const studentCard = document.createElement('div');
      studentCard.classList.add('student-card');

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

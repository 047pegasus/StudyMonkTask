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
      document.getElementById("container").style.width="fit-content";

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

      studentCard.appendChild(name);
      studentCard.appendChild(enrollmentId);
      studentCard.appendChild(comfortableLanguage);
      studentCard.appendChild(collegeName);
      studentCard.appendChild(secondaryLanguage);

      searchResultsContainer.appendChild(studentCard);
    });
  }
}

// Search function
async function searchStudents() {
  const preferredLanguageInput = document.getElementById('preferred-language');
  const secondaryLanguageInput = document.getElementById('secondary-language');

  const preferredLanguage = preferredLanguageInput.value.trim().toLowerCase();
  const secondaryLanguage = secondaryLanguageInput.value.trim().toLowerCase();

  if (preferredLanguage == '' && secondaryLanguage == '') {
    alert('Please enter a preferred or secondary language.');
    return;
  }

  const studentData = await fetchStudentData();

  const filteredStudents = studentData.filter(student => {
    const studentPreferredLang = student.comfortableLanguage.toLowerCase();
    const studentSecondaryLang = student.secondaryLanguage.toLowerCase();

    // Check if either preferred or secondary language matches
    return (
      studentPreferredLang.includes(preferredLanguage) &&
      studentSecondaryLang.includes(secondaryLanguage)
    );
  });

  displaySearchResults(filteredStudents);
}

// Example usage:
document.getElementById('search-button').addEventListener('click', searchStudents);

// Add an event listener to the clear button
document.getElementById('clear-button').addEventListener('click', clearResults);

// Function to clear search results
function clearResults() {
  const searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.innerHTML = '';
}
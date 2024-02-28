const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
      patients.push({ name, gender: gender.value, age, condition });
      resetForm();
      generateReport();
    }
  }


  function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }


/*
This generateReport() function calculates and constructs an analysis report based on the collected patient data stored in the patients[] array. Here's a breakdown:

Initialization:
numPatients Represents the total number of patients stored in the patients[] array
conditionsCount A data structure (object) initializing counters for specific medical conditions (Diabetes, Thyroid, High Blood Pressure), initially set to zero.
genderConditionsCount A nested object with gender-specific condition counters ( male and female) for each medical condition, also initialized to zero for each condition
Data processing loop:
Iterates through the patients[] array: Utilizes a for…of loop to iterate through each patient's data within the patients[] array
Increment condition counts: Increments the count for each patient's specific medical condition in the conditionsCount object.
Updating gender-based condition counts: Increases the count of each medical condition within the respective gender category in the genderConditionsCount object based on the patient's gender and condition
HTML update:
Update report element: Dynamically updates the HTML content within the designated report element
Total patients display: Displays the total number of patients
Conditions breakdown: Lists the counts for each medical condition in the conditionsCount object
Gender-based conditions display: Illustrates counts of each condition categorized by gender in the genderConditionsCount object, showing the distribution of conditions among males and females separately.
Event Listener
Now, you need to set up event listener using addPatientButton.addEventListener("click", addPatient) to add patient details when the user clicks the Add Patient button.
Go to your browser where your code runs, enter details, and click the Add Patient button. It should generate data, as shown in the screenshot below.
*/

function generateReport() {

    const numPatients = patients.length;

    const conditionsCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };

    const genderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
      report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const condition in genderConditionsCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
      }
    }
  }

addPatientButton.addEventListener("click", addPatient);


/*
This function fetches the health condition data from the health.json file and searches for a matching condition based on user input. Then, it displays the condition details or an error message in a designated HTML element (resultDiv).
*/
function searchCondition() {

    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
      .then(response => response.json())  // Converts the fetched response into JSON format.
      .then(data => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);

        if (condition) {
          const symptoms = condition.symptoms.join(', ');
          const prevention = condition.prevention.join(', ');
          const treatment = condition.treatment;

          resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
          resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
          resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCondition);
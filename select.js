// Define your directories array
const directpries = [
  "/var/www/html/website1",
  "/var/www/html/website2",
  "/var/www/html/website3",
  "/var/www/html/website4",
];

// Function to populate the directory div with select element
function populateDirectoryDiv() {
  const directoryDiv = document.querySelector(".directory");

  // Create the select element
  const selectElement = document.createElement("select");
  selectElement.classList.add("form-select");
  selectElement.setAttribute("id", "directory");
  selectElement.setAttribute("name", "directory");
  selectElement.setAttribute("required", true);

  // Create and append default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select Directory";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.appendChild(defaultOption);

  // Add options for each directory
  directpries.forEach((directory, index) => {
    const option = document.createElement("option");
    option.value = directory;
    option.text = `Website ${index + 1}`;
    selectElement.appendChild(option);
  });

  // Append the select element to the directory div
  directoryDiv.appendChild(selectElement);
}

// Call the function to populate directory div with select element
populateDirectoryDiv();

// Function to handle selection and removal of chosen directory
function handleSelection() {
  const selectElement = document.getElementById("directory");
  const selectedDirectory = selectElement.value;

  if (selectedDirectory) {
    // Remove the selected directory from the array
    const index = directpries.indexOf(selectedDirectory);
    if (index !== -1) {
      directpries.splice(index, 1);
    }

    // Repopulate the directory div with updated select options
    populateDirectoryDiv();
  } else {
    alert("Please select a directory.");
  }
}

// Add event listener to select element
document
  .getElementById("directory")
  .addEventListener("change", handleSelection);

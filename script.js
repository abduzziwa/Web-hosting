// Define your directories array
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#uploadForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Validate form data
    const formData = new FormData(form);
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      displayErrors(validationErrors);
      return; // Return early if there are validation errors
    }

    // Send form data to server
    sendDataToServer(formData);
  });

  function validateFormData(formData) {
    const errors = [];
    const requiredFields = [
      "fullname",
      "email",
      "phone",
      "domain",
      "directory",
      "htmlfile",
    ];
    requiredFields.forEach((field) => {
      if (!formData.get(field)) {
        errors.push(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`
        );
      }
    });
    if (formData.get("email") && !isValidEmail(formData.get("email"))) {
      errors.push("Please enter a valid email address.");
    }
    return errors;
  }

  function displayErrors(errors) {
    alert(errors.join("\n"));
  }

  function isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function sendDataToServer(formData) {
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Parse response body as text
      })
      .then((data) => {
        console.log("Response from server:", data);
        // Assuming the server responds with 'Success' or 'Failed'
        if (data === "Success") {
          window.location.href = "success.html"; // Redirect to success page
        } else if (data === "Failed") {
          window.location.href = "failed.html"; // Redirect to failed page
        } else {
          console.error("Unexpected response from server:", data);
        }
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
      });
  }
});

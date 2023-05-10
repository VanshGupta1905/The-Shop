// Get the form element by ID
const form = document.getElementById("myForm");

// Add a submit event listener to the form
form.addEventListener("submit", function (event) {
  // Prevent the default form submission action
  event.preventDefault();

  // Get the form data using FormData API
  const formData = new FormData(form);

  // Make an AJAX request to submit the form data
  const xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action);
  xhr.send(formData);

  // Handle the AJAX response
  xhr.onload = function () {
    // Check the status code of the response
    if (xhr.status === 200) {
      // Success!
      alert("Form submitted successfully");
      form.reset();
    } else {
      // Error!
      alert("Form submission failed");
    }
  };
});

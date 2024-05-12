document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scrolling for Navigation Links
    // Ensure there are anchors in the page that might require smooth scrolling.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Handling and Validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Perform validation
            if (validateForm()) {
                console.log("Form is valid, processing form...");
                processForm(this);
            } else {
                console.log("Form validation failed.");
                alert("Please fill in all required fields correctly.");
            }
        });
    }

    // Responsive Menu Toggle for small devices
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        const navLinks = document.querySelector('.navbar ul');
        menuToggle.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }
});

// Function to validate the form
function validateForm() {
    const name = document.getElementById('name') ? document.getElementById('name').value : '';
    const email = document.getElementById('email') ? document.getElementById('email').value : '';
    const message = document.getElementById('message') ? document.getElementById('message').value : '';

    return name !== "" && email !== "" && message !== "";
}

// Function to process the form
function processForm(form) {
    const formData = new FormData(form);
    console.log(Array.from(formData.entries())); // Logging as an array for better readability

    // Optionally, send data to a server
    fetch('your-endpoint', {
        method: 'POST',
        headers: {
            'Accept': 'application/json', // Expecting JSON response
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)) // Convert FormData to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));

    // Show a success message
    alert("Thank you for your message!");
}

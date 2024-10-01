// Contact form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name && email && message) {
    alert('Thank you, ' + name + '! Your message has been sent.');
  } else {
    alert('Please fill in all fields.');
  }
});
// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Handle form submission and file size validation
document.getElementById('storyForm').addEventListener('submit', function(event) {
  const fileInput = document.getElementById('photo');
  const file = fileInput.files[0];

  if (file && file.size > 50 * 1024 * 1024) { // 50MB limit
    alert('File size exceeds 50MB!');
    event.preventDefault(); // Prevent form submission
  } else {
    alert('Story submitted successfully!');
  }
});


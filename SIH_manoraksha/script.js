// Chatbot toggle
const chatBtn = document.getElementById('chatBtn');
const chatBox = document.getElementById('chatBox');

if (chatBtn) {
  chatBtn.addEventListener('click', () => {
    chatBox.style.display = (chatBox.style.display === 'block') ? 'none' : 'block';
  });
}

// Booking form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("✅ Appointment request submitted confidentially!");
  });
}

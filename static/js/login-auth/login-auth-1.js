


// Placeholder for a future function that will actually send an SMS
function sendSMSCode(phoneNumber) {

  // Simulate sending SMS and awaiting response
  setTimeout(function () {

    // Redirect to login-auth-2.html after 1 second
    window.location.href = '/sms-validation/';
  }, 1000); // Simulate a 1 second delay
}


document.addEventListener('DOMContentLoaded', function () {

    const phoneInput = document.getElementById('phone-input');
    const submitButton = document.getElementById('submit-button');

    // Helper function to format phone number
    phoneInput.addEventListener('input', function (e) {
        let input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        let formattedNumber = '';

        if (input.length > 0) {
            formattedNumber += '(' + input.substring(0, 3); // Area code
        }
        if (input.length >= 4) {
            formattedNumber += ') ' + input.substring(3, 6); // First three digits
        }
        if (input.length >= 7) {
            formattedNumber += '-' + input.substring(6, 8); // Next two digits
        }
        if (input.length >= 9) {
            formattedNumber += '-' + input.substring(8, 10); // Last two digits
        }

        e.target.value = formattedNumber;

        // Check if the phone number is valid (10 digits after the +7)
        if (input.length === 10) {
            submitButton.classList.remove('inactive');
            submitButton.classList.add('active');
            submitButton.disabled = false;
        } else {
            submitButton.classList.remove('active');
            submitButton.classList.add('inactive');
            submitButton.disabled = true;
        }
    });



function isValidRussianPhoneNumber(phone) {
  const cleanedPhone = phone.replace(/\D/g, ''); // Remove all non-digit characters
  // Russian phone numbers should be 11 digits, starting with '7' or '8'

  return /\d{10}$/.test(cleanedPhone) || /^8\d{10}$/.test(cleanedPhone);
}

// Add click event listener to the submit button
document.getElementById('submit-button').addEventListener('click', function () {
  const phoneNumberInput = document.getElementById('phone-input').value;
  const cleanedPhoneNumber = phoneNumberInput.replace(/\D/g, ''); // Remove non-digit characters

  if (isValidRussianPhoneNumber(cleanedPhoneNumber)) {
    // Store the phone number in sessionStorage
    sessionStorage.setItem('phoneNumber', cleanedPhoneNumber);

    window.location.href = '/sms-validation/';
  } else {

  }
});
});
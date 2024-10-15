


// Get references to the input elements and the submit button
const inputs = document.querySelectorAll('.digit-input');
const submitButton = document.querySelector('.submit-button');
const phoneNumber = sessionStorage.getItem('phoneNumber');

// Simulate the correct verification code
const correctCode = '1234';

// Function to format the phone number
function formatPhoneNumber(input) {
  const inputDigits = input.replace(/\D/g, ''); // Remove non-digit characters
  let formattedNumber = '+7 ';

  if (inputDigits.length >= 1) {
    formattedNumber += '(' + inputDigits.substring(0, 3);
  }
  if (inputDigits.length >= 4) {
    formattedNumber += ') ' + inputDigits.substring(3, 6);
  }
  if (inputDigits.length >= 7) {
    formattedNumber += '-' + inputDigits.substring(6, 8);
  }
  if (inputDigits.length >= 9) {
    formattedNumber += '-' + inputDigits.substring(8, 10);
  }

  return formattedNumber;
}

// Display the formatted phone number or  if not found
if (phoneNumber) {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  document.getElementById('phone-display').textContent = formattedPhone;
} else {
  console.error('No phone number found in sessionStorage.');
  window.location.href = '/login/';
}

// Function to check if all inputs are filled
function checkInputs() {
  if (Array.from(inputs).every((input) => input.value)) {
    submitButton.classList.add('active');
  } else {
    submitButton.classList.remove('active');
  }
}

// **Function to reset error styles**
function resetErrorStyles() {
  inputs.forEach((input) => input.classList.remove('error'));
  const errorMessage = document.getElementById('error-message');
  if (errorMessage) {
    errorMessage.textContent = '';
  }
}

// Event listener for each input field
inputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    // Remove error styles when user starts typing
    resetErrorStyles();

    // Allow only digits
    input.value = input.value.replace(/\D/g, '');

    // Move focus to next input if current is filled and not from paste
    if (
      input.value &&
      index < inputs.length - 1 &&
      e.inputType !== 'insertFromPaste'
    ) {
      inputs[index + 1].focus();
    }

    checkInputs();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      // **Remove error styles when user deletes a digit**
      resetErrorStyles();

      if (input.value === '') {
        if (index > 0) {
          inputs[index - 1].focus();
        }
      } else {
        input.value = '';
      }
    } else if (e.key >= '0' && e.key <= '9') {
      // Prevent entering multiple digits
      if (input.value.length >= 1) {
        e.preventDefault();
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
          inputs[index + 1].value = e.key;
        }
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener('paste', (e) => {
    e.preventDefault();
    resetErrorStyles(); // **Reset error styles on paste**

    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    const digits = pasteData.replace(/\D/g, '');

    // Distribute digits into input fields
    let currentIndex = index;
    for (
      let i = 0;
      i < digits.length && currentIndex < inputs.length;
      i++
    ) {
      inputs[currentIndex].value = digits[i];
      currentIndex++;
    }

    // Move focus to the next empty input
    if (currentIndex < inputs.length) {
      inputs[currentIndex].focus();
    } else {
      inputs[inputs.length - 1].focus();
    }

    checkInputs();
  });
});

// Set focus to the first input on page load and start resend timer
window.addEventListener('load', () => {
  inputs[0].focus();
  startResendTimer(10); // Button is inactive for 10 seconds on page load
});

// Resend SMS button functionality
const resendButton = document.getElementById('resend-button');
let resendTimer = null;
let isResendButtonActive = false;

// Function to start the resend timer
function startResendTimer(duration) {
  let countdown = duration;
  updateResendButton(`Отправить еще раз (${countdown}с)`, false);

  resendTimer = setInterval(function () {
    countdown--;
    updateResendButton(`Отправить еще раз (${countdown}с)`, false);
    if (countdown <= 0) {
      clearInterval(resendTimer);
      updateResendButton('Отправить еще раз', true);
    }
  }, 1000);
}

// Function to update the resend button's state and text
function updateResendButton(text, isActive) {
  resendButton.innerHTML = text;
  isResendButtonActive = isActive;
  if (isActive) {
    resendButton.classList.remove('disabled');
  } else {
    resendButton.classList.add('disabled');
  }
}

// Add click event listener to the resend button
resendButton.addEventListener('click', function () {
  if (!isResendButtonActive) {
    // Do nothing if the button is not active
    return;
  }

  // Disable the button to prevent multiple clicks
  isResendButtonActive = false;
  resendButton.classList.add('disabled');

  // **Reset error styles when resend is clicked**
  resetErrorStyles();

  // Change the button content to include loading animation and text
  resendButton.innerHTML =
    '<div class="loading-spinner">􀇯</div> Отправка...';

  sendSMSCode(phoneNumber, function () {
    // After sending SMS, start the countdown timer
    startResendTimer(10);
  });
});

// Function to simulate sending an SMS code
function sendSMSCode(phoneNumber, callback) {
  console.log(`Simulating sending SMS to ${phoneNumber}`);
  // Simulate sending SMS and awaiting response
  setTimeout(function () {
    // SMS sent successfully
    // Execute the callback function if provided
    if (typeof callback === 'function') {
      callback();
    }
  }, 2000); // Simulate a 2-second delay
}
const button = document.querySelector('.submit-button');
const loader = document.querySelector('.loader');
const textLabel = document.querySelector('.text_label');

button.addEventListener('click', function() {
  // Shrink the button immediately when clicked
  button.style.transform = 'scale(0.95)';

  // After 150ms, return the button to its normal size
  setTimeout(function() {
    button.style.transform = 'scale(1)';
  }, 150); // Adjust timing as needed for the shrinking effect

  // Now handle the loading spinner and text as usual
  textLabel.style.display = 'none';
  loader.style.display = 'block';

  // Add loading class
  button.classList.add('button-loading');

  // Simulate a loading period (like an API request)
  setTimeout(function() {
    // After 3 seconds, revert to the original state
    loader.style.display = 'none';
    textLabel.style.display = 'block';
    button.classList.remove('button-loading');
  }, 3000); // Adjust as needed
});

// Add event listener for the submit button
submitButton.addEventListener('click', function () {
  if (!submitButton.classList.contains('active')) {
    // Button is not active, do nothing
    return;
  }

  // Get the entered code
  const enteredCode = Array.from(inputs)
    .map((input) => input.value)
    .join('');

  if (enteredCode === correctCode) {
    // For example,  to another page
    window.location.href = '/signup/';
  } else {
  // Code is incorrect
  // Change border color of input boxes to red and add shake effect
  inputs.forEach((input) => {
    input.classList.add('error', 'shake');
  });

  // Display an error message
  const errorMessage = document.getElementById('error-message');
  if (errorMessage) {
    errorMessage.textContent = 'Неверный код. Пожалуйста, попробуйте еще раз.';
  }

  // Remove the shake class after the animation completes
  setTimeout(() => {
    inputs.forEach((input) => {
      input.classList.remove('shake');
    });
  }, 500); // Duration should match the animation duration in CSS
}
});
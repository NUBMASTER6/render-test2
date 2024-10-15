document.addEventListener("DOMContentLoaded", function () {
  const nextStepButton = document.querySelector(".button");
  const nameInput = document.querySelector(".frame-513139-item:nth-child(1) .input-field");
  const surnameInput = document.querySelector(".frame-513139-item:nth-child(2) .input-field");
  const birthdateInput = document.querySelector("#dob");
  const userDobDisplay = document.querySelector(".user-dob span");
  const maleButton = document.querySelector(".gender-btn[data-gender='male']");
  const femaleButton = document.querySelector(".gender-btn[data-gender='female']");
  let gender = null; // To track selected gender

  // Input validation flags
  let isNameValid = false;
  let isSurnameValid = false;
  let isBirthdateValid = false;
  let isEmailValid = false;
  let isPhoneValid = false;
  let isFirstFrame = true; // Track if we are on the first frame

  // Disable "Next Step" button by default
  nextStepButton.disabled = true;
  nextStepButton.style.opacity = '0.5';

  // Helper function to simulate fake database interaction
  function fakeDatabaseRequest(data, callback) {
    console.log("Simulating server interaction with data:", data);
    setTimeout(function () {
      callback(true); // Simulate a successful database operation
    }, 1500);
  }

  // Function to validate name input
  function validateNameInput() {
    const nameValue = nameInput.value.trim();
    isNameValid = nameValue.length > 0;
    nameInput.style.borderColor = isNameValid ? "var(--black-3)" : "red";
  }
function swapTabButtonClasses() {
  // Select outer elements
  const tabButtonBaseElements = document.querySelectorAll('.tab-button-base');
  const tabButtonBase1Elements = document.querySelectorAll('.tab-button-base-1');

  // Swap classes for all elements in the first group
  tabButtonBaseElements.forEach(el => {
    // Swap the outer class
    el.classList.add('tab-button-base-1');
    el.classList.remove('tab-button-base');

    // Find and swap the inner classes within this tab
    const label = el.querySelector('.lable');
    const text = el.querySelector('.text');
    const text1 = el.querySelector('.text-1');

    if (label) {
      label.classList.add('lable-1');
      label.classList.remove('lable');
    }
    if (text) {
      text.classList.add('sfpro-medium-black-12px');
      text.classList.remove('sfpro-medium-black-12px-2');
    }
    if (text1) {
      text1.classList.add('sfpro-medium-black-14px-3');
      text1.classList.remove('sfpro-medium-black-14px');
    }
  });

  // Swap classes for all elements in the second group
  tabButtonBase1Elements.forEach(el => {
    // Swap the outer class
    el.classList.add('tab-button-base');
    el.classList.remove('tab-button-base-1');

    // Find and swap the inner classes within this tab
    const label1 = el.querySelector('.lable-1');
    const text1 = el.querySelector('.text');
    const text2 = el.querySelector('.text-1');

    if (label1) {
      label1.classList.add('lable');
      label1.classList.remove('lable-1');
    }
    if (text1) {
      text1.classList.add('sfpro-medium-black-12px-2');
      text1.classList.remove('sfpro-medium-black-12px');
    }
    if (text2) {
      text2.classList.add('sfpro-medium-black-14px');
      text2.classList.remove('sfpro-medium-black-14px-3');
    }
  });
}

  // Function to validate surname input
  function validateSurnameInput() {
    const surnameValue = surnameInput.value.trim();
    isSurnameValid = surnameValue.length > 0;
    surnameInput.style.borderColor = isSurnameValid ? "var(--black-3)" : "red";
  }

  // Function to validate birthdate input
  function validateBirthdateInput() {
    const birthdateValue = birthdateInput.value.trim();
    const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/; // Example: 1998-08-30
    isBirthdateValid = birthdateRegex.test(birthdateValue);
    birthdateInput.style.borderColor = isBirthdateValid ? "var(--black-3)" : "red";
    if (isBirthdateValid) {
      userDobDisplay.textContent = birthdateValue.split("-").reverse().join(".");
    }
  }

  // Function to validate email input
  function validateEmailInput() {
    const emailInput = document.querySelector("#email");
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    isEmailValid = emailRegex.test(emailValue);
    emailInput.style.borderColor = isEmailValid ? "var(--black-3)" : "red";
  }

  // Function to validate phone input
  function validatePhoneInput() {
    const phoneInput = document.querySelector("#phone");
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/; // Example format: +7 (996) 341-40-70
    isPhoneValid = phoneRegex.test(phoneValue);
    phoneInput.style.borderColor = isPhoneValid ? "var(--black-3)" : "red";
  }

  // Function to update the button state on both frames
  function updateNextStepButtonState() {
    if (isFirstFrame) {
      // First frame validation (name, surname, birthdate, gender)
      if (isNameValid && isSurnameValid && isBirthdateValid && gender) {
        nextStepButton.disabled = false;
        nextStepButton.style.opacity = '1'; // Full opacity when active
      } else {
        nextStepButton.disabled = true;
        nextStepButton.style.opacity = '0.5'; // Reduced opacity when inactive
      }
    } else {
      // Second frame validation (email, phone)
      if (isEmailValid && isPhoneValid) {
        nextStepButton.disabled = false;
        nextStepButton.style.opacity = '1'; // Full opacity when active
      } else {
        nextStepButton.disabled = true;
        nextStepButton.style.opacity = '0.5'; // Reduced opacity when inactive
      }
    }
  }

  // Event listeners for gender buttons
  maleButton.addEventListener("click", function () {
    gender = "male";
    maleButton.classList.add("active");
    femaleButton.classList.remove("active");
    updateNextStepButtonState();
  });

  femaleButton.addEventListener("click", function () {
    gender = "female";
    femaleButton.classList.add("active");
    maleButton.classList.remove("active");
    updateNextStepButtonState();
  });

  // Attach input listeners to track changes on the first frame
  nameInput.addEventListener("input", function () {
    validateNameInput();
    updateNextStepButtonState();
  });

  surnameInput.addEventListener("input", function () {
    validateSurnameInput();
    updateNextStepButtonState();
  });

  birthdateInput.addEventListener("input", function () {
    validateBirthdateInput();
    updateNextStepButtonState();
  });

  // Attach input listeners to the email and phone on the second frame
  function attachNewFrameListeners() {
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");

    // Reset validation for the second frame
    isEmailValid = false;
    isPhoneValid = false;
    nextStepButton.disabled = true;
    nextStepButton.style.opacity = '0.5';

    // Email input validation and listener
    emailInput.addEventListener("input", function () {
      validateEmailInput();
      updateNextStepButtonState();
    });

    // Phone input formatting and validation listener
    phoneInput.addEventListener("input", function () {
      formatPhoneNumber(phoneInput);  // Format the phone number as the user types
      validatePhoneInput();
      updateNextStepButtonState();
    });
  }

  // Function to format phone number input
  function formatPhoneNumber(phoneInput) {
    let input = phoneInput.value.replace(/\D/g, ''); // Remove all non-numeric characters
    if (input.startsWith("7")) {
      input = input.substring(1); // Remove leading 7 if it's already included
    }

    // Ensure the phone number always starts with +7
    input = "+7" + input;

    // Format the phone number as +7 (XXX) XXX-XX-XX
    if (input.length > 2) {
      input = input.substring(0, 2) + ' (' + input.substring(2);
    }
    if (input.length > 7) {
      input = input.substring(0, 7) + ') ' + input.substring(7);
    }
    if (input.length > 12) {
      input = input.substring(0, 12) + '-' + input.substring(12);
    }
    if (input.length > 15) {
      input = input.substring(0, 15) + '-' + input.substring(15, 17);
    }
    if (input.length > 18) {
      input = input.substring(0, 18) + '-' + input.substring(18, 20);
    }

    // Update the input value with the formatted string
    phoneInput.value = input.substring(0, 20); // Max length for the formatted phone number
  }
    // Define the new frame's HTML
  const newFrameHTML = `
<div class="frame-513052">
  <div style="align-self: stretch; background-color: var(--black-4); border-radius: 12px; height: 1px; width: 100%;"></div>
</div>
<div class="text-12 sfpro-medium-black-20px">Контактная информация</div>
<div style="align-items: flex-start; display: flex; flex-direction: column; gap: 12px; width: 100%;">
  <article style="align-items: flex-start; display: flex; flex-direction: column; gap: 8px; width: 100%;">
    <label for="phone" class="sfpro-medium-black-14px">Телефон</label>
    <input type="tel" id="phone" name="phone" class="input-field" style="background-color: var(--cultured-pearl); border: 1px solid var(--black-4); border-radius: 10px; padding: 12px; width: 100%; color:black;" placeholder="+7 (996) 341-40-70">
  </article>
  <article style="align-items: flex-start; display: flex; flex-direction: column; gap: 8px; width: 100%;">
    <label for="email" class="sfpro-medium-black-14px">E-mail</label>
    <input type="email" id="email" name="email" class="input-field" style="background-color: var(--cultured-pearl); border: 1px solid var(--black-4); border-radius: 10px; padding: 12px; width: 100%; color:black;" placeholder="example@mail.ru">
    <div style="display: flex; align-items: center; gap: 4px;">
      <div style="width: 16px; height: 16px;"><span class="text-15">&#x1F6C8;</span></div>
      <p style="color: var(--black-3); font-family: var(--font-family-inter); font-size: var(--font-size-s);">Мы не будем отправлять спам! Только уведомления и новости</p>
    </div>
  </article>
</div>
<div style="display: flex; align-items: center; gap: 8px; height: 36px; width: 100%;">
  <div style="flex: 1;"><span class="sfpro-medium-black-14px">Получать новости от Паппи</span></div>
<div id="toggle-switch" style="align-items: center; background-color: black; border-radius: 12px; display: flex; height: 24px; width: 44px; padding: 2px; cursor: pointer;">
  <div id="toggle-knob" style="background-color: white; border-radius: 9999px; height: 20px; width: 20px; transition: transform 0.3s;"></div>
</div>

</div>
  `;
nextStepButton.addEventListener("click", function () {
  if (isFirstFrame) {
    // Existing code for handling the first frame
    validateNameInput();
    validateSurnameInput();
    validateBirthdateInput();

    if (isNameValid && isSurnameValid && isBirthdateValid && gender) {
      nextStepButton.disabled = true;

      // Simulate fake database request
      const userData = {
        name: nameInput.value,
        surname: surnameInput.value,
        birthdate: birthdateInput.value,
        gender: gender,
      };
      console.log(userData);
      fakeDatabaseRequest(userData, function (success) {
        if (success) {
          // Set to the second frame and disable the button again
          isFirstFrame = false;
          swapTabButtonClasses();
          replaceFrameContentWithTransition(newFrameHTML);
        } else {
          alert("Failed to save data. Please try again.");
        }
      });
    } else {

    }
  } else {
    // New code for handling the second frame
    validateEmailInput();
    validatePhoneInput();

    if (isEmailValid && isPhoneValid) {
      nextStepButton.disabled = true;

      // Simulate fake database request
      const emailInput = document.querySelector("#email");
      const phoneInput = document.querySelector("#phone");

      const userData = {
        email: emailInput.value,
        phone: phoneInput.value,
      };
      fakeDatabaseRequest(userData, function (success) {
        if (success) {
          // Redirect to 'login-auth-5.html'
          window.location.href = '/signup-success/';
        } else {
          alert("Failed to save data. Please try again.");
        }
      });
    } else {

    }
  }
})
function replaceFrameContentWithTransition(newHTML) {
    const frameContainer = document.querySelector('.frame-513044');
    console.log('called');

    // Ensure the correct elements are targeted for replacement
    const contentToReplace = frameContainer.querySelectorAll(':scope > :not(.horizontal-tabs)');

    // Add fade-out transition
    contentToReplace.forEach((element) => element.classList.add('fade-out'));

    // Set a timeout to ensure content replacement happens even if `transitionend` is not triggered
    setTimeout(() => {
        // Remove old content and insert new HTML
        contentToReplace.forEach((el) => el.remove());
        frameContainer.insertAdjacentHTML('beforeend', newHTML);

        // Initialize toggle switch functionality
        initializeToggleSwitch();

        // Attach listeners for new input fields (e.g., email, phone)
        attachNewFrameListeners();
    }, 500); // Adjust to match the transition duration (in milliseconds)
}

// Function to initialize the toggle switch
  function initializeToggleSwitch() {
    const toggleSwitch = document.getElementById('toggle-switch');
    const toggleKnob = document.getElementById('toggle-knob');

    toggleSwitch.addEventListener('click', function() {
      // Check if the toggle is "on" by seeing if the knob is already moved to the right
      const isActive = toggleKnob.style.transform === 'translateX(20px)';

      // Toggle the knob's position between left and right
      toggleKnob.style.transform = isActive ? 'translateX(0px)' : 'translateX(20px)';
    });
  }
  // Initial setup of listeners and validations for the first frame
  updateNextStepButtonState();
});

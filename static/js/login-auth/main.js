let initialContentHeight;
let initialContentTop;
let initialFooterTop;

// Save the default positions and dimensions when the page loads
window.addEventListener('load', () => {
    const footer = document.querySelector('.footer');
    const content = document.querySelector('.content');

    initialContentHeight = content.getBoundingClientRect().height;
    initialContentTop = content.getBoundingClientRect().top;
    initialFooterTop = footer.getBoundingClientRect().top;

    adjustContentHeight();
});

function adjustContentHeight() {
    const footer = document.querySelector('.footer');
    const content = document.querySelector('.content');

    // Get the distance of the footer's top from the top of the viewport
    const footerTop = footer.getBoundingClientRect().top;
    const contentBottom = content.getBoundingClientRect().bottom;

    // Calculate the available space for content
    const maxContentHeight = footerTop - 63; // Keep content 8px above the footer

    // Apply the max-height to the content dynamically
    content.style.maxHeight = maxContentHeight + 'px';

    // Check if the distance between content bottom and footer top is greater than 20px
    const gap = footerTop - contentBottom;
    if (gap > 20) {
        // Restore the default positioning and size
        content.style.height = initialContentHeight + 'px';
        content.style.top = initialContentTop + 'px';
        footer.style.top = initialFooterTop + 'px';
    }
}

// Call the function on window resize and scroll to ensure the max-height is adjusted dynamically
window.addEventListener('resize', adjustContentHeight);
window.addEventListener('scroll', adjustContentHeight);



const buttons = document.querySelectorAll('.button');

// Loop through each button and attach the event listener to resize on click and create an animation of spin
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Shrink the button immediately when clicked
        button.style.transform = 'scale(0.95)';

        // After 150ms, return the button to its normal size
        setTimeout(function() {
            button.style.transform = 'scale(1)';
        }, 150); // Adjust timing as needed for the shrinking effect

        // Find the text label and loader within the button or its container
        const textLabel = button.querySelector('.text-label');
        const loader = button.querySelector('.loader');

        // Hide the text and show the loader if present
        if (textLabel) textLabel.style.display = 'none';
        if (loader) loader.style.display = 'block';

        // Add loading class to the button
        button.classList.add('button-loading');

        // Simulate a loading period (like an API request)
        setTimeout(function() {
            // After 3 seconds, revert to the original state
            if (loader) loader.style.display = 'none';
            if (textLabel) textLabel.style.display = 'block';
            button.classList.remove('button-loading');
        }, 3000); // Adjust as needed
    });
});
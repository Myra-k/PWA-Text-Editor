// Get a reference to the button with the id 'buttonInstall'
const butInstall = document.getElementById('buttonInstall');

// Add an event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event object in the 'deferredPrompt' property of the window object
    window.deferredPrompt = event;

    // Show the installation button by removing the 'hidden' class
    butInstall.classList.toggle('hidden', false);
});

// Add a click event listener to the installation button
butInstall.addEventListener('click', async () => {
    // Retrieve the stored prompt event from the 'window.deferredPrompt' property
    const promptEvent = window.deferredPrompt;

    // If there is no prompt event, return early
    if (!promptEvent) {
        return;
    }

    // Prompt the user to install the web app
    promptEvent.prompt();

    // Reset the 'window.deferredPrompt' property to null after prompting
    window.deferredPrompt = null;

    // Hide the installation button again by adding the 'hidden' class
    butInstall.classList.toggle('hidden', true);
});

// Add an event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    // Reset the 'window.deferredPrompt' property to null when the app is successfully installed
    window.deferredPrompt = null;
});

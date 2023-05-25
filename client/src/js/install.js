const butInstall = document.getElementById('buttonInstall');

// Event listener for the "beforeinstallprompt" event
// This event is fired when the browser wants to show the installation prompt to the user
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event object in a variable for later use
    window.deferredPrompt = event;
    // Show the install button by removing the "hidden" class
    butInstall.classList.toggle('hidden', false);
});

// Event listener for the install button click
butInstall.addEventListener('click', async () => {

    // Retrieve the stored event object
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }
    // Show the installation prompt to the user
    promptEvent.prompt();
    // Reset the stored event object
    window.deferredPrompt = null;
    // Hide the install button by adding the "hidden" class
    butInstall.classList.toggle('hidden', true);
});

// Event listener for the "appinstalled" event
// This event is fired when the app is successfully installed
window.addEventListener('appinstalled', (event) => {
    // Reset the stored event object
    window.deferredPrompt = null;
});

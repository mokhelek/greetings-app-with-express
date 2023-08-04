  // Automatically remove flash messages after 5 seconds
  setTimeout(() => {
    const flashMessages = document.querySelectorAll('.name-error');
    flashMessages.forEach(message => {
      message.remove();
    });
  }, 3000); 
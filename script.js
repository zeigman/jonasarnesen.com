// Dark mode toggle functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        updateAriaLabel(newTheme);
    });

    function updateIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    function updateAriaLabel(theme) {
        const label = theme === 'light' ? 'Bytt til mørk modus' : 'Bytt til lys modus';
        themeToggle.setAttribute('aria-label', label);
    }

    // Initialize aria-label
    updateAriaLabel(currentTheme);
})();

// Function to convert HSL values to hex for display
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Parse CSS variable to get HSL values
function parseHSL(hslVar) {
  const computedStyle = getComputedStyle(document.documentElement);
  const hslValue = computedStyle.getPropertyValue(hslVar).trim();
  const [h, s, l] = hslValue.split(' ').map(val => parseFloat(val));
  return { h, s, l };
}

// Update color information display
function updateColorInfo() {
  // Get HSL values for each color
  const primary = parseHSL('--primary');
  const primaryLight = parseHSL('--primary-light');
  const accent = parseHSL('--accent');
  const secondary = parseHSL('--secondary');
  const muted = parseHSL('--muted');
  const mutedForeground = parseHSL('--muted-foreground');

  // Convert to hex and update display
  document.getElementById('primary-hex').textContent = hslToHex(primary.h, primary.s, primary.l);
  document.getElementById('primary-light-hex').textContent = hslToHex(primaryLight.h, primaryLight.s, primaryLight.l);
  document.getElementById('accent-hex').textContent = hslToHex(accent.h, accent.s, accent.l);
  document.getElementById('secondary-hex').textContent = hslToHex(secondary.h, secondary.s, secondary.l);
  document.getElementById('muted-hex').textContent = hslToHex(muted.h, muted.s, muted.l);
  document.getElementById('muted-foreground-hex').textContent = hslToHex(mutedForeground.h, mutedForeground.s, mutedForeground.l);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  const paletteOptions = document.querySelectorAll('.palette-option');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check for saved preferences
  const savedPalette = localStorage.getItem('selectedPalette') || 'palette-current';
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply saved preferences
  document.body.className = savedPalette + (savedDarkMode ? ' dark' : '');
  darkModeToggle.checked = savedDarkMode;
  
  // Mark the active palette option
  paletteOptions.forEach(option => {
    if (option.getAttribute('data-palette') === savedPalette) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
  
  // Update color information
  updateColorInfo();
  
  // Palette switcher functionality
  paletteOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      paletteOptions.forEach(opt => opt.classList.remove('active'));
      
      // Add active class to clicked option
      this.classList.add('active');
      
      // Get palette class
      const paletteClass = this.getAttribute('data-palette');
      
      // Apply palette class to body (preserving dark mode if active)
      const isDarkMode = document.body.classList.contains('dark');
      document.body.className = paletteClass + (isDarkMode ? ' dark' : '');
      
      // Save preference
      localStorage.setItem('selectedPalette', paletteClass);
      
      // Update color information
      updateColorInfo();
    });
  });
  
  // Dark mode toggle functionality
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
    
    // Update color information
    updateColorInfo();
  });
});

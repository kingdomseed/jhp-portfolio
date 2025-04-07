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
  
  // Default values in case parsing fails
  let h = 0, s = 0, l = 50;
  
  if (hslValue) {
    const values = hslValue.split(' ').map(val => parseFloat(val));
    if (values.length >= 3) {
      h = isNaN(values[0]) ? 0 : values[0];
      s = isNaN(values[1]) ? 0 : values[1];
      l = isNaN(values[2]) ? 50 : values[2];
    }
  }
  
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
  
  // Always use the brand palette
  const savedPalette = 'palette-brand';
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
  updateContrastInfo();
  
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
      updateContrastInfo();
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
    updateContrastInfo();
  });
});

// Color contrast calculation functions
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  // Convert RGB to sRGB
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  
  // Calculate luminance
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function calculateContrastRatio(color1, color2) {
  // Convert colors to RGB if they're in hex format
  const rgb1 = typeof color1 === 'string' ? hexToRgb(color1) : color1;
  const rgb2 = typeof color2 === 'string' ? hexToRgb(color2) : color2;
  
  // Calculate luminance
  const luminance1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  // Calculate contrast ratio
  const ratio = (Math.max(luminance1, luminance2) + 0.05) / 
                (Math.min(luminance1, luminance2) + 0.05);
  
  return ratio.toFixed(2);
}

function getContrastClass(ratio) {
  if (ratio >= 7) return 'contrast-pass'; // AAA for normal text, AA for large text
  if (ratio >= 4.5) return 'contrast-pass'; // AA for normal text
  if (ratio >= 3) return 'contrast-warn'; // AA for large text
  return 'contrast-fail'; // Fails all criteria
}

// We've removed the hslToRgb function since we're now using hardcoded RGB values

function updateContrastInfo() {
  const contrastInfo = document.getElementById('contrast-info');
  if (!contrastInfo) return;
  
  const isDarkMode = document.body.classList.contains('dark');
  let html = '';
  
  // Define our brand colors directly as RGB values for more reliability
  // These match our CSS HSL values but are pre-converted to RGB
  const backgroundRgb = isDarkMode ? { r: 65, g: 72, b: 54 } : { r: 243, g: 242, b: 238 }; // Isabelline/#F3F2EE or Black Olive/#414836
  const foregroundRgb = isDarkMode ? { r: 243, g: 242, b: 238 } : { r: 65, g: 72, b: 54 }; // Black Olive/#414836 or Isabelline/#F3F2EE
  const primaryRgb = isDarkMode ? { r: 130, g: 128, b: 105 } : { r: 65, g: 72, b: 54 }; // Reseda Green/#828069 or Black Olive/#414836
  const accentRgb = isDarkMode ? { r: 199, g: 198, b: 180 } : { r: 124, g: 141, b: 148 }; // Bone/#C7C6B4 or Slate Gray/#7C8D94
  const mutedRgb = isDarkMode ? { r: 52, g: 58, b: 43 } : { r: 218, g: 212, b: 196 }; // Darker Black Olive or Bone-2/#DAD4C4
  
  // Badge colors - badge uses full primary color with white text
  const badgeBgRgb = primaryRgb;
  
  // Badge text is always white (primary-foreground)
  const badgeTextRgb = { r: 255, g: 255, b: 255 }; // White text for badges
  const badgeContrast = calculateContrastRatio(badgeBgRgb, badgeTextRgb);
  const badgeContrastClass = getContrastClass(badgeContrast);
  
  html += `
    <div class="contrast-row">
      <div class="contrast-label">
        <span class="contrast-text-sample" style="color: rgb(${badgeTextRgb.r}, ${badgeTextRgb.g}, ${badgeTextRgb.b}); background-color: rgb(${badgeBgRgb.r}, ${badgeBgRgb.g}, ${badgeBgRgb.b});">Primary Badge</span>
        Badge Text/Background:
      </div>
      <div class="contrast-value ${badgeContrastClass}">
        ${badgeContrast}:1 ${badgeContrast >= 4.5 ? '✓' : badgeContrast >= 3 ? '⚠' : '✗'}
      </div>
    </div>
  `;
  
  // Regular nav link - uses foreground at 80% opacity
  const navLinkRgb = {
    r: Math.round(foregroundRgb.r * 0.8),
    g: Math.round(foregroundRgb.g * 0.8),
    b: Math.round(foregroundRgb.b * 0.8)
  };
  
  const navContrast = calculateContrastRatio(backgroundRgb, navLinkRgb);
  const navContrastClass = getContrastClass(navContrast);
  
  html += `
    <div class="contrast-row">
      <div class="contrast-label">
        <span class="contrast-text-sample" style="color: rgb(${navLinkRgb.r}, ${navLinkRgb.g}, ${navLinkRgb.b}); background-color: rgb(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b});">Navigation</span>
        Navigation Link/Background:
      </div>
      <div class="contrast-value ${navContrastClass}">
        ${navContrast}:1 ${navContrast >= 4.5 ? '✓' : navContrast >= 3 ? '⚠' : '✗'}
      </div>
    </div>
  `;
  
  // Active nav link - uses accent color
  const activeNavContrast = calculateContrastRatio(backgroundRgb, accentRgb);
  const activeNavContrastClass = getContrastClass(activeNavContrast);
  
  html += `
    <div class="contrast-row">
      <div class="contrast-label">
        <span class="contrast-text-sample" style="color: rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}); background-color: rgb(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b});">Active Link</span>
        Active Navigation Link/Background:
      </div>
      <div class="contrast-value ${activeNavContrastClass}">
        ${activeNavContrast}:1 ${activeNavContrast >= 4.5 ? '✓' : activeNavContrast >= 3 ? '⚠' : '✗'}
      </div>
    </div>
  `;
  
  // Footer link colors - footer background is muted
  // Footer link - in light mode it uses primary, in dark mode it uses foreground
  const footerLinkRgb = isDarkMode ? foregroundRgb : primaryRgb;
  
  const footerContrast = calculateContrastRatio(mutedRgb, footerLinkRgb);
  const footerContrastClass = getContrastClass(footerContrast);
  
  html += `
    <div class="contrast-row">
      <div class="contrast-label">
        <span class="contrast-text-sample" style="color: rgb(${footerLinkRgb.r}, ${footerLinkRgb.g}, ${footerLinkRgb.b}); background-color: rgb(${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b});">Footer Link</span>
        Footer Link/Background:
      </div>
      <div class="contrast-value ${footerContrastClass}">
        ${footerContrast}:1 ${footerContrast >= 4.5 ? '✓' : footerContrast >= 3 ? '⚠' : '✗'}
      </div>
    </div>
  `;
  
  contrastInfo.innerHTML = html;
}

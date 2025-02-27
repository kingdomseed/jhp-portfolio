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

function getRgbFromComputedStyle(element, property) {
  const color = window.getComputedStyle(element)[property];
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    };
  }
  return null;
}

function updateContrastInfo() {
  const contrastInfo = document.getElementById('contrast-info');
  if (!contrastInfo) return;
  
  // Get elements for contrast checking
  const badge = document.querySelector('.badge-primary');
  const navLink = document.querySelector('nav a');
  const activeNavLink = document.querySelector('nav a.active');
  const footerLink = document.querySelector('.footer-links a');
  
  let html = '';
  
  // Check badge contrast
  if (badge) {
    const badgeBg = getRgbFromComputedStyle(badge, 'backgroundColor');
    const badgeText = getRgbFromComputedStyle(badge, 'color');
    if (badgeBg && badgeText) {
      const badgeContrast = calculateContrastRatio(badgeBg, badgeText);
      const contrastClass = getContrastClass(badgeContrast);
      
      html += `
        <div class="contrast-row">
          <div class="contrast-label">
            <span class="contrast-text-sample" style="color: rgb(${badgeText.r}, ${badgeText.g}, ${badgeText.b}); background-color: rgb(${badgeBg.r}, ${badgeBg.g}, ${badgeBg.b});">Primary Badge</span>
            Badge Text/Background:
          </div>
          <div class="contrast-value ${contrastClass}">
            ${badgeContrast}:1 ${badgeContrast >= 4.5 ? '✓' : badgeContrast >= 3 ? '⚠' : '✗'}
          </div>
        </div>
      `;
    }
  }
  
  // Check navigation link contrast
  if (navLink) {
    const navBg = getRgbFromComputedStyle(document.querySelector('header'), 'backgroundColor');
    const navLinkColor = getRgbFromComputedStyle(navLink, 'color');
    if (navBg && navLinkColor) {
      const navContrast = calculateContrastRatio(navBg, navLinkColor);
      const contrastClass = getContrastClass(navContrast);
      
      html += `
        <div class="contrast-row">
          <div class="contrast-label">
            <span class="contrast-text-sample" style="color: rgb(${navLinkColor.r}, ${navLinkColor.g}, ${navLinkColor.b}); background-color: rgb(${navBg.r}, ${navBg.g}, ${navBg.b});">Navigation</span>
            Navigation Link/Background:
          </div>
          <div class="contrast-value ${contrastClass}">
            ${navContrast}:1 ${navContrast >= 4.5 ? '✓' : navContrast >= 3 ? '⚠' : '✗'}
          </div>
        </div>
      `;
    }
  }
  
  // Check active navigation link contrast
  if (activeNavLink) {
    const navBg = getRgbFromComputedStyle(document.querySelector('header'), 'backgroundColor');
    const activeNavLinkColor = getRgbFromComputedStyle(activeNavLink, 'color');
    if (navBg && activeNavLinkColor) {
      const activeNavContrast = calculateContrastRatio(navBg, activeNavLinkColor);
      const contrastClass = getContrastClass(activeNavContrast);
      
      html += `
        <div class="contrast-row">
          <div class="contrast-label">
            <span class="contrast-text-sample" style="color: rgb(${activeNavLinkColor.r}, ${activeNavLinkColor.g}, ${activeNavLinkColor.b}); background-color: rgb(${navBg.r}, ${navBg.g}, ${navBg.b});">Active Link</span>
            Active Navigation Link/Background:
          </div>
          <div class="contrast-value ${contrastClass}">
            ${activeNavContrast}:1 ${activeNavContrast >= 4.5 ? '✓' : activeNavContrast >= 3 ? '⚠' : '✗'}
          </div>
        </div>
      `;
    }
  }
  
  // Check footer link contrast
  if (footerLink) {
    const footerBg = getRgbFromComputedStyle(document.querySelector('footer'), 'backgroundColor');
    const footerLinkColor = getRgbFromComputedStyle(footerLink, 'color');
    if (footerBg && footerLinkColor) {
      const footerContrast = calculateContrastRatio(footerBg, footerLinkColor);
      const contrastClass = getContrastClass(footerContrast);
      
      html += `
        <div class="contrast-row">
          <div class="contrast-label">
            <span class="contrast-text-sample" style="color: rgb(${footerLinkColor.r}, ${footerLinkColor.g}, ${footerLinkColor.b}); background-color: rgb(${footerBg.r}, ${footerBg.g}, ${footerBg.b});">Footer Link</span>
            Footer Link/Background:
          </div>
          <div class="contrast-value ${contrastClass}">
            ${footerContrast}:1 ${footerContrast >= 4.5 ? '✓' : footerContrast >= 3 ? '⚠' : '✗'}
          </div>
        </div>
      `;
    }
  }
  
  contrastInfo.innerHTML = html;
}

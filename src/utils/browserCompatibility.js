// Browser compatibility utility functions

/**
 * Check if the browser supports a specific feature
 * @param {string} feature - The feature to check
 * @returns {boolean} - Whether the feature is supported
 */
export const isFeatureSupported = (feature) => {
  const features = {
    // CSS Features
    'css-grid': () => {
      return CSS.supports('display', 'grid');
    },
    'css-flexbox': () => {
      return CSS.supports('display', 'flex');
    },
    'css-variables': () => {
      return CSS.supports('--test-var', 'red');
    },
    'backdrop-filter': () => {
      return CSS.supports('backdrop-filter', 'blur(10px)') || 
             CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
    },
    'object-fit': () => {
      return CSS.supports('object-fit', 'cover');
    },
    
    // JavaScript Features
    'fetch': () => {
      return typeof fetch !== 'undefined';
    },
    'promise': () => {
      return typeof Promise !== 'undefined';
    },
    'arrow-functions': () => {
      try {
        eval('() => {}');
        return true;
      } catch (e) {
        return false;
      }
    },
    'template-literals': () => {
      try {
        eval('`test`');
        return true;
      } catch (e) {
        return false;
      }
    },
    'destructuring': () => {
      try {
        eval('const {a} = {a: 1}');
        return true;
      } catch (e) {
        return false;
      }
    },
    
    // Web APIs
    'intersection-observer': () => {
      return typeof IntersectionObserver !== 'undefined';
    },
    'resize-observer': () => {
      return typeof ResizeObserver !== 'undefined';
    },
    'local-storage': () => {
      try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    },
    'session-storage': () => {
      try {
        const test = 'test';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    }
  };
  
  return features[feature] ? features[feature]() : false;
};

/**
 * Get browser information
 * @returns {object} - Browser name, version, and other details
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let version = 'Unknown';
  let engine = 'Unknown';
  
  // Detect browser
  if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edge') === -1) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    engine = 'Blink';
  } else if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    engine = 'Gecko';
  } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
    browser = 'Safari';
    version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    engine = 'WebKit';
  } else if (ua.indexOf('Edge') > -1) {
    browser = 'Edge';
    version = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
    engine = 'EdgeHTML';
  } else if (ua.indexOf('Trident') > -1) {
    browser = 'Internet Explorer';
    version = ua.match(/rv:(\d+)/)?.[1] || 'Unknown';
    engine = 'Trident';
  }
  
  return {
    browser,
    version: parseInt(version),
    engine,
    userAgent: ua,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
    isTablet: /iPad|Android(?!.*Mobile)/i.test(ua),
    isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  };
};

/**
 * Check if the current browser is supported
 * @returns {boolean} - Whether the browser is supported
 */
export const isBrowserSupported = () => {
  const { browser, version } = getBrowserInfo();
  
  const minVersions = {
    'Chrome': 58,
    'Firefox': 57,
    'Safari': 11,
    'Edge': 16
  };
  
  if (browser === 'Internet Explorer') {
    return false; // IE is not supported
  }
  
  return minVersions[browser] ? version >= minVersions[browser] : false;
};

/**
 * Add CSS classes based on browser capabilities
 */
export const addBrowserClasses = () => {
  const html = document.documentElement;
  const { browser, version, isMobile, isTablet } = getBrowserInfo();
  
  // Add browser classes
  html.classList.add(`browser-${browser.toLowerCase().replace(' ', '-')}`);
  html.classList.add(`browser-version-${version}`);
  
  // Add device classes
  if (isMobile) html.classList.add('device-mobile');
  if (isTablet) html.classList.add('device-tablet');
  if (!isMobile && !isTablet) html.classList.add('device-desktop');
  
  // Add feature classes
  const features = [
    'css-grid',
    'css-flexbox',
    'css-variables',
    'backdrop-filter',
    'object-fit',
    'intersection-observer',
    'resize-observer'
  ];
  
  features.forEach(feature => {
    const className = isFeatureSupported(feature) ? 
      `supports-${feature}` : 
      `no-${feature}`;
    html.classList.add(className);
  });
};

/**
 * Show browser compatibility warning if needed
 */
export const showCompatibilityWarning = () => {
  if (!isBrowserSupported()) {
    const { browser, version } = getBrowserInfo();
    
    const warning = document.createElement('div');
    warning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff6b6b;
      color: white;
      padding: 10px;
      text-align: center;
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 14px;
    `;
    
    warning.innerHTML = `
      <strong>Browser Compatibility Warning:</strong> 
      You are using ${browser} ${version}. 
      For the best experience, please update to a modern browser.
      <button onclick="this.parentNode.remove()" style="
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 5px 10px;
        margin-left: 10px;
        cursor: pointer;
        border-radius: 3px;
      ">×</button>
    `;
    
    document.body.insertBefore(warning, document.body.firstChild);
  }
};

/**
 * Initialize browser compatibility features
 */
export const initBrowserCompatibility = () => {
  // Add browser classes
  addBrowserClasses();
  
  // Show warning if needed
  showCompatibilityWarning();
  
  // Log browser info for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Browser Info:', getBrowserInfo());
    console.log('Supported Features:', {
      'CSS Grid': isFeatureSupported('css-grid'),
      'CSS Flexbox': isFeatureSupported('css-flexbox'),
      'CSS Variables': isFeatureSupported('css-variables'),
      'Backdrop Filter': isFeatureSupported('backdrop-filter'),
      'Object Fit': isFeatureSupported('object-fit'),
      'Intersection Observer': isFeatureSupported('intersection-observer'),
      'Resize Observer': isFeatureSupported('resize-observer'),
      'Fetch API': isFeatureSupported('fetch'),
      'Promises': isFeatureSupported('promise')
    });
  }
};

export default {
  isFeatureSupported,
  getBrowserInfo,
  isBrowserSupported,
  addBrowserClasses,
  showCompatibilityWarning,
  initBrowserCompatibility
};
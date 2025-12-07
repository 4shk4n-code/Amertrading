(function() {
  if (typeof window === 'undefined') return;
  
  const originalWarn = console.warn;
  const originalError = console.error;
  
  const shouldSuppress = function(message) {
    if (!message) return false;
    const lowerMessage = String(message).toLowerCase();
    
    // Zustand deprecation warnings
    if (lowerMessage.includes('deprecated') && lowerMessage.includes('zustand')) return true;
    if (lowerMessage.includes('default export is deprecated') && lowerMessage.includes('create')) return true;
    
    // Dialog accessibility warnings
    if (lowerMessage.includes('dialogcontent') && lowerMessage.includes('dialogtitle')) return true;
    if (lowerMessage.includes('missing') && (lowerMessage.includes('description') || lowerMessage.includes('aria-describedby'))) return true;
    
    // CSS preload warnings
    if (lowerMessage.includes('was preloaded using link preload but not used')) return true;
    if (lowerMessage.includes('preloaded using link preload')) return true;
    
    return false;
  };
  
  console.warn = function() {
    if (!shouldSuppress(arguments[0])) {
      originalWarn.apply(console, arguments);
    }
  };
  
  console.error = function() {
    if (!shouldSuppress(arguments[0])) {
      originalError.apply(console, arguments);
    }
  };
})();


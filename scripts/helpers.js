function onDocumentReady(callback) {
  if (document.readyState !== 'loading') {
    callback();
  }
  else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', callback);
  }
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        callback();
      }
    });
  }
}

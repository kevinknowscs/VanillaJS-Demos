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

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  }
  else if (!hasClass(el, className)) {
    el.className += ' ' + className;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  }
  else {
    el.className = el.className.replace(new RegExp('\\b' + className +'\\b', 'g'), '');
  }
}

function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState > 3 && xhr.status === 200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

onDocumentReady(function() {
  var searchTextBox = document.getElementById('searchTextBox');
  var pageTitle = document.getElementById('page-title-id');
  var pageContentScroller = document.getElementById('page-content-scroller-id');
  var originalPageContent = document.getElementById('page-content-id');
  var originalPageTitle = pageTitle.innerHTML;
  var htmlTags;

  getAjax('html-tags.json', function (data) {
    htmlTags = JSON.parse(data);
  });

  function waitForHtmlTags() {
    while (!htmlTags) {
      setTimeout(null, 100);
    }
  }

  function search(target) {
    var x;

    waitForHtmlTags();

    for (x=0; x < htmlTags.length; x++) {
      if (target === htmlTags[x].name) {
        return [ { type: 'HTML Tag', title: htmlTags[x].name, desc: htmlTags[x].desc } ];
      }
    }
  }

  function clearSearchResults() {
      pageTitle.innerHTML = originalPageTitle;
      pageContentScroller.innerHTML = '';
      pageContentScroller.appendChild(originalPageContent);
  }

  function appendSearchRow(table, cellType, type, title, desc) {
    var cell, node, tr;

    tr = document.createElement('tr');

    cell = document.createElement(cellType);
    node = document.createTextNode(type);
    cell.appendChild(node);
    tr.appendChild(cell);

    cell = document.createElement(cellType);
    node = document.createTextNode(title);
    cell.appendChild(node);
    tr.appendChild(cell);

    cell = document.createElement(cellType);
    node = document.createTextNode(desc);
    cell.appendChild(node);
    tr.appendChild(cell);

    table.appendChild(tr);
  }

  function appendSearchHeader(table) {
    appendSearchRow(table, 'th', 'Result Type', 'Synopsis', 'Description');
  }

  function appendSearchResult(table, type, title, desc) {
    appendSearchRow(table, 'td', type, title, desc);
  }

  function displaySearchResults(results) {
    var table, pageContent;

    pageContentScroller.innerHTML = '';
    pageTitle.innerHTML = 'Search Results';

    pageContent = document.createElement('div');
    addClass(pageContent, 'page-content');
    table = document.createElement('table');

    appendSearchHeader(table);

    results.forEach(function (val) {
      appendSearchResult(table, val.type, val.title, val.desc);
    });

    pageContent.appendChild(table);
    pageContentScroller.appendChild(pageContent);
  }

  searchTextBox.addEventListener('keyup', function (ev) {
    if (searchTextBox.value.endsWith('=')) {
      // alert('Display ' + searchTextBox.value.slice(0, searchTextBox.value.length - 1));
      var target = searchTextBox.value.slice(0, searchTextBox.value.length - 1);
      displaySearchResults(search(target));
    }
    else {
      clearSearchResults();
    }

    /*
    else if (ev.keyCode === 13) {
      // alert('Display ' + searchTextBox.value);
      displaySearchResults();
    }
    */
  });
});

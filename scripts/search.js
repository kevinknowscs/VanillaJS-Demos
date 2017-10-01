onDocumentReady(function() {
  var searchTextBox = dom.id('searchTextBox');
  var pageTitle = dom.id('page-title-id');
  var pageContentScroller = dom.id('page-content-scroller-id');
  var originalPageContent = dom.id('page-content-id');
  var originalPageTitle = pageTitle.innerHTML;
  var htmlTags;

  var htmlTagsUrl = globals.baseUrl + '/html-tags.json';

  getAjax(htmlTagsUrl, function (data) {
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
        return [ { type: 'HTML Tag', title: htmlTags[x].name, desc: htmlTags[x].desc, links: htmlTags[x].links } ];
      }
    }
  }

  function clearSearchResults() {
      pageTitle.innerHTML = originalPageTitle;
      pageContentScroller.innerHTML = '';
      pageContentScroller.appendChild(originalPageContent);
  }

  function appendSearchRow(table, cellType, index, type, title, desc) {
    var cell, node, tr;

    tr = document.createElement('tr');

    cell = document.createElement(cellType);
    node = document.createTextNode(index);
    cell.appendChild(node);
    tr.appendChild(cell);

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

  /**
   * @param parentCell
   * @param match: Object
   * @param match.links: Object
   * @param match.links.mdn: string
   * @param match.links.w3schools: string
   */
  function appendLinks(parentCell, match) {
    var ul, li, section, h1, a;

    if (!match || !match.links) {
      return;
    }

    section = document.createElement('section');
    h1 = document.createElement('h1');
    h1.innerHTML = 'Links';
    section.appendChild(h1);

    ul = document.createElement('ul');

    if (match.links.mdn) {
      li = document.createElement('li');
      a = document.createElement('a');
      a.href = match.links.mdn;
      a.target = '_blank';
      a.innerHTML = 'Mozilla Developer Network';
      li.appendChild(a);

      ul.appendChild(li);
    }

    if (match.links.w3schools) {
      li = document.createElement('li');
      a = document.createElement('a');
      a.href = match.links.w3schools;
      a.target = '_blank';
      a.innerHTML = 'w3schools.com';
      li.appendChild(a);

      ul.appendChild(li);
    }

    section.appendChild(ul);
    parentCell.appendChild(section);
  }

  function appendSearchDetailsRow(table, match) {
    var cell, node, tr;

    tr = document.createElement('tr');

    cell = document.createElement('td');
    node = document.createTextNode('');
    cell.appendChild(node);
    tr.appendChild(cell);

    cell = document.createElement('td');
    cell.colSpan = 3;
    appendLinks(cell, match);
    tr.appendChild(cell);

    table.appendChild(tr);
  }

  function appendSearchHeader(table) {
    appendSearchRow(table, 'th', '#', 'Result Type', 'Synopsis', 'Description');
  }

  function appendSearchResult(table, index, type, title, desc) {
    appendSearchRow(table, 'td', index, type, title, desc);
  }

  function displaySearchResults(results) {
    var table, pageContent;

    pageContentScroller.innerHTML = '';
    pageTitle.innerHTML = 'Search Results';

    pageContent = document.createElement('div');
    addClass(pageContent, 'page-content');
    table = document.createElement('table');

    appendSearchHeader(table);

    results.forEach(function (val, index) {
      appendSearchResult(table, (index + 1).toString(), val.type, val.title, val.desc);
      appendSearchDetailsRow(table, val);
    });

    pageContent.appendChild(table);
    pageContentScroller.appendChild(pageContent);
  }

  searchTextBox.addEventListener('keyup', function (/*ev*/) {
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

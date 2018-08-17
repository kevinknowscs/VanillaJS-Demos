
onDocumentReady(function () {
  getAjax(globals.baseUrl + '/data/toc.json', function (data) {
    toc = JSON.parse(data);
    var headingEl, labelEl, sectionEl, anchorEl;
    var navRootEl = document.getElementsByClassName('sidebar-area')[0];
    navRootEl.innerHTML = '';

    toc.sections.forEach(function (sectionData) {
      sectionEl = document.createElement('section');
      if (sectionData.hide) {
        return;
      }

      if (sectionData.label) {
        headingEl = document.createElement('h1');
        headingEl.innerHTML = sectionData.label;
        sectionEl.appendChild(headingEl);
      }

      sectionData.items.forEach(function (itemData) {
        if (itemData.separator) {
          sectionEl.appendChild(document.createElement('br'));
          return;
        }

        anchorEl = document.createElement('a');
        anchorEl.href = itemData.href.startsWith('http') ? itemData.href : globals.baseUrl + '/' + itemData.href;
        anchorEl.target = itemData.target || '_self';
        anchorEl.appendChild(document.createTextNode(itemData.label));

        sectionEl.appendChild(anchorEl);
        sectionEl.appendChild(document.createElement('br'));
      });

      navRootEl.appendChild(sectionEl);
    });
  });
});

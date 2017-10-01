// noinspection JSUnusedGlobalSymbols

dom = {
  find: function(selector, context)  {
    return (context || document).querySelectorAll(selector);
  },

  findOne: function(selector, context) {
    return (context || document).querySelector(selector);
  },

  id: function (id) {
    return document.getElementById(id);
  },

  class: function(className) {
    return document.getElementsByClassName(className);
  },

  tag: function(tagName) {
    return document.getElementsByTagName(tagName);
  }
};

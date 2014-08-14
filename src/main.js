'use strict';

/*
 * Entry point for the extension.
 */

function injectScript(file, node) {
  // Inject the script manually because Chrome sandboxes 'window' for content
  // scripts, and sometimes we need to check window state to detect
  // advertisements.
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}


function run() {
  injectScript(chrome.extension.getURL('/src/rules.js'), 'body');
  injectScript(chrome.extension.getURL('/src/inject.js'), 'body');
}


chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      run();
    }
  }, 10);
});

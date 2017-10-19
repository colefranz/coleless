export default function getParameterByName(name) {
  var url = window.location.href;

  // Replace all instances of a bunch of brackets with the last match
  // TODO: Replace $& with something more robust. See:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
  name = name.replace(/[\[\]]/g, "\\$&");

  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      // Will execute a search for a match in the URL. If not found, value of results will be null.
      results = regex.exec(url);

  if (results === null) {
    return null;
  } else if (_.isEmpty(results[2])) {
    return '';
  } else {
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}


// TODO make search button work!
// TODO make search suggestions work for search bar
// TODO add random search button

function queryWiki() {
  var site = "https://en.wikipedia.org";
  // var queryString = "/w/api.php?action=query&list=search&format=json&srsearch=apple&srprop=snippet%7Csectionsnippet&generator=search&redirects=&gsrsearch=apple&gsrprop=snippet";
  var searchTerm = "apple";

  var queryString2 = "/w/api.php?action=opensearch&format=json&search="+searchTerm+"&limit=10&suggest=&redirects=resolve&format=json";

  var queryEnd = "&formatversion=2&callback=?";


  $.getJSON(site + queryString2 + queryEnd, function(response) {

    var divId;
    var titleStr;
    var snippetStr;
    for (var i = 0; i < 10; i++) {

      titleStr = response[1][i];
      snippetStr = response[2][i];
      link = response[3][i];

      divId = "#r" + (i + 1).toString();
      $(divId).append("<h4>" + titleStr + "</h4>" + "<p>" + snippetStr + "</p>")
      $(divId).parent('a').attr("href", link)
    }
  });
}

$(document).ready(function() {
  queryWiki();

});

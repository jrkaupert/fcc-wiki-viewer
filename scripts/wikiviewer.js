
$(document).ready(function() {

  $(window).on('keydown',function(ev) {
    if(ev.keyCode == 13) {
      ev.preventDefault();
      return false;
    }
  });

  var changeTimer = false;
  $('input').on('keyup',function() {

    var searchTerm = document.getElementById("searchText").value;

    var site = "https://en.wikipedia.org";
    var queryString = "/w/api.php?action=opensearch&format=json&search="+searchTerm+"&limit=10&suggest=&redirects=resolve&format=json";

    var queryEnd = "&formatversion=2&callback=?";

    if (changeTimer !== false) {
      clearTimeout(changeTimer);
    }
      changeTimer = setTimeout(function() {

        $.getJSON(site + queryString + queryEnd, function(response) {

          var divId, titleStr, snippetStr;
          var max = Math.min(10,response[1].length);

          if (searchTerm === "") {
            for (var ind = 0;ind<10;ind++) {
              $("#r" + (ind + 1).toString()).hide();
            }
          }

          for (var i = 0; i < max; i++) {

            titleStr = response[1][i];
            snippetStr = response[2][i];
            link = response[3][i];

            divId = $("#r" + (i + 1).toString());
            divId.html('').show();
            divId.append("<h4 class='wikiTitle'>" + titleStr + "</h4>" + "<p class='wikiSnippet'>" + snippetStr + "</p>")
            divId.parent('a').attr("href", link)
          }
        });

        changeTimer = false;
      },300);
  });
});

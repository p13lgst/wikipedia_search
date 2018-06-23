$("document").ready(function(){
  $("#results").hide();
});

function getResponse() {
  $("#results").hide();
  $("#error").remove();
  var search_query = $("#search").val();
  console.log(search_query)
  if (!search_query) {
    var errorAlert = '<div id="error" class="alert alert-danger text-center">Please provide a search query!</div>'
    $("#results").html(errorAlert);
    $("#results").fadeIn('slow');
    return false;
  }
  var apiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=" + search_query;
  $.getJSON(apiURL, function(json){
    var searchResults = json.query.search;
    console.log(searchResults.length);
    if (searchResults.length == 0) {
      var errorAlert = '<div id="error" class="alert alert-danger text-center">Nothing Found!</div>'
      $("#results").html(errorAlert);
      $("#results").fadeIn('slow');
      return false;
    }
    var html = '<div class="row">'
    searchResults.forEach(function(element, index, array){
      html+= '<div class="col-md-12"><a target="_blank" class="pad text-left" href="https://en.wikipedia.org/?curid=' + element.pageid + '"><div class="result"><h2 class="ttl">' + element.title + '</h2><p>' + element.snippet + '...</p></div></a></div>'
    })
    html += "</div>"
    $("#results").html(html);
    $("#results").fadeIn('slow');
  });

  return false;
}

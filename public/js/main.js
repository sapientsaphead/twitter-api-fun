$(function() {

  // variables
  var source = $("#search-results").html();
  var dataTemplate = Handlebars.compile(source);
  var $results = $('#results');

  // events
  $("#search").on("click",function(e) {
    e.preventDefault();
    var parameters = { search: $("input").val() };
    $('#username').val(parameters);
    $.get('/searching',parameters, function(data) {
      if (data instanceof Array) {
        $results.html(dataTemplate({resultsArray:data}));
        console.log("the data", data);
      } else {
        $results.html(data);
      };
      $("#results").show();
      // $(':input').val('');
      $("#input").hide();
      $("#again").show();
    });
  });
  $("#again").on("click",function(e) {
    e.preventDefault()
    $("#input").show();   
    $("#again").hide();
    $("#results").hide();
  });

});
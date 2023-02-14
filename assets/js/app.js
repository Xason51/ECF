'use strict';

$(document).ready(function(){

  var totalListings;
  var ajaxpagenumber;
  var title;
  var year;
  var url;
  var data;
  var type = $("#type").val();

  data = {
    s: title,
    y: year,
    type: type, 
    r: "json",
    page: ajaxpagenumber,
    callback: ""
  };
  const navLinks = document.querySelector("#navLinks");

  toggleButton.addEventListener("click", function () {
      navLinks.style.display = navLinks.style.display === "block" ? "none" : "block";
  });

  $("#submit").on("click", function(event){
    event.preventDefault();

    $("#movies").empty();

    $("#pagination").remove();

   
    title = $("#search").val();
    year = $("#year").val();
    ajaxpagenumber = 1;
    url = "https://www.omdbapi.com/?apikey=fd161998&t=";
    data = {
       s: title,
       y: year,
       type: "movie",
       r: "json",
       page: ajaxpagenumber,
       callback: ""
    };

 
    $.getJSON(url, data, displayResults).fail(ajaxFail);

  }); 
  
  function displayResults(response){
    var html = "";
       if (response.Response == "False") {
       html += "<li class='no-movies'>";
       html += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + $("#search").val() + "</li>";
     } else {
       $.each(response.Search, function(index, movie){
         var poster;
           if (movie.Poster == "N/A"){
           poster = "<i class='material-icons poster-placeholder'>crop_original</i>";
         } else {
           poster = "<img class='movie-poster' src=" + movie.Poster + ">";
         }

         html += "<li>";
         html += "<div class='poster-wrap'><a href='http://www.imdb.com/title/" + movie.imdbID + "' target='_blank'>";
         html += poster;
         html += "</a></div>";
         html += "<span class='movie-title'>" + movie.Title + "</span>";
         html += "<span class='movie-year'>" + movie.Year + "</span>";
         html += "</li>";
       }); 
    }
    
    $("#movies").append(html);


    totalListings = response.totalResults;
    paginate(totalListings);
  } 
  
  function paginate(){
      var pagesNeeded = Math.ceil(totalListings/10);

      $("body").append("<footer id='pagination'><ul id='paginationlist'></ul></footer>");

      for (var i=0; i< pagesNeeded; i++){
        var newPageNumber = $("<li></li>");
        newPageNumber.text(i+1);
        $("#paginationlist").append(newPageNumber);

      }

   updateAjaxCall();
   } 
   
  function updateAjaxCall(){

      $("#paginationlist li").click(function(){

        $("#movies").empty();
        
        $("#pagination").remove();

        ajaxpagenumber = parseInt($(this).text());
        title = $("#search").val();
        year = $("#year").val();
        url = "https://www.omdbapi.com/?apikey=fd161998&t=";
        data = {
           s: title,
           y: year,
           type: "movie",
           r: "json",
           page: ajaxpagenumber
        };
       
        $.getJSON(url, data, displayResults).fail(ajaxFail);

      }); 
  } 
  
  function ajaxFail(jqXHR) {

    var errorhtml = "";
    errorhtml += "<p>Sorry, there was a " + jqXHR.statusText + " error.</p>";

    $("#movies").append(errorhtml);
  }

}); 
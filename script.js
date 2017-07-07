//INSTRUCTOR NAME IDS TAKE THIS FORM: DU_DERIVED_SS_DESCR100_2$[NUMBER]

$(function() {
  console.log("duke-ratemyprofessors extension loaded 2.1");
  $("a[id*='DU_SEARCH_WRK_SSR_EXPAND_COLLAP2']").click(function() {
    console.log("thingy clicked");
  });

  $("#ptifrmtgtframe").on("load", function() {
    console.log("iframe loaded");
    $("#ptifrmtgtframe").contents().find("a[id*='DU_SEARCH_WRK_SSR_EXPAND_COLLAP2']").on('click', function() {
      var url = "http://search.mtvnservices.com/typeahead/suggest/?q=connel+fullenkamp+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+hotness_i"
      chrome.runtime.sendMessage({
          method: 'GET',
          action: 'xhttp',
          url: url,
      }, function(responseText) {
          console.log(responseText);
      });
    });
  });



})

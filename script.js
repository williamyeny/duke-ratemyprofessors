$(function() {
  console.info("drmp: duke rmp loaded");

  //ptifrmtgtframe: ID of the iframe holding the courses
  $("#ptifrmtgtframe").on("load", function() {
    console.info("drmp: iframe loaded");
    var observer = new MutationObserver(function(mutations) {

      mutations.forEach(function(mutation) {
        console.info("drmp: DOM change occured in courses page")

        //loop through spans with professor name(s)
        var pspans = $("#ptifrmtgtframe").contents().find("span[id*='DU_DERIVED_SS_DESCR100_2']");
        pspans.each(function(index) {
          //get professor name(s)
          var pname = $(this).text();
          console.info("drmp: professor name: " + pname);

          //check if professor is already rated
          if (!$(this).is('[rated]')) {
            //modify professor name(s)

            var url = "http://search.mtvnservices.com/typeahead/suggest/?q=connel+fullenkamp+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf"
            chrome.runtime.sendMessage({
                method: 'GET',
                action: 'xhttp',
                url: url,
            }, function(responseText) {
                console.log(responseText);
            });
            //tag element as "rated" so it does not infinite loop when a rating is added
            $(this).attr("rated", "");
            $(this).append(" W O O H O O ");
          } else {
            console.info("drmp: there\'s already a rating!");
          }

        });

        //prevent duplicate mutation detections
        return false;
      });
    });

    var targetNode = $("#ptifrmtgtframe").contents().find("body")[0]; //checking for changes in iframe
    var observerConfig = {
      childList: true, // detects if elements are added or removed
      subtree: true //detects all elements in body, not just direct children
    };
    observer.observe(targetNode, observerConfig);

  });

})

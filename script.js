//INSTRUCTOR NAME IDS TAKE THIS FORM: DU_DERIVED_SS_DESCR100_2$[NUMBER]

$(function() {
  console.info("drmp: duke rmp loaded");



  $("#ptifrmtgtframe").on("load", function() {
    console.info("iframe loaded");
      var targetNode = $("#ptifrmtgtframe").contents().find("body")[0];
      var observer = new MutationObserver(function(mutations) {

        mutations.forEach(function(mutation) {
          //check if mutation added elements
          if (mutation.type === "childList") {
            console.info("drmp: DOM change occured in courses page")

            //add ratings
            var pname = $("#ptifrmtgtframe").contents().find("span[id*='DU_DERIVED_SS_DESCR100_2']").text();
            console.info("drmp: professor name: " + pname);
          }

        });
      });

      // Notify me of everything!
      var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      };
      console.log(targetNode);
      observer.observe(targetNode, observerConfig);

      // console.log("iframe loaded");
      // $(document.getElementById("ptifrmtgtframe").contentDocument).on("click", "a", function() {
      //   console.log("iframe a clicked");
      // })
      // $("#ptifrmtgtframe").contents().find("a[id*='DU_SEARCH_WRK_SSR_EXPAND_COLLAP2']").on('click', function() {
        // var url = "http://search.mtvnservices.com/typeahead/suggest/?q=connel+fullenkamp+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+hotness_i"
        // chrome.runtime.sendMessage({
        //     method: 'GET',
        //     action: 'xhttp',
        //     url: url,
        // }, function(responseText) {
            // console.log(responseText);
        // });
      // });
    });



})

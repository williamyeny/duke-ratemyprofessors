$(function() {
  console.info("drmp: duke rmp loaded");

  //ptifrmtgtframe: ID of the iframe holding the courses
  $("#ptifrmtgtframe").on("load", function() {
    console.info("drmp: iframe loaded");
    var observing = true;
    var observer = new MutationObserver(function(mutations) {

      mutations.forEach(function(mutation) {
        console.info("drmp: DOM change occured in courses page")

        //loop through spans with professor name(s)
        var pspans = $("#ptifrmtgtframe").contents().find("span[id*='DU_DERIVED_SS_DESCR100_2']");
        console.info("pspan length: " + pspans.length);
        if (pspans.length > 0 && observing) {
          observing = false;
          pspans.each(function(index) {
            //get professor name(s)
            var pname = $(this).text();

            //modify professor name(s)
            var pname_list = pname.split(" ");
            var first_name =  pname_list[0];
            var last_name = pname_list[pname_list.length-1];
            console.info("drmp: professor first-name: " + first_name + " last-name: " + last_name);

            var span = $(this);
            var url = "http://search.mtvnservices.com/typeahead/suggest/?q=" + first_name + "+" + last_name + "+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf"
            // original: var url = "http://search.mtvnservices.com/typeahead/suggest/?q=connel+fullenkamp+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf"
            chrome.runtime.sendMessage({
              method: 'GET',
              action: 'xhttp',
              url: url,
            }, function(responseText) {
              console.log(responseText);
              var read = JSON.parse(responseText);
              console.log(read);

              var rating_html;
              //check if professor exists on rmp
              if (read.response.docs.length > 0) {
                //get rating
                var rating = read.response.docs[0].averageratingscore_rf;
                console.log(rating);

                //determine color based on rating
                var color;
                if (rating > 3.4) {
                  color="green";
                } else if (rating > 2.5) {
                  color="yellow";
                } else {
                  color="red";
                }

                rating_html = "<span class='rating color-" + color + "'>" + rating + "</span>"
              } else {
                rating_html = "<span class='rating not-found'>?</span>"
              }
              //inject to HTML
              span.append(" " + rating_html);

              // alert(responseText['response']['docs']['averageratingscore_rf'])

            });
            setTimeout(function() {
              observing = true;
            }, 1000);
          });
        }


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

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
        if (pspans.length > 0) {
          pspans.each(function(index) {
            //get professor name(s)
            var pname = $(this).text();
            //modify professor name(s)
            // check if course has two instructors- DukeHub puts a dash in between, thank god
            var pname_list
            if (pname.indexOf("-") > -1) {
              var pnames = pname.split("-");
              pname_list = pnames[0].split(" ");
              // need to figure out how to make API calls and injections for both professors? For now, we just get rating for the first (primary) instructor.
            } else {
              pname_list = pname.split(" ");
            }
            var first_name =  pname_list[0];
            var last_name = pname_list[pname_list.length-1];
            console.info("drmp: professor first-name: " + first_name + " last-name: " + last_name);


            var span = $(this);
            var url = "http://search.mtvnservices.com/typeahead/suggest/?q=" + first_name + "+" + last_name + "+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf"
            chrome.runtime.sendMessage({
              method: 'GET',
              action: 'xhttp',
              url: url,
            }, function(responseText) {
              var read = JSON.parse(responseText);

              var rating_html;
              var rating_output;
              //check if professor exists on rmp
              if (read.response.docs.length > 0) {
                //get rating
                var rating = read.response.docs[0].averageratingscore_rf;

                //determine color based on rating
                var color;
                if (rating > 3.4) {
                  color="green";
                } else if (rating > 2.5) {
                  color="yellow";
                } else {
                  color="red";
                }

                rating_output = "class='rating color-" + color + "'>" + rating;
              } else if (pname == "Departmental Staff") {
                rating_output = null;
              }
              else {
                rating_output = "class='rating not-found'>?";
              }
              //add rest of html
              rating_html = "<div class='prof-wrapper'><div " + rating_output + "</div></div>"
              //inject to HTML
              span.parent().after(rating_html); //puts it into td
              //move span to wrapper
              span.prependTo(span.parent().parent().children(".prof-wrapper"));

            });
          });
        }

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

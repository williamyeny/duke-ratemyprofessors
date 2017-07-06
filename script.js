// window.onload = function() {
//     $("#testbutton").click(function() {
//         $.ajax({
//             url: 'http://search.mtvnservices.com/typeahead/suggest/?q=connel+fullenkamp+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+hotness_i',
//             dataType: 'json',

//             success: function(data) {
//                 $("#results").append('all good');
//                 alert(JSON.stringify(data));
//             },
//              error: function() {
//                 $("#results").append("error");
//                 alert('error');
//             }
//         });
//     });
// });


$(function() {
  console.log("test");
  var url = "http://search.mtvnservices.com/typeahead/suggest/?q=connel+fullenkamp+AND+schoolid_s%3A1350&siteName=rmp&fl=teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+hotness_i"
  $.getJSON(url, function( data ) {
    // var items = [];
    // $.each( data, function( key, val ) {
    //   items.push( "<li id='" + key + "'>" + val + "</li>" );
    // });
    //
    // $( "<ul/>", {
    //   "class": "my-new-list",
    //   html: items.join( "" )
    // }).appendTo( "body" );
    console.log(data);
  });
})

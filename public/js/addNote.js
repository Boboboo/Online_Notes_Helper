$(document).ready(function() {

    $('form').submit(function(event) {

        var formData = {
            'note_content': $('textarea[name=noteContent]').val()
        };
        var userIdData='/notes/'+$('#userId').text()
        console.log(userIdData)
        console.log(formData)
        
        $.ajax({
            type        : 'POST', 
            url         : userIdData,        //  post route url
            data        : formData, 
            success: function(data) {
              $('.text').text("You have submitted note above successfully.");
            },
            dataType    : 'json',
            encode      : true
        })
        
        .done(function(data) {
            console.log(data); 
        });
        event.preventDefault();
    });
});
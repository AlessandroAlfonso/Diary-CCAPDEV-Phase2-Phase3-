$(document).ready(function(){
    $('post').click(function(){
        var fName = document.getElementById('fName');
        var lName = document.getElementById('lName');

        var user = fName + " " + lName;
        //console.log(author);
        var post = $('userPost').val;
        var tags = $('userTags').val;

        $.get('/addPost', {user:user, post:post, tags:tags}, function(result){
            if (result){
                $('<id of post container>').prepend(result);
                $('userPost').val(' ');
                $('userTags').val('');
            }
            else{

            }
        });
    })
});
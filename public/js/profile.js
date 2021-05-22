$(document).ready(function(){
    // document.getElementById("RecentPost").style.display = "block";
    // tablinks = document.getElementsByClassName("tablinks");
    // tablinks[0].className += " active";

    $("#Recent_Post").ready(function(evt) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById("RecentPost").style.display = "block";
        evt.currentTarget.className += " active";
    });

    $("#Recent_Post").click(function(evt) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById("RecentPost").style.display = "block";
        evt.currentTarget.className += " active";
    });

    $("#Saved_Post").click(function(evt) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById("SavedPost").style.display = "block";
        evt.currentTarget.className += " active";
    });

     /* jquery.validate plugin added using cdn. Go to jqueryvalidation.org to see what methods are provided */
     $("#editProfile").validate({
        rules: {
            username: {
                required: true,
                minlength: 6,
            },
            fName: {
                required: true,
            },
            lName: {
                required: true,
            },
            bio: {
                required: true,
                maxlength: 150,
            }
        },
    // Custom message for error
        messages: {
            fName: {
                required: "Empty field. First name is required.",
            },
            lName: {
                required: "Empty field. Last name is required.",
            },
            bio: {
                required: "Empty field. Bio is required.",
            }
        },
        highlight: function(element, errorClass) {
            $(element).closest(".form-group").addClass("has-error");
        },
        unhighlight: function(element, errorClass) {
            $(element).closest(".form-group").removeClass("has-error");
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().next());
        },
    });

    $('#username').keyup(function(){
        var username = $('#username').val();
        var id = $('#id').val();

        $.get('/checkUsername', {username: username}, function(result){

            if(result._id == id){
                if(result.username == username){
                    $('#error').text('');
                    $('#saveBtn').prop('disabled',false);
                }
            }

            else if(result.username == username){
                $('#error').text('Username already registered.'); 
                $('#saveBtn').prop('disabled', true);
            }

            else if(username == ''){
                $('#error').text('Empty field. Username is required.'); 
                $('#saveBtn').prop('disabled', true);
            }

            else{
                $('#error').text('');
                $('#saveBtn').prop('disabled',false);
            }
        });
    });

    $('#modalEdit').on('hidden.bs.modal', function () { 
        location.reload();
    });
    
});
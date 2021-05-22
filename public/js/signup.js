$(document).ready(function(){

   $('#submit').prop('disabled',true);

   $('#email').keyup(function(){
        var email = $('#email').val();
        $.get('/checkEmail', {email: email}, function(result){
            console.log('check')
            if(result.email == email) {
                $('#email').css('border-color', 'red');
                $('#error').text('Email already registered!');      
            }
            
            else{
                $('#email').css('border-color', '#d9dadc');
                $('#error').text(''); 
            }
        });
   });


});
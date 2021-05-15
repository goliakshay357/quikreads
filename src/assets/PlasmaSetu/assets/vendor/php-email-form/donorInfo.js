
!(function ($) {
    "use strict";
    function extractFormValNew() {
        let dataToSend = {}
        let city = sessionStorage.getItem('city');
        let bg = sessionStorage.getItem('bg');
        if (city && city.length && bg && bg.length) {
            dataToSend['city'] = decodeURIComponent(city);
            dataToSend['bloodgroup'] = decodeURIComponent(bg);
        }


        return dataToSend;
    }
    function postValues(element) {
        if(!element.alt_mobile_no.length){
            $('#altphone').val('Alternate Mobile: ' + "Not available");
        }
        else{
            $('#altphone').val('Alternate Mobile: ' + element.alt_mobile_no);
        }
        $('#name').val('Name: ' + element.full_name);
        $('#phone').val('Mobile: ' +element.mobile_no);
        // $('#altphone').val('Alternate Mobile: ' + element.alt_mobile_no);
        $('#email').val('Email  ID: ' +element.email_id);
        $('#age').val('Age: ' + element.age);
        $('#gender').val('Gender: ' +element.gender);
        $('#bg').val('Blood Group: ' +element.bloodgroup);
        $('#city').val('City: ' + element.city);
        // $('#date').val('Date of last COVID screening: ' +element.covid_screen_date);
    }
    let dataToSendNext = extractFormValNew();
    php_email_form_submit("https://coht2ln423.execute-api.us-east-1.amazonaws.com/get_from_donor", JSON.stringify(dataToSendNext));



    function php_email_form_submit(action, data) {
        $.ajax({
            type: "POST",
            url: action,
            data: data,
            timeout: 40000,
            contentType: 'application/json'
        }).done(function (msg) {
            if (msg.status !== null && msg.status == 200) {
                var res = msg.body;
                res.forEach(element => {
                    var mno = sessionStorage.getItem('mobile_no');
                    if(element.mobile_no === mno){
                        postValues(element);
                    }

                });



            } else {


                msg = 'Form submission failed and no error message returned from: ' + action + '<br>';
                console.log(msg)

            }
        }).fail(function (data) {
            console.log(data);
            var error_msg = "Form submission failed!<br>";
            if (data.statusText || data.status) {
                error_msg += 'Status:';
                if (data.statusText) {
                    error_msg += ' ' + data.statusText;
                }
                if (data.status) {
                    error_msg += ' ' + data.status;
                }
                error_msg += '<br>';
            }
            if (data.responseText) {
                error_msg += data.responseText;
            }
            console.log(error_msg);
        });
    }

})(jQuery);

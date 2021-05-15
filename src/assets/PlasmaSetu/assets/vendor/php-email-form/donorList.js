
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
    function DOMCreation(element) {

        var a = document.createElement("a");
        a.className = "linked donor";
        a.href = "#";
        a.target = "_self";
        a.innerHTML = 'Get contact Info';
        a.style.backgroundColor = "#ecf0f1";
        a.style.color = '#576574';
        a.style.fontSize = '12px';
        a.padding = '8px';

        var br = document.createElement("br");
        var br1 = document.createElement("br");
        var br2 = document.createElement("br");
        var span2 = document.createElement("span");
        span2.className = "text";
        span2.id = "ageSub";
        span2.innerHTML = 'Age: '

        var p2 = document.createElement("span");
        p2.className = "description";
        p2.id = "age";
        p2.innerHTML = element.age + ' years';

        var span1 = document.createElement("span");
        span1.className = "text";
        span1.id = "bloodGrpSub";
        span1.innerHTML = 'Blood Group: ';

        var p1 = document.createElement("span");
        p1.className = "description";
        p1.id = "bloodGrp";
        p1.innerHTML = element.bloodgroup

        var h4 = document.createElement("h4");
        h4.className = "title";
        h4.id = "city";
        h4.innerHTML = element.city;

        var i = document.createElement("i");
        i.className = "fa fa-user user";
        var icon = document.createElement("div");
        icon.className = "icon";
        icon.id = element.mobile_no
        icon.appendChild(i);
        icon.appendChild(h4);
        icon.appendChild(span1);
        icon.appendChild(p1);
        icon.appendChild(br1);
        icon.appendChild(span2);
        icon.appendChild(p2);
        icon.appendChild(br);
        icon.appendChild(br2);
        icon.appendChild(a);

        var mainDiv2 = document.createElement("div");
        mainDiv2.className = "icon-box";
        mainDiv2.appendChild(icon);

        var mainDiv = document.createElement("div");
        mainDiv.className = "col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0";
        mainDiv.appendChild(mainDiv2);
        mainDiv.style.paddingBottom = '20px';
        //Adding column to the row div
        $('#app').append(mainDiv);
    }
    let dataToSendNext = extractFormValNew();
    php_email_form_submit("https://coht2ln423.execute-api.us-east-1.amazonaws.com/get_from_donor", JSON.stringify(dataToSendNext));

    $('#app').on('click', 'a.donor', function () {
        sessionStorage.setItem('mobile_no', $(this).parent().attr('id'));
        window.location.href = 'authentication.html'
    });

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
                    DOMCreation(element)
                });



            } else {
                // Get the modal
                var modal = document.getElementById("myModal");



                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                modal.style.display = "block";


                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

            }
        }).fail(function (data) {

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

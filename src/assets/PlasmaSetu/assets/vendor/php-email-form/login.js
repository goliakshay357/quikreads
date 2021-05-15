
!(function ($) {
    "use strict";
    function extractFormVal(input) {
        let dataToSend = {}
        if (input && input.length) {
            var res = input.split('&')
            if (res && res.length) {
                res.forEach(function (entry) {
                    if (entry && entry.length) {
                        let res1 = entry.split('=');
                        switch (res1[0]) {
                            case 'remail': {
                                dataToSend['email_id'] = decodeURIComponent(res1[1]);
                                break;
                            }
                            case 'rphone': {
                                dataToSend['mobile_no'] = res1[1];
                                break;
                            }
                        }
                    }
                });
            }

        }
        return dataToSend;
    }

    $('form.php-email-form').submit(function (e) {
        e.preventDefault();
        var f = $(this).find('.form-group'),
            ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('input').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'email':
                        if (!emailExp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;
                    case 'equals':
                        if (i.val().length > parseInt(exp) || i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;
                    case 'checked':
                        if (!i.is(':checked')) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'regexp':
                        exp = new RegExp(exp);
                        if (!exp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        f.children('textarea').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        if (ferror) return false;

        var this_form = $(this);
        var action = $(this).attr('action');

        if (!action) {
            this_form.find('.loading').slideUp();
            this_form.find('.error-message').slideDown().html('The form action property is not set!');
            return false;
        }

        this_form.find('.sent-message').slideUp();
        this_form.find('.error-message').slideUp();
        this_form.find('.loading').slideDown();

        if ($(this).data('recaptcha-site-key')) {
            var recaptcha_site_key = $(this).data('recaptcha-site-key');
            grecaptcha.ready(function () {
                grecaptcha.execute(recaptcha_site_key, { action: 'php_email_form_submit' }).then(function (token) {
                    php_email_form_submit(this_form, action, this_form.serialize() + '&recaptcha-response=' + token);
                });
            });
        } else {
            let dataToSend = extractFormVal(this_form.serialize())
            php_email_form_submit(this_form, action, JSON.stringify(dataToSend), dataToSend);


        }

        return true;
    });

    function php_email_form_submit(this_form, action, data, data1) {
        $.ajax({
            type: "POST",
            url: action,
            data: data,
            timeout: 40000,
            contentType: 'application/json'
        }).done(function (msg) {
            if (msg.status == 200) {
                this_form.find('.loading').slideUp();
                this_form.find('.sent-message').slideDown();
                this_form.find("input:not(input[type=submit]), textarea").val('');
                sessionStorage.setItem('phone', data1.mobile_no);
                sessionStorage.setItem('email', data1.email_id);
                sessionStorage.setItem('type', 'N');
                setTimeout(function () { window.location.href = 'recipient_form.html'; }, 500);

            } else {
                // Get the modal
                var modal = document.getElementById("myModal");


                modal.style.display = "block";



                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
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
            this_form.find('.loading').slideUp();
            this_form.find('.error-message').slideDown().html(error_msg);
        });
    }

})(jQuery);

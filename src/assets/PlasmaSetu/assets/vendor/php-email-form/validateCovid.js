
!(function ($) {
  "use strict";
  function extractFormVal(input) {
    let dataToSend = {}
    var currentDate = moment(new Date());
    if (input && input.length) {
      var res = input.split('&')
      if (res && res.length) {
        res.forEach(function (entry) {
          if (entry && entry.length) {
            let res1 = entry.split('=');
            switch (res1[0]) {
              case 'cname': {
                dataToSend['full_name'] = decodeURIComponent(res1[1]);
                break;
              }
              case 'altmobile': {
                dataToSend['alt_mobile_no'] = res1[1];
                break;
              }
              case 'cemail': {
                dataToSend['email_id'] = decodeURIComponent(res1[1]);
                break;
              }
              case 'cmobile': {
                dataToSend['mobile_no'] = res1[1];
                break;
              }
              case 'rage': {
                dataToSend['age'] = res1[1];
                break;
              }
              case 'date': {
                dataToSend['covid_screen_date'] = decodeURIComponent(res1[1]);
                break;
              }
            }
          }
        });
        dataToSend['created_at'] = currentDate.format('YYYY-MM-DD HH:mm:ss');
        dataToSend['bloodgroup'] = $('#rBlood').val();
        dataToSend['gender'] = $('input[name="rgender"]:checked').val();
        dataToSend['on_date'] = currentDate.format('YYYY-MM-DD');
        dataToSend['city'] = $('#rcity').val();
      }

    }
    return dataToSend;
  }
  getCity();
  //   var array = ["2020-11-14"]

  //   $('input').datepicker({
  //     beforeShowDay: function(date){
  //         var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
  //         return [ array.indexOf(string) == -1 ]
  //     }
  // });
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
          case 'equals':
            if (i.val().length > parseInt(exp) || i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
          case 'email':
            if (!emailExp.test(i.val())) {
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
          case 'age':
            if (i.val() <= parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
          case 'alt':
            if (i.val().length && (i.val().length > parseInt(exp) || i.val().length < parseInt(exp))) {
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
    var chkerror = true
    f.children('label').each(function () { // run all inputs
      var c = $(this);
      c.children('input').each(function () { // run all inputs
        var i = $(this); // current input
        var rule = i.attr('data-rule');

        if (rule !== undefined) {

          var pos = rule.indexOf(':', 0);
          if (pos >= 0) {
            var exp = rule.substr(pos + 1, rule.length);
            rule = rule.substr(0, pos);
          } else {
            rule = rule.substr(pos + 1, rule.length);
          }
          switch (rule) {


            case 'checked':
              if (i.is(':checked')) {
                chkerror = false;
              }
              break;


          }
        }
      });

    });
    if (chkerror) {
      ferror = true;
      $('.validateCheck').html('Gender is a mandatory field').show('blind');
    }
    else {
      $('.validateCheck').html(' ').show('blind');
    }
    if ($('#rBlood').val() ===
      null) {
      $('.validateSelB').html('Blood group is a mandatory field');
      $('.validateSelB').css('display', 'block');
      ferror = true;
    }
    else if ($('#rBlood').val().length) {
      $('.validateSelB').css('display', 'none');
    }
    // if ($('#relation').val() ===
    //     null) {
    //     $('.validateSelR').html('Please select a value');
    //     $('.validateSelR').css('display', 'block');
    //     ferror = true;
    // }
    // else if ($('#relation').val().length) {
    //     $('.validateSelR').css('display', 'block');
    //     ferror = false;
    // }
    if ($('#rcity').val() ===
      null) {
      $('.validateSelC').html('City is a mandatory field');
      $('.validateSelC').css('display', 'block');
      ferror = true;
    }
    else if ($('#rcity').val().length) {
      $('.validateSelC').css('display', 'none');
    }

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
      if (sessionStorage.getItem('radio') === 'yes' && sessionStorage.getItem('radio1') === 'yes' && sessionStorage.getItem('radio2') === 'yes' && sessionStorage.getItem('radio3') === 'yes' && sessionStorage.getItem('radio4') === 'yes') {
        sessionStorage.setItem('dataToSend', JSON.stringify(dataToSend));
        // php_email_form_submit(this_form, action, JSON.stringify(dataToSend));
        window.location.href = "covid_authentication.html";
      }
      else {
        window.location.href = "congratulations_register.html";
      }

    }

    return true;
  });

  function php_email_form_submit(this_form, action, data) {
    $.ajax({
      type: "POST",
      url: action,
      data: data,
      timeout: 40000
    }).done(function (msg) {
      if (msg.status === 200) {
        this_form.find('.loading').slideUp();
        this_form.find('.sent-message').slideDown();
        this_form.find("input:not(input[type=submit]), textarea").val('');
        $('#rBlood').val('');
      } else {
        this_form.find('.loading').slideUp();
        this_form.find('.error-message').slideDown().html('Looks like you are already registered !!');
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
  function getCity() {
    $.ajax({
      type: "GET",
      url: "https://9r41q68y0b.execute-api.us-east-1.amazonaws.com/get_city",
      timeout: 40000
    }).done(function (msg) {
      if (msg.status === 200) {
        var opt = document.createElement('option');
        opt.innerHTML = 'City';
        opt.disabled = true;
        opt.selected = true;
        $('#rcity').append(opt);
        var res = msg.body;
        res.sort();
        res.forEach(element => {
          var opt = document.createElement('option');
          opt.innerHTML = element;
          opt.value = element;
          $('#rcity').append(opt);

        });



      }
    }).fail(function (data) {
      console.log(data);

    });
  }
})(jQuery);

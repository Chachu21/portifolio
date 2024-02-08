// Client-side jQuery code
$(document).ready(function () {
  $("form.contactForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate form inputs
    var ferror = false;
    var f = $(this).find(".form-group");
    f.children("input").each(function () {
      var i = $(this);
      var rule = i.attr("data-rule");
      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }
        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;
          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
          case "email":
            var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") !== undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });

    // Check for textarea validation
    f.children("textarea").each(function () {
      var i = $(this);
      var rule = i.attr("data-rule");
      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }
        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;
          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") != undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });

    // If there are errors, return false
    if (ferror) return false;

    // Serialize form data
    var formData = $(this).serialize();

    // Send form data to server endpoint
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/submit-form", // Server endpoint
      data: formData,
      success: function (response) {
        // Handle success response
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        $(".contactForm").find("input, textarea").val("");
      },
      error: function (xhr, status, error) {
        // Handle error response
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $("#errormessage").html("Error: " + error);
      },
    });

    return false;
  });
});

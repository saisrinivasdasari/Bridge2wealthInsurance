jQuery(document).ready(function ($) {
    // Helper function to format and send WhatsApp message
    function sendWhatsAppInquiry(form) {
        var $form = $(form);
        var name = $.trim($form.find('[name="fname"]').val()) || 'Not provided';
        var phone = $.trim($form.find('[name="phone"]').val()) || 'Not provided';
        var email = $.trim($form.find('[name="email"]').val()) || 'Not provided';
        var service = $form.find('[name="service"]').val() || 'General Insurance & Financial Inquiry';
        var msg = $.trim($form.find('[name="msg"]').val()) || 'No additional message provided';

        // Construct clean, professional message
        var waMessage = "*New Website Inquiry - Bridge2wealth*\n" +
            "------------------------------------\n" +
            "*Name:* " + name + "\n" +
            "*Phone:* " + phone + "\n" +
            "*Email:* " + email + "\n" +
            "*Service:* " + service + "\n" +
            "*Message:*\n" + msg + "\n" +
            "------------------------------------\n" +
            "_Submitted via Bridge2wealth Website_";

        var encodedMsg = encodeURIComponent(waMessage);
        var waNumber = "917337333436";
        var waUrl = "https://wa.me/" + waNumber + "?text=" + encodedMsg;

        var $resultBox = $form.find("#form_result");
        if (!$resultBox.length) {
            $resultBox = $("#form_result");
        }

        $resultBox.html(
            '<div class="alert alert-success d-flex align-items-center mt-3" role="alert">' +
            '<i class="fa-brands fa-whatsapp fa-2x mr-3 text-success"></i>' +
            '<div><strong>Thank you, ' + $("<div>").text(name).html() + '!</strong><br>' +
            'Redirecting you to WhatsApp to connect directly with Mallikarjun G V...</div>' +
            '</div>'
        ).fadeIn();

        // Also optionally post to contact-form.php asynchronously as a backup record without blocking
        try {
            $.ajax({
                url: "contact-form.php",
                type: "POST",
                data: $form.serialize(),
                dataType: "json",
                timeout: 3000
            });
        } catch (err) {
            // Silently ignore php errors since user explicitly requested WhatsApp redirection
        }

        // Open WhatsApp in new tab/window after brief delay so user sees confirmation
        setTimeout(function () {
            window.open(waUrl, "_blank");
        }, 600);

        return false;
    }

    // Intercept form submissions for all contact forms on the site
    $("form#contactpage, form.contact-form").on("submit", function (e) {
        e.preventDefault();

        var $form = $(this);
        var nameInput = $form.find('[name="fname"]');
        var phoneInput = $form.find('[name="phone"]');

        // Validation check
        var valid = true;
        $form.find(".field-error").remove();

        if (nameInput.length && !$.trim(nameInput.val())) {
            nameInput.addClass("is-invalid").focus();
            nameInput.after('<span class="field-error text-danger font-weight-bold" style="font-size: 13px;">Please enter your name</span>');
            valid = false;
        } else if (nameInput.length) {
            nameInput.removeClass("is-invalid");
        }

        if (phoneInput.length && !$.trim(phoneInput.val())) {
            phoneInput.addClass("is-invalid");
            if (valid) phoneInput.focus();
            phoneInput.after('<span class="field-error text-danger font-weight-bold" style="font-size: 13px;">Please enter your phone number</span>');
            valid = false;
        } else if (phoneInput.length) {
            phoneInput.removeClass("is-invalid");
        }

        if (!valid) {
            return false;
        }

        sendWhatsAppInquiry(this);
        return false;
    });
});

jQuery(function($) {
    $('.submitOnChange').change(function() {
        $(this).closest('form').submit();
    });
});

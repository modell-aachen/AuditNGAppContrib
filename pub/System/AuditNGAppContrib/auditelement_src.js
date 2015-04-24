jQuery(function($){
    $('#addQuestionDialog form').ajaxForm({
        beforeSerialize: function($form, options) {
            if(StrikeOne !== undefined) {
                StrikeOne.submit($form[0]);
            }
            if($.blockUI !== undefined) $.blockUI();
        },
        success: function(data) {
            if($.blockUI !== undefined) $.unblockUI();
            var $data = $(data);
            var created = $data.find('input[name="created"]').val();
            if(created) {
                var $div = $('<div></div>');

                var $input = $('<input type="hidden" name="Question" />');
                $input.val(created);
                $div.append($input);

                var $title = $('<span></span>');
                $title.html($data.find('.AspectCriteria').html());
                $div.append($title);

                $('[name="main"] .select2-container').closest('td').empty().append($div);
            }
            var key = $data.find('input[name="validation_key"]').val();
            if(key) {
                $('input[name="validation_key"]').val(key);
            }
            $('#addQuestionDialog').dialog('close');
        },
        error: function(data) {
            if($.blockUI !== undefined) $.unblockUI();
            var $data = $(data.responseText);
            var key = $data.find('input[name="validation_key"]').first().val();
            if(key) $('[name="validation_key"]').val(key);
            alert('An error occured while saving');
        }
    });

    $('.addQuestion').click(function() {
        var $this = $(this);
        $('#addQuestionDialog').dialog('open');
        return false;
    });
});

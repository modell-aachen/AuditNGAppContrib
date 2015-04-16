jQuery(function($){
    $('#addQuestionDialog').on('dialogclose', function() {
        var $form = $(this).find('form');
        var $clone = $form.clone();
        $clone.find('[name="AspectCriteria"]').val($form.find('[name="AspectCriteria"]').val());

        $clone.ajaxForm({
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
                    var $input = $('<input type="text" readonly="readonly" name="Question" />');
                    $input.val(created);
                    $('[name="main"] .select2-container').replaceWith($input);
                }
                var key = $data.find('input[name="validation_key"]').val();
                if(key) {
                    $('input[name="validation_key"]').val(key);
                }
            },
            error: function(data) {
                if($.blockUI !== undefined) $.unblockUI();
                alert('An error occured while saving');
                $('#addQuestionDialog').dialog('open');
            }
        });
        $clone.submit();
        //  $form.find('[name="Chapter"]').val('');
        //  $form.find('[name="AspectCriteria"]').val('');
    });

    $('.addQuestion').click(function() {
        var $this = $(this);
        $('#addQuestionDialog').dialog('open');
        return false;
    });
});

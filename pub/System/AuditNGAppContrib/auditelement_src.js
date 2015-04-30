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
                var $div = $('<div></div>').addClass('question');

                var $input = $('<input type="hidden" name="Question" />');
                $input.val(created);
                $div.append($input);

                var $title = $('<span></span>');
                $title.html($data.find('.AspectCriteria').html());
                $div.append($title);

                $('[name="main"] .select2-container').closest('.question').replaceWith($div);
                updateButton();
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

    var updateButton = function() {
        var $button = $('.editQuestion');
        var question = $('input[name="Question"]').val();
        if(question) {
            $button.removeClass('disabledButton');
        } else {
            $button.addClass('disabledButton');
        }
    };
    $('input[name="Question"]').change(updateButton);
    updateButton();

    var loadEditDialog = function() {
        var question = $('input[name="Question"]').val();
        var $dialogContainer = $('<div></div>').addClass('dialogContainer').hide().appendTo('body');
        var url = foswiki.getPreference('SCRIPTURL') + '/rest' + foswiki.getPreference('SCRIPTSUFFIX') + '/RenderPlugin/template?render=1;name=AuditElementEdit;expand=editQuestionDialog;question=' + encodeURIComponent(question) + ';topic=' + encodeURIComponent(foswiki.getPreference('WEB').replace(/\//g, '.').replace(/.[^.]*$/, '') + '.DummyTopic');
        $dialogContainer.load(url, function() {
            $dialogContainer.find('form').ajaxForm({
                beforeSerialize: function($form, options) {
                    if(StrikeOne !== undefined) {
                        StrikeOne.submit($form[0]);
                    }
                    if($.blockUI !== undefined) $.blockUI();
                },
                success: function(data) {
                    if($.blockUI !== undefined) $.unblockUI();
                    var $data = $(data);
                    var $div = $('<div></div>').addClass('question');

                    var $input = $('<input type="hidden" name="Question" />');
                    $input.val(question);
                    $div.append($input);

                    var $title = $('<span></span>');
                    $title.html($data.find('.AspectCriteria').html());
                    $div.append($title);

                    $('[name="main"] .select2-container').closest('.question').replaceWith($div);
                    updateButton();

                    var key = $data.find('input[name="validation_key"]').val();
                    if(key) {
                        $('input[name="validation_key"]').val(key);
                    }
                    $('.editQuestionDialog').dialog('close'); // destroy?
                },
                error: function(data) {
                    if($.blockUI !== undefined) $.unblockUI();
                    var $data = $(data.responseText);
                    var key = $data.find('input[name="validation_key"]').first().val();
                    if(key) $('[name="validation_key"]').val(key);
                    alert('An error occured while saving');
                }
            });
        });
    };

    $('.editQuestion').click(function() {
        var $this = $(this);
        if(!$this.hasClass('disabledButton')) loadEditDialog();
        return false;
    });
});

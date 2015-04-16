var prince;
if(typeof(Prince) !== 'undefined') {
    // called from prince
    prince = 1;
}

jQuery(function($) {
    if(prince) $ = jQuery; // for some reason I need to set $ manually

    $('.auditPlanningBlock').each(function(){
        var $this = $(this);

        var $result = $this.find('.result');
        if(!$result.length) return;

        var $eachtr = $this.find('table tbody tr');
        if(!$eachtr.length) return;
        var i;
        var sum = 0;
        for(i = 0; i < $eachtr.length; i++) {
            var $td = $eachtr.eq(i).find('td').eq(5);
            var n = new Number($td.text());
            if(!isNaN(n)) sum += n;
        }
        $result.text(sum/$eachtr.length);
    });
});

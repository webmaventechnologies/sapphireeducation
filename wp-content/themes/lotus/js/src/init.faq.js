
// toggle questions
jQuery(function($){
    $('.widget-faq dl')
        .avertaAccordion({ 
            oneVisible:false, 
            showEase:'easeOutQuad',
            onCollapse : function($items){ $items.find('dt i').text('+'); } ,
            onExpand   : function($items){ $items.find('dt i').text('-'); }
    });    
});



// filter faq items
;jQuery(function($){
    
    var $widget    = $('.widget-faq');
    var $container = $widget.find('.widget-inner');
    var $btns      = $widget.find('.filterable a');
    var $contents  = $container.find('[data-filter]');
    
    //get active filter
    var filterType = $btns.filter('.active').attr('data-filter');
    // provide selector
    var selector   = (filterType == 'all')? '[data-filter]' : '[data-filter="' + filterType + '"]';
    
    $contents.filter(selector).show();
    
    
    // filter items when filter link is clicked
    $btns.click(function(event) {
        var $this = $(this);
        event.preventDefault();
        
        // reset the active class on all the buttons
        $this.siblings().removeClass('active');
        $this.addClass('active');
        
        filterType = $this.data('filter');
        selector   = (filterType == 'all')? '[data-filter]': '[data-filter*="' + filterType + '"]';
        
        $.each($contents, function(i, val){
            $this = $(this);
            if($this.is(selector)){
                $this.slideDown(500, 'easeOutQuad');
            }else{
                $this.slideUp(200, 'easeOutQuad');
            }
        });
        
    });
    
});


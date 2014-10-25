/**
 * Averta.Accordion v1.2
 * An jQuery for Accordion and toggles
 * Copyright (c) averta | http://averta.net | 2011
 * licensed under the MIT license
 **/

/**
 * USAGE : 
 * -----------------------------------------------------------------------------------------------------
 * HTML:
   <dl id="container">
  		<section class="active">
            <dt><i>-</i>Nam ante quam, venenatis</dt>
            <dd>Lorem ipsum dolor isus. Ut neque.</dd>
        </section>
                                        
        <section>
            <dt><i>-</i>Nam ante quam, venenatis</dt>
            <dd>Lorem ipsum dolor isus. Ut neque.</dd>
        </section>
   </dl>
 * 
 * JS:
   $('#container').avertaAccordion({
  		items:            'section',    // accordion item selector  
        itemActiveClass:  'active',     // A Class that indicates active item   
        itemHeader:       'dt',         // item header selector
        itemContent:      'dd',         // item content selector
        transition:       'fade',       // Animation type white swiching tabs
        hideDuration :    '300' ,       // Hiding duration in mili seconds
        showDuration :    '500' ,       // Showing duration in mili seconds
        hideEase :        'linear' ,    // Ease for hiding transition
        showEase :        'linear' ,    // Ease for showing transition
        oneVisible:        true  ,      // Always just one item can be open or not
        collapseOnInit:    true         // collapse all items on accordion init
        onExpand:          function(){},// callback that fires on expanding item  - param: item
        onCollapse:        function(){} // callback that fires on collapsing item - param: item
   });
 * 
 * ---------------------------------------------------------------------------------------------------------
 **/
if(typeof Object.create !== 'function' ){ Object.create = function (obj){ function F(){}; F.prototype = obj; return new F();} };

;(function($){
	
	var Container = {
		
        init : function(el, options){
        	//cache this
        	var self 		= this;
        	self.options 	= $.extend({} ,$.fn.avertaAccordion.defaultOptions, options || {} );
        	
	        // Access to jQuery and DOM versions of element
	        self.$el 		= $(el);
	        self.el  		= el;
	        
	        self.$items	    = self.$el.find(self.options.items);
	        // skip if no item found
	        if(!self.$items.length) return;
	        
	        self.$headers   = self.$items.find(self.options.itemHeader);
	        self.$contents  = self.$items.find(self.options.itemContent);
	        
            self.setup();
        },
        
        setup: function(){
        	var self = this;
        	
        	// add click handler on each item's header'
        	self.$headers.on('click', {self:self}, self.onHeader_clicked).css({ 'cursor': 'pointer' });
        	
        	
        	// collapse all elements on start
        	if(self.options.collapseOnInit || self.options.oneVisible) { self.$contents.slideUp(0);self.options.onCollapse(self.$items); }
        	
        	// if oneVisible is true, expand the active element
        	if(self.options.oneVisible){ 
        	    $actives = self.$items.filter('.'+self.options.itemActiveClass).first();
        	    // if active is not defined, get first element as active item
        	    $actives = $actives.length?$actives:self.$items.first().addClass(self.options.itemActiveClass);
        	    // disable mouse on active item
        	    $actives.find(self.options.itemHeader).css({ 'cursor':'auto' });
        	    // expand active element
        	    $actives.find(self.options.itemContent).slideDown(0);
        	    self.options.onExpand($actives);
        	    
        	}else if(self.options.collapseOnInit){
        	    // remove active class if active item is collapsed
        	    self.$items.removeClass(self.options.itemActiveClass);
        	}
        	
        	// get hash id and expand the item
        	if(window.location.hash){
        	    self.expand_hashItem();
        	}
        	
        	$(window).on('hashchange', self.expand_hashItem);
        },
        
        expand_hashItem: function(){
            var self   = this;
            $hash_head = $(window.location.hash).find(self.options.itemHeader);
            $hash_head.trigger('click', {self:self}, self.onHeader_clicked).css({ 'cursor': 'pointer' });
        },
        
        onHeader_clicked:function(event){
        	event.preventDefault();
        	var self     = event.data.self;
			var $header  = $(this);
			var $item    = $header.closest(self.options.items);
			
			// skip if the target is active item
			if($item.hasClass(self.options.itemActiveClass) && self.options.oneVisible ) return;
			
			var $content = $item.find(self.options.itemContent);
			
			
			if(self.options.oneVisible){
			    // remove active class from all items and add to current item
			    self.$items.removeClass(self.options.itemActiveClass)
			               .find(self.options.itemHeader).css({ 'cursor':'pointer' });
                $item.addClass(self.options.itemActiveClass)
                            .find(self.options.itemHeader).css({ 'cursor':'auto'   });
                
			    // collapse all items and expand current item
			    self.$contents.slideUp(self.options.hideDuration, self.options.hideEase);
			    self.options.onCollapse(self.$items);
			    
			    $content.slideDown(self.options.showDuration, self.options.showEase);
			    self.options.onExpand($item);
			
			}else{
			    
			    $content.slideToggle(self.options.duration, self.options.showEase);
			    
			    if($content.height()<3){ 
			        $item.addClass(self.options.itemActiveClass); self.options.onExpand($item);
			    }else{ $item.removeClass(self.options.itemActiveClass); self.options.onCollapse($item);  }
			}
			
        }
    
	};
	
	
	
	 $.fn.avertaAccordion = function(options){
        return this.each(function(){
            var container = Object.create(Container);
            container.init(this, options);
        });
    };
	
	$.fn.avertaAccordion.defaultOptions = {          
		items:            'section',    // accordion item selector  
        itemActiveClass:  'active',     // A Class that indicates active item   
        itemHeader:       'dt',         // item header selector
        itemContent:      'dd',         // item content selector
        transition:       'fade',       // Animation type white swiching tabs
        hideDuration :    '300' ,       // Hiding duration in mili seconds
        showDuration :    '500' ,       // Showing duration in mili seconds
        hideEase :        'linear' ,    // Ease for hiding transition
        showEase :        'linear' ,    // Ease for showing transition
        oneVisible:        true  ,      // Always just one item can be open or not
        collapseOnInit:    true  ,      // collapse all items on accordion init
        onExpand:          function(){},// callback that fires on expanding item  - param: item
        onCollapse:        function(){} // callback that fires on collapsing item - param: item
    };
	
	
})(jQuery);


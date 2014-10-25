/*======================================================================================
 * jQuery MiniColors: A tiny color picker built on jQuery | 16/1/2013
 * Copyright Cory LaViska for A Beautiful Site, LLC. (http://www.abeautifulsite.net/)
 * Dual-licensed under the MIT and GPL Version 2 licenses
 *======================================================================================*/
/*
 * jQuery MiniColors: A tiny color picker built on jQuery
 *
 * Copyright Cory LaViska for A Beautiful Site, LLC. (http://www.abeautifulsite.net/)
 *
 * Dual-licensed under the MIT and GPL Version 2 licenses
 *
*/
if(jQuery) (function($) {
    
    // Yay, MiniColors!
    $.minicolors = {
        // Default settings
        defaultSettings: {
            animationSpeed: 100,
            animationEasing: 'swing',
            change: null,
            changeDelay: 0,
            control: 'hue',
            defaultValue: '',
            hide: null,
            hideSpeed: 100,
            inline: false,
            letterCase: 'lowercase',
            opacity: false,
            position: 'default',
            show: null,
            showSpeed: 100,
            swatchPosition: 'left',
            textfield: true,
            theme: 'default'
        }
    };
    
    // Public methods
    $.extend($.fn, {
        minicolors: function(method, data) {
            
            switch(method) {
                
                // Destroy the control
                case 'destroy':
                    $(this).each( function() {
                        destroy($(this));
                    });
                    return $(this);
                
                // Get/set opacity
                case 'opacity':
                    if( data === undefined ) {
                        // Getter
                        return $(this).attr('data-opacity');
                    } else {
                        // Setter
                        $(this).each( function() {
                            refresh($(this).attr('data-opacity', data));
                        });
                        return $(this);
                    }
                
                // Get an RGB(A) object based on the current color/opacity
                case 'rgbObject':
                    return rgbObject($(this), method === 'rgbaObject');
                
                // Get an RGB(A) string based on the current color/opacity
                case 'rgbString':
                case 'rgbaString':
                    return rgbString($(this), method === 'rgbaString')
                
                // Get/set settings on the fly
                case 'settings':
                    if( data === undefined ) {
                        return $(this).data('minicolors-settings');
                    } else {
                        // Setter
                        $(this).each( function() {
                            var settings = $(this).data('minicolors-settings') || {};
                            destroy($(this));
                            $(this).minicolors($.extend(true, settings, data));
                        });
                        return $(this);
                    }
                
                // Get/set the hex color value
                case 'value':
                    if( data === undefined ) {
                        // Getter
                        return $(this).val();
                    } else {
                        // Setter
                        $(this).each( function() {
                            refresh($(this).val(data));
                        });
                        return $(this);
                    }
                
                // Initializes the control
                case 'create':
                default:
                    if( method !== 'create' ) data = method;
                    $(this).each( function() {
                        init($(this), data);
                    });
                    return $(this);
                
            }
            
        }
    });
    
    // Initialize input elements
    function init(input, settings) {
        
        var minicolors = $('<span class="minicolors" />'),
            defaultSettings = $.minicolors.defaultSettings;
        
        // Do nothing if already initialized
        if( input.data('minicolors-initialized') ) return;
        
        // Handle settings
        settings = $.extend(true, {}, defaultSettings, settings);
        
        // The wrapper
        minicolors
            .addClass('minicolors-theme-' + settings.theme)
            .addClass('minicolors-swatch-position-' + settings.swatchPosition)
            .toggleClass('minicolors-swatch-left', settings.swatchPosition === 'left')
            .toggleClass('minicolors-with-opacity', settings.opacity);
        
        // Custom positioning
        if( settings.position !== undefined ) {
            $.each(settings.position.split(' '), function() {
                minicolors.addClass('minicolors-position-' + this);
            });
        }
        
        // The input
        input
            .addClass('minicolors-input')
            .data('minicolors-initialized', true)
            .data('minicolors-settings', settings)
            .prop('size', 7)
            .prop('maxlength', 7)
            .wrap(minicolors)
            .after(
                '<span class="minicolors-panel minicolors-slider-' + settings.control + '">' + 
                    '<span class="minicolors-slider">' + 
                        '<span class="minicolors-picker"></span>' +
                    '</span>' + 
                    '<span class="minicolors-opacity-slider">' + 
                        '<span class="minicolors-picker"></span>' +
                    '</span>' +
                    '<span class="minicolors-grid">' +
                        '<span class="minicolors-grid-inner"></span>' +
                        '<span class="minicolors-picker"><span></span></span>' +
                    '</span>' +
                '</span>'
            );
        
        // Prevent text selection in IE
        input.parent().find('.minicolors-panel').on('selectstart', function() { return false; }).end();
        
        // Detect swatch position
        if( settings.swatchPosition === 'left' ) {
            // Left
            input.before('<span class="minicolors-swatch"><span></span></span>');
        } else {
            // Right
            input.after('<span class="minicolors-swatch"><span></span></span>');
        }
        
        // Disable textfield
        if( !settings.textfield ) input.addClass('minicolors-hidden');
        
        // Inline controls
        if( settings.inline ) input.parent().addClass('minicolors-inline');
        
        updateFromInput(input);
        
    }
    
    // Returns the input back to its original state
    function destroy(input) {
        
        var minicolors = input.parent();
        
        // Revert the input element
        input
            .removeData('minicolors-initialized')
            .removeData('minicolors-settings')
            .removeProp('size')
            .removeProp('maxlength')
            .removeClass('minicolors-input');
        
        // Remove the wrap and destroy whatever remains
        minicolors.before(input).remove();
        
    }
    
    // Refresh the specified control
    function refresh(input) {
        updateFromInput(input);
    }
    
    // Shows the specified dropdown panel
    function show(input) {
        
        var minicolors = input.parent(),
            panel = minicolors.find('.minicolors-panel'),
            settings = input.data('minicolors-settings');
        
        // Do nothing if uninitialized, disabled, or already open
        if( !input.data('minicolors-initialized') || input.prop('disabled') || minicolors.hasClass('minicolors-focus') ) return;
        
        hide();
        
        minicolors.addClass('minicolors-focus');
        panel
            .stop(true, true)
            .fadeIn(settings.showSpeed, function() {
                if( settings.show ) settings.show.call(input);
            });
        
    }
    
    // Hides all dropdown panels
    function hide() {
        
        $('.minicolors-input').each( function() {
            
            var input = $(this),
                settings = input.data('minicolors-settings'),
                minicolors = input.parent();
            
            // Don't hide inline controls
            if( settings.inline ) return;
            
            minicolors.find('.minicolors-panel').fadeOut(settings.hideSpeed, function() {
                if(minicolors.hasClass('minicolors-focus')) {
                    if( settings.hide ) settings.hide.call(input);
                }
                minicolors.removeClass('minicolors-focus');
            });         
                        
        });
    }
    
    // Moves the selected picker
    function move(target, event, animate) {
        
        var input = target.parents('.minicolors').find('.minicolors-input'),
            settings = input.data('minicolors-settings'),
            picker = target.find('[class$=-picker]'),
            offsetX = target.offset().left,
            offsetY = target.offset().top,
            x = Math.round(event.pageX - offsetX),
            y = Math.round(event.pageY - offsetY),
            duration = animate ? settings.animationSpeed : 0,
            wx, wy, r, phi;
            
        
        // Touch support
        if( event.originalEvent.changedTouches ) {
            x = event.originalEvent.changedTouches[0].pageX - offsetX;
            y = event.originalEvent.changedTouches[0].pageY - offsetY;
        }
        
        // Constrain picker to its container
        if( x < 0 ) x = 0;
        if( y < 0 ) y = 0;
        if( x > target.width() ) x = target.width();
        if( y > target.height() ) y = target.height();
        
        // Constrain color wheel values to the wheel
        if( target.parent().is('.minicolors-slider-wheel') && picker.parent().is('.minicolors-grid') ) {
            wx = 75 - x;
            wy = 75 - y;
            r = Math.sqrt(wx * wx + wy * wy);
            phi = Math.atan2(wy, wx);
            if( phi < 0 ) phi += Math.PI * 2;
            if( r > 75 ) {
                r = 75;
                x = 75 - (75 * Math.cos(phi));
                y = 75 - (75 * Math.sin(phi));
            }
            x = Math.round(x);
            y = Math.round(y);
        }
        
        // Move the picker
        if( target.is('.minicolors-grid') ) {
            picker
                .stop(true)
                .animate({
                    top: y + 'px',
                    left: x + 'px'
                }, duration, settings.animationEasing, function() {
                    updateFromControl(input);
                });
        } else {
            picker
                .stop(true)
                .animate({
                    top: y + 'px'
                }, duration, settings.animationEasing, function() {
                    updateFromControl(input);
                });
        }
        
    }
    
    // Sets the input based on the color picker values
    function updateFromControl(input) {
        
        function getCoords(picker, container) {
            
            var left, top;
            if( !picker.length || !container ) return null;
            left = picker.offset().left;
            top = picker.offset().top;
            
            return {
                x: left - container.offset().left + (picker.outerWidth() / 2),
                y: top - container.offset().top + (picker.outerHeight() / 2)
            };
            
        }
        
        var hue, saturation, brightness, opacity, rgb, hex, x, y, r, phi,
            
            // Helpful references
            minicolors = input.parent(),
            settings = input.data('minicolors-settings'),
            panel = minicolors.find('.minicolors-panel'),
            swatch = minicolors.find('.minicolors-swatch'),
            
            // Panel objects
            grid = minicolors.find('.minicolors-grid'),
            slider = minicolors.find('.minicolors-slider'),
            opacitySlider = minicolors.find('.minicolors-opacity-slider'),
            
            // Picker objects
            gridPicker = grid.find('[class$=-picker]'),
            sliderPicker = slider.find('[class$=-picker]'),
            opacityPicker = opacitySlider.find('[class$=-picker]'),
            
            // Picker positions
            gridPos = getCoords(gridPicker, grid),
            sliderPos = getCoords(sliderPicker, slider),
            opacityPos = getCoords(opacityPicker, opacitySlider);
        
        // Determine HSB values
        switch(settings.control) {
            
            case 'wheel':
                // Calculate hue, saturation, and brightness
                x = (grid.width() / 2) - gridPos.x;
                y = (grid.height() / 2) - gridPos.y;
                r = Math.sqrt(x * x + y * y);
                phi = Math.atan2(y, x);
                if( phi < 0 ) phi += Math.PI * 2;
                if( r > 75 ) {
                    r = 75;
                    gridPos.x = 69 - (75 * Math.cos(phi));
                    gridPos.y = 69 - (75 * Math.sin(phi));
                }
                saturation = keepWithin(r / 0.75, 0, 100);
                hue = keepWithin(phi * 180 / Math.PI, 0, 360);
                brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                hex = hsb2hex({
                    h: hue,
                    s: saturation,
                    b: brightness
                });
                
                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
                break;
            
            case 'saturation':
                // Calculate hue, saturation, and brightness
                hue = keepWithin(parseInt(gridPos.x * (360 / grid.width())), 0, 360);
                saturation = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                hex = hsb2hex({
                    h: hue,
                    s: saturation,
                    b: brightness
                });
                
                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: brightness }));
                minicolors.find('.minicolors-grid-inner').css('opacity', saturation / 100);
                break;
            
            case 'brightness':
                // Calculate hue, saturation, and brightness
                hue = keepWithin(parseInt(gridPos.x * (360 / grid.width())), 0, 360);
                saturation = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                hex = hsb2hex({
                    h: hue,
                    s: saturation,
                    b: brightness
                });
                
                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
                minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (brightness / 100));
                break;
            
            default:
                // Calculate hue, saturation, and brightness
                hue = keepWithin(360 - parseInt(sliderPos.y * (360 / slider.height())), 0, 360);
                saturation = keepWithin(Math.floor(gridPos.x * (100 / grid.width())), 0, 100);
                brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                hex = hsb2hex({
                    h: hue,
                    s: saturation,
                    b: brightness
                });
                
                // Update UI
                grid.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: 100 }));
                break;
            
        }
        
        // Determine opacity
        if( settings.opacity ) {
            opacity = parseFloat(1 - (opacityPos.y / opacitySlider.height())).toFixed(2);
        } else {
            opacity = 1;
        }

    // Adjust case
    input.val( convertCase(hex, settings.letterCase) );
        if( settings.opacity ) input.attr('data-opacity', opacity);
        
        // Set swatch color
        swatch.find('SPAN').css({
            backgroundColor: hex,
            opacity: opacity
        });
        
        // Handle change event
        if( hex + opacity !== input.data('minicolors-lastChange') ) {
            
            // Remember last-changed value
            input.data('minicolors-lastChange', hex + opacity);
            
            // Fire change event
            if( settings.change ) {
                if( settings.changeDelay ) {
                    // Call after a delay
                    clearTimeout(input.data('minicolors-changeTimeout'));
                    input.data('minicolors-changeTimeout', setTimeout( function() {
                        settings.change.call(input, hex, opacity);
                    }, settings.changeDelay));
                } else {
                    // Call immediately
                    settings.change.call(input, hex, opacity);
                }
            }
            
        }
        
    }
    
    // Sets the color picker values from the input
    function updateFromInput(input, preserveInputValue) {
        
        var hex,
            hsb,
            opacity,
            x, y, r, phi,
            
            // Helpful references
            minicolors = input.parent(),
            settings = input.data('minicolors-settings'),
            swatch = minicolors.find('.minicolors-swatch'),
            
            
            // Panel objects
            grid = minicolors.find('.minicolors-grid'),
            slider = minicolors.find('.minicolors-slider'),
            opacitySlider = minicolors.find('.minicolors-opacity-slider'),
            
            // Picker objects
            gridPicker = grid.find('[class$=-picker]'),
            sliderPicker = slider.find('[class$=-picker]'),
            opacityPicker = opacitySlider.find('[class$=-picker]');
        
        // Determine hex/HSB values
        hex = convertCase(parseHex(input.val(), true), settings.letterCase);
        if( !hex ) hex = convertCase(parseHex(settings.defaultValue, true));
        hsb = hex2hsb(hex);
        
        // Update input value
        if( !preserveInputValue ) input.val(hex);
        
        // Determine opacity value
        if( settings.opacity ) {
            opacity = input.attr('data-opacity') === '' ? 1 : keepWithin(parseFloat(input.attr('data-opacity')).toFixed(2), 0, 1);
            input.attr('data-opacity', opacity);
            swatch.find('SPAN').css('opacity', opacity);
            
            // Set opacity picker position
            y = keepWithin(opacitySlider.height() - (opacitySlider.height() * opacity), 0, opacitySlider.height());
            opacityPicker.css('top', y + 'px');
        }
        
        // Update swatch
        swatch.find('SPAN').css('backgroundColor', hex);
        
        // Determine picker locations
        switch(settings.control) {
            
            case 'wheel':
                // Set grid position
                r = keepWithin(Math.ceil(hsb.s * 0.75), 0, grid.height() / 2);
                phi = hsb.h * Math.PI / 180;
                x = keepWithin(75 - Math.cos(phi) * r, 0, grid.width());
                y = keepWithin(75 - Math.sin(phi) * r, 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });
                
                // Set slider position
                y = 150 - (hsb.b / (100 / grid.height()));
                if( hex === '' ) y = 0;
                sliderPicker.css('top', y + 'px');
                
                // Update panel color
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
                break;
            
            case 'saturation':
                // Set grid position
                x = keepWithin((5 * hsb.h) / 12, 0, 150);
                y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });             
                
                // Set slider position
                y = keepWithin(slider.height() - (hsb.s * (slider.height() / 100)), 0, slider.height());
                sliderPicker.css('top', y + 'px');
                
                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: hsb.b }));
                minicolors.find('.minicolors-grid-inner').css('opacity', hsb.s / 100);
                
                break;
            
            case 'brightness':
                // Set grid position
                x = keepWithin((5 * hsb.h) / 12, 0, 150);
                y = keepWithin(grid.height() - Math.ceil(hsb.s / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });             
                
                // Set slider position
                y = keepWithin(slider.height() - (hsb.b * (slider.height() / 100)), 0, slider.height());
                sliderPicker.css('top', y + 'px');
                
                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
                minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (hsb.b / 100));
                break;
            
            default:
                // Set grid position
                x = keepWithin(Math.ceil(hsb.s / (100 / grid.width())), 0, grid.width());
                y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });
                
                // Set slider position
                y = keepWithin(slider.height() - (hsb.h / (360 / slider.height())), 0, slider.height());
                sliderPicker.css('top', y + 'px');
                
                // Update panel color
                grid.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: 100 }));
                break;
                
        }
        
    }
    
    // Generates an RGB(A) object based on the input's value
    function rgbObject(input) {
        var hex = parseHex($(input).val(), true),
            rgb = hex2rgb(hex),
            opacity = $(input).attr('data-opacity');
        if( !rgb ) return null;
        if( opacity !== undefined ) $.extend(rgb, { a: parseFloat(opacity) });
        return rgb;
    }
    
    // Genearates an RGB(A) string based on the input's value
    function rgbString(input, alpha) {
        var hex = parseHex($(input).val(), true),
            rgb = hex2rgb(hex),
            opacity = $(input).attr('data-opacity');
        if( !rgb ) return null;
        if( opacity === undefined ) opacity = 1;
        if( alpha ) {
            return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat(opacity) + ')';
        } else {
            return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        }
    }
    
    // Converts to the letter case specified in settings
    function convertCase(string, letterCase) {
        return letterCase === 'uppercase' ? string.toUpperCase() : string.toLowerCase();
    }
    
    // Parses a string and returns a valid hex string when possible
    function parseHex(string, expand) {
        string = string.replace(/[^A-F0-9]/ig, '');
        if( string.length !== 3 && string.length !== 6 ) return '';
        if( string.length === 3 && expand ) {
            string = string[0] + string[0] + string[1] + string[1] + string[2] + string[2];
        }
        return '#' + string;
    }
    
    // Keeps value within min and max
    function keepWithin(value, min, max) {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }
    
    // Converts an HSB object to an RGB object
    function hsb2rgb(hsb) {
        var rgb = {};
        var h = Math.round(hsb.h);
        var s = Math.round(hsb.s * 255 / 100);
        var v = Math.round(hsb.b * 255 / 100);
        if(s === 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if( h === 360 ) h = 0;
            if( h < 60 ) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
            else if( h < 120 ) {rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
            else if( h < 180 ) {rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
            else if( h < 240 ) {rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
            else if( h < 300 ) {rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
            else if( h < 360 ) {rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
            else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
        }
        return {
            r: Math.round(rgb.r),
            g: Math.round(rgb.g),
            b: Math.round(rgb.b)
        };
    }
    
    // Converts an RGB object to a hex string
    function rgb2hex(rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        $.each(hex, function(nr, val) {
            if (val.length === 1) hex[nr] = '0' + val;
        });
        return '#' + hex.join('');
    }
    
    // Converts an HSB object to a hex string
    function hsb2hex(hsb) {
        return rgb2hex(hsb2rgb(hsb));
    }
    
    // Converts a hex string to an HSB object
    function hex2hsb(hex) {
        var hsb = rgb2hsb(hex2rgb(hex));
        if( hsb.s === 0 ) hsb.h = 360;
        return hsb;
    }
    
    // Converts an RGB object to an HSB object
    function rgb2hsb(rgb) {
        var hsb = { h: 0, s: 0, b: 0 };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max !== 0 ? 255 * delta / max : 0;
        if( hsb.s !== 0 ) {
            if( rgb.r === max ) {
                hsb.h = (rgb.g - rgb.b) / delta;
            } else if( rgb.g === max ) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            } else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        } else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if( hsb.h < 0 ) {
            hsb.h += 360;
        }
        hsb.s *= 100/255;
        hsb.b *= 100/255;
        return hsb;
    }
    
    // Converts a hex string to an RGB object
    function hex2rgb(hex) {
        hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {
            r: hex >> 16,
            g: (hex & 0x00FF00) >> 8,
            b: (hex & 0x0000FF)
        };
    }
    
    // Handle events
    $(document)
        // Hide on clicks outside of the control
        .on('mousedown.minicolors touchstart.minicolors', function(event) {
            if( !$(event.target).parents().add(event.target).hasClass('minicolors') ) {
                hide();
            }
        })
        // Start moving
        .on('mousedown.minicolors touchstart.minicolors', '.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider', function(event) {
            var target = $(this);
            event.preventDefault();
            $(document).data('minicolors-target', target);
            move(target, event, true);
        })
        // Move pickers
        .on('mousemove.minicolors touchmove.minicolors', function(event) {
            var target = $(document).data('minicolors-target');
            if( target ) move(target, event);
        })
        // Stop moving
        .on('mouseup.minicolors touchend.minicolors', function() {
            $(this).removeData('minicolors-target');
        })
        // Toggle panel when swatch is clicked
        .on('mousedown.minicolors touchstart.minicolors', '.minicolors-swatch', function(event) {
            var input = $(this).parent().find('.minicolors-input'),
                minicolors = input.parent();
            if( minicolors.hasClass('minicolors-focus') ) {
                hide(input);
            } else {
                show(input);
            }
        })
        // Show on focus
        .on('focus.minicolors', '.minicolors-input', function(event) {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            show(input);
        })
        // Fix hex and hide on blur
        .on('blur.minicolors', '.minicolors-input', function(event) {
            var input = $(this),
                settings = input.data('minicolors-settings');
            if( !input.data('minicolors-initialized') ) return;
            
            // Parse Hex
            input.val(parseHex(input.val(), true));
            
            // Is it blank?
            if( input.val() === '' ) input.val(parseHex(settings.defaultValue, true));
            
            // Adjust case
            input.val( convertCase(input.val(), settings.letterCase) );
            
            hide(input);
        })
        // Handle keypresses
        .on('keydown.minicolors', '.minicolors-input', function(event) {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            switch(event.keyCode) {
                case 9: // tab
                    hide();
                    break;
                case 27: // esc
                    hide();
                    input.blur();
                    break;
            }
        })
        // Update on keyup
        .on('keyup.minicolors', '.minicolors-input', function(event) {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            updateFromInput(input, true);
        })
        // Update on paste
        .on('paste.minicolors', '.minicolors-input', function(event) {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            setTimeout( function() {
                updateFromInput(input, true);
            }, 1);
        });
    
})(jQuery);

/*--------------------------------------------
 *   miniColors init
 *--------------------------------------------*/

jQuery(function($) {
    
    $("#feature_color").minicolors({
        control: 'hue',
        position: 'top',
        swatchPosition: 'right',
        theme: 'none',
        change: function(hex, opacity) {
            text = hex ? hex : 'transparent';
            update_feature_color(text);
        }
    });
    
    $("#lc_link_color").minicolors({
        control: 'hue',
        position: 'top',
        swatchPosition: 'right',
        theme: 'none',
        change: function(hex, opacity) {
            text = hex ? hex : 'transparent';
            update_link_color(text);
        }
    });
    
    $("#lc_link_hover_color").minicolors({
        control: 'hue',
        position: 'top',
        swatchPosition: 'right',
        theme: 'none',
        change: function(hex, opacity) {
            text = hex ? hex : 'transparent';
            update_link_hover_color(text);
        }
    });
    

/*--------------------------------------------
 *   live customizer
 *--------------------------------------------*/
    
    var $body  = $("body");
    var $panel = $("#live_customizer");
    
    // left column (demos)
    var $demos = $panel.find(".lc_theme_switcher");
    // right panel (options)
    var $style_panel = $panel.find(".lc_style_options");
    
    // --- toggle button ------------------------------------------
    
    var $toggle_btn     = $panel.find("a.lc_toggle_btn");
    
    $toggle_btn.bind("click", function(event){
        event.preventDefault();
        $panel.removeClass("half_view").toggleClass("collapsed");
    });
    
    // --- controls in right column -------------------------------
    
    var $layout_btns    = $style_panel.find(".lc_layout a");
    var $pattern_btns   = $style_panel.find(".lc_patterns a");
    var $bg_image_btns  = $style_panel.find(".lc_bg_images a");
    var $feature_color_btns = $style_panel.find(".lc_feature_colors a");
    
    
    if($body.hasClass("boxed")){
        $layout_btns.removeClass("actived");
        $layout_btns.filter('[data-layout="boxed"]').addClass("actived");
    }
    
    $layout_btns.bind("click", function(event){
        event.preventDefault();
        var $this = $(this);
        $this.siblings().removeClass("actived");
        $this.addClass("actived");
        
        $(window).trigger("resize");
        
        if($this.data("layout") == "boxed"){
            $body.addClass("boxed");
            $body.css('background-repeat', 'repeat');
        }else{
            $body.removeClass("boxed");
        }
    });
    
    
    
    $pattern_btns.bind("click", function(event){
        event.preventDefault();
        var $this = $(this);
        
        if(!$body.hasClass("boxed")) $layout_btns.trigger("click");
        
        $this.siblings().removeClass("actived");
        $this.addClass("actived");
        
        $body.css({ "background" : $this.css("background-image"),
                    "background-repeat" : "repeat" });
    });
    
    //$pattern_btns.eq(0).trigger("click");
    
    
    
    $feature_color_btns.bind("click", function(event){
        event.preventDefault();
        var $this = $(this);
        $this.siblings().removeClass("actived");
        $this.addClass("actived");
        
        var fcolor = $this.data("color");
        $("#feature_color").minicolors("value", fcolor);
        update_feature_color(fcolor);
    });
    
    
    // --------------- color functions ---------------------------------------
    
    function getRandomHexColor(){
        
        var red   = num2hex(randomNumber(225) );
        var green = num2hex(randomNumber(205) );
        var blue  = num2hex(randomNumber(185) );
        
        return "#" + red + green + blue;
    }
    
    function randomNumber(num) {          
        return Math.floor(Math.random() * num);
    }  
    
    function num2hex(num) {
        if (num == null) return "00";
        num = num.length < 2 ? "0" + num : num
        return num.toString(16);
    }   
    
    function changeBtnColor(){
        $toggle_btn.css("background-color" , getRandomHexColor());
    }
    
    
    setInterval(changeBtnColor, 2000);
    changeBtnColor();
    
    // ----------------------------------------------------------------------------
    
    function update_feature_color(color){
        
        var css = 'aside .widget_nav_menu ul li.current-menu-item { border-left: 2px solid ' + color + '; }\
            .widget-testimonial .testimonial-author a,.subfooter .widget-testimonial .testimonial-author a,aside.sidebar .widget-container a:hover ,\
            .cell-date span ,\
            .socials a:hover ,\
            .widget-tabs .tabs > li a:hover,\
            .widget-tabs .tabs > li.active a ,\
            .widget-staff figcaption p.staff-spes ,\
            .widget-staff figcaption .socials a:hover ,\
            .widget-column section > span, .widget-column .col > span ,\
            .widget-folio.caption-over .imgHolder em h4 ,\
            .tweet a:hover ,.tweet .avatar .icon-twitter:hover ,\
            .single-info ul:first-child a ,\
            .type-staff.hentry .entry-header .entry-title2 ,\
            .single-product .single-info .meta-product li .current-price ,\
            .widget-blog .entry-title a:hover, \
            .list-post .entry-title a:hover, \
            .widget_recent_blog .entry-title a:hover,\
            .widget-folio .fig-title a:hover ,\
            .widget-staff figcaption .item-title a:hover ,\
            .entry-related .fig-title a:hover ,\
            #author-description dt a:hover ,\
            .widget-product figcaption .item-title a:hover ,\
            .list-news #primary .entry-title a:hover, .single-news #primary .entry-title a:hover,\
            #axi_breadcrumbs a:hover ,\
            .subfooter a:hover, .subfooter .entry-title a:hover { color: ' + color + '; }';
        
        css += 'aside .widget_testimonial .testimonial-author a,\
                .subfooter .widget_testimonial .testimonial-author a,\
                .subfooter .tweet .mt_user:hover { color: ' + color + ' !important; }';
        
        css += 'a.more, button.more,a.linkblock:hover, .dropcap.square, .dropcap.circle,\
                .cell-date em ,\
                .axi_paginate_nav a.page-numbers:hover ,\
                .entry-meta .readmore .cell-comment, .entry-meta .readmore .entry-tax a[rel="category"], .entry-tax .entry-meta .readmore a[rel="category"] ,\
                .callout a.featured_btn, .stunning a.featured_btn ,\
                .widget-blog .post-format:hover, .list-post .post-format:hover, \
                .widget_recent_blog .post-format:hover,\
                .widget-faq section.active dt i ,\
                .widget-chart .widget-inner div div ,\
                .axi_paginate_nav .current ,\
                .callout a.featured_btn { background-color: ' + color + ' ; }';
                
        css += '::selection ,\
                ::-moz-selection { background-color: ' + color + ' ; }\
                #single-product-carousel .slides > li.flex-active-slide,\
                .widget-tabs .tabs > li.active a { border-top-color: ' + color + ' ; }\
                .widget-staff figure:hover .imgHolder { border-bottom-color: ' + color + '; }\
                .callout a.featured_btn:hover, .stunning a.featured_btn:hover { background-color: ' + color + '; }';
                
        css += '.sf-menu li.current-menu-ancestor > a, .sf-menu li.current-menu-parent > a, .sf-menu li.current_page_item > a, .sf-menu li.current-menu-item > a, .sf-menu > li > a:hover, .sf-menu > li.sfHover,\
                .sf-menu > li.sfHover > a { border-bottom-color: ' + color + ' ; }';
        
        
        var $stylesheet = $("#lc_feature_style");
        if(!$stylesheet.length) {
            $("head").append("<style id='lc_feature_style'></style>");
            $stylesheet = $("#lc_feature_style");
        }
        
        $stylesheet.text(css);
    }
    
    
    function update_link_color(color){
        css = 'a { color: ' + color + ' ; } .entry-meta .readmore a.linkblock { background-color: ' + color + ' ; }';
        
        var $stylesheet = $("#lc_link_style");
        if(!$stylesheet.length) {
            $("head").append("<style id='lc_link_style'></style>");
            $stylesheet = $("#lc_link_style");
        }
        
        $stylesheet.text(css);
    }
    

    function update_link_hover_color(color){
        css = 'a:hover { color: ' + color + ' ; } a.cell-comment:hover, .entry-tax a[rel="category"]:hover, .entry-meta .readmore a.linkblock:hover {background-color: ' + color + ' ; }';
        
        var $stylesheet = $("#lc_link_hover_style");
        if(!$stylesheet.length) {
            $("head").append("<style id='lc_link_hover_style'></style>");
            $stylesheet = $("#lc_link_hover_style");
        }
        
        $stylesheet.text(css);
    }
    
    
    
    
    

});





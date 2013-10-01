/*
* jqFastreeview 0.1 - jQuery plugin to hide and show branches of a tree
* @author Matthieu Bonnard
* Released under the GPLv2
*/

!(function ($) {
    "use strict";
    $.extend({
        fastreeview : new function (options) {
            var ft = this;
            ft.version = "0.0.1";
            ft.defaults = {
                cssClass : "fastreeview",
                cssClassClose : "expandable",
                cssClassOpen : "collapsable",
                initialShow : false
            };
            ft.options = {};
            
                        
            function showTreeviewElm(jqElm, options) {
                var $this = $(jqElm);
                if ($this.children('ul').is(':visible')) {
                    $this.children('ul').toggle(false);
                    $this.removeClass(options.cssClassOpen).addClass(options.cssClassClose);
                } else {
                    $this.children('ul').toggle(true);
                    $this.removeClass(options.cssClassClose).addClass(options.cssClassOpen);
                }
            }
            
            function classTreeview(jqParentElm, options) {
                var $this = $(jqParentElm);
                var obj = jqParentElm;
                var $kids = $this.children('li');
                
                $kids.each(function (index) {
                    //Déclaration des variables
                    var $thisKids = $(this);
                    var objKids = this;
                    //Ajout classe css derniers éléments 
                    if (index === $kids.length - 1) {
                        $thisKids.addClass('last');
                    }
                    if ($thisKids.has('ul').length) {
                        //recusif
                        classTreeview($thisKids.children('ul'), options);
                        $thisKids.prepend("<span class='hitarea'></span>");
                        $thisKids.children('ul').toggle(options.initialShow);
                        if (options.initialShow) {
                            $thisKids.addClass(options.cssClassOpen);
                        } else {
                            $thisKids.addClass(options.cssClassClose);
                        }
                        $thisKids.children("span.hitarea").click(function () { showTreeviewElm(objKids, options); });
                    }
                });
            }
                        
            //Constructeur
            ft.construct = function (settings) {
                
                return this.each(function () {
                    //Déclaration des variables
                    var $this = $(this), obj = this;
                    var options =  $.extend(true, ft.options, ft.defaults, settings);
                    $this.addClass(options.cssClass);
                    classTreeview(obj, options);
                });
            };
            
        }()
    });
    // make shortcut
	var ft = $.fastreeview;

	// extend plugin scope
	$.fn.extend({
		fastreeview: ft.construct
	});
})(jQuery);
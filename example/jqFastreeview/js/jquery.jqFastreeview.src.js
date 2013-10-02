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
            ft.version = "0.1";
            ft.defaults = {
                cssClass : "fastreeview",
                initialShow : false,
                openId:[]
            };
            ft.options = {};
            
                        
            function showTreeviewElm(jqElm, options) {
                var $this = $(jqElm);
                if ($this.children('ul').is(':visible')) {
                    $this.children('ul').toggle(false);
                    $this.removeClass(CLASSES.collapsable).addClass(CLASSES.expandable);
                } else {
                    $this.children('ul').toggle(true);
                    $this.removeClass(CLASSES.expandable).addClass(CLASSES.collapsable);
                }
            }
            
            function findChildrenId(jqParentElm, options) {
                var $this = $(jqParentElm);
                var obj = jqParentElm;
                for(var i=0;i<options.openId.length;i++) {
                    if($this.has('#'+options.openId[i]).length) {
                       return true;
                    }
                }
                return false;
            }
            
            function classTreeview(jqParentElm, options) {
                var $this = $(jqParentElm);
                var obj = jqParentElm;
                var $kids = $this.children('li');
                
                $kids.each(function (index) {
                    //Declare variable
                    var $thisKids = $(this);
                    var objKids = this;
                    //Add css class to last element
                    if (index === $kids.length - 1) {
                        $thisKids.addClass(CLASSES.last);
                    }
                    if ($thisKids.has('ul').length) {
                        //recusif
                        classTreeview($thisKids.children('ul'), options);
                        $thisKids.prepend("<span class='"+CLASSES.hitarea+"'></span>");
                        //Initialize the view of tree
                        $thisKids.children('ul').toggle(options.initialShow);
                        if (options.initialShow) {
                            $thisKids.addClass(CLASSES.collapsable);
                        } else {
                            $thisKids.addClass(CLASSES.expandable);
                        }
                        //Open element if Id Match
                        if(findChildrenId($thisKids.children('ul'), options)) {
                            $thisKids.children('ul').toggle(true);
                            $thisKids.addClass(CLASSES.collapsable);
                        }
                        
                        $thisKids.children("span."+CLASSES.hitarea).click(function () { showTreeviewElm(objKids, options); });
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
    
    // Variable name CSS class
    var CLASSES = ({
        expandable: "expandable",
        collapsable: "collapsable",
        last: "last",
        hitarea: "hitarea"
    });
    
    // make shortcut
	var ft = $.fastreeview;

	// extend plugin scope
	$.fn.extend({
		fastreeview: ft.construct
	});
})(jQuery);
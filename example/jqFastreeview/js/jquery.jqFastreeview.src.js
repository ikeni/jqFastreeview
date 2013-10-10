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
                debug : false,
                cssClass : "fastreeview",
                initialShow : false,
                openId: [],
                ajaxUrl: "",
                ajaxSuccess: "",
                ajaxError: ""
            };
            ft.options = {};
            
            /* benchmark */
			function benchmark(text, time) {
				console.log(text + " (" + (new Date().getTime() - time.getTime()) + "ms)");
			}
                        
            function showTreeviewElm(jqElm, options) {
                var $this = $(jqElm);
                //ajax call
                if (options.ajaxUrl !== "" && $this.children('ul').children('li').length === 0) {
                    $.ajax({
                        url : options.ajaxUrl,
                        dataType : "html",
                        success : function (data, response, xhr) {
                            $this.children('ul').html(data);
                            $this.trigger("updateTreeview");
                            options.ajaxSuccess();
                        },
                        error : function (data, response, xhr) {
                            options.ajaxError();
                        }
                    });
                }
                
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
                for (var i = 0; i < options.openId.length; i++) {
                    if ($this.is('#' + options.openId[i])) {
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
                        //recusive
                        classTreeview($thisKids.children('ul'), options);
                        if ($thisKids.has(" > span." + CLASSES.hitarea).length === 0) {
                            $thisKids.prepend("<span class='" + CLASSES.hitarea + "'></span>");
                            //Initialize the view of tree
                            if($thisKids.children('ul').children('li').length !== 0) {
                                $thisKids.children('ul').toggle(options.initialShow);
                                if (options.initialShow) {
                                    $thisKids.addClass(CLASSES.collapsable);
                                } else {
                                    $thisKids.addClass(CLASSES.expandable);
                                }
                                //Open element if Id Match
                                if (findChildrenId($thisKids.children('ul').children('li'), options)) {
                                    $thisKids.children('ul').toggle(true);
                                    $thisKids.removeClass(CLASSES.expandable).addClass(CLASSES.collapsable);
                                }
                            } else {
                                $thisKids.children('ul').toggle(false);
                                $thisKids.addClass(CLASSES.expandable);
                            }
                            $thisKids.children("span." + CLASSES.hitarea).click(function () { showTreeviewElm(objKids, options); });
                        }
                    }
                });
            }
            
                        
            function bindEvent(jqElm, options) {
                var $this = $(jqElm);
                $this.bind("updateTreeview", function () {
                    classTreeview(jqElm, options);
                });
            }
                        
            //Constructeur
            ft.construct = function (settings) {
                
                return this.each(function () {
                    //Declare variable
                    var $this = $(this), obj = this;
                    var time;
                    var options =  $.extend(true, ft.options, ft.defaults, settings);
                    if(options.debug) {
                        time = new Date();
                    }
                    $this.addClass(options.cssClass);
                    classTreeview(obj, options);
                    bindEvent(obj, options);
                    if(options.debug) {
                        benchmark("Built complete :", time);
                    }
                });
            };
            
        }()
    });
    
    // Variable name CSS class - Modify here if you want to change the class name of elements
    var CLASSES = ({
        expandable : "expandable",
        collapsable : "collapsable",
        last : "last",
        hitarea : "hitarea"
    });
    
    // make shortcut
	var ft = $.fastreeview;

	// extend plugin scope
	$.fn.extend({
		fastreeview: ft.construct
	});
})(jQuery);
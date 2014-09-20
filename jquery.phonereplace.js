/*
 * jQuery PhoneReplace Plugin
 * Version: 1.0 (20/09/2014)
 * Repository: https://github.com/Neolot/jQuery.PhoneReplace
 * License: MIT, http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2011-2014 Yury Pokhylko aka Neolot
 * Author URI: http://neolot.com
 */

(function ($) {
    $.fn.phonereplace = function (options) {
        var settings = $.extend({
          'utm_campaigns': '',
          'replace': ''
        }, options);

        var get_utm_campaign = function(tag) {
            tag = tag.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + tag + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        var get_cmp = function (cookie_name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			var params_data = matches ? decodeURIComponent(matches[1]) : undefined;
			if ( params_data ) {
				var params_arr = params_data.split('|');
				return params_arr[3].replace('cmp=', '');
			} else {
				return undefined;
			}
		}
		var set_replace = function(selector, campaign, settings) {
			var campaigns_list = settings.utm_campaigns.split(',');
            var search = $.inArray(campaign, campaigns_list);
            if ( search != -1 ) {
                selector.html(settings.replace);
            }
		}

        var utm_campaign = get_utm_campaign('utm_campaign');
        var cmp = get_cmp('sbjs_first');

		if ( cmp ) {
	        set_replace(this, cmp, settings);
    	} else if ( utm_campaign ) {
	        set_replace(this, utm_campaign, settings);   
        }
    };
})(jQuery)

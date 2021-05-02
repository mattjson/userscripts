// ==UserScript==
// @name         Trello Filter: Hide Empty Lists
// @namespace    http://trello.com/
// @version      1.0
// @description  When using Trello's card filter feature, this script will show only lists where the filter matches at least one card. All other lists will be hidden.
// @author       Mattias Jonsson
// @match        https://trello.com/b/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    console.log({
        'loading': 'Tampermonkey Script',
        'name': GM_info.script.name,
        'description': GM_info.script.description
    });
    var $ = window.jQuery;
    window.setInterval( function() {
        var isFiltered = $('.mod-filter-indicator:not(.hide)').length > 0;
        if ( !isFiltered && window.trelloIsFiltered === false ) {
            // Not currently filtered, and not filtered last time: All lists are already shown
            // Note: End here for performance reason
            return;
        }
        $('.js-list.list-wrapper').each( function() {
            // Each list wrapper: Show or hide depending on card filtering
            if ( isFiltered ) {
                // Using card filter: Show list wrapper only if 1+ non-hidden card
                $(this).toggle($(this).find('.list-card:not(.hide)').length > 0);
            } else {
                // No card filter: Show this list wrapper
                $(this).show();
            }
        });
        window.trelloIsFiltered = isFiltered;
    }, 100 );
}, false);

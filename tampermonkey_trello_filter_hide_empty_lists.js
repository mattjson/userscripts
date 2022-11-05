// ==UserScript==
// @name         Trello Filter: Hide Empty Lists
// @namespace    https://trello.com/
// @version      1.0
// @description  When using Trello's card filter feature, this script will show only lists where the filter matches at least one card. All other lists will be hidden.
// @author       Mattias Jonsson
// @match        *://trello.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
window.addEventListener('load', function() {
    console.log({
        'loading': 'Tampermonkey Script',
        'name': GM_info.script.name,
        'description': GM_info.script.description
    });
    var $ = window.jQuery;

    window.setInterval( function() {
        var isFiltered = $('.js-brita-board-filter-btn-container button span[aria-label="CloseIcon"]').length > 0;

        // Turn off the comment-record-button's animation
        $('div.js-comment-record-button a').css('animation', 'none');

        // Remove "smart links" that change link text to title from the target
        $('a.atlaskit-smart-link').each( function() {
            var link = $(this);
            link.removeClass('atlaskit-smart-link');
            link.empty();
            link.text(link.prop('href'));
        });

        // Filtering?
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
})();

/**
* Implementation of the bot content to power the Tuomiokirkko Kello twitter bot.
* See: https://twitter.com/tuomiokirkko
*
*
* Copyright (c) 2016, Konrad Markus <konker@luxvelocitas.com>
*
* Permission to use, copy, modify, and/or distribute this software for any
* purpose with or without fee is hereby granted, provided that the above
* copyright notice and this permission notice appear in all copies.
*
* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
* OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
* CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/


var moment = require('moment-timezone');

// Timezone you want the content to be in
var TZ = 'Europe/Helsinki';

var START = 'BONGI';
var MIDDLE = ' BONGI';
var END = ' BONGILAINEN!';


exports.content = function(event) {
    var ret = '';

    // Get the hour as a number [1,12]
    var date = moment().tz(TZ);
    var hour = date.get('h');
    if (hour > 12) {
        hour -= 12;
    }

    // Compose the correct number of 'BONGs'
    ret += START;
    if (ret == 1) {
        return ret;
    }
    if (ret == 2) {
        ret += MIDDLE;
        return ret;
    }
    for (var i=1; i<hour-1; i++) {
        ret += MIDDLE;
    }
    ret += END;

    return ret;
};



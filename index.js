/**
* AWS Lambda function which gets triggered every hour, on the hour,
* to power the Tuomiokirkko Kello twitter bot.
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

console.log('Loading function');

var Twitter = require('twitter');
var bot = require('./bongi-bot')
var config = require('./config.json');

// Whether to use 'test' or 'production' config profile
var MODE='production';


// When invoked, get the content and tweet it
exports.handler = function(event, context) {
    var content = bot.content(event);
    console.log(content);

    var client = new Twitter(config[MODE]);
    client.post(
        'statuses/update',
         { status: content },
         function(error, tweet, response) {
            if (error) {
                console.log(error);
                context.fail(JSON.stringify(error));
            }
            context.succeed('TWEETED OK');
        }
    );
};


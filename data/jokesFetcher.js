'use strict';

/**
 * Command line script that generates a csv file that contains jokes about Chuck Norris using the
 * wonderful http://api.icndb.com/jokes APIs
 *
 * Usage:
 *
 *   node jokesFetcher.js [destFile]
 *
 *   destFile is optional and it will default to "jokes.csv"
 *
 * @author Luciano Mammino <lucianomammino@gmail.com>
 */

var path = require('path');
var fs = require('fs');
var request = require('request');
var Async = require('async');
var csvStringify = require('csv-stringify');
var ProgressBar = require('progress');

var outputFile = process.argv[2] ||  path.resolve(__dirname, 'jokes.csv');

// executes an API request to count all the available jokes
request('http://api.icndb.com/jokes/count', function(error, response, body) {

    if (!error && response.statusCode === 200) {

        var count = JSON.parse(body).value;
        var savedJokes = 0;
        var index = 0;
        var bar = new ProgressBar(':bar :current/:total', { total: count });

        // The idea from now on is to iterate through all the possible jokes starting from the index 1 until we can
        // find all the available ones. There might be holes in the sequence, so we might want to issue all the request
        // sequentially and count the successful requests until we get the total amount of jokes.
        // We are going to use the function Async.whilst so we need to define 3 functions: test, task and onComplete


        // Tests whether to stop fetching jokes. It gets called before starting a new iteration
        var test = function() {
            return savedJokes < count;
        };

        // The task executed at every iteration. Basically fetches a new joke and appends it to the CSV file.
        var task = function(cb){
            request('http://api.icndb.com/jokes/' + (++index) + '?escape=javascript', function(err, response, body) {

                // handle possible request errors by stopping the whole process
                if (err || response.statusCode !== 200) {
                    console.log(index, error, response.statusCode);

                    return cb(error || response.statusCode);
                }

                // invalid ids generates an invalid JSON response (basically an HTML output), so we can
                // check for it by detecting JSON parse errors and skip the id by calling the callback completion
                // function for the current iteration
                try {
                    var result = JSON.parse(body).value;
                } catch (ex) {
                    return cb(null);
                }

                // the record is valid so we just need to append the CSV record to our output file and increase our
                // saved jokes count
                csvStringify([[result.id, result.joke]], function(err, output) {

                    if (err) {
                       return cb(err);
                    }

                    fs.appendFileSync(outputFile, output);
                    ++savedJokes;

                    bar.tick();

                    return cb(null);
                });

            });
        };

        // On completion we just need to show errors in case we had any
        var onComplete = function(err){

            if (err) {
                console.log('Error: ', err);
                process.exit(1);
            }

        };

        // triggers the asynchronous iteration using the previously defined test, task and onComplete functions
        return Async.whilst (test, task, onComplete);
    }

    console.log('Error: impossible to count the total number of jokes');
    process.exit(1);
});



var ffmpeg = require('fluent-ffmpeg');
var util = require('util');
moment = require('moment');

var scr_cap_dest = '/home/sangram/Videos/source/screenshots/';
var serverpath = '/home/sangram/Videos/source/VID-20160607-WA0067.mp4';
var currentdate = moment().format('YYYYMMDD');


module.exports = {
    VideoScreenCapture: function () {
        ffmpeg(serverpath).screenshots({
            count: 5, //number of thumbnail want to generate
            folder: scr_cap_dest,
            filename: currentdate + '_thumbnail.png',
            size: '320x240'
        }).on('end', function () {
        });
    },

    ExtractVideoInformation: function () {
        ffmpeg.ffprobe(serverpath, function (err, metadata) {
            console.log(metadata);
        });
    },
    MergeVideo: function () {
        var firstFile = "title.mp4";
        var secondFile = "source.mp4";
        var thirdFile = "third.mov";
        var outPath = "out.mp4";

        var proc = ffmpeg(firstFile)
            .input(secondFile)
            .input(thirdFile)
            .on('end', function () {
                console.log('files have been merged succesfully');
            })
            .on('error', function (err) {
                console.log('an error happened: ' + err.message);
            })
            .mergeToFile(outPath);
    },
    Convert() {
        new ffmpeg({ source:serverpath })
            .withVideoCodec('libx264')
            .withAudioCodec('libmp3lame')
            .withSize('320x240')
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('end', function () {
                console.log('Processing finished !');
            })
            .saveToFile(scr_cap_dest + 'output.avi');
    }


};


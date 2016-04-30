var AWS = require('aws-sdk'),
    BPromise = require('bluebird'),
    moment = require('moment'),
    pingdaConfig = 's3://YOURBUCKET/YOURPATH';

exports.handler = function (event, context) {
    // Always initialize aws before using
    AWS.config.update({region: 'us-east-1'});
    // Not supported by lambda yet AWS.config.setPromisesDependency(require('bluebird'));

    this.fetchConfig().then(function (config) {
            context.succeed("Got " + JSON.stringify(config));
        }
        )
        .catch(function (err) {
            console.log("Failed to execute ping, error was :" + JSON.stringify(err));
            context.fail(err);
        });
};

exports.fetchConfig = function () {
    return new BPromise(function (resolve, reject) {
        s3 = new AWS.S3();
        var splitIdx = pingdaConfig.indexOf('/', 6);

        if (!pingdaConfig || pingdaConfig.indexOf("s3://") !== 0 || splitIdx === -1) {
            reject(Error("Invalid pingda config location " + pingdaConfig));
        }
        else {
            // Start with provided metadata, add needed stuff
            var metadata = {
                Key:pingdaConfig.substring(splitIdx + 1),
                Bucket:pingdaConfig.substring(5, splitIdx)
            };

            s3.getObject(metadata, function (err, data) {
                if (!!err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        }
    });
};

exports.pingURL = function (url) {
    return new BPromise(function (resolve, reject) {
        console.log("Pinging " + url);
        reject(Error("implement"));
    });
};


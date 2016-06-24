tuomiokirkko-serverless
------------------------------------------------------------------------------

A nodejs twitter bot running on the AWS Lambda platform.

Used to power the Tuomiokirkon Kello twitter account:

[https://twitter.com/tuomiokirkko](https://twitter.com/tuomiokirkko)

This bot is designed to be invoked periodically as a target for an AWS Cloudwatch event.


## Configuring
1) Make a copy of config.example.json and name it config.json

2) Edit config.json and fill in your AWS credentials

[http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)

NOTE: There are two profiles available in the example config.json, "test" and "production".
The one that is used is governed by the var named "MODE" in _index.js_. If you only intend to use one profle, the other one can be left as it is, or removed altogether.

## Building
Install dependencies via npm:

    $ npm install

Create zip for upload to AWS Lambda:

    $ ./build.sh
    ...
    adding: node_modules/tweetnacl/nacl.min.js (deflated 65%)
    adding: node_modules/tweetnacl/nacl-fast.js (deflated 78%)
    ----------------------------
    Created TuomiokirkonKello.zip

NOTE: A convenience script, build.sh is provided, but basically you need to create a zip file
with the javascript and config files. Make sure to also include the node_modules directory in the zip file.


## Deploying (Briefly)
*DISCLAIMER: Follow the instructions here at your own risk!*

### Prerequisites
There are several steps required to deploy the code to AWS Lambda. The following assume that you:

- Have an AWS account with Lambda enabled.

- Have successfully set up the aws command line interface.
[http://docs.aws.amazon.com/cli/latest/userguide/installing.html](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)

- You have your 12-digit AWS account ID.
[http://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html](http://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html)


### Example from Documentation
[http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/RunLambdaSchedule.html](http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/RunLambdaSchedule.html)


### Deploying
The following description assumes that:

- You have followed the build instructions and created a file named TuomiokirkonKello.zip
- Your AWS account ID is: 123456789000
- Your function will be named: "MyFunction"

1) Create a Lambda function named "MyFunction" following the _Example from Documentation_ (above), and upload TuomiokirkonKello.zip as the code for the function.

2) Create a Cloudwatch event rule. Convenience scripts are provided for the creation of two example rules: EveryFiveMins, and OnTheHour.

    scripts/add-cloud-watch-rule-EveryFiveMins.sh
    scripts/add-cloud-watch-rule-OnTheHour.sh

3) Add permissions for your function to use the desired rule, e.g.

    $ ./scripts/add-cloud-watch-permissions.sh 123456789000 MyFunction OnTheHour

3) Create a trigger for your rule to invoke your function, e.g.

    ./scripts/add-cloud-watch-trigger.sh 123456789000 MyFunction OnTheHour

### Disabling
Should you want to disable the event, you can remove the trigger:

1) Find the id of the trigger you want to remove:

    $ ./scripts/remove-cloud-watch-trigger.sh OnTheHour

2) Remove the trigger, assumes you have a trigger with Id=1:

    $ ./scripts/remove-cloud-watch-trigger.sh OnTheHour 1



#!/bin/bash

aws events put-rule \
    --schedule-expression 'cron(0 * * * ? *)' \
    --name OnTheHour


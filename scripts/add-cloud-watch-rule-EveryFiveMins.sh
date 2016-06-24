#!/bin/bash

aws events put-rule \
    --schedule-expression 'rate(5 minutes)' \
    --name EveryFiveMins


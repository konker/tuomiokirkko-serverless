#!/bin/bash

USAGE="$0 <rule_name> [<id>]"

REGION="eu-central-1"
RULE_NAME="OnTheHour"

RULE_NAME=$1
if [[ -z "$RULE_NAME" ]]; then
    echo $USAGE
    exit 1
fi

TARGET_ID=$2
if [[ -z "$TARGET_ID" ]]; then
    echo "No id specified, listing targets..."
    aws events list-targets-by-rule \
        --rule "${RULE_NAME}"
else
    aws events remove-targets \
        --rule "${RULE_NAME}" \
        --ids "${TARGET_ID}"
fi

#!/bin/bash

USAGE="$0 <aws_id> <lambda_function_name> <rule_name>"

REGION="eu-central-1"

AWS_ID=$1
if [[ -z "$AWS_ID" ]]; then
    echo $USAGE
    exit 1
fi

FUNC_NAME=$2
if [[ -z "$FUNC_NAME" ]]; then
    echo $USAGE
    exit 1
fi

RULE_NAME=$3
if [[ -z "$RULE_NAME" ]]; then
    echo $USAGE
    exit 1
fi

ARN="arn:aws:lambda:${REGION}:${AWS_ID}:function:${FUNC_NAME}"

aws events put-targets \
    --rule ${RULE_NAME} \
    --targets "{\"Id\":\"1\", \"Arn\":\"${ARN}\" }"



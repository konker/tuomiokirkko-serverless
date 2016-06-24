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

STATEMENT_ID="Allow-${RULE_NAME}-Events"

aws lambda add-permission \
    --function-name $FUNC_NAME \
    --statement-id $STATEMENT_ID \
    --action 'lambda:InvokeFunction' \
    --principal events.amazonaws.com \
    --source-arn arn:aws:events:${REGION}:${AWS_ID}:rule/${RULE_NAME}


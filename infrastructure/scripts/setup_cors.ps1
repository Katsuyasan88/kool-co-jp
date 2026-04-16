$apiId = "b2vrcx3tx1"
$resourceId = "v6fjjv"

# Set Method Response
aws apigateway put-method-response --rest-api-id $apiId --resource-id $resourceId --http-method OPTIONS --status-code 200 --response-parameters '{\"method.response.header.Access-Control-Allow-Headers\": true, \"method.response.header.Access-Control-Allow-Methods\": true, \"method.response.header.Access-Control-Allow-Origin\": true}' --response-models '{\"application/json\": \"Empty\"}'

# Set Integration Response
aws apigateway put-integration-response --rest-api-id $apiId --resource-id $resourceId --http-method OPTIONS --status-code 200 --response-parameters '{\"method.response.header.Access-Control-Allow-Headers\": \"''Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token''\", \"method.response.header.Access-Control-Allow-Methods\": \"''OPTIONS,POST''\", \"method.response.header.Access-Control-Allow-Origin\": \"''*''\"}' --selection-pattern ""

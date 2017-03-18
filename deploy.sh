#!/bin/bash

grunt build

TIMESTAMP=$(date +%s)
sed -i "" "s/__VERSION__/$TIMESTAMP/g" dist/*.html

AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY AWS_DEFAULT_REGION=YOUR_AWS_DEFAULT_REGION aws s3 cp dist/ s3://yourdomain.com/ --recursive

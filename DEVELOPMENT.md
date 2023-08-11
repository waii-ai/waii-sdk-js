# Waii JS SDK Development Guide

## Before you start

Run `npm install` to install all the dependencies.

## Development flow

After making changes, you need to run `tsc` to compile the TypeScript files into JavaScript files.

## Get Waii API Key

If the Waii service (Python backend) is running on your local machine, you can get the API key by running
```
curl -X 'GET' \
  'http://localhost:9859/api/get-access-key' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

Otherwise, you should get the Waii access key on Waii UI.

## Publish to NPM

First, you need to login to NPM by running `npm login`. if you don't have an account, or your account doesn't have the 
permission to publish the package, please contact the Waii team.

Then, you need to bump up the version number in `package.json`.

Run `npm pack && npm publish` to publish the package to NPM.


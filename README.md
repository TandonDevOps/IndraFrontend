# IndraFrontend
[![GitHub deployments](https://img.shields.io/github/deployments/TandonDevOps/IndraFrontend/github-pages?label=github-pages&style=flat-square)](https://github.com/TandonDevOps/IndraFrontend/deployments/activity_log?environment=github-pages)

IndraFrontend has both web and mobile version of Indra agent-based modeling system. It utilizes the existing API of Indra to deliver a front-end to mobile users. 

The web is hosted on the Github Page: https://tandondevops.github.io/IndraFrontend/

## Tools
* Framework: React Native, React
* Documentation: Jsdoc
* Continuous Integration: Github Actions, Travis


## Setup
### Native
* To install the required environment for mobile app: `make dev_env_native`
* To local host the mobile app: `cd IndraReactNative && make start` or `cd IndraReactNative && expo start`
### Web
* To install the required environment for web: `make dev_env_web`
* To local host the web: `make web_start`

## Deploying on heroku using sub-directory
Make sure the package.json in your sub-directory does not contain an entry for "homepage".

## There are three main directories under the project root:

1. `IndraReactCommon`: for common code between web and mobile apps.
1. `IndraReactNative`: code for the mobile app.
1. `IndraReactWeb`: code for the web app



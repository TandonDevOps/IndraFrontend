#!/bin/sh
# See if something is already running on our port:
# ps -ef | grep "port=8000"

# run local server:
# cd $INDRA_HOME/APIServer && ./api.sh &

# run react locally against local server
export REACT_APP_API_URL=http://127.0.0.1:8000/ 
npm start

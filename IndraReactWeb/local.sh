#!/bin/sh
# See if something is already running on our port:
export server=$(ps -ef | grep "[p]ort=8000")
if [ -z "$server" ]
then
    # run local server in the background:
    echo "No running Indra API server detected: launching."
    cd $INDRA_HOME/APIServer && ./api.sh &
fi

# run react locally against local server
export REACT_APP_API_URL=http://127.0.0.1:8000/ 
npm start
echo "If you need to kill the API Server, you can run the ps command and kill its PID."

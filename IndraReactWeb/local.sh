#!/bin/sh
# See if something is already running on our port:false
export API_PORT=8000
# look for a process running on $PORT:
export server=$(ps -ef | grep "[p]ort=$API_PORT")
echo "Server = $server"
if [ -z "$server" ]
then
    # run local server in the background:
    echo "No running Indra API server detected: launching."
    cd $INDRA_HOME/APIServer && ./api.sh &
else
    echo "A server is already running on port $API_PORT"
fi

# run react locally against local server
export REACT_APP_API_URL=http://0.0.0.0:$API_PORT/ 
npm start
echo "If you need to kill the API Server, you can run the ps command and kill its PID."

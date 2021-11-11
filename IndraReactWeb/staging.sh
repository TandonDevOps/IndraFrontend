#!/bin/sh
# run react locally against staging server
export REACT_APP_API_URL=http://indraabm.pythonanywhere.com/
export REACT_APP_USE_GENERATOR=1
npm start

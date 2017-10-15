#!/bin/bash
pug -w -P jade/index.pug -o . &
python -m SimpleHTTPServer 8001 

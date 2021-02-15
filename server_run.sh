#!/bin/bash

sudo -u postgres psql < script.txt

npm install 
node index.js

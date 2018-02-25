#!/bin/bash
cd ./themes/deimpactaccountant
npm i brunch
npm install
cd ../../
brunch build ./themes/deimpactaccountant
hugo server -D
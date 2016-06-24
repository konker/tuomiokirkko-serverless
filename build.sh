#!/bin/bash

rm -f TuomiokirkonKello.zip
zip -r TuomiokirkonKello.zip index.js bongi-bot.js package.json config.json node_modules

echo "----------------------------"
echo "Created TuomiokirkonKello.zip"

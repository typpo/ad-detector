#!/bin/bash
# Set up hardlinks.  Run this script so you only need to edit src/* and changes
# will apply for both Firefox and Chrome.  Unfortunately browsers won't pick up
# symlinks in plugins.

pushd `dirname $0`

rm firefox/data/*.{js,css}
rm chrome/src/*.css
rm chrome/src/inject.js
rm chrome/src/rules.js

ln src/* firefox/data
ln src/* chrome/src
popd

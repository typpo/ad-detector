#!/bin/bash
# Set up hardlinks.  Run this script so you only need to edit src/* and changes
# will apply for both Firefox and Chrome.  Unfortunately browsers won't pick up
# symlinks in plugins.

pushd `dirname $0`

rm firefox/data/*.{js,css}
rm chrome/src/*.{js,css}

ln src/inject* firefox/data
ln src/inject* chrome/src
ln src/lib/jquery.min.js firefox/data
ln src/lib/jquery.min.js chrome/src
popd

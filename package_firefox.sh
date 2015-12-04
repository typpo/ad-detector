#!/bin/bash -e
# This requires jpm: sudo npm install jpm -g

pushd `dirname $0`

./setup_hardlinks.sh

pushd firefox
jpm xpi
mv 19b15b40-23f9-11e4-8c21-0800200c9a66@jetpack-0.20.xpi ../ad-detector.xpi
popd

popd

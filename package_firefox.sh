#!/bin/bash -e
# This requires jpm: sudo npm install jpm -g

pushd `dirname $0`

./setup_hardlinks.sh

pushd firefox
jpm xpi
mv *.xpi ../ad-detector.xpi
popd

popd

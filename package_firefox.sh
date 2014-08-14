#!/bin/bash -e

pushd `dirname $0`

./setup_hardlinks.sh

pushd firefox
cfx xpi
mv ad-detector.xpi ../
popd

popd

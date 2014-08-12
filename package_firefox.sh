#!/bin/bash -e

pushd `dirname $0`

./setup_hardlinks.sh

pushd firefox
cfx xpi
mv codenav.xpi ..
popd

popd

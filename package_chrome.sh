#!/bin/bash -e

pushd `dirname $0`

./setup_hardlinks.sh

pushd chrome
rm chrome_release.zip || true
zip -r ../chrome_release.zip *
popd

popd

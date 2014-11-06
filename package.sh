#!/bin/bash -e

pushd `dirname $0`

./package_chrome.sh
./package_firefox.sh

popd

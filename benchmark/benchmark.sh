#!/bin/bash
set -x
cd ..
./node_modules/.bin/patch-package
./node_modules/.bin/react-benchmark benchmark/status-quo/hello-world.js
./node_modules/.bin/react-benchmark benchmark/transformed/hello-world.js
./node_modules/.bin/react-benchmark benchmark/status-quo/deep-nesting.js
./node_modules/.bin/react-benchmark benchmark/transformed/deep-nesting.js
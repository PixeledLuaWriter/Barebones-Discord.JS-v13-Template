# This is for linux and anything else that's not windows

if [ uname -a | grep -q "Darwin" ]; then
    # Mac OS X
    # check if node.js is installed, if it is then run the index file in the src folder
    if [ -e /usr/local/bin/node ]; then
        node src/index.js
    else
        echo "node.js is not installed, please install it from https://nodejs.org, or with your package manager"
    fi
else
    # Linux
    # check if node.js is installed, if it is then run the index file in the src folder
    if [ -e /usr/bin/node ]; then
        node src/index.js
    else
        echo "node.js is not installed, please install it from https://nodejs.org, or with your package manager"
    fi
fi
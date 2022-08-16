@REM check if node.js is installed on windows, if yes then run the index file from the src folder, if not then ask the user if they want to install it
IF EXIST "%~dp0node.exe" (
    cd "%~dp0src"
    node index.js
) ELSE (
    echo "node.js is not installed on this computer"
    echo "Do you want to install it?"
    echo "y/n"
    read answer
    IF "%answer%" == "y" (
        echo "installing node.js"
        cd "%~dp0"
        winget install --id OpenJS.NodeJS -e --source winget
        echo "node.js installed"
        cd "%~dp0src"
        node index.js
    ) ELSE (
        echo "node.js is not installed on this computer"
        echo "exiting"
    )
)
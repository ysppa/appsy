#If the folder exists, remove it first, then copy the files
if [ -d "./docs" ]; then

    rm -rv ./docs/*

#Else make a new folder and then move the files.
else

    mkdir -p ./docs/
    
fi

mv -v ./build/* ./docs/
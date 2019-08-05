cd vue-client/
yarn build:$1
cd ..

if [ -d "dist" ]; then rm -Rf dist; fi

mkdir dist
cp package.json dist/
cp app.js dist/
cp -r public dist/public
cp -r bin dist/bin

#!/bin/bash

# Required software: node, npm, maven

build_ui() {
  cd ui/
  npm install
  npm run build
  cd ../
}

build_api() {
  cd api/
  rm -rf src/main/resources/static/*
  test -f src/main/resources/static || mkdir src/main/resources/static
  cp -R ../ui/build/* src/main/resources/static/
  mvn clean install
  cd ../
}

if [ $# -ne 1 ]; then
  echo "Error: Invalid usage."
  echo "Usage: ./build.sh target_jar_path"
  exit 1
fi

build_ui && build_api

cp api/target/*.jar "$1"
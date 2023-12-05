#!/usr/bin/env bash

mkdir ios
npx react-native bundle --entry-file='App.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios'

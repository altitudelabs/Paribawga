#!/bin/bash

# PLZ ONLY USE ON SHARED BRANCH - staging, master etc

git branch --merged | grep -v "\*" | grep -v master | grep -v dev | xargs -n 1 git branch -d

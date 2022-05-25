#! /usr/bin/bash

if [ ! -d course_page ]
then
    tar xf course_page.tar.gz
fi

BROWSER=firefox
$BROWSER "course_page/index.html"&

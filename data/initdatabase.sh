#!/bin/bash
#importing the data into the database
mongoimport --db transportionapp --collection  agencies --drop  --type csv --file agency.csv --headerline
mongoimport --db transportionapp --collection  calendardates --drop  --type csv --file calendar_dates.csv --headerline
mongoimport --db transportionapp --collection  feedinfo --drop  --type csv --file feed_info.csv --headerline
mongoimport --db transportionapp --collection  routes --drop  --type csv --file routes.csv --headerline
mongoimport --db transportionapp --collection  shapes --drop  --type csv --file shapes.csv --headerline
mongoimport --db transportionapp --collection  stop_times --drop  --type csv --file stop_times.csv --headerline
mongoimport --db transportionapp --collection  trips --drop --type csv --file trips.csv --headerline
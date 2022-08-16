# Valorant Shaming Discord Bot

## Introduction

A Discord bot that checks a pre-defined list of users last played game and shames them on Discord if they bottom fragged. It also keeps track of users bottom frag games in a leaderboard.

## Commands

!update
  - ** USE SPARINGLY ** runs index.js to check if any user has bottom fragged
!scoreboard
  - Sends current leaderboard

## Technologies

- Node JS
- Discord JS
- Valorant/Riot API
- Axios
- CRON/Task Scheduler

## Running

Set up a CRON or Windows Task Scheduler job for index.js

AND/OR
  
```sh
node commands.js
```

#!/bin/sh
################################################################
# Script to function as entrypoint for Docker container        #
# usage: ./docker-entrypoint.sh                                #
################################################################

# Fail on the first error, rather than continuing
set -eu

# Start Next.js with a custom port, from the environment
# -s suppresses npm's echoing of commands, to prevent additional logging
npm run -s start -- -p $PORT

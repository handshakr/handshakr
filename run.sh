#!/usr/bin/env bash

echo '-- Checking presence of required tools...'

HAS_GIT=$(which git)
if [ -z "$HAS_GIT" ]; then
  echo 'Your machine does not have git installed. Please install it and try again.'
  exit 0
fi

HAS_NODE=$(which node)
if [ -z "$HAS_NODE" ]; then
  echo 'Your machine does not have node installed. Please install it and try again.'
  exit 0
fi

echo '-- Downloading handshakr...'
WORKDIR=$(mktemp -d 2>/dev/null || mktemp -d -t 'handshakr-tmp')
curl -o "$WORKDIR/handshakr.zip" -L --progress-bar "https://github.com/handshakr/handshakr/archive/master.zip"
unzip -q -d $WORKDIR "$WORKDIR/handshakr.zip"
cd "$WORKDIR/handshakr-master"

echo '-- Installing dependencies...'
npm install -s --no-audit &> /dev/null

echo '-- Starting claiming HSK...'
exec < /dev/tty node "$WORKDIR/handshakr-master/bin/handshakr.js" "$@"

exit 0

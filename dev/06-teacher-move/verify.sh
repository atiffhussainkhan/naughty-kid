#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
node "$ROOT/game-slices/04-teacher/module.js"
node "$ROOT/game-slices/05-movement/module.js"
node "$ROOT/game-v2/js/teacher-move-bind.js"
echo "06-teacher-move: ok"

#!/usr/bin/env bash
set -euo pipefail

# Generate tag in v2026.04.07 format (date-based semver)
TODAY=$(date +%Y.%m.%d)
TAG="v${TODAY}"

# Allow override via argument: ./tag-release.sh v2026.04.07
if [[ $# -ge 1 ]]; then
  TAG="$1"
fi

# Validate format: vYYYY.MM.DD
if ! [[ "$TAG" =~ ^v[0-9]{4}\.[0-9]{2}\.[0-9]{2}$ ]]; then
  echo "Error: tag '$TAG' doesn't match vYYYY.MM.DD format" >&2
  exit 1
fi

# Make sure we're on main and up-to-date
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Error: must be on main branch (currently on '$CURRENT_BRANCH')" >&2
  exit 1
fi

git fetch --tags origin

# Check tag doesn't already exist
if git rev-parse "$TAG" &>/dev/null; then
  echo "Error: tag '$TAG' already exists" >&2
  exit 1
fi

echo "Creating and pushing tag: $TAG"
git tag "$TAG"
git push origin "$TAG"

echo "Done: https://github.com/$(git remote get-url origin | sed 's|.*github.com[:/]\(.*\)\.git|\1|;s|.*github.com[:/]\(.*\)|\1|')/releases/tag/$TAG"

#!/bin/bash
# Pushes this folder to GitHub Pages. Double-click, or run: bash PUSH-TO-GITHUB.command
# No password or token is stored anywhere in this file — git asks you for it.

cd "$(dirname "$0")" || exit 1

REPO="https://github.com/arpitpathak2999/arpitpathak2999.github.io.git"

echo "=============================================="
echo " Arpit Pathak portfolio -> GitHub Pages"
echo "=============================================="
echo
echo "BEFORE running this, the repository must already exist on GitHub:"
echo "  1. Open https://github.com/new"
echo "  2. Repository name:  arpitpathak2999.github.io"
echo "  3. Public. Do NOT add a README."
echo "  4. Click Create repository."
echo
read -r -p "Have you created that empty repository? [y/N] " ok
case "$ok" in
  y|Y|yes|YES) ;;
  *) echo "Stopped. Create the repo first, then run this again."; exit 0 ;;
esac

if ! command -v git >/dev/null 2>&1; then
  echo
  echo "git is not installed. macOS will offer to install it now."
  echo "Accept the prompt, wait for it to finish, then run this script again."
  git --version
  exit 1
fi

echo
echo "--> Preparing repository"
git init -q 2>/dev/null
git config user.name "Arpit Pathak"
git config user.email "arpitpathak2999@gmail.com"

git add -A
if git diff --cached --quiet 2>/dev/null; then
  echo "    nothing new to commit"
else
  git commit -q -m "Arpit Pathak research portfolio" && echo "    committed"
fi

git branch -M main
git remote remove origin 2>/dev/null
git remote add origin "$REPO"

echo
echo "--> Pushing to GitHub"
echo
echo "    Username: arpitpathak2999"
echo "    Password: paste a Personal Access Token (NOT your account password)."
echo "              Create one at:"
echo "              https://github.com/settings/personal-access-tokens"
echo "              Permissions needed: Contents = Read & write,"
echo "                                  Workflows = Read & write"
echo "    The token will not be shown as you paste it. That is normal."
echo

if git push -u origin main; then
  echo
  echo "=============================================="
  echo " Pushed successfully."
  echo "=============================================="
  echo
  echo "LAST STEP - turn Pages on:"
  echo "  1. https://github.com/arpitpathak2999/arpitpathak2999.github.io/settings/pages"
  echo "  2. Build and deployment -> Source -> select 'GitHub Actions'"
  echo "  3. Wait about a minute, then open:"
  echo "     https://arpitpathak2999.github.io"
  echo
else
  echo
  echo "Push failed. Most common causes:"
  echo "  - The repository does not exist yet, or the name is not exactly"
  echo "    arpitpathak2999.github.io"
  echo "  - You pasted your account password instead of a token"
  echo "  - The token is missing 'Contents: Read & write'"
  echo
  echo "Fix the cause and run this script again - it is safe to re-run."
fi

echo "Press Return to close this window."
read -r _

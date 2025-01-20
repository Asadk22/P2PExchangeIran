#!/bin/bash

# Create backup directory if it doesn't exist
BACKUP_DIR="backup"
mkdir -p "$BACKUP_DIR"

# Get current timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create backup folder with timestamp
BACKUP_NAME="backup_$TIMESTAMP"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"
mkdir -p "$BACKUP_PATH"

# Copy all files except those in .gitignore
rsync -av --exclude-from='.gitignore' --exclude="$BACKUP_DIR" . "$BACKUP_PATH"

# Create a git status snapshot
git status > "$BACKUP_PATH/git_status.txt"
git diff > "$BACKUP_PATH/git_diff.txt"

# Create backup info file
echo "Backup created at: $(date)" > "$BACKUP_PATH/backup_info.txt"
echo "Git branch: $(git branch --show-current)" >> "$BACKUP_PATH/backup_info.txt"
echo "Last commit: $(git log -1 --pretty=format:'%h - %s (%cr) <%an>')" >> "$BACKUP_PATH/backup_info.txt"

# Create a zip archive
cd "$BACKUP_DIR"
zip -r "${BACKUP_NAME}.zip" "$BACKUP_NAME"
rm -rf "$BACKUP_NAME"

echo "Backup created successfully at $BACKUP_DIR/${BACKUP_NAME}.zip"

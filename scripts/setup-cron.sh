#!/bin/bash

# Get the absolute path of the backup script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKUP_SCRIPT="$SCRIPT_DIR/backup.sh"

# Make the script executable
chmod +x "$BACKUP_SCRIPT"

# Create a temporary cron file
TEMP_CRON=$(mktemp)

# Add our backup job to run every 30 minutes (remove any existing backup jobs)
echo "*/30 * * * * $BACKUP_SCRIPT" > "$TEMP_CRON"

# Install the new cron file
crontab "$TEMP_CRON"

# Clean up
rm "$TEMP_CRON"

echo "Cron job installed successfully. Backups will run every 30 minutes."
echo "To view your cron jobs, run: crontab -l"

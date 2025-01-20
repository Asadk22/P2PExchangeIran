#!/bin/bash

# Find all TypeScript files in the api directory
find src/app/api -name "*.ts" -type f | while read -r file; do
  # Skip the auth.ts file itself
  if [[ "$file" != "src/app/api/auth/[...nextauth]/auth.ts" ]]; then
    # Replace the old import paths with the new one
    sed -i '' 's/from '\''.*\/auth\/\[\.\.\.nextauth\]\/route'\''/from '\''@\/app\/api\/auth\/\[\.\.\.nextauth\]\/auth'\''/g' "$file"
    sed -i '' 's/from '\''\.\.\/auth\/\[\.\.\.nextauth\]\/route'\''/from '\''@\/app\/api\/auth\/\[\.\.\.nextauth\]\/auth'\''/g' "$file"
    sed -i '' 's/from '\''\.\.\/\.\.\/auth\/\[\.\.\.nextauth\]\/route'\''/from '\''@\/app\/api\/auth\/\[\.\.\.nextauth\]\/auth'\''/g' "$file"
    sed -i '' 's/from '\''\.\.\/\.\.\/\.\.\/auth\/\[\.\.\.nextauth\]\/route'\''/from '\''@\/app\/api\/auth\/\[\.\.\.nextauth\]\/auth'\''/g' "$file"
  fi
done

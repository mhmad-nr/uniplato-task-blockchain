#!/bin/bash

# Install dependencies using yarn
yarn install

# Additional setup commands
# Example: Compile TypeScript files
yarn run build

# Notify the user that setup is complete
echo "Setup complete. Ensure you have created a .env file with the necessary environment variables."

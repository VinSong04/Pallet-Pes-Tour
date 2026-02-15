#!/bin/bash

# Firebase Configuration Setup Script
# This script helps you set up your Firebase configuration

echo "🔥 Firebase Configuration Setup"
echo "================================"
echo ""
echo "Please follow these steps:"
echo ""
echo "1. Go to: https://console.firebase.google.com/"
echo "2. Log in with your Google account"
echo "3. Click 'Add project' or 'Create a project'"
echo "4. Name it: pallet-pes-tour"
echo "5. Disable Google Analytics (optional)"
echo "6. Click 'Create project'"
echo ""
echo "After creating the project:"
echo "7. Click 'Realtime Database' in the left sidebar"
echo "8. Click 'Create Database'"
echo "9. Choose location: Singapore (or closest to you)"
echo "10. Start in 'test mode'"
echo "11. Click 'Enable'"
echo ""
echo "To get your config:"
echo "12. Click the ⚙️ gear icon → 'Project settings'"
echo "13. Scroll to 'Your apps' section"
echo "14. Click the Web icon </> to add a web app"
echo "15. Nickname: Pallet Pes Tour Web"
echo "16. Click 'Register app'"
echo ""
echo "You'll see a firebaseConfig object. Copy those values!"
echo ""
echo "Then run this script again with your values:"
echo ""
echo "Usage:"
echo "  ./setup-firebase-config.sh --api-key YOUR_API_KEY --auth-domain YOUR_AUTH_DOMAIN ..."
echo ""

# Check if arguments are provided
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please follow the steps above first."
    echo ""
    echo "Or, if you already have the values, run:"
    echo "  ./setup-firebase-config.sh \\"
    echo "    --api-key YOUR_API_KEY \\"
    echo "    --auth-domain YOUR_AUTH_DOMAIN \\"
    echo "    --database-url YOUR_DATABASE_URL \\"
    echo "    --project-id YOUR_PROJECT_ID \\"
    echo "    --storage-bucket YOUR_STORAGE_BUCKET \\"
    echo "    --messaging-sender-id YOUR_SENDER_ID \\"
    echo "    --app-id YOUR_APP_ID"
    exit 0
fi

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --api-key)
            API_KEY="$2"
            shift 2
            ;;
        --auth-domain)
            AUTH_DOMAIN="$2"
            shift 2
            ;;
        --database-url)
            DATABASE_URL="$2"
            shift 2
            ;;
        --project-id)
            PROJECT_ID="$2"
            shift 2
            ;;
        --storage-bucket)
            STORAGE_BUCKET="$2"
            shift 2
            ;;
        --messaging-sender-id)
            MESSAGING_SENDER_ID="$2"
            shift 2
            ;;
        --app-id)
            APP_ID="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Create .env.local file
cat > .env.local << EOF
# Firebase Configuration
# Generated on $(date)

VITE_FIREBASE_API_KEY=$API_KEY
VITE_FIREBASE_AUTH_DOMAIN=$AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL=$DATABASE_URL
VITE_FIREBASE_PROJECT_ID=$PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=$STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=$MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=$APP_ID
EOF

# Also create .env.production
cp .env.local .env.production

echo "✅ Firebase configuration saved to .env.local and .env.production"
echo ""
echo "🔄 Please restart your dev server:"
echo "   Press Ctrl+C in the terminal running 'npm run dev'"
echo "   Then run: npm run dev"
echo ""
echo "🎉 Your app will now use Firebase for real-time sync!"

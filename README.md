
# Welcome to your Lovable project - Revento Ticket Verse

## Project info

**URL**: https://lovable.dev/projects/749e1702-ef26-453b-946a-67b7a33a0780

## Running this application locally

To run this application on your local machine, follow these steps:

```sh
# Step 1: Make sure you have Node.js installed
# You can download it from https://nodejs.org/

# Step 2: Install the necessary dependencies
npm install

# Step 3: Start the development server
npm run dev
```

The application should now be running at http://localhost:8080

## Troubleshooting

If you encounter the error "'vite' is not recognized as an internal or external command", try these solutions:

1. Use npx to run Vite directly:
```sh
npx vite
```

2. Check if node_modules/.bin is in your PATH:
```sh
# On Windows
set PATH=%PATH%;%CD%\node_modules\.bin

# On macOS/Linux
export PATH=$PATH:./node_modules/.bin
```

3. Try installing Vite globally:
```sh
npm install -g vite
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/749e1702-ef26-453b-946a-67b7a33a0780) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/749e1702-ef26-453b-946a-67b7a33a0780) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

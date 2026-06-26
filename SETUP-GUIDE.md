# FlashClaim — Setup Guide

Follow this step by step. Don't skip anything. By the end, your app will be live on the internet.

---

## STEP 1: Install Node.js

Node.js is the tool that lets you run this React project on your computer.

1. Go to https://nodejs.org
2. Click the big green **LTS** button to download
3. Open the downloaded file and install it (just keep clicking Next/Continue)
4. When it's done, open your terminal and type this to confirm it worked:

```
node -v
```

If you see a version number like `v18.20.2` or `v20.11.0`, you're good. Move on.

**"How do I open my terminal?"**
- **Windows:** Press the Windows key, type `cmd`, click "Command Prompt"
- **Mac:** Press Cmd + Space, type `Terminal`, press Enter

---

## STEP 2: Install Git

Git is what lets you upload code to GitHub. You might already have it.

1. Type this in your terminal to check:

```
git --version
```

2. If you see a version number, skip to Step 3. If it says "not found", download Git from https://git-scm.com/downloads and install it.

---

## STEP 3: Unzip the Project

1. Find the `flashclaim.zip` file you downloaded from Claude
2. Right-click it → "Extract All" (Windows) or double-click it (Mac)
3. You now have a folder called `flashclaim`

---

## STEP 4: Open the Folder in Your Terminal

You need your terminal to be "inside" the flashclaim folder.

**Easiest way (if you use VS Code):**
1. Open VS Code
2. File → Open Folder → select the `flashclaim` folder
3. Press Ctrl + ` (the backtick key, above Tab) to open the terminal
4. Done — you're already in the right place

**Without VS Code:**

On Windows:
```
cd C:\Users\YourName\Downloads\flashclaim
```

On Mac:
```
cd ~/Downloads/flashclaim
```

(Change the path if you extracted it somewhere else)

---

## STEP 5: Install Dependencies

This downloads React and all the other libraries the project needs. Type:

```
npm install
```

Wait 1-2 minutes. When it finishes, you'll see a `node_modules` folder appear. Don't touch that folder — it's supposed to be there.

---

## STEP 6: Test It Locally

Type:

```
npm run dev
```

You'll see something like:

```
  VITE v5.4.0  ready in 400 ms

  ➜  Local:   http://localhost:5173/
```

Open that link in your browser. You should see the FlashClaim login page! Click the "Policyholder" or "Admin" button to explore.

When you're done looking, go back to your terminal and press **Ctrl + C** to stop the server.

---

## STEP 7: Create a GitHub Repository

1. Go to https://github.com and log in (create an account if you don't have one)
2. Click the **+** icon in the top-right corner → **New repository**
3. Repository name: `flashclaim`
4. Make sure it's set to **Public**
5. Do NOT check any of the boxes (no README, no .gitignore, no license)
6. Click **Create repository**
7. You'll see a setup page — leave this tab open, you'll need it soon

---

## STEP 8: Run the Commit Script

This is the script that creates your git history with dates in March 2026.

Make sure your terminal is inside the `flashclaim` folder (from Step 4), then type:

```
bash backdate-commits.sh
```

**The script will ask you two things:**

1. **Your full name** — type your name exactly as it appears on your GitHub profile (e.g., `Yunus Ayoola`)
2. **Your GitHub email** — type the email address you used to sign up for GitHub (e.g., `youremail@gmail.com`)

After that, it runs automatically. You'll see green checkmarks for each commit being created. When it's done, it'll say "28 commits created."

---

## STEP 9: Push to GitHub

Now you need to upload the code to the GitHub repo you created in Step 7.

Type these 3 commands one at a time. **Replace YOUR_USERNAME with your actual GitHub username:**

```
git remote add origin https://github.com/YOUR_USERNAME/flashclaim.git
```

```
git branch -M main
```

```
git push -u origin main
```

**If it asks for a password:**

GitHub doesn't accept regular passwords anymore. You need a "Personal Access Token":

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like `flashclaim`
4. Under "Expiration", pick 30 days
5. Check the **repo** checkbox
6. Click **Generate token** at the bottom
7. **Copy the token** (it starts with `ghp_`)
8. Go back to your terminal and paste it when it asks for your password (Note: the password won't show as you type — that's normal, just paste and press Enter)

After pushing, go back to your GitHub repo page and refresh. You should see all your files with commit dates in March!

---

## STEP 10: Deploy on Netlify

This makes your app live on the internet with a real URL.

1. Go to https://app.netlify.com
2. Click **"Sign up"** and choose **"Sign up with GitHub"**
3. Once logged in, click **"Add new site"** → **"Import an existing project"**
4. Click **"GitHub"** as your Git provider
5. It'll ask for permission to access your repos — click **"Authorize"**
6. Find and click your `flashclaim` repository
7. You'll see build settings. Make sure they say:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
8. Click **"Deploy site"**

Wait 1-2 minutes. When it's done, you'll see a URL like `random-name-12345.netlify.app`.

Click it — **your app is live!**

---

## STEP 11: Change the URL (Optional but Recommended)

The random URL Netlify gives you isn't great for a portfolio. Change it:

1. On your Netlify site dashboard, click **"Domain settings"** (or "Site settings" → "Domain management")
2. Find the section that says your current `.netlify.app` name
3. Click **"Options"** → **"Edit site name"**
4. Change it to `flashclaim` (it becomes `flashclaim.netlify.app`)
5. Click **Save**

If `flashclaim` is taken, try `flashclaim-app` or `flashclaim-ai`.

---

## STEP 12: Test Everything

Open your live URL and check that these all work:

- Login page loads properly
- Both demo login buttons work (Policyholder and Admin)
- Dark/light mode toggle works
- New Claim wizard goes through all 3 steps
- AI scan animation plays on the result page
- Settlement proposal shows the payout button
- Admin dashboard shows charts and the claims table
- Clicking a claim row opens the detail panel
- Going to a random URL (like `/blahblah`) shows the 404 page
- It looks good on your phone too

---

## You're Done!

Add these to your portfolio and LinkedIn:
- **Live URL:** `https://flashclaim.netlify.app` (or whatever you named it)
- **GitHub:** `https://github.com/YOUR_USERNAME/flashclaim`

---

## If Something Goes Wrong

**"npm: command not found"**
→ Node.js isn't installed. Go back to Step 1.

**"git: command not found"**
→ Git isn't installed. Go back to Step 2.

**npm install gives errors**
→ Delete the `node_modules` folder and the `package-lock.json` file, then run `npm install` again.

**The site loads but pages are blank or show 404 on Netlify**
→ The `public/_redirects` file is already in your project (it's needed for React routing on Netlify). If it's somehow missing, create a file called `_redirects` inside the `public` folder with just this line: `/*    /index.html   200`

**GitHub says "remote origin already exists"**
→ Run `git remote remove origin` first, then try the `git remote add` command again.

**"Everything worked locally but Netlify build failed"**
→ On your Netlify dashboard, click the failed deploy to see the error log. Most common issue is a typo in the build command. It should be exactly `npm run build` with publish directory `dist`.

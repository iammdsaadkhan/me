# Md Saad Khan – Portfolio
Static site (HTML/CSS/JS). No build step.

## Before pushing – edit `index.html`
Replace `YOUR-LINKEDIN`, `YOUR-GITHUB`, `YOUR-LEETCODE` and the `href="#"` project links with your real URLs.

## Deploy
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
Then on vercel.com: **Add New → Project → import the repo → Deploy**.
Framework preset: **Other**. Leave build command and output directory empty.
Optional: rename the project in Vercel settings to get `yourname.vercel.app`.

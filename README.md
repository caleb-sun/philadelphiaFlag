# Quiz → Google Sheets

A 10-question quiz that collects responses and writes them to a Google Spreadsheet.
Hosted on GitHub Pages (no server required).

---

## Setup in 5 steps

### 1. Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Rename the first tab to **`Responses`** (or whatever you set in `Code.gs`).
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit
   ```

---

### 2. Deploy the Apps Script

1. In your spreadsheet, go to **Extensions → Apps Script**.
2. Delete any existing code and paste the entire contents of `Code.gs`.
3. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual ID.
4. Click **Deploy → New deployment**.
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorise when prompted (Google will ask once).
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

### 3. Wire up the quiz

Open `index.html` and replace the placeholder at the top of the `<script>` block:

```js
const SHEET_ENDPOINT = "YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

→ paste your Web App URL there.

---

### 4. Customise your questions

Still in `index.html`, edit the `QUESTIONS` array. Each entry has:

```js
{
  text: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"]
}
```

- You can have as many or as few options per question as you like.
- The user must select exactly one option to advance.

---

### 5. Publish to GitHub Pages

1. Push your repo to GitHub (only `index.html` is required — `Code.gs` lives in Apps Script).
2. Go to your repo **Settings → Pages**.
3. Source: **Deploy from a branch → main → / (root)**.
4. Your quiz will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

---

## How responses are stored

Each submission adds one row to the **Responses** tab:

| Timestamp | Question 1 | Question 2 | … |
|-----------|------------|------------|---|
| 2024-03-16T14:22:00Z | Professional | Daily | … |

The header row is written automatically on the first submission.

---

## Notes

- The quiz uses `fetch` with `mode: "no-cors"` to POST to Apps Script (required by Google). This means the browser can't read the response — the quiz assumes success after any non-network-error.
- If you need error confirmation, deploy a small backend (e.g. Cloudflare Workers) that proxies the request and returns a readable response.
- Responses are stored server-side in your own Google account — nothing passes through any third party.

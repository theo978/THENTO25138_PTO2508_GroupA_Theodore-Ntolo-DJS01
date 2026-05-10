# PodcastApp

A simple web app where you can browse podcast shows and read details about them.

---

## What It Does

- Shows a list of podcast shows on the main page
- Each show card displays the cover image, title, number of seasons, genre tags, and when it was last updated
- Click on any show to open a popup with more details — the full description, all seasons, and episode counts
- You can filter shows by genre or sort them by how recently they were updated

---

## How to Use the App

1. Open the app in your browser
2. You will see a grid of podcast show cards
3. Use the **All Genres** dropdown to filter by a specific genre
4. Use the **Recently Updated** dropdown to change the sort order
5. Click any show card to open a popup with full details
6. Close the popup by clicking the **×** button, clicking outside it, or pressing **Escape**

---

## Technologies Used

- **HTML** — page structure
- **CSS** — styling and layout, including responsive design for mobile and tablet
- **JavaScript (ES Modules)** — all app logic, no external frameworks or libraries needed

---

## Key Design Decisions

- No page reloads — everything happens on one page using JavaScript
- The JavaScript is split into separate files so each file has one clear job
- The app works on desktop, tablet, and mobile screens
- Keyboard navigation is supported — you can Tab to cards and press Enter to open them

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Does not work in Internet Explorer.

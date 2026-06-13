# Not Defteri

A minimal tabbed notepad built with Electron.

## Running

You can run it two ways:

**As a plain web page** — just open `index.html` in a browser (double-click
it). Opening uses a file picker; saving uses the browser's save dialog where
supported (Chrome/Edge) or falls back to a download. No install needed.

**As a desktop app (Electron)** — gives native open/save dialogs that write
files in place:

```bash
npm install   # first time only
npm start
```

The app detects its environment automatically and uses the right file APIs.

## Features

- Multiple tabs with session restore (open tabs survive a restart)
- Open / Save / Save As, plus a recent-files menu
- Find & replace with case-sensitive and whole-word toggles
- Line operations: duplicate, delete, move up/down
- Auto-indent, go-to-line, word wrap, adjustable font size
- Light / dark theme, line-ending (LF/CRLF) indicator
- Drag and drop files onto the window to open them

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| Ctrl+N | New tab |
| Ctrl+O | Open file |
| Ctrl+S / Ctrl+Shift+S | Save / Save As |
| Ctrl+W | Close tab |
| Ctrl+F / Ctrl+H | Find / Replace |
| Ctrl+G | Go to line |
| Ctrl+D | Duplicate line |
| Ctrl+Shift+K | Delete line |
| Alt+↑ / Alt+↓ | Move line up / down |

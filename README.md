# Not Defteri

A minimal tabbed notepad built with Electron.

## Running

This is an **Electron app** — it must be launched through Electron, not by
opening `index.html` directly in a browser. Opening the file directly
(`file://…/index.html`) means the preload bridge is unavailable, so opening
and saving files won't work.

```bash
npm install   # first time only
npm start
```

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

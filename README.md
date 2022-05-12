<img src="src/assets/img/icon-128.png" width="64"/>

# Thumbtack Tracking Tracker

Tracker for Thumbtack events

## Features

- Track events with the name of the event being tracked
- Data payload for each event
- Multiple occurances of the same event tracked with a counter

## Installing and Running

### How to use the extension locally:

#### Installing the Chrome extension:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `$ NODE_ENV=production npm run build` to build the Chrome extension.
5. Go to Chrome browser go to url: `chrome://extensions/`
6. On the top right, toggle `Developer mode` to on.
7. Near the top left, click `Load unpacked`.
8. Look for this repository and select the `build` folder.

#### Using the Chrome extension:

1. Make sure the extension is toggled on in `chrome://extensions/`.
2. Go to any Thumbtack.com page.
3. Open the devtools by right-clicking anywhere on the page and select `Inspect`, or for keyboard shortcuts: Command + Option + I, F12, or Control + Shift + I
4. In the devtool tabs near the top, look for and select `TT Tracking Tracker`. It might be hidden behind `>>`. This should open the extension panel.
5. Now interact with any Thumbtack page and events will be logged in the extension panel.

### Development Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

## Packing

After the development of this extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

### Credits

---

Made with Chrome Extension Boilerplate with React 17 and Webpack 5
by Michael Xieyang Liu | [Website](https://lxieyang.github.io)

[![npm](https://img.shields.io/npm/v/chrome-extension-boilerplate-react)](https://www.npmjs.com/package/chrome-extension-boilerplate-react)
[![npm-download](https://img.shields.io/npm/dw/chrome-extension-boilerplate-react)](https://www.npmjs.com/package/chrome-extension-boilerplate-react)
[![npm](https://img.shields.io/npm/dm/chrome-extension-boilerplate-react)](https://www.npmjs.com/package/chrome-extension-boilerplate-react)

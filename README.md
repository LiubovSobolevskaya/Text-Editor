# Text-Editor
14th Assignment of UCB Extension Web Development Bootcamp

Please see the [deployed website](https://dashboard.heroku.com/apps/pwa-text-editor-luba/deploy/github)

## Description

Given a text editor web application, when the application is opened in the editor, a folder structure with client and server components should be visible. When the command "npm run start" is executed from the root directory, the application starts the backend server and serves the client. Running the text editor application from the terminal results in JavaScript files being bundled using webpack. Running the webpack plugins generates an HTML file, service worker, and manifest file. Utilizing next-gen JavaScript ensures that the text editor functions correctly in the browser without errors. Upon opening the text editor, IndexedDB immediately creates a database storage. Entering content and clicking off the DOM window automatically saves the content in the text editor using IndexedDB. Reopening the text editor retrieves the previously entered content from IndexedDB. Clicking on the Install button allows downloading the web application as a desktop icon. When loading the web application, a registered service worker, implemented using workbox, pre-caches static assets including subsequent pages and static assets. 

---
## Appearance and Functionality
![](/assets/jate.gif)

## Technology Used

- [Git](https://git-scm.com/)
- [JavaScript](https://www.javascript.com/)
- [Node.js](https://nodejs.dev/)
- [PWA](https://web.dev/progressive-web-apps/)


## Requirements

```
npm install
npm run build
npm run start:dev
```

## Author Info

### Liubov Sobolevskaya

- [LinkedIn](https://www.linkedin.com/in/liubov-sobolevskaya/)
- [Github](https://github.com/LiubovSobolevskaya)
- [Kaggle](https://www.kaggle.com/lyubovsobolevskaya)


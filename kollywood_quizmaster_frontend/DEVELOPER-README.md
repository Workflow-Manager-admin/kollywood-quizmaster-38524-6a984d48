# Notes for Resolving 'Invalid Host header' Error in React Dev Server

If you encounter the "Invalid Host header" error when running the React dev server (including for remote/cloud/devcontainer/VSCode online/WSL), follow these steps based on your setup:

---

## 1. Plain Create React App (react-scripts, NOT ejected)

- Add to your `.env` (in your project folder, e.g. `kollywood_quizmaster_frontend/.env`):

  ```
  HOST=0.0.0.0
  DANGEROUSLY_DISABLE_HOST_CHECK=true
  FAST_REFRESH=false
  ```

- If this doesn't work, use [`craco`](https://github.com/dilanx/craco) or [`react-app-rewired`](https://github.com/timarney/react-app-rewired) to override webpack dev server config:
  - Install: `npm install @craco/craco` or `npm install react-app-rewired`
  - Add `craco.config.js` or `config-overrides.js`:
    ```js
    // With craco.config.js or config-overrides.js:
    module.exports = {
      devServer: {
        allowedHosts: 'all'
      }
    };
    ```

---

## 2. Ejected Create React App

- Edit `webpackDevServer.config.js` and **set**:
  ```js
  allowedHosts: 'all',
  ```
  ...in the exported `devServer` config object.

---

## 3. Custom Webpack or Template Config

- If you are using your own webpack config (`webpack.config.js`, etc.), ensure the dev server section includes:
  ```js
  devServer: {
    allowedHosts: 'all'
  }
  ```

---

## 4. This KAVIA Template (Custom 'start' Script)

- The existing `package.json` "start" script already includes:
  ```
  --disable-host-check --host 0.0.0.0
  ```
- This should resolve the error for most remote/VM/port-forwarded scenarios.
- If not, see steps above for `.env` or config changes.

---

## 5. Proxy Use

- If you use the `proxy` field in `package.json`, make sure it is a valid URL, and matches the backend/server.

---

## Further Reference

- [CRA docs: Invalid Host header](https://github.com/facebook/create-react-app/issues/11230)
- [Webpack Dev Server allowedHosts Option](https://webpack.js.org/configuration/dev-server/#devserverallowedhosts)

**Summary:**  
- `.env` values, proper config, and correct dev server flags will resolve the Invalid Host header issue in all environments.

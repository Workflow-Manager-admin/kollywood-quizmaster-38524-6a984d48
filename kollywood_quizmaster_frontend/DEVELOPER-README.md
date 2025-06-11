# Notes for Resolving 'Invalid Host header' Error in React Dev Server

If you encounter the "Invalid Host header" error when running the React dev server (especially in remote/cloud/devcontainer/VSCode online/WSL environments), use the steps below. **This project uses a custom Webpack config and dev script; see details for your scenario.**

---

## Project-specific Solution (KAVIA Template/Custom Webpack)

- This project does **NOT** use Create React App's ejected setup, nor craco, nor react-app-rewired.
- Instead, it uses a custom Webpack config `.ve/webpack.config.js` and runs dev server with the following start script (see `package.json`):

  ```
  "start": "cross-env EDIT_MODE=true webpack serve --config .ve/webpack.config.js --mode development --disable-host-check --host 0.0.0.0"
  ```

- **This already includes both:**
  - `--disable-host-check`
  - `--host 0.0.0.0`
- This disables host header checks and allows access from any network (including port forwarding, containers, or cloud IDEs).
- In almost all deployment/test environments, this script alone is sufficient to solve the "Invalid Host header" error.

---

## What if you *still* see the error?

### Step 1: Verify you're using the correct start command

- Always start the dev server using:

  ```
  npm start
  ```

### Step 2: Try a .env file

- If you experience issues (or the script changes), try adding this `.env` file in `kollywood_quizmaster_frontend/`:

  ```
  HOST=0.0.0.0
  DANGEROUSLY_DISABLE_HOST_CHECK=true
  FAST_REFRESH=false
  ```

### Step 3: (Advanced) Customizing Webpack

- If you fork or restructure the project and customize Webpack config, ensure `devServer` includes:
  ```js
  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',
    disableHostCheck: true,
  }
  ```
  *(Note: `disableHostCheck` is deprecated, but included here for backwards compatibility where necessary.)*

---

## NOT USED in this Project

- You do **NOT** need to use `react-app-rewired`, `craco`, or eject/apply `webpackDevServer.config.js` fixes. 
- There is no `config-overrides.js` or `craco.config.js` in this repo.

---

## Proxy Use

- If using the `proxy` field in `package.json`, verify the value is a valid backend URL and matches your API server.

---

## Further Reference

- [CRA docs: Invalid Host header](https://github.com/facebook/create-react-app/issues/11230)
- [Webpack Dev Server allowedHosts Option](https://webpack.js.org/configuration/dev-server/#devserverallowedhosts)

---

**Summary for THIS REPO:**  
- Use `npm start` (with the dev script provided).
- If still blocked, try the `.env` file.
- No need (or benefit) to apply CRA, craco, or react-app-rewired workarounds.
- See this file if you change/upgrade dev tooling!

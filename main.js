const { app, BrowserWindow, globalShortcut, screen } = require("electron");
const path = require("path");
const http = require("http"); 

function waitForBackend(callback) {
  const check = () => {
    http.get("http://localhost:4000", () => {
      console.log("Backend is ready");
      callback();
    }).on("error", (err) => {
      console.log("Waiting for backend...");
      setTimeout(check, 300);
    });
  };
  check();
}

app.whenReady().then(() => {
  // Create window
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 600,
    height: height,
    x: width - 600,
    minWidth: 400,
    y: 0,
    backgroundColor: "rgb(31, 29, 29)",
  });

  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win.webContents.toggleDevTools();
  });

  // Wait for backend before loading frontend
  waitForBackend(() => {
    win.loadFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
});

app.on("window-all-closed", () => {
  app.quit();
});




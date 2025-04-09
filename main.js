const { app, BrowserWindow, globalShortcut, screen } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");

let backend;

function waitForBackend(callback) {
  const check = () => {
    http.get("http://localhost:4000", () => {
      console.log("✅ Backend is ready");
      callback();
    }).on("error", () => {
      setTimeout(check, 300);
    });
  };
  check();
}

app.whenReady().then(() => {
  // Start backend
  backend = spawn("/usr/local/bin/node", ["server.js"], {
    cwd: path.join(__dirname, "backend"),
    stdio: "pipe",
    shell: true,
  });

  backend.stdout.on("data", (data) => console.log("[backend]", data.toString()));
  backend.stderr.on("data", (data) => console.error("[backend]", data.toString()));

  // Create window
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 600,
    height: height,
    x: width - 600,
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

app.on("before-quit", () => {
  if (backend) backend.kill();
});

app.on("window-all-closed", () => {
  app.quit();
});



const { app, BrowserWindow, globalShortcut, screen } = require("electron");
const { exec } = require("child_process");

app.whenReady().then(() => {
  const backend = exec("cd backend && npm run start");
  backend.stdout.on("data", (data) => console.log("[backend]", data));
  backend.stderr.on("data", (data) => console.error("[backend]", data));

  const frontend = exec("cd frontend && npm run dev");
  frontend.stdout.on("data", (data) => console.log("[frontend]", data));
  frontend.stderr.on("data", (data) => console.error("[frontend]", data));

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

  setTimeout(() => {
    win.loadURL("http://localhost:4001");
  }, 3000);
});

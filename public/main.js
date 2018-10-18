const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain
} = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, 'stairs.png')
const isDev = require('electron-is-dev');

let mainWindow;
let settingsChildWindow;
let preferencesWindow;
let aboutWindow;
let tray;
let menu;

function getWindowPosition() {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
}

function showWindow() {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus();
}

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 200,
    show: false,
    center: true,
    alwaysOnTop: true,
    title: "About",
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    resizable: false,
    backgroundColor: "#eee"
  });
  aboutWindow.loadURL(
    isDev
      ? "http://localhost:3000/about.html"
      : `file://${path.join(__dirname, "../build/about.html")}`
  );
  aboutWindow.on('close', (e) => {
    e.preventDefault();
    aboutWindow.hide();
  });
}

function createPreferencesWindow() {
  preferencesWindow = new BrowserWindow({
    width: 300,
    height: 300,
    show: false,
    center: true,
    alwaysOnTop: true,
    title: "Preferences",
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    // resizable: false,
    backgroundColor: "#eee"
  });
  preferencesWindow.loadURL(
    isDev
      ? "http://localhost:3000/preferences"
      : `file://${path.join(__dirname, "../build/index.html/preferences")}`
  );
  preferencesWindow.on('close', (e) => {
    e.preventDefault();
    preferencesWindow.hide();
  });
}

const menuTemplate = [
  {
    label: "About Steps",
    click: () => {
      aboutWindow.show();
    }
  },
  {
    type: "separator"
  },
  {
    label: "Preferences",
    accelerator: "Cmd+,",
    click: () => {
      preferencesWindow.show();
    }
  },
  {
    type: "separator"
  },
  {
    label: "Quit Steps",
    accelerator: "Cmd+Q",
    click: () => {
      mainWindow.close();
    }
  }
]

function createMenu() {
  menu = new Menu.buildFromTemplate(menuTemplate);
}

function createTray() {
  tray = new Tray(iconPath);

  tray.on("click", () => {
    toggleWindow();
  });
  tray.on("right-click", () => {
    tray.popUpContextMenu(menu);
  })
}

function createSettingsChildWindow() {
  settingsChildWindow = new BrowserWindow({
    width: 160,
    height: 172,
    show: false,
    frame: false,
    parent: mainWindow,
    resizable: false,
    focus: true
  });
  settingsChildWindow.on('blur', () => {
    settingsChildWindow.hide();
    mainWindow.focus();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 248,
    show: false,
    frame: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on('blur', () => {
    if (!settingsChildWindow.isVisible()) {
      mainWindow.hide();
    }
  });
}

function setIpcListeners() {
  ipcMain.on('open-habit-settings', (_, arg) => {
    settingsChildWindow.loadURL(
      isDev
        ? 'http://localhost:3000/habit-settings'
        : `file://${path.join(__dirname, "../build/index.html/habit-settings")}`
    );

    const { screen } = require('electron');
    const { x, y } = screen.getCursorScreenPoint();

    settingsChildWindow.setPosition(x, y);
    settingsChildWindow.show();

    settingsChildWindow.webContents.on('did-finish-load', () => {
      settingsChildWindow.webContents.send('habit-data', arg)
    });
  });

  ipcMain.on('handle-settings-delete-click', () => {
    mainWindow.webContents.send('reload-db');
    settingsChildWindow.hide();
  });
}

app.on('ready', () => {
  createMenu();
  createAboutWindow();
  createPreferencesWindow();
  createTray();
  createWindow();
  createSettingsChildWindow();
  setIpcListeners();
});

app.dock.hide();
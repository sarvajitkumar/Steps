const {
  app,
  BrowserWindow,
  Tray,
  Menu,
} = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, 'stairs.png')
const isDev = require('electron-is-dev');

let mainWindow;
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
    title: "",
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
      console.log('open preferences');
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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 300,
    show: false,
    frame: false
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
}

app.on('ready', () => {
  createMenu();
  createAboutWindow();
  createTray();
  createWindow();
});

app.dock.hide();
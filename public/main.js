const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  Notification
} = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, 'lock.png')
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
    height: 180,
    show: false,
    center: true,
    alwaysOnTop: true,
    title: "Preferences",
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    resizable: false,
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
      app.quit();
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
    width: 300,
    height: 340,
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
    minWidth: 300,
    width: 650,
    minHeight: 400,
    height: 650,
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
        ? `http://localhost:3000/habit-settings/${arg._id}`
        : `file://${path.join(__dirname, `../build/index.html/habit-settings/${arg._id}`)}`
    );

    const { screen } = require('electron');
    const { x, y } = screen.getCursorScreenPoint();

    settingsChildWindow.setPosition(x, y);
    settingsChildWindow.show();
  });

  ipcMain.on('handle-settings-delete-click', () => {
    mainWindow.webContents.send('reload-db');
    settingsChildWindow.hide();
  });

  const reminders = [];
  ipcMain.on('add-reminder', (_, countdown, message) => {
    function setUpInterval(notification) {
      const interval = setInterval(() => {
        notification.show();
      }, 604800000);

      reminders.push(interval);
    }

    const timeout = setTimeout(() => {
      const notification = new Notification({
        title: "Steps",
        body: message
      }).show();

      setUpInterval(notification);
    }, countdown);

    reminders.push(timeout);
  });

  //set up height listeners for mainWindow
  ipcMain.on('set-initial-height', (_, habitCount) => {
    const newHeight = 71 + ((habitCount-1)*36);
    let [width, height] = mainWindow.getSize();

    //we call in habit list item settings so in that case we wouldn't
    //need to reset initial height
    if (newHeight !== height) {
      mainWindow.setSize(width, newHeight);
    }
  });
  ipcMain.on('resize-height', (_, shouldAdd) => {
    let [width, height] = mainWindow.getSize();
    height = shouldAdd ? height+36 : height-36;
    mainWindow.setSize(width, height);
  });

  //set up width listener for mainWindow
  ipcMain.on('set-width', (_, widthString) => {
    const size = mainWindow.getSize();
    mainWindow.setSize(parseInt(widthString), size[1])
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
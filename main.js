const { app, BrowserWindow , screen} = require('electron')

const createWindow = (h) => {
    let win = new BrowserWindow({
      width: 600,
      height: 970,
      icon : "icon.ico",
    })
    win.loadFile('index.html')
  }
  app.whenReady().then(() => {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
    createWindow(height)
  })
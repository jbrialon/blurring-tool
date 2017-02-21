import PIXI from 'pixi.js'

// ----------------------------------------------------------------------------------------------------
// default letiables
// ----------------------------------------------------------------------------------------------------
const defaultwidth = 1280
const defaultHeight = 600

let startPoint
let endPoint
let theMask
let pictureBlurred

// ----------------------------------------------------------------------------------------------------
// Create the renderer
// ----------------------------------------------------------------------------------------------------
const stage = new PIXI.Container()
const renderer = PIXI.autoDetectRenderer(
  defaultwidth, defaultHeight,
  {antialias: true, transparent: true, resolution: 1, autoResize: true}
)
document.body.appendChild(renderer.view)

// ----------------------------------------------------------------------------------------------------
// Create the button
// ----------------------------------------------------------------------------------------------------

const button = document.createElement('button')
button.innerHTML = 'get Image'
button.onclick = () => {
  renderer.render(stage)
  console.log(renderer.view.toDataURL())
}
document.body.appendChild(button)

// ----------------------------------------------------------------------------------------------------
// Loader
// TODO : make animated loader
// ----------------------------------------------------------------------------------------------------
PIXI.loader
  .add('./static/car.png')
  .load(setup)

// ----------------------------------------------------------------------------------------------------
// function: Setup the tool
// ----------------------------------------------------------------------------------------------------
function setup () {
  const pictureSize = {
    width: PIXI.loader.resources['./static/car.png'].data.width,
    height: PIXI.loader.resources['./static/car.png'].data.height
  }

  renderer.resize(pictureSize.width, pictureSize.height)
  renderer.render(stage)

  // picture
  let picture = new PIXI.Sprite(
    PIXI.loader.resources['./static/car.png'].texture
  )
  stage.addChild(picture)
  stage.interactive = true

  pictureBlurred = new PIXI.Sprite(
    PIXI.loader.resources['./static/car.png'].texture
  )

  let blurFilter1 = new PIXI.filters.BlurFilter(3, 3)
  pictureBlurred.filters = [blurFilter1]
  stage.addChild(pictureBlurred)

  theMask = new PIXI.Graphics()
  theMask.beginFill()
  theMask.drawRect(0, 0, 1, 1)
  theMask.endFill()
  pictureBlurred.mask = theMask

  stage.addChild(theMask)
  stage.on('mousedown', handleDown)
  stage.on('mouseup', handleUp)
  // render
  window.requestAnimationFrame(render)
}

// ----------------------------------------------------------------------------------------------------
// Event: startMove
// ----------------------------------------------------------------------------------------------------
function handleDown (event) {
  startPoint = new PIXI.Point(event.data.global.x, event.data.global.y)
  stage.on('mousemove', handleMove)
  theMask.beginFill()
}

// ----------------------------------------------------------------------------------------------------
// Event: HandleMove
// ----------------------------------------------------------------------------------------------------

function handleMove (event) {
  endPoint = new PIXI.Point(event.data.global.x, event.data.global.y)
  theMask.clear()
  theMask.drawRect(startPoint.x, startPoint.y, ((endPoint.x - startPoint.x) + 20), ((endPoint.y - startPoint.y) + 20))
}

// ----------------------------------------------------------------------------------------------------
// Event: HandleUp
// ----------------------------------------------------------------------------------------------------
function handleUp (event) {
  theMask.endFill()
  stage.off('mousemove', handleMove)
}

// ----------------------------------------------------------------------------------------------------
// Function: render
// ----------------------------------------------------------------------------------------------------

function render () {
  renderer.render(stage)
  window.requestAnimationFrame(render)
}

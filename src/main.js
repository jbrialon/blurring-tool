import PIXI from 'pixi.js'

// ----------------------------------------------------------------------------------------------------
// default values
// ----------------------------------------------------------------------------------------------------
let width = 550
let height = 369

let startPoint
let endPoint
let theMask
let carBlurred

// ----------------------------------------------------------------------------------------------------
// Create the renderer
// ----------------------------------------------------------------------------------------------------
let stage = new PIXI.Container()
let renderer = PIXI.autoDetectRenderer(
  width, height,
  {antialias: true, transparent: true, resolution: 1, autoResize: true}
)
document.body.appendChild(renderer.view)

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
// setup the animation
// ----------------------------------------------------------------------------------------------------
function setup () {
  console.log('setup')

  // car
  let car = new PIXI.Sprite(
    PIXI.loader.resources['./static/car.png'].texture
  )
  stage.addChild(car)
  stage.interactive = true

  carBlurred = new PIXI.Sprite(
    PIXI.loader.resources['./static/car.png'].texture
  )

  var blurFilter1 = new PIXI.filters.BlurFilter(3, 3)
  carBlurred.filters = [blurFilter1]
  stage.addChild(carBlurred)

  theMask = new PIXI.Graphics()
  theMask.beginFill()
  theMask.drawRect(0, 0, 1, 1)
  theMask.endFill()
  carBlurred.mask = theMask

  stage.addChild(theMask)
  stage.on('mousedown', handleDown)
  stage.on('mouseup', handleUp)
  // render
  window.requestAnimationFrame(render)
}

// startMove
function handleDown (event) {
  startPoint = new PIXI.Point(event.data.global.x, event.data.global.y)
  stage.on('mousemove', handleMove)
  theMask.beginFill()
}

function handleMove (event) {
  endPoint = new PIXI.Point(event.data.global.x, event.data.global.y)
  theMask.clear()
  theMask.drawRect(startPoint.x, startPoint.y, ((endPoint.x - startPoint.x) + 20), ((endPoint.y - startPoint.y) + 20))
}

function handleUp (event) {
  theMask.endFill()
  stage.off('mousemove', handleMove)
}

function render () {
  renderer.render(stage)
  window.requestAnimationFrame(render)
}

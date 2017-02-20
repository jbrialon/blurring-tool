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
  // renderer.render(stage)
  window.requestAnimationFrame(render)
}

// startMove
function handleDown (event) {
  console.log('down:', event)
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
  // endPoint = new PIXI.Point(event.data.global.x, event.data.global.y)
  // theMask.drawRect(startPoint.x, startPoint.y, ((endPoint.x - startPoint.x) + 20), ((endPoint.y - startPoint.y) + 20))
  theMask.endFill()
  stage.off('mousemove', handleMove)
  // let carBlurred = new PIXI.Sprite(
  //   PIXI.loader.resources['./static/car.png'].texture
  // )
  //
  // var blurFilter1 = new PIXI.filters.BlurFilter(3, 3)
  // carBlurred.filters = [blurFilter1]
  //
  // // mask
  // let theMask = new PIXI.Graphics()
  // theMask.beginFill()
  // theMask.drawRect(startPoint.x, startPoint.y, ((endPoint.x - startPoint.x) + 20), ((endPoint.y - startPoint.y) + 20))
  // theMask.endFill()
  // stage.addChild(theMask)
  // carBlurred.mask = theMask
  // stage.addChild(carBlurred)
  //
  // console.log(startPoint, endPoint)
  // renderer.render(stage)
}

function render () {
  renderer.render(stage)
  window.requestAnimationFrame(render)
}


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')




canvas.width = 1024
canvas.height = 576


class GenericObject {
    constructor({x,y, image, w}) {
        this.position = {
           x,
           y
        }

        
        this.image = image
        this.width = w
        this.height = 20

    }
    draw() {
       c.drawImage(this.image, this.position.x, this.position.y, canvas.width + 5, canvas.height + 5)
    }
}


level1bg = new Image();
level1bg.src = './img/youWin.png';

home = new Image();
home.src = './img/houseIcon.png';



function init(){


    genericObject = [
        new GenericObject({
            x:-1,
            y:-1,
            image: level1bg
        })
    ]

   
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0, canvas.width, canvas.height)
   
    c.drawImage(home, 477.5, 350, 80, 80)


    genericObject.forEach(genericObject => {
        genericObject.draw()
    })



}


init()
animate()

const path = new Path2D()
path.rect( 477.5, 400.5, 73, 66)
path.closePath()



function getXY(canvas, event){ 
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    const x = event.clientX - rect.left
    console.log("x: " + x)
    console.log("y: " + y)
    return {x:x, y:y}
}


    document.addEventListener("click",  function (e) {
    const XY = getXY(canvas, e)
    if(c.isPointInPath(path, XY.x, XY.y)) {
        // Do Something with the click
        setTimeout(() =>{location.replace("./index.html");},500);
    }
    }, false)


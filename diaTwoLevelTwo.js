
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

class words {
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
       c.drawImage(this.image, this.position.x, this.position.y, 200, 100)
    }
  
}


bg = new Image();
bg.src = './img/renyubg.png';

m1 = new Image();
m1.src = './img/y1.png';

m2 = new Image();
m2.src = './img/y2.png';

m3 = new Image();
m3.src = './img/y3.png';

m4 = new Image();
m4.src = './img/y4.png';

m5 = new Image();
m5.src = './img/y5.png';

m6 = new Image();
m6.src = './img/y6.png';


function init(){


    genericObject = [
        new GenericObject({
            x:-1,
            y:-1,
            image: bg,
            type: "background"
        })
    ]
    wordsUse = []

   
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0, canvas.width, canvas.height)
    
    genericObject.forEach(genericObject => {
       
            genericObject.draw()
       
    })
    wordsUse.forEach(word => {
       
        word.draw()
   
})

}

dia = [m1, m2, m3, m4, m5, m6]
xs = [107.5, 439.5, 107.5, 439.5, 107.5, 439.5]
ys = [21.5, 83.5, 143.5, 203.5, 263.5, 323.5]

init()
animate()

const path = new Path2D()
path.rect( 754.5, 485.5, 191, 41)
path.closePath()



function getXY(canvas, event){ 
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    const x = event.clientX - rect.left
    console.log("x: " + x)
    console.log("y: " + y)
    return {x:x, y:y}
}


    index = 0;
    document.addEventListener("click",  function (e) {
    const XY = getXY(canvas, e)
    if(c.isPointInPath(path, XY.x, XY.y)) {
        // Do Something with the click
        console.log("clicked")
        if(index < 6){
          wordsUse.push(new words({
            x: xs[index],
            y: ys[index],
            image: dia[index],
            type: "words"
        }))
             
        }
        index = index + 1;
        if(index == 7){
            window.close();
        }
    
    }
    }, false)


function draw(){
    c.drawImage(dia[index], xs[index], ys[index]);
}
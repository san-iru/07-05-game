
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')




canvas.width = 1024
canvas.height = 576
const gravity = 0.5

frameSpeed = 0;

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100
        this.height = 100
        
        this.image = createMC()
        this.frames = 0
        this.sprites = {
            stand: {
              still: createMC(),
              win: createWinMC(),
              cropWidth: 81
              //width: 
            },
            run:{
                right: createRightSprite(),
                left: createLeftSprite(),
                cropWidth: 81
            }
        }

        this.currentSprite = this.sprites.stand.still
        this.currentCropWidth = 81

    }
    draw(){
        if (this.currentSprite == this.sprites.stand.still || this.currentSprite == this.sprites.stand.win){
            c.drawImage(this.currentSprite, 
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height)
    
        }
        else{
            c.drawImage(this.currentSprite, 
                this.currentCropWidth * this.frames,
                0,
                this.currentCropWidth ,
                85,
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height)
        }
        

    }
 
    update(){
        frameSpeed++
        if (this.currentSprite != this.sprites.stand.still){
            if (frameSpeed % 5 == 0) {
                this.frames++
            }
            
            if(this.frames > 5){
                this.frames = 0
            }

        }
       
        
       

        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x


       if (this.position.y + this.height + this.velocity.y <= canvas.height){
        this.velocity.y += gravity
       }
    
      
    }
}

class Platform {
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
        // c.fillStyle = 'black'
        // c.fillRect(this.position.x, this.position.y, 100, 200)
       c.drawImage(this.image, this.position.x, this.position.y)
    }
}

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
       c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class words {
    constructor({x,y, image, w, h}) {
        this.position = {
           x,
           y
        }

        
        this.image = image
        this.width = w
        this.height = h

    }
    draw() {
       c.drawImage(this.image, this.position.x, this.position.y, this.width , this.height)
    }
}

level1bg = new Image();
level1bg.src = './img/level3background.png';

home = new Image();
home.src = './img/houseIcon.png';

function createMC() {
    mc = new Image();
    mc.src = './img/mainCharacter.png';
    return mc;
}
function createWinMC(){
    mc = new Image();
    mc.src = './img/winMainCharacter.png';
    return mc;
}

//81 with 6 frames
function createRightSprite(){
    rightSprite = new Image();
    rightSprite.src = './img/rightSprite.png';
    return rightSprite;
}

function createLeftSprite(){
    leftSprite = new Image();
    leftSprite.src = './img/leftSprite.png';
    return leftSprite;
}

{
bigThick = new Image();
bigThick.src = './img/bigThick.png';

bigThin = new Image();
bigThin.src = './img/bigThin.png';

mediumThick = new Image();
mediumThick.src = './img/mediumThick.png';

mediumThin = new Image();
mediumThin.src = './img/mediumThin.png';

smallThick = new Image();
smallThick.src = './img/smallThick.png';

smallThin = new Image();
smallThin.src = './img/smallThin.png';

finish = new Image();
finish.src = './img/finish.png';

listenIn = new Image();
listenIn.src = './img/listenIn.png';

jakyung = new Image();
jakyung.src = './img/jakyung.png';

iress = new Image();
iress.src = './img/iress.png';

}

let player = new Player()
let platforms = []


let genericObject = []

let displayWords = []

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}


let scrollOffset = 0
const thickHeight = 75
const thinHeight = 46

const b = 395
const m = 245
const s = 94

function init(){
       player = new Player()
    platforms = [new Platform({x: -1, y:500, image: bigThick, w: b}), 
        new Platform({x: 575 + 10, y: 450, image: smallThick, w: s}),
        new Platform({x: 575 + 210, y: 350, image: smallThick, w: s}),
        new Platform({x: 575 + 410, y: 250, image: smallThick, w: s}),
        new Platform({x: 575 * 2 + 100 - 25, y:500, image: mediumThick, w: m}), //dia one
        new Platform({x: 575 * 3 - 100, y: 480, image: smallThin, w: s}),
        new Platform({x: 575 * 3 + 50, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 3 + 200, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 3 + 350, y: 260, image: smallThin, w: s}),
        new Platform({x: 575 * 3 + 500, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 3 + 650, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 4 + 100 + 100, y:500, image: bigThick, w: b}),

        new Platform({x: 575 * 4 + 490, y:245, image: mediumThin, w: m}),
        new Platform({x: 575 * 4 + 850, y:100, image: mediumThin, w: m}),
        new Platform({x: 575 * 6 + 100, y:500, image: mediumThick, w: m}),

        new Platform({x: 575 * 7 - 100, y: 480, image: smallThin, w: s}),
        new Platform({x: 575 * 7 + 50, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 7 + 200, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 7 + 350, y: 260, image: smallThin, w: s}),
        new Platform({x: 575 * 7 + 500, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 7 + 650, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 7 + 800, y: 480, image: smallThin, w: s}),

        new Platform({x: 575 * 9 - 100, y: 480, image: smallThin, w: s}),
        new Platform({x: 575 * 9 + 50, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 9 + 200, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 9 + 350, y: 260, image: smallThin, w: s}),
        new Platform({x: 575 * 9 + 500, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 9 + 650, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 9 + 800, y: 480, image: smallThin, w: s}),
        new Platform({x: 575 * 9 + 1050, y: 400, image: smallThick, w: s}),


        new Platform({x: 575 * 11 + 100, y:500, image: bigThick, w: b}),
        new Platform({x: 575 * 12 + 100, y:500, image: bigThick, w: b}),
        new Platform({x: 575 * 13 + 100, y:245, image: mediumThin, w: m}),

        
        new Platform({x: 575 * 14, y: 500, image: smallThick, w: s}),
        new Platform({x: 575 * 14 + 150, y: 500, image: smallThick, w: s}),
        new Platform({x: 575 * 14 + 300, y: 500, image: smallThick, w: s}),
        new Platform({x: 575 * 14 + 450, y: 500, image: smallThick, w: s}),
        new Platform({x: 575 * 14 + 600, y: 500, image: smallThick, w: s}),

        new Platform({x: 575 * 750, y: 420, image: smallThin, w: s}),
        new Platform({x: 575 * 14 + 900, y: 420, image: smallThin, w: s}),
        new Platform({x: 575 * 14 + 1050, y: 420, image: smallThin, w: s}),
        new Platform({x: 575 * 14 + 1200, y: 420, image: smallThin, w: s}),
        new Platform({x: 575 * 14 + 1350, y: 420, image: smallThin, w: s}),
        new Platform({x: 575 * 14 + 1500, y: 420, image: smallThin, w: s}),


        new Platform({x: 575 * 17 + 100, y:500, image: bigThick, w: b}),

        new Platform({x: 575 * 18 + 100 - 25, y:500, image: bigThick, w: b}), //dia two
        new Platform({x: 575 * 19 - 100 + 100, y: 480, image: smallThin, w: s}),
        new Platform({x: 575 * 19 + 50 + 100, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 19 + 200 + 100, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 19 + 350 + 100, y: 260, image: smallThin, w: s}),
        new Platform({x: 575 * 19 + 500 + 100, y: 320, image: smallThin, w: s}),
        new Platform({x: 575 * 19 + 650 + 100, y: 400, image: smallThin, w: s}),
        new Platform({x: 575 * 19 + 800 + 100, y: 480, image: smallThin, w: s}),


        new Platform({x: 575 * 21 + 100, y:500, image: bigThick, w: b}),
        new Platform({x: 575 * 22 - 100, y:500, image: bigThick, w: b}),
        new Platform({x: 575 * 23 - 100, y:500, image: bigThick, w: b}),
        new Platform({x: 575 * 24 - 200, y:500, image: bigThick, w: b}),
        new Platform({x: 575 * 25 - 200, y:500, image: bigThick, w: b})
    ]



    genericObject = [
        new GenericObject({
            x:-1,
            y:-1,
            image: level1bg
        })
    ]

    displayWords = [
        new words({
            x: 575 * 21 + 200, 
            y:350,
            image: finish,
            w: 350,
            h: 70
        }),
        new words({
            x:1250,
            y:300,
            image: listenIn,
            w: 220,
            h: 40
        }),
        new words({
            x:1250,
            y:400.5,
            image: jakyung,
            w: 191,
            h:100
           
        }),
        new words({
            x:575 * 18 + 100,
            y:300,
            image: listenIn,
            w: 220,
            h: 40
           
        }),
        new words({
            x: 575 * 18 + 100,
            y:406.5,
            image: iress,
            w: 181,
            h:107
           
        })


    ]
    scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0, canvas.width, canvas.height)
    bigThick = new Image();
    bigThick.src = './img/bigThick.png';
    c.drawImage(home, 10, 10, 10, 10)


    genericObject.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })

    displayWords.forEach(displayWord => {
        displayWord.draw()
    })

 
    c.drawImage(home, 10, 10, 60, 60)



    player.update()
    
    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    } else if ((keys.left.pressed && player.position.x > 100) ||(
    keys.left.pressed && scrollOffset == 0 && player.position.x > 0)){
        player.velocity.x = -5
    } 
    else {
        player.velocity.x = 0

        if (keys.right.pressed){
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            genericObject.forEach(genericObject => {
                genericObject.position.x -= 0.1
            })
            displayWords.forEach(displayWord => {
                displayWord.position.x -= 5
            })
            
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            genericObject.forEach(genericObject => {
                genericObject.position.x += 0.1
            })
            displayWords.forEach(displayWord => {
                displayWord.position.x += 5
            })
            
        }
    }

    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y 
            && player.position.x + player.width - 50 >= platform.position.x
            && player.position.x <= platform.position.x + platform.width - 50){
            player.velocity.y = 0
        }
    })
    //platform collision detection 
   
    //win condition  575 * 21 + 100
    if (scrollOffset >575 * 21 + 100){ //last platform x position
        player.currentSprite = player.sprites.stand.win
        setTimeout(() =>{location.replace("./youWin.html");},500);
        console.log('you win')
    }

    //lose condition
    if (player.position.y > canvas.height) {
        init()
    }


}


init()
animate()
console.log(scrollOffset);

const path = new Path2D()
path.rect(10, 10, 60, 60)
path.closePath()

const path2 = new Path2D()
path2.rect(292.5, 300, 300, 20)
path2.closePath()


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

    //first listen in 
    document.addEventListener("click",  function (e) {
        const XY = getXY(canvas, e)
        if(c.isPointInPath(path2, XY.x, XY.y)) {
            // Do Something with the click
            if(scrollOffset > 400 && scrollOffset < 1200){
                window.open("./diaOneLevelThree.html")
            }
            if(scrollOffset > 9950 && scrollOffset < 10680){
                window.open("./diaTwoLevelThree.html")
            }
            
           
        }
        }, false)


addEventListener('keydown', ({ keyCode }) => {
  
    switch (keyCode) {
        case 65: //a, 37
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            break
        case 37: //a, 37
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            console.log(scrollOffset);
            break
    

        case 83: //s, 40
            console.log('down')
           
            break
         case 40: //s, 40
            console.log('down')
           
            break


        case 68: //d 39
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            //player.currentWidth = player.sprites.run.width
            
            break
        case 39: //d 39
            console.log('right')
            console.log(scrollOffset);
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            
            break


        case 87: //w 38
            console.log('up')
            player.velocity.y -= 10
            break
         case 38: //w 38
            console.log('up')
            player.velocity.y -= 10
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
   
    switch (keyCode) {
        case 65: //a 37
            console.log('left')
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.still
            player.currentCropWidth = player.sprites.stand.cropWidth
            break
        case 37: //a 37
            console.log('left')
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.still
            player.currentCropWidth = player.sprites.stand.cropWidth
            break


        case 83: //s 40
            console.log('down')
            
            break
        case 40: //s 40
            console.log('down')
            
            break


        case 68: //d 39
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.still
            player.currentCropWidth = player.sprites.stand.cropWidth
            break
        case 39: //d 39
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.still
            player.currentCropWidth = player.sprites.stand.cropWidth
            break


        case 87: //w 38
            console.log('up')
            break
        case 38: //w 38
            console.log('up')
            break
    }
})
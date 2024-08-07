function Coords(x,y){
    this.x = x;
    this.y = y;

    // functions
    this.set = function(t_x,t_y)
    {
        x = t_x;
        y = t_y;
    };
}

let mousePosition = new Coords(0,0);

function Sprite(sprite, position, frameSize, spriteStart, scaleFactor)
{
    this.spriteSheet = sprite;
    this.pos = position;
    this.frameSize = frameSize;
    this.spriteStart = spriteStart;
    this.scaleFactor = scaleFactor;

    this.changeSpriteStart = function(spriteStart)
    {
        this.spriteStart = spriteStart;
    };

    this.changeFrameTo = function(num)
    {
        this.spriteStart.x = this.frameSize.x * num;
    }

    this.render = function()
    {
        //ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
        context.drawImage(this.spriteSheet, this.spriteStart.x, this.spriteStart.y, 
            this.frameSize.x,this.frameSize.y,this.pos.x,this.pos.y,this.frameSize.x * this.scaleFactor,this.frameSize.y * this.scaleFactor);
    };
}

function AnimatedSprite(sprite, position, frameAmt, frameSize, spriteStart, waitTime, scaleFactor)
{
    this.spriteSheet = sprite;
    this.pos = position;
    this.frameAmt = frameAmt;
    this.frameSize = frameSize;
    this.spriteStart = spriteStart;
    this.waitTime = waitTime;
    this.currentFrame = 0;
    this.currentWaitTime = 0;
    this.scaleFactor = scaleFactor;

    this.update = function()
    {
        this.currentWaitTime++;
        if(this.currentWaitTime >= this.waitTime)
        {
            this.currentWaitTime = 0;
            this.currentFrame++;
            if(this.currentFrame >= this.frameAmt)
                this.currentFrame = 0;
            
            this.spriteStart = new Coords(this.frameSize.x * this.currentFrame, this.spriteStart.y);
        }
    };

    this.render = function()
    {
        //ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
        context.drawImage(this.spriteSheet, this.spriteStart.x, this.spriteStart.y, 
            this.frameSize.x,this.frameSize.y,this.pos.x,this.pos.y,this.frameSize.x * this.scaleFactor,this.frameSize.y * this.scaleFactor);
    };
}

// decleration of the background object
let backSprite = new Image;
backSprite.src = "src/assets/imgs/background.png";

// sprite, position, frameAmt, frameSize, spriteStart, waitTime, scaleFactor
let background = new AnimatedSprite(backSprite,new Coords(0,0),54,new Coords(480,854),new Coords(0,0),8,1);

function initialiseGame()
{let Environment = {
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isIOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    isMobile: function() {
        return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindows());
    }
};



if(Environment.isMobile())
{
window.addEventListener("touchend", touchEnding);
window.addEventListener('touchmove', touchMove);
window.addEventListener('touchstart', touchStartFunc);
}

else
{
window.addEventListener("mousedown", canvasClicked);
window.addEventListener("mouseup", canvasReleased);
window.addEventListener("mousemove", canvasMoved);
}}

function Button(Sprite, pos, size, buttonStartHeight, scaleFactor, onClickFunction)
{
    // standard initialisation
    this.sprite = Sprite;
    this.position = pos;
    this.sizeX = size.x;
    this.sizeY = size.y;
    this.buttonClicked = false;
    this.hoverOver = false;
    this.spriteStartX = 0;
    this.spriteStartY = buttonStartHeight;
    this.scaleFactor = scaleFactor;
    this.mouseDown = false;
    this.onClickFunction = onClickFunction;


    // handles the click event 
    this.click = function()
    {
        this.mouseDown = true;
        if(this.hoverOver)
        {
            console.log("clicked on button");
            // change the sprite type here
            this.setSpriteToPosition(2);
            return true;
        }
    };

    // handles all release click events
    this.releaseClick = function()
    {
        this.mouseDown = false;
        // change the game state
        if(this.hoverOver)
        {
            // do the function thats needed here!
            this.setSpriteToPosition(1);

            return this.onClickFunction();
        }
        else
        {
            this.setSpriteToPosition(0);
        }
    }


    // handles the update function of the button (checking mouse position)
    this.update = function(){
        if(this.checkMouseInButton())
           {
                //console.log("inbutton");
                this.hoverOver = true;
                this.setSpriteToPosition(1);
                //console.log(this.spriteStartX);
                if(this.mouseDown)
                {
                    this.setSpriteToPosition(2);
                }
           }
           else
           {
                this.setSpriteToPosition(0);
                this.hoverOver = false;
           }
    };

    // handles rendering of the button
    this.render = function()
    {
         //ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
         context.drawImage(this.sprite, this.spriteStartX, this.spriteStartY, this.sizeX , this.sizeY,
            this.position.x,this.position.y,this.sizeX *  this.scaleFactor , this.sizeY * this.scaleFactor);
    };

    this.checkMouseInButton = function()
    {
        return (mousePosition.x >= this.position.x && mousePosition.x <= this.position.x + this.sizeX * this.scaleFactor &&
        mousePosition.y >= this.position.y && mousePosition.y <= this.position.y + this.sizeY * this.scaleFactor);
    };
    
    this.setSpriteToPosition = function(num)
    {
        this.spriteStartX = this.sizeX * num;
    }
}

// ***************************************************
//          mobile Input
// ***************************************************
function touchEnding(event)
{
    canvasReleased();
}
function touchMove(event)
{
    lastMove = event;

    console.log(lastMove);

    let posX = lastMove.changedTouches[0].pageX;
    let posY = lastMove.changedTouches[0].pageY;

    mousePosition = new Coords(posX- canvas.getBoundingClientRect().x , posY- canvas.getBoundingClientRect().y);
}
function touchStartFunc(event)
{
    lastMove = event;

    let posX = lastMove.changedTouches[0].pageX;
    let posY = lastMove.changedTouches[0].pageY;

    mousePosition = new Coords(posX- canvas.getBoundingClientRect().x , posY- canvas.getBoundingClientRect().y);

    canvasClicked();
}
// ***************************************************

// ***************************************************
//          normal Input
// ***************************************************
const buttonWidth = 64;
const buttonHeight = 32;
let standardButtons = new Image;
standardButtons.src = "src/assets/imgs/normalButton.png";

let buttonScaleFactor = 1;
// functions that will be executed when you press the respective buttons
let leftButtonFunction = function(){ console.log("Left");}
let rightButtonFunction = function(){ console.log("Right");}

let moveButtons = [new Button(standardButtons, new Coords((0 ),0), new Coords(buttonWidth,buttonHeight), buttonHeight*1 , buttonScaleFactor, leftButtonFunction),
                   new Button(standardButtons, new Coords((150 ),100), new Coords(buttonWidth,buttonHeight), buttonHeight*2 , buttonScaleFactor, rightButtonFunction)
];
function canvasClicked()
{
    for(let i = 0;i<moveButtons.length;i++)
        moveButtons[i].click();
}
function canvasReleased()
{
    for(let i = 0;i<moveButtons.length;i++)
        moveButtons[i].releaseClick();
}




function canvasMoved()
{
    let e = window.event;

    let posX = e.clientX;
    let posY = e.clientY;

    mousePosition = new Coords(posX- canvas.getBoundingClientRect().x , posY- canvas.getBoundingClientRect().y);
    console.log(mousePosition);
}
// ***************************************************


function render()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.render();

    for(let i =0; i < moveButtons.length;i++)
        moveButtons[i].render();
}

function update()
{
    for(let i =0; i < moveButtons.length;i++)
        moveButtons[i].update();

    console.log("Updating");
}

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

function render()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.render();
}

function update()
{
    background.update();
    console.log("Updating");
}

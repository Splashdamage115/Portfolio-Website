let changeActive = false;
let changingToLight = false;
let changeTime = .5;

class RGB{
    constructor(t_r,t_g,t_b)
    {
        this.r = t_r;
        this.g = t_g;
        this.b = t_b;
    }
    color(){
        return "#" + String(this.r) + String(this.g) + String(this.b);
    }
    setColor(t_newColor)
    {
        this.r = t_newColor.r;
        this.g = t_newColor.g;
        this.b = t_newColor.b;
    }

    r = 0;
    g = 0;
    b = 0;
}

let currentColor = new RGB(24, 21, 24);
let currentFontColor = new RGB(0, 0, 0);

document.querySelector("input[name=DarkMode]").addEventListener('change', function() {
    if(this.checked)
    {
        changeActive = true;
        changingToLight = true;
        animateBackgroundColor();
    }
    else
    {
        changeActive = true;
        changingToLight = false;
    }
});

function animateBackgroundColor() 
{
   if(changingToLight)
   {
    if(currentColor.r < 255)
        currentColor.r += 1;
    if(currentColor.g < 255)
        currentColor.g += 1;
    if(currentColor.b < 255)
        currentColor.b += 1;
        document.body.style.background = currentColor.color();
    if(currentColor.color() == "#255255255")
        changeActive = false;
   }
   else
   {
    if(currentColor.r > 24)
        currentColor.r -= 1;
    if(currentColor.g > 21)
        currentColor.g -= 1;
    if(currentColor.b > 24)
        currentColor.b -= 1;
        document.body.style.background = currentColor.color();
    if(currentColor.r == 24 && currentColor.g == 21 && currentColor.b == 24)
        changeActive = false;
   }
   if(changeActive)
    setInterval(animateBackgroundColor, 100);
}
let animatingTimeLine = false;

function animateBackGroundContent()
{
    if(animatingTimeLine)
    {

    }
    window.requestAnimationFrame(animateBackGroundContent);
}
window.requestAnimationFrame(animateBackGroundContent);

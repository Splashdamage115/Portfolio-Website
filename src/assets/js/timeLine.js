let animate = false;
// initialise the canvas object
let canvas; 
let context;

function loadTimeLine() {
    let url = 'src/assets/jsonHost/miniDisplay.json';
  
    fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
      .then((responseJson) => {
        console.log("SUCCESFULLY LOADED MINI DISPLAY FILE");
        if (!firstTime) { clearNew(); }
        firstTime = false;
        loadTimeLineContent(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }

function loadTimeLineContent(t_jsonFile)
{
    animate = false
    console.log("All of de Games");

    let newItem = createElement('section', {id: 'timeLine'});
    
    document.getElementById("clearWrapper").appendChild(newItem);

    let ulItem = createElement('ul', { id:"List"});
    document.getElementById("timeLine").appendChild(ulItem);
    let bgBar = createElement('div', {id:"bgBar"});
    bgBar.style.top =  "120px";
    //bgBar.style.height = "1200px";
    bgBar.style.width = "30px";
    document.getElementById("clearWrapper").appendChild(bgBar);

    // first is the home screen
    for(let i = 0; i < Object.keys(t_jsonFile["info"]).length; i++)
    {
      animatingTimeLine = true;
        let newLi = createElement('li', { class:"TimeLineItem"});
        let newLiContent = createElement('div', {class:"timeLineContent"},[t_jsonFile["info"][i]["displayName"], "<br>", t_jsonFile["info"][i]["date"]]);
        let newImage = createElement('img', {class:"timeLineImage", src: t_jsonFile["info"][i]["img"], width: "80px", height: "80px"});
        let newDescription = createElement('p', {class:"timeLineDescription"}, t_jsonFile["info"][i]["description"]);

        let listItemButton = createElement('button', { class:"listItemButton", onclick: "loadGame('" + t_jsonFile["info"][i]["name"] + "')"}, "");

        listItemButton.style.top = t_jsonFile["info"][i]["gap"];
        newLiContent.style.top = t_jsonFile["info"][i]["gap"];

        newLi.appendChild(newLiContent);
        newLi.appendChild(listItemButton);

        newLiContent.appendChild(newImage);
        newLiContent.appendChild(newDescription);

        document.getElementById("List").appendChild(newLi);
    }

    newItem = createElement('h1', {}, "Time Line For All My Main Projects");
    document.getElementById("clearWrapper").appendChild(newItem);
    newItem = createElement('p', {}, "(See Projects on left, and click to enter Project)");
    document.getElementById("clearWrapper").appendChild(newItem);
    newItem = createElement('p', {}, "(For Mobile press and hold to see Info, then click again to enter)");
    document.getElementById("clearWrapper").appendChild(newItem);

    newItem = createElement('h1', {}, "The current Project Im working on: ");
    document.getElementById("clearWrapper").appendChild(newItem);
    newItem = createElement('p', {}, "Project code name : Red Castle");
    document.getElementById("clearWrapper").appendChild(newItem);
    newItem = createElement('p', {}, "This is my current big project I am working on, it is a rogue like shooter with many guns, and randomly generated dungeon rooms!");
    document.getElementById("clearWrapper").appendChild(newItem);
    newItem = createElement('p', {}, "Teaser Trailer: ");
    document.getElementById("clearWrapper").appendChild(newItem);
    newItem = createElement('iframe', {
      src: "https://www.youtube.com/embed/suwh68bwX8I", allowfullscreen: "true"
    });
    document.getElementById("clearWrapper").appendChild(newItem);

    // Temporarily removing canvas till ready to work on!
    /*newItem = createElement('canvas', {id:"the_canvas"}, "oops! it looks like your browser doesnt support canvas!")
    document.getElementById("clearWrapper").appendChild(newItem);
    canvas = document.getElementById("the_canvas");
    context  = canvas.getContext("2d");*/

    animate = true;
    
    newItem = createElement('p', {} ,'<br>');
    document.getElementById("clearWrapper").appendChild(newItem);

    newItem = createElement('video', {autoplay:"true",loop:"true", width:"80%"});
    newItem.appendChild(createElement('source', {src:"src/assets/imgs/Render.mp4", type:"video/mp4"}))
    document.getElementById("clearWrapper").appendChild(newItem);

    // ***********************************************************
    //            Re-comment this in too for the canvas
    // ***********************************************************
    //initialiseGame();
    //animateMenuItems();
}


function animateMenuItems()
{
    update();
    render();
    if(animate)
    {
    window.requestAnimationFrame(animateMenuItems);
  }
}



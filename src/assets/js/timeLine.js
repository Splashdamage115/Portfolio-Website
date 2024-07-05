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
    console.log("All of de Games");

    let newItem = createElement('section', {id: 'timeLine'});
    document.getElementById("clearWrapper").appendChild(newItem);

    let ulItem = createElement('ul', { id:"List"});
    document.getElementById("timeLine").appendChild(ulItem);
    let bgBar = createElement('div', {id:"bgBar"});
    bgBar.style.top =  "120px";
    bgBar.style.height = "1200px";
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

        let listItemButton = createElement('button', { class:"listItemButton", onclick: ""}, "");

        listItemButton.style.top = t_jsonFile["info"][i]["gap"];
        newLiContent.style.top = t_jsonFile["info"][i]["gap"];

        newLi.appendChild(newLiContent);
        newLi.appendChild(listItemButton);

        newLiContent.appendChild(newImage);
        newLiContent.appendChild(newDescription);

        document.getElementById("List").appendChild(newLi);
    }
}

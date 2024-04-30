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
        console.log(error)
      });
  }

function loadTimeLineContent(t_jsonFile)
{
    console.log("All of de Games");

    let newItem = createElement('section', {id: 'timeLine'})
    document.getElementById("clearWrapper").appendChild(newItem);

    let ulItem = createElement('ul', { id:"List"})
    document.getElementById("timeLine").appendChild(ulItem);

    // first is the home screen
    for(let i = 0; i < Object.keys(t_jsonFile["info"]).length; i++)
    {
        let newLi = createElement('li', { class:"TimeLineItem"});
        let newLiContent = createElement('div', {class:"timeLineContent"},[t_jsonFile["info"][i]["displayName"], "<br>", t_jsonFile["info"][i]["date"]]);
        let listItemButton = createElement('button', { class:"listItemButton"}, "")
        listItemButton.style.top = t_jsonFile["info"][i]["gap"];
        newLiContent.style.top = t_jsonFile["info"][i]["gap"];

        newLiContent

        newLi.appendChild(newLiContent);
        newLi.appendChild(listItemButton);
        document.getElementById("List").appendChild(newLi);
    }
}

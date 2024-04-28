
function loadGame(readName) {
  let url = 'src/assets/jsonHost/data.json';

  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
    .then((responseJson) => {
      console.log("SUCCESFULLY LOADED JSON FILE");
      readJsonFile(responseJson, readName);
    })
    .catch((error) => {
      console.log(error)
    });
}

//document.getElementById("load").addEventListener("onclick", loadGame("Items"));


function createElement(element, attribute, inner) {
  if (typeof inner === 'undefined') {
    inner = '';
  }

  const el = document.createElement(element);

  if (typeof attribute === 'object') {
    for (const key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }

  if (!Array.isArray(inner)) {
    inner = [inner];
  }

  for (let k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(document.createTextNode(inner[k]));
    }
  }

  return el;
}

function readJsonFile(t_jsonFile, readName) {
  for (let i = 0; i < Object.keys(t_jsonFile[readName]).length; i++) {
    if (t_jsonFile[readName][i].hasOwnProperty('Heading')) {
      let newItem = createElement('h1', { id: 'Heading' }, t_jsonFile[readName][i]["Heading"]);
      document.body.appendChild(newItem);
    }

    if (t_jsonFile[readName][i].hasOwnProperty('Text')) {
      let subText = createElement('p', { id: 'subText' }, t_jsonFile[readName][i]["Text"]);
      document.body.appendChild(subText);
    }

    if (t_jsonFile[readName][i].hasOwnProperty('Img')) {
      let Image = createElement('img', {
        src: t_jsonFile[readName][i]["Img"]["file"],
        alt: t_jsonFile[readName][i]["Img"]["alt"],
        width: t_jsonFile[readName][i]["Img"]["size"]["width"],
        height: t_jsonFile[readName][i]["Img"]["size"]["height"]
      });
      document.body.appendChild(Image);
    }

    // <iframe width="420" height="315" src="Youtube link"> </iframe>
    if (t_jsonFile[readName][i].hasOwnProperty('Video')) {
      let video = createElement('iframe', {
        src: t_jsonFile[readName][i]["Video"]["file"], allowfullscreen: "true", width: t_jsonFile[readName][i]["Video"]["size"]["width"],
        height: t_jsonFile[readName][i]["Video"]["size"]["height"]
      });
      document.body.appendChild(video);
    }
  }

  //document.getElementById("Heading1").innerHTML = t_jsonFile["Heading"];
}
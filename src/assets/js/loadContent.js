let firstTime = true;

function loadPage(readName) {
  window.open(readName, '_blank');
}

// parse a new json web
function loadGame(readName) {
  animate = false;
  let url = 'src/assets/jsonHost/data.json';
  console.log("Here");
  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
    .then((responseJson) => {
      console.log("SUCCESFULLY LOADED JSON FILE");
      if (!firstTime) { clearNew(); }
      firstTime = false;
      readJsonFile(responseJson, readName);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
    .catch((error) => {
      console.log(error)
    });
}


// creating of a new element for the website
function createElement(element, attribute, inner) {
  if (typeof inner === 'undefined') {
    inner = '';
  }

  const newElement = document.createElement(element);

  if (typeof attribute === 'object') {
    for (const key in attribute) {
      newElement.setAttribute(key, attribute[key]);
    }
  }

  if (!Array.isArray(inner)) {
    inner = [inner];
  }

  for (let k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      newElement.appendChild(inner[k]);
    } else {
      if (inner[k] === "<br>") {
        newElement.appendChild(document.createElement("br"));
      } else {
        newElement.appendChild(document.createTextNode(inner[k]));
      }
    }
  }

  return newElement;
}

let Environment = {
  isAndroid: function () {
    return navigator.userAgent.match(/Android/i);
  },
  isBlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  isIOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  isOpera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  isWindows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  isMobile: function () {
    return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindows());
  }
};

function readJsonFile(t_jsonFile, readName) {
  // adding of headings into html site

  if (readName == 'All') {
    clearNew();
    alert("ERROR: LOADING ALL CONTENT");
    return;
  }

  for (let i = 0; i < Object.keys(t_jsonFile[readName]).length; i++) {
    if (t_jsonFile[readName][i].hasOwnProperty('Heading')) {
      let newItem = createElement('h1', { id: 'Heading' }, t_jsonFile[readName][i]["Heading"]);
      document.getElementById("clearWrapper").appendChild(newItem);
    }

    // adding of standard text into html site
    if (t_jsonFile[readName][i].hasOwnProperty('Text')) {
      let subText = createElement('p', { id: 'subText' }, t_jsonFile[readName][i]["Text"]);
      document.getElementById("clearWrapper").appendChild(subText);
    }

    // parsing of image data for pushing into html
    if (t_jsonFile[readName][i].hasOwnProperty('Img')) {
      let Image = createElement('img', {
        src: t_jsonFile[readName][i]["Img"]["file"],
        alt: t_jsonFile[readName][i]["Img"]["alt"],
        width: t_jsonFile[readName][i]["Img"]["size"]["width"],
        height: t_jsonFile[readName][i]["Img"]["size"]["height"]
      });
      document.getElementById("clearWrapper").appendChild(Image);
    }

    if (t_jsonFile[readName][i].hasOwnProperty('Button')) {
      let Button = createElement('button', {
        onclick: "loadPage('" + t_jsonFile[readName][i]["Button"]["Link"] + "')",
        class: "LinkButton"
      },
        t_jsonFile[readName][i]["Button"]["Text"]);
      document.getElementById("clearWrapper").appendChild(Button);
    }

    // Parsing of the Video properties
    //   used for Youtube video parsing
    if (t_jsonFile[readName][i].hasOwnProperty('Video')) {
      let video = createElement('iframe', {
        src: t_jsonFile[readName][i]["Video"]["file"], allowfullscreen: "true", width: t_jsonFile[readName][i]["Video"]["size"]["width"],
        height: t_jsonFile[readName][i]["Video"]["size"]["height"]
      });
      document.getElementById("clearWrapper").appendChild(video);
    }

    function widthCheck() {
      if (t_jsonFile[readName][i]['Parallax']['size'].hasOwnProperty('width')) {
        return t_jsonFile[readName][i]["Parallax"]["size"]["width"];
      } else { return "80%"; }}

    if (t_jsonFile[readName][i].hasOwnProperty('Parallax')) {
      if (Environment.isIOS()) {
        let Image = createElement('img', {
          src: t_jsonFile[readName][i]["Parallax"]["file"],
          width: widthCheck()
        
        });
       
      document.getElementById("clearWrapper").appendChild(Image);
    }
    else {
      let parallaxImage = createElement('div', {
        class: "parallax"
      });
      parallaxImage.style.backgroundImage = "url('" + String(t_jsonFile[readName][i]["Parallax"]["file"]) + "')";
      parallaxImage.style.minHeight = t_jsonFile[readName][i]["Parallax"]["size"]["height"];
      if (t_jsonFile[readName][i]['Parallax']['size'].hasOwnProperty('width')) {
        parallaxImage.style.width = t_jsonFile[readName][i]["Parallax"]["size"]["width"];
      }
      if (t_jsonFile[readName][i]['Parallax'].hasOwnProperty('position')) {
        parallaxImage.style.margin = "-10vw";
        parallaxImage.style.textAlign = t_jsonFile[readName][i]["Parallax"]["position"]["centeringPosition"];
        parallaxImage.style.left = t_jsonFile[readName][i]["Parallax"]["position"]["left"];
      }
      if (t_jsonFile[readName][i]['Parallax'].hasOwnProperty('overlay')) {
        parallaxImage.style.marginTop = t_jsonFile[readName][i]["Parallax"]["overlay"]["top"];
        parallaxImage.style.marginBottom = t_jsonFile[readName][i]["Parallax"]["overlay"]["bottom"];
      }
      else {
        parallaxImage.style.marginTop = "5vw";
        parallaxImage.style.marginBottom = "5vw";
      }
      document.getElementById("clearWrapper").appendChild(parallaxImage);
    }
  }
}

  //document.getElementById("Heading1").innerHTML = t_jsonFile["Heading"];
}

function clearNew() {
  animatingTimeLine = false;
  const node = document.getElementById("clearWrapper");
  if (node === null) {
    console.log("BODY COUDLNT BE FOUND");
    return;
  }
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}



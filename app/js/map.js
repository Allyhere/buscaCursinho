/*Variables */

let card = [];
/*View do mapa */

var lilacIcon = L.icon({
  iconUrl: "app/assets/LocationLilac.svg",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var greenIcon = L.icon({
  iconUrl: "app/assets/LocationGreen.svg",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var mymap = L.map("map").setView([-23.46243, -46.5618787], 12);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FtaWxvbWljaGVsZXR0byIsImEiOiJjazZmcnFpamIyYml3M29xamFiNDljN3MzIn0.KnK5jfTCdljEEEa_lSyz9g",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 10,
    id: "mapbox/streets-v11",
    accessToken:
      "pk.eyJ1IjoiY2FtaWxvbWljaGVsZXR0byIsImEiOiJjazZmcnFpamIyYml3M29xamFiNDljN3MzIn0.KnK5jfTCdljEEEa_lSyz9g"
  }
).addTo(mymap);

//Choose maptiles
async function chooseTile(tile) {
  console.log(tile.id);
  if (tile.id == "mapStreet") {
    await L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FtaWxvbWljaGVsZXR0byIsImEiOiJjazZmcnFpamIyYml3M29xamFiNDljN3MzIn0.KnK5jfTCdljEEEa_lSyz9g",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken:
          "pk.eyJ1IjoiY2FtaWxvbWljaGVsZXR0byIsImEiOiJjazZmcnFpamIyYml3M29xamFiNDljN3MzIn0.KnK5jfTCdljEEEa_lSyz9g"
      }
    ).addTo(mymap);
  } else if (tile.id == "mapSimple") {
    await L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }
    ).addTo(mymap);
  } else {
    await L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 18,
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      }
    ).addTo(mymap);
  }
}
//Dados do JSON
//Get
fetch("app/cursinhos.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(obj) {
    let cursosArray = Object.entries(obj);

    //Put the markers in the map
    for (var i = 0; i < cursosArray.length; i++) {
      marker = new L.marker(
        [
          cursosArray[i][1]["coordenadas"][0],
          cursosArray[i][1]["coordenadas"][1]
        ],
        { icon: lilacIcon },
        (title = "hey")
      )
        .bindPopup(cursosArray[i][1]["nome"])
        .addTo(myFeatureGroup);
    }
  })
  .catch(function(error) {
    console.error("holy sheet");
  });

/*add card on click event */

function fetchFromJSON(curso) {
  fetch("app/cursinhos.json")
    .then(function(res) {
      return res.json();
    })
    .then(function(obj) {
      let cursosArray = Object.entries(obj);
      for (var i = 0; i < cursosArray.length; i++) {
        let dadosCurso = cursosArray[i][1];
        if (dadosCurso["nome"] == curso) {
          console.log("hey");
          addCard(
            dadosCurso["nome"],
            dadosCurso["endereco"],
            dadosCurso["desc"],
            dadosCurso["diasFunc"],
            dadosCurso["horario"]
          );
        } else {
          console.log("nay");
        }
      }
    })
    .catch(function(error) {
      console.error(error, "holy sheet");
    });
}

/*click events */
let myFeatureGroup = L.featureGroup()
  .addTo(mymap)
  .on("click", groupClick);

function groupClick(event) {
  fetchFromJSON(event.layer._popup._content);
  // console.dir(event);
  // console.log(event.containerPoint);
}

/*get card info on click event */
function addCard(curso, end, desc, dias, hor) {
  document.getElementById("result").innerHTML = "";
  for (let i = 0; i < dias.length; i++) {
    dias = `<p class="text text--blue" id="func">${dias[i]} </div>`;
  }
  card.push(
    `
    <div class="course">
    <div class="course__info">
      <h2 class="title" id="title">${curso}</h2>
      <h3 class="subtitle" id="address">
       ${end}
      </h3>
  <ul class="tag__container" id="tag">
    <li class="tag__item tag__item--red">Exemplo</li>
    <li class="tag__item tag__item--green">Exemplo</li>
  </ul>
  <p class="text" id="desc">
    ${desc}
  </p>
  <p class="text text--blue" id="func">
    ${dias}, ${hor}
  </p>
  <div class="course__interact">
    <div class="course__rate">
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
    </div>
    <button class="btn course__btn">Inscreva-se</button>
  </div>
</div>
</div>`
  );
  document.getElementById("result").innerHTML = card;
  card = [];
}

/*Show all data from cards */
function showAllCards() {
  let container = document.getElementById("cursinho");
  if (container.innerHTML != "") {
    container.innerHTML = "";
  } else {
    document.getElementById("content").innerHTML = "";
    fetch("app/cursinhos.json")
      .then(function(res) {
        return res.json();
      })
      .then(function(obj) {
        let cursosArray = Object.entries(obj);
        for (let i = 0; i < cursosArray.length; i++) {
          let dadosCurso = cursosArray[i][1];
          console.log(i);
          console.log(dadosCurso);
          addCard(
            dadosCurso["nome"],
            dadosCurso["endereco"],
            dadosCurso["desc"],
            dadosCurso["diasFunc"],
            dadosCurso["horario"]
          );
        }
      })
      .catch(function(error) {
        console.error("holy sheet");
      });
  }
}

/*reverse geocoding*/
document.getElementById("submitAddress").addEventListener("click", ev => {
  ev.preventDefault();
});

function getLocation() {
  let address = document.getElementById("search").value;
  geoCoding(address);
}
//Achar o cursinho mais próximo

function findNearestCourse(coords) {
  axios
    .get("app/cursinhos.json")
    .then(function(response) {
      let newData = Object.entries(response.data);
      let coordArr = new Array();
      let dataArr = new Array();

      for (let i = 0; i < newData.length; i++) {
        newCoord = {
          latitude: newData[i][1]["coordenadas"][0],
          longitude: newData[i][1]["coordenadas"][1]
        };

        coordArr.push(newCoord);
        newAddress = {
          coord: newCoord,
          name: newData[i][1]["nome"]
        };
        dataArr.push(newAddress);
      }

      function findResponse(address) {
        return address.coord == geolib.findNearest(coords, coordArr);
      }

      let setSearch = dataArr.find(findResponse).coord;

      let addSearch = new Array();

      Object.values(setSearch).forEach(el => {
        addSearch.push(el);
      });

      mymap.flyTo(addSearch, 15);

      return fetchFromJSON(dataArr.find(findResponse).name);
    })
    .then(function(error) {
      console.error(error);
    });
}

function geoCoding(address) {
  let key = "AIzaSyCvxC3jE2NCTQkxU4YOWNW_7hSyqiGVrcE";
  let location = address;

  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: key
      }
    })
    .then(function(response) {
      let coords = response.data.results[0]["geometry"]["location"];
      return findNearestCourse(coords);
    })
    .catch(function(error) {
      document.getElementById("error").classList.add("result__error--show");
      setInterval(() => {
        document
          .getElementById("error")
          .classList.remove("result__error--show");
      }, 5000);
      clearInterval();
      console.error(error, "ih");
    });
}

// Adicionar Cursinho
function addCursinho() {
  let container = document.getElementById("content");
  if (container.innerHTML != "") {
    container.innerHTML = "";
  } else {
    document.getElementById("cursinho").innerHTML = "";
    let add = `<h2 class="cursinhos__title">Adicionar cursinho</h2>
    <form action="" method="get" class="cursinhos__form">
      <label for="nome" class="cursinho__label">Nome do cursinho</label>
      <input
        type="text"
        name="nome"
        id="nome"
        placeholder="Cursinho popular"
        class="cursinho__input"
      />
      <label for="endereco" class="cursinho__label"
        >Endereço do cursinho</label
      >
      <input
        type="text"
        name="endereco"
        id="endereco"
        class="cursinho__input"
        placeholder=" Rua Tal, 524"
      />
      <input type="submit" value="Enviar" class="cursinho__submit" />
    </form>
    <p class="endereco__test" id="endereco"></p>`;
    container.innerHTML = add;
  }
}

/**
 * page control
 */

let btnContainer = document.getElementById("navBtnContainer");

let arrBtn = [...btnContainer.children];

arrBtn.forEach(btn => {
  btn.addEventListener("click", function() {
    changeScreen(this.id);
  });
});

function changeScreen(param) {
  console.log(param);
  if (param == "searchCourse") {
    document
      .getElementById("searchContainer")
      .classList.toggle("result--hidden");
    closeContainer();
  }
}

function closeContainer() {
  document
    .getElementById("mainContainer")
    .classList.toggle("container--fullMap");
  setTimeout(function() {
    mymap.invalidateSize();
  }, 400);
}

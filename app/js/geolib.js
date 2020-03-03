const geolib = require("geolib");

//find nearest point

function findNearest(location) {
  axios
    .get("app/cursinhos.json")
    .then(function(response) {
      let newData = Object.entries(response.data);
      let coordArr = new Array();

      for (let i = 0; i < newData.length; i++) {
        let newCoord = {
          latitude: newData[i][1]["coordenadas"][0],
          longitude: newData[i][1]["coordenadas"][1]
        };
      }

      geolib.findNearest(location, [...newCoord]);

      // console.log(newData[0][1]["coordenadas"]);
      // console.log(newData.length - 1);
      console.dir(coordArr);
    })
    .then(function(error) {
      console.error(error, "ih");
    });
}

// geolib.findNearest({ latitude: 52.456221, longitude: 12.63128 }, [
//   { latitude: 52.516272, longitude: 13.377722 },
//   { latitude: 51.515, longitude: 7.453619 },
//   { latitude: 51.503333, longitude: -0.119722 },
//   { latitude: 55.751667, longitude: 37.617778 },
//   { latitude: 48.8583, longitude: 2.2945 },
//   { latitude: 59.3275, longitude: 18.0675 },
//   { latitude: 59.916911, longitude: 10.727567 }
// ]);

/**class Card {
  //object instance
  constructor() {
    this.JSONpath = "app/cursinhos.json";
    this.cursosArray = Object.entries(obj);
    this.coordX = setParam("coordenadas", [0]);
    this.coordY = setParam("coordenadas", [1]);
    this.nomeCurso = setParam("nome");
    this.endereco = setParam("endereco");
    this.desc = setParam("desc");
    this.diasFunc = setParam("diasFunc");
    this.horario = setParam("horario");
    this.cardContainer = document.getElementById("cardContainer");
    this.card = [];

    //setup, what is a map?
    //properties that i want to attach
  }

  setParam(valor, index) {
    this.param = this.cursosArray[i][1][valor][index];
  }

  addCard() {
    this.card.push(
      `<div class="cursinhos__card">
      <h2 class="cursinhos__title">${this.nomeCurso}</h2>
      <ul class="cursinho__info">
        <li class="cursinho__topic">Endereço:</li>
        <li class="cursinho__info">${this.endereco}</li>
        <li class="cursinho__topic">Sobre:</li>
        <li class="cursinho__info">${this.desc}</li>
        <li class="cursinho__topic">Funcionamento:</li>
        <li class="cursinho__info">${this.diasFunc}</li>
        <li class="cursinho__topic">Horário</li>
        <li class="cursinho__info">${this.horario[0]}:00h às ${this.horario[1]}:00h</li>
    
      </ul>
  </div>`
    );
  }

  showAllCursos(param) {
    if (this.cardContainer.innerHTML != "" && param == true) {
      this.cardContainer.innerHTML = "";
    } else {
      showAddCurso(false);
    }
  }

  showAddCurso(param) {}

  getMapData(curso) {
    fetch(this.JSONpath)
      .the(function(res) {
        return res.json();
      })
      .then(function(obj) {
        for (let i = 0; i < this.cursosArray; i++) {
          marker = new L.marker([this.coordX, this.coordY], (title = "hey"))
            .bindPopup(this.cursosArray)
            .addTo(myFeatureGroup);
        }
      })
      .catch(function(error) {
        console.error("erro");
      });
  }
}
*/

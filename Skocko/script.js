const divSviZnaci = document.querySelector("#svi-znaci");
const divPokusaji = document.getElementById("pokusaji");
const btnProveri = document.getElementById("proveri");
const pokusajRacunara = document.querySelectorAll("#pokusaj7 div");
const konacnoResenje = document.querySelectorAll("#pokusaj8 div");
const proveraResenjaRacunara = document.querySelectorAll(
  "#rezultat-pokusaja7 div"
);
const btnSledecaIgra = document.querySelector("#sledeca-igra");

const divVreme = document.getElementById("vreme");
const divPoeniPrvog = document.getElementById("poeni-prvog");
const divPoeniDrugog = document.getElementById("poeni-drugog");
const divIme = document.getElementById("ime-prvog");

let ime = localStorage.getItem("ime");
if (localStorage.getItem("ime")) {
  divIme.innerHTML = ime;
}

let poeniPrvog = +localStorage.getItem("poeni1");
let poeniDrugog = +localStorage.getItem("poeni2");
if (localStorage.getItem("poeni1") && localStorage.getItem("poeni2")) {
  divPoeniPrvog.innerHTML = +poeniPrvog;
  divPoeniDrugog.innerHTML = +poeniDrugog;
}

const allImages = [
  "herc.png",
  "karo.png",
  "pik.png",
  "skocko.png",
  "tref.png",
  "zvezda.png",

  "herc.png",
  "karo.png",
  "pik.png",
  "skocko.png",
  "tref.png",
  "zvezda.png",

  "herc.png",
  "karo.png",
  "pik.png",
  "skocko.png",
  "tref.png",
  "zvezda.png",

  "herc.png",
  "karo.png",
  "pik.png",
  "skocko.png",
  "tref.png",
  "zvezda.png",
];

let randomResenje = allImages
  .sort(() => Math.random() - Math.random())
  .slice(0, 4);

let randomResenjeRacunara = randomResenje
  .slice()
  .sort(() => Math.random() - Math.random());

let brPoena1 = 0;

let pokusaj = 0;
let counter = 0;

function sledeciRed() {
  pokusaj += 1;
  counter = 0;
}

let pok;
let pokusaji;
let proveraResenja;
let provera;
let pokusajResenja = [];

function removeImage(e) {
  if (e.target.tagName === "IMG") {
    let counterClass = +e.target.getAttribute("class");
    pok[counterClass].innerHTML = "";

    counter = counterClass;
    btnProveri.disabled = true;
  }
}

function init() {
  if (pok) {
    pok.forEach((p) => p.removeEventListener("click", removeImage));
  }

  if (pokusaj === 6) {
    return;
  }

  btnProveri.disabled = true;
  pokusajResenja = [];

  pokusaji = document.querySelectorAll(".pokusaj");
  pok = pokusaji[pokusaj].querySelectorAll("div");

  proveraResenja = document.querySelectorAll(".rezultat");
  provera = proveraResenja[pokusaj].querySelectorAll("div");

  pok.forEach((pokusaj) => {
    pokusaj.addEventListener("click", removeImage);
  });
}

init();

function addImage(e) {
  if (e.target.classList.contains("znak")) {
    const newImg = `<img class="${counter}" src="${e.target.getAttribute(
      "src"
    )}"/>`;
    pok[counter].innerHTML = newImg;
    pokusajResenja[counter] = newImg;

    if (pokusajResenja.length == 4) {
      btnProveri.disabled = false;
    }

    if (Array.from(pok).some((p) => p.innerHTML == "")) {
      btnProveri.disabled = true;
    }

    counter++;

    if (counter >= pok.length) {
      counter = 0;
    }
  }
}

divSviZnaci.addEventListener("click", addImage);

function pokusajResenjaRacunara() {
  document.querySelector("#sedmi-pokusaj").classList.add("active");
  clearInterval(timer);

  setTimeout(() => {
    let proveraResenjaRacunaraKopija;

    pokusajRacunara.forEach((p, i) => {
      p.innerHTML = `<img src="${randomResenjeRacunara[i]}"/>`;

      const istiElementi = [];
      const istiElementiIndex = [];

      let randomResenjeKopija = randomResenje.slice();
      let randomResenjeRacunaraKopija = randomResenjeRacunara.slice();
      proveraResenjaRacunaraKopija = Array.from(proveraResenjaRacunara).slice();

      randomResenje.forEach((r, i) => {
        if (randomResenjeRacunara[i] == r) {
          istiElementi.push(r);
          istiElementiIndex.push(i);
        }
      });

      istiElementiIndex
        .sort((a, b) => b - a)
        .forEach((s) => {
          randomResenjeKopija.splice(s, 1);
          randomResenjeRacunaraKopija.splice(s, 1);
        });

      let brTacnihNaPogresnomMestu = 0;

      randomResenjeRacunaraKopija.forEach((n) => {
        const ind = randomResenjeKopija.findIndex((r) => {
          return n == r;
        });
        if (ind > -1) {
          randomResenjeKopija = randomResenjeKopija.filter(
            (_r, i) => i !== ind
          );
          brTacnihNaPogresnomMestu++;
        }
      });

      let indeksiIstihEl = [];
      for (let i = 0; i < istiElementi.length; i++) {
        proveraResenjaRacunara[i].style.backgroundColor = "red";
        indeksiIstihEl.push(i);
      }

      indeksiIstihEl
        .sort((a, b) => b - a)
        .forEach((i) => {
          proveraResenjaRacunaraKopija.splice(i, 1);
        });

      for (let i = 0; i < brTacnihNaPogresnomMestu; i++) {
        proveraResenjaRacunaraKopija[i].style.backgroundColor = "yellow";
      }
    });

    let brPoena = 0;
    if (
      Array.from(proveraResenjaRacunaraKopija).every(
        (p) => p.style.backgroundColor === "red"
      )
    ) {
      brPoena = 10;
    }

    divPoeniDrugog.innerHTML = +divPoeniDrugog.innerHTML + brPoena;

    let poeniIzSkocka2 = localStorage.getItem("poeni2");

    localStorage.setItem("poeni2", +poeniIzSkocka2 + brPoena);
  }, 1000 - 500);
}

btnProveri.addEventListener("click", function () {
  if (pokusaj === 6) {
    return;
  }

  document
    .querySelectorAll(".pokusaj-rezultat")
    [pokusaj].classList.remove("active");

  let imgs = pokusaji[pokusaj].querySelectorAll("img");

  let nizSrc = [];
  imgs.forEach((img) => {
    let atributi = img.getAttribute("src");
    nizSrc.push(atributi);
  });

  const sameElements = [];
  const sameElementsIndex = [];

  let randomResenjeCopy = randomResenje.slice();
  let nizSrcCopy = nizSrc.slice();
  let proveraResenjaCopy = Array.from(provera).slice();

  randomResenje.forEach((r, i) => {
    if (nizSrc[i] == r) {
      sameElements.push(r);
      sameElementsIndex.push(i);
    }
  });

  sameElementsIndex
    .sort((a, b) => b - a)
    .forEach((s) => {
      randomResenjeCopy.splice(s, 1);
      nizSrcCopy.splice(s, 1);
    });

  let brTacnihNaRazlicitomMestu = 0;

  nizSrcCopy.forEach((n) => {
    const ind = randomResenjeCopy.findIndex((r) => {
      return n == r;
    });
    if (ind > -1) {
      randomResenjeCopy = randomResenjeCopy.filter((_r, i) => i !== ind);
      brTacnihNaRazlicitomMestu++;
    }
  });

  let indeksiIstihEl = [];
  for (let i = 0; i < sameElements.length; i++) {
    provera[i].style.backgroundColor = "red";
    indeksiIstihEl.push(i);
  }

  indeksiIstihEl
    .sort((a, b) => b - a)
    .forEach((i) => {
      proveraResenjaCopy.splice(i, 1);
    });

  for (let i = 0; i < brTacnihNaRazlicitomMestu; i++) {
    proveraResenjaCopy[i].style.backgroundColor = "yellow";
  }

  if (document.querySelectorAll(".pokusaj-rezultat")[pokusaj + 1]) {
    document
      .querySelectorAll(".pokusaj-rezultat")
      [pokusaj + 1].classList.add("active");
  }

  if (
    Array.from(proveraResenja[pokusaj].querySelectorAll("div")).every(
      (p) => p.style.backgroundColor === "red"
    ) ||
    pokusaj === 5
  ) {
    document.querySelectorAll(".pokusaj-rezultat").forEach((p) => {
      p.classList.remove("active");
    });

    divSviZnaci.removeEventListener("click", addImage);

    clearInterval(timer);

    if (pokusaj <= 1) {
      brPoena1 = 20;
    } else if (pokusaj <= 3) {
      brPoena1 = 15;
    } else if (pokusaj === 4) {
      brPoena1 = 10;
    } else if (
      pokusaj === 5 &&
      Array.from(proveraResenja[5].querySelectorAll("div")).every(
        (p) => p.style.backgroundColor === "red"
      )
    ) {
      brPoena1 = 10;
    }

    divPoeniPrvog.innerHTML = +divPoeniPrvog.innerHTML + brPoena1;

    let poeniIzSkocka1 = localStorage.getItem("poeni1");

    localStorage.setItem("poeni1", +poeniIzSkocka1 + brPoena1);

    setTimeout(() => {
      konacnoResenje.forEach((k, i) => {
        k.innerHTML = `<img src="${randomResenje[i]}"/>`;

        btnSledecaIgra.classList.add("sledeca-igra-visible");
        btnSledecaIgra.style.display = "block";

        if (
          document.querySelector("#sedmi-pokusaj").classList.contains("active")
        ) {
          document.querySelector("#sedmi-pokusaj").classList.remove("active");
        }
      });
    }, 1000);

    if (
      Array.from(proveraResenja[pokusaj].querySelectorAll("div")).some(
        (p) => p.style.backgroundColor !== "red"
      )
    ) {
      pokusajResenjaRacunara();

      setTimeout(() => {
        btnSledecaIgra.classList.add("sledeca-igra-visible");
        btnSledecaIgra.style.display = "block";
      }, 1000);
    }
  }

  sledeciRed();
  init();
});

let clock = 60;
let timer = setInterval(function () {
  if (clock > 0) {
    clock--;
    divVreme.innerHTML = clock;
  }

  if (clock <= 10) {
    divVreme.style.color = "red";
  }

  if (clock <= 0) {
    clearInterval(timer);
    brPoena1 = 0;

    divSviZnaci.removeEventListener("click", addImage);

    btnProveri.disabled = true;

    if (pok) {
      pok.forEach((p) => p.removeEventListener("click", removeImage));
    }

    document.querySelectorAll(".pokusaj-rezultat").forEach((p) => {
      p.classList.remove("active");
    });

    pokusajResenjaRacunara();

    setTimeout(() => {
      konacnoResenje.forEach((k, i) => {
        k.innerHTML = `<img src="${randomResenje[i]}"/>`;

        btnSledecaIgra.classList.add("sledeca-igra-visible");
        btnSledecaIgra.style.display = "block";

        if (
          document.querySelector("#sedmi-pokusaj").classList.contains("active")
        ) {
          document.querySelector("#sedmi-pokusaj").classList.remove("active");
        }
      });
    }, 1000);
  }
}, 1000);

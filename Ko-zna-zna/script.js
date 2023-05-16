const divPitanje = document.querySelector("#pitanje");
const divSviOdgovori = document.querySelector("#odgovori");
const btnOdgovori = document.querySelectorAll("#odgovori button");
const btnDalje = document.querySelector(".dalje");
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

let pitanje1 = {
  pitanje:
    "Ko je zvanicno bio za 1 stotinku bolji od Milorada Cavica na 100m delfin u Pekingu?",
  odgovori: ["Majkl Felps", "Dzesi Felps", "Dzonatan Felps", "Dzek Felps"],
  indeksTacnogOdgovora: 0,
};

let pitanje2 = {
  pitanje: "U koje se more uliva reka Jordan?",
  odgovori: ["Crno more", "Mramorno more", "Mrtvo more", "Tirensko more"],
  indeksTacnogOdgovora: 2,
};

let pitanje3 = {
  pitanje: "Koliko je 2*2+2-2*0 ?",
  odgovori: ["2", "6", "4", "0"],
  indeksTacnogOdgovora: 1,
};

let pitanje4 = {
  pitanje: "Koliko je Oskara osvojio film Ben Hur?",
  odgovori: ["9", "5", "11", "Nema Oskara"],
  indeksTacnogOdgovora: 2,
};

let pitanje5 = {
  pitanje: 'Kako glasi prvo lice jednine pomocnog glagola "biti"?',
  odgovori: ["Bio", "Bih", "Bismo", "Bi"],
  indeksTacnogOdgovora: 1,
};

let pitanje6 = {
  pitanje: 'U kojoj umetnosti se koristi pojam "poentilizam"?',
  odgovori: ["Slikarstvo", "Muzika", "Arhitektura", "Film"],
  indeksTacnogOdgovora: 0,
};

let pitanje7 = {
  pitanje: "Kako glasi umetnicko ime pevacice Alise Bet Mur?",
  odgovori: ["Sakira", "Alisa Kiz", "Pink", "Ser"],
  indeksTacnogOdgovora: 2,
};

let pitanje8 = {
  pitanje:
    'Koja je kratka masinska puska, deo naoruzanja nemacke vojske u II svetskom ratu, nazvana po nemackom glagolu "bacati"?',
  odgovori: ["Kalasnjikov", "Tompson", "Sacmara", "Smajser"],
  indeksTacnogOdgovora: 3,
};

let pitanje9 = {
  pitanje:
    "Koja drzava je jedina ucestvovala na svim svetskim prvenstvima u fudbalu od 1930. do danas?",
  odgovori: ["Srbija", "Italija", "Brazil", "Argentina"],
  indeksTacnogOdgovora: 2,
};

let pitanje10 = {
  pitanje: "Maskarpone je vrsta cega?",
  odgovori: ["Sira", "Vina", "Testenine", "Mesa"],
  indeksTacnogOdgovora: 0,
};

let pitanja = [
  pitanje1,
  pitanje2,
  pitanje3,
  pitanje4,
  pitanje5,
  pitanje6,
  pitanje7,
  pitanje8,
  pitanje9,
  pitanje10,
];

let timer;
function vreme() {
  let clock = 10;
  divVreme.innerHTML = clock;
  divVreme.style.color = "black";

  timer = setInterval(function () {
    if (clock > 0) {
      clock--;
      divVreme.innerHTML = clock;
    }

    if (clock <= 5) {
      divVreme.style.color = "red";
    }

    if (clock <= 0) {
      brPoenaPlavog -= 3;
      localStorage.setItem("poeni1", +poeniPrvog + brPoenaPlavog);

      divPoeniPrvog.innerHTML = +poeniPrvog + brPoenaPlavog;
      clearInterval(timer);
      pokusajProtivnika();
    }
  }, 1000);
}

let randomPitanje;
function prikaziPitanje() {
  vreme();
  btnDalje.disabled = false;

  if (pitanja.length === 0) {
    clearInterval(timer);
    btnDalje.disabled = true;

    setTimeout(() => {
      btnDalje.style.display = "none";
      btnSledecaIgra.style.display = "block";
      btnSledecaIgra.classList.add("sledeca-igra-visible");
      divSviOdgovori.removeEventListener("click", pokusajIgraca);
    }, 700);
  }

  if (pitanja.length !== 0) {
    randomPitanje = pitanja
      .slice()
      .sort(() => Math.random() - Math.random())
      .slice(0, 1);
    divPitanje.innerHTML = randomPitanje[0].pitanje;

    btnOdgovori.forEach((btn, i) => {
      btn.innerHTML = randomPitanje[0].odgovori[i];
    });

    btnOdgovori.forEach((btn) => {
      btn.style.backgroundColor = "#93ecfe";

      btn.style.color = "#1a274b";
    });
    divSviOdgovori.addEventListener("click", pokusajIgraca);
  }
}

prikaziPitanje();

let brPoenaCrvenog = 0;
let odgovoriRacunara = [];
function pokusajProtivnika() {
  if (!randomPitanje) return;

  let tacanOdgovor = btnOdgovori[randomPitanje[0].indeksTacnogOdgovora];

  let randomOdgovor = Array.from(btnOdgovori)
    .sort(() => Math.random() - Math.random())
    .slice(0, 1);

  odgovoriRacunara.push(tacanOdgovor);
  odgovoriRacunara.push(randomOdgovor[0]);

  let [odgRacunara] = odgovoriRacunara
    .sort(() => Math.random() - Math.random())
    .slice(0, 1);

  if (randomPitanje[0].indeksTacnogOdgovora == odgRacunara.getAttribute("id")) {
    odgRacunara.style.backgroundColor = "red";
    odgRacunara.style.color = "white";

    brPoenaCrvenog += 10;
    localStorage.setItem("poeni2", +poeniDrugog + brPoenaCrvenog);

    divPoeniDrugog.innerHTML = +poeniDrugog + +brPoenaCrvenog;
    clearInterval(timer);

    setTimeout(() => {
      let indeks = pitanja.findIndex((p) => p === randomPitanje[0]);

      pitanja.splice(indeks, 1);

      prikaziPitanje();
    }, 1000);
  } else {
    odgRacunara.style.backgroundColor = "rgb(255, 213, 0)";
    odgRacunara.style.color = "black";

    brPoenaCrvenog -= 3;
    localStorage.setItem("poeni2", +poeniDrugog + brPoenaCrvenog);

    divPoeniDrugog.innerHTML = +poeniDrugog + +brPoenaCrvenog;
    clearInterval(timer);

    setTimeout(() => {
      odgRacunara.style.backgroundColor = "#93ecfe";
      odgRacunara.style.color = "#1a274b";
    }, 500);

    setTimeout(() => {
      tacanOdgovor.style.backgroundColor = "rgb(0, 255, 115)";
      tacanOdgovor.style.color = "#1a274b";
    }, 1000);

    setTimeout(() => {
      let indeks = pitanja.findIndex((p) => p === randomPitanje[0]);

      pitanja.splice(indeks, 1);

      prikaziPitanje();
    }, 2500);
  }
}

let brPoenaPlavog = 0;
function pokusajIgraca(e) {
  if (e.target.tagName === "BUTTON") {
    btnDalje.disabled = true;
    if (randomPitanje[0].indeksTacnogOdgovora == e.target.getAttribute("id")) {
      let tacanOdg = Array.from(btnOdgovori).find(
        (btn) => btn.innerHTML === e.target.innerHTML
      );
      tacanOdg.style.backgroundColor = "blue";
      tacanOdg.style.color = "white";

      brPoenaPlavog += 10;
      localStorage.setItem("poeni1", +poeniPrvog + brPoenaPlavog);

      divPoeniPrvog.innerHTML = +poeniPrvog + brPoenaPlavog;
      clearInterval(timer);

      setTimeout(() => {
        let indeks = pitanja.findIndex((p) => p === randomPitanje[0]);

        pitanja.splice(indeks, 1);

        prikaziPitanje();
      }, 1000);
    } else {
      e.target.style.backgroundColor = "rgb(255, 213, 0)";
      e.target.style.color = "black";

      brPoenaPlavog -= 3;
      localStorage.setItem("poeni1", +poeniPrvog + brPoenaPlavog);

      divPoeniPrvog.innerHTML = +poeniPrvog + brPoenaPlavog;
      clearInterval(timer);

      setTimeout(() => {
        e.target.style.backgroundColor = "#93ecfe";
        e.target.style.color = "#1a274b";
      }, 500);

      setTimeout(() => {
        pokusajProtivnika();
      }, 700);
    }

    divSviOdgovori.removeEventListener("click", pokusajIgraca);
  }
}

divSviOdgovori.addEventListener("click", pokusajIgraca);

btnDalje.addEventListener("click", function () {
  btnDalje.disabled = true;
  clearInterval(timer);
  pokusajProtivnika();
});

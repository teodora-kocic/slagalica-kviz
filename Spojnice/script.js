const pitanje = document.querySelector("#pitanje");
const prvaKolona = document.querySelectorAll("#deo1 button");
const btnsDrugaKolona = document.querySelector("#deo2");
const drugaKolona = document.querySelectorAll("#deo2 button");

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
  pitanje: "Spojite imena i prezimena rezisera",
  deo1: [
    "Ingmar",
    "Dzon",
    "Stiven",
    "Akira",
    "Dzejms",
    "Andrej",
    "Federiko",
    "Alfred",
    "Martin",
    "Luis",
  ],
  deo2: [
    "Bergman",
    "Ford",
    "Spilberg",
    "Kurosava",
    "Kameron",
    "Tarkovski",
    "Felini",
    "Hickok",
    "Skorseze",
    "Bunjuel",
  ],
};

let pitanje2 = {
  pitanje: "Zenski srodnici u srpskim rodbinskim odnosima",
  deo1: [
    "Snaja",
    "Jetrva",
    "Zaova",
    "Svastika",
    "Surnjaja",
    "Svekrva",
    "Tasta",
    "Prija",
    "Strina",
    "Ujna",
  ],
  deo2: [
    "Bratova zena",
    "Zena muzevljevog brata",
    "Muzevljeva sestra",
    "Zenina sestra",
    "Zena zeninog brata",
    "Muzevljeva majka",
    "Zenina majka",
    "Majka cerkinog muza",
    "Zena ocevog brata",
    "Zena majcinog brata",
  ],
};

let pitanje3 = {
  pitanje: "Poznate pank pesme iz zemlje i regiona i njihovi izvodjaci",
  deo1: [
    "Bolje da nosim kratku kosu",
    "Varburg limuzina",
    "Nije sve tako sivo",
    "Put beznadja",
    "Amerika",
    "U magnovenju",
    "Za tebe",
    "Fabricka greska",
    "Zlatni papagaj",
    "Ide voz",
  ],
  deo2: [
    "Pekinska patka",
    "Ateist rep",
    "Hladno pivo",
    "Ritam nereda",
    "Dzukele",
    "Goblini",
    "Kud idijoti",
    "Siks pek",
    "Elektricni orgazam",
    "Direktori",
  ],
};

let pitanje4 = {
  pitanje: "Hemijske formule organskih jedinjenja",
  deo1: [
    "C6H6",
    "C2H5OH",
    "CH2O",
    "C4H10",
    "C2H2",
    "C6H8O7",
    "CH4",
    "C6H12O6",
    "C3H6O",
    "C2H4O2",
  ],
  deo2: [
    "Benzen",
    "Etanol",
    "Formaldehid",
    "Butan",
    "Acetilen/Etin",
    "Limunska kiselina",
    "Metan",
    "Glukoza",
    "Aceton",
    "Sircetna kiselina",
  ],
};

let pitanje5 = {
  pitanje: "Povezite reci sa glasovnim promenama koje su u njima izvrsene",
  deo1: [
    "Naruciti-narudzbina",
    "Orah-orasi",
    "Mrak-mracan",
    "Iskusan-iskusna",
    "Sladoled-sladoledzija",
    "Andjeo-andjela",
    "Miris-mirisljav",
    "Govedo-govedje",
    "Postan-posna",
    "Hrist-hriscanin",
  ],

  deo2: [
    "Jednacenje po zvucnosti",
    "Sibilarizacija",
    "Palatalizacija",
    'Nepostojano "a"',
    "Gubljenje suglasnika",
    'Prelazak "l" u "o"',
    "Jednacenje po mestu tvorbe",
    "Jotovanje",
    'Nepost. "a" + gublj. sugl.',
    "Jot. + jedn. po mestu tvorbe",
  ],
};

let pitanje6 = {
  pitanje: "Bendovi i pesme",
  deo1: [
    "Queen",
    "Metallica",
    "Rolling Stones",
    "Doors",
    "Beatles",
    "Led Zeppelin",
    "Deep purple",
    "Black sabbath",
    "Toto",
    "CCR",
  ],
  deo2: [
    "Killer queen",
    "Seek and destroy",
    "Satisfaction",
    "Roadhouse blues",
    "Yesterday",
    "Heartbreaker",
    "Child in time",
    "Paranoid",
    "Africa",
    "Fortunate son",
  ],
};

let pitanje7 = {
  pitanje: "Spojite rimske sa arapskim brojevima",
  deo1: [
    "LXXX",
    "C",
    "MCMLIII",
    "MCCCLXXXIX",
    "MDCCXCIV",
    "CXXXIX",
    "LVI",
    "MMMDCC",
    "IX",
    "D",
  ],

  deo2: ["80", "100", "1953", "1389", "1794", "139", "56", "3700", "9", "500"],
};

let pitanja = [
  pitanje1,
  pitanje2,
  pitanje3,
  pitanje4,
  pitanje5,
  pitanje6,
  pitanje7,
];

let randomPitanje = pitanja
  .sort(() => Math.random() - Math.random())
  .slice(0, 1);

let deo1;
let deo2;
let deo2Random;
let pokusajCoveka;

let nizPitanjaNaKojaJeOdgovoreno = [];
let nizPitanjaNaKojaJeOdgovoreno2 = [];

function vratiPonudjeneZaRacunar() {
  const tacanOdgovor = deo2[brojac];
  const nizPonudjenihOdg = [...deo2Random];

  deo2Random.forEach((d) => {
    nizPonudjenihOdg.push(tacanOdgovor);
  });

  return nizPonudjenihOdg;
}

function prikaziPitanje() {
  pitanje.innerHTML = randomPitanje[0].pitanje;

  deo1 = randomPitanje[0].deo1;
  deo2 = randomPitanje[0].deo2;

  prvaKolona.forEach((btn, i) => {
    btn.innerHTML = randomPitanje[0].deo1[i];
  });

  deo2Random = randomPitanje[0].deo2
    .slice()
    .sort(() => Math.random() - Math.random());

  drugaKolona.forEach((btn, i) => {
    btn.innerHTML = deo2Random[i];
  });
}
prikaziPitanje();

let brojac = 0;
let pokusajRacunara = deo2Random
  .slice()
  .sort(() => Math.random() - Math.random())
  .slice(0, 1);

let brPoenaCrvenog = 0;
function pokusajProtivnika() {
  pokusajRacunara = vratiPonudjeneZaRacunar()
    .sort(() => Math.random() - Math.random())
    .slice(0, 1);

  if (deo2[brojac]) {
    if (deo2[brojac].includes(pokusajRacunara)) {
      nizPitanjaNaKojaJeOdgovoreno2.push(brojac);

      prvaKolona[brojac].classList.add("red");

      let btn = Array.from(drugaKolona).find(
        (btn) => btn.innerHTML == pokusajRacunara
      );
      btn.classList.add("red");
      btn.disabled = true;

      let [pokusajRacunaraKopija] = pokusajRacunara;

      brPoenaCrvenog += 2;
      localStorage.setItem("poeni2", +poeniDrugog + brPoenaCrvenog);

      divPoeniDrugog.innerHTML = +poeniDrugog + +brPoenaCrvenog;

      prvaKolona[brojac].classList.add("active");

      let index = deo2Random.indexOf(pokusajRacunaraKopija);

      deo2Random.splice(index, 1);

      brojac++;

      if (brojac > 9) {
        sortiranjeNiza();
        clearInterval(timer);

        setTimeout(() => {
          btnSledecaIgra.classList.add("sledeca-igra-visible");
          btnSledecaIgra.style.display = "block";
        }, 3000);
      }

      setTimeout(() => {
        pokusajProtivnika();
      }, 500);
    } else {
      let [pokusajRacunaraKopija] = pokusajRacunara;

      let pokusajRacunaraKopija2 = Array.from(drugaKolona).find(
        (d) => d.innerHTML === pokusajRacunaraKopija
      );

      prvaKolona[brojac].classList.add("yellow");
      pokusajRacunaraKopija2.classList.add("yellow");

      setTimeout(() => {
        prvaKolona.forEach((btn) => {
          btn.classList.remove("yellow");
        });
        pokusajRacunaraKopija2.classList.remove("yellow");
      }, 300);

      if (nizPitanjaNaKojaJeOdgovoreno.includes(brojac)) {
        brojac++;
        if (brojac > 9) {
          sortiranjeNiza();
          clearInterval(timer);

          setTimeout(() => {
            btnSledecaIgra.classList.add("sledeca-igra-visible");
            btnSledecaIgra.style.display = "block";
          }, 3000);
        }
      }
      btnsDrugaKolona.addEventListener("click", spajanje);

      prvaKolona[brojac - 1].classList.remove("active");

      if (brojac > 9) {
        return;
      } else {
        prvaKolona[brojac].classList.add("active");
      }
    }
  }
}

let brPoenaPlavog = 0;
function spajanje(e) {
  if (e.target.tagName === "BUTTON") {
    if (brojac > 9) {
      clearInterval(timer);
      return;
    }

    nizPitanjaNaKojaJeOdgovoreno.push(brojac);

    if (deo2[brojac].includes(e.target.innerHTML)) {
      brPoenaPlavog += 2;

      localStorage.setItem("poeni1", +poeniPrvog + brPoenaPlavog);

      divPoeniPrvog.innerHTML = +poeniPrvog + +brPoenaPlavog;

      prvaKolona[brojac].classList.remove("active");

      prvaKolona[brojac].classList.add("blue");
      e.target.classList.add("blue");
      e.target.disabled = true;

      let index = deo2Random.findIndex((deo) => e.target.innerHTML === deo);

      deo2Random.splice(index, 1);

      brojac++;

      if (brojac > 9) {
        clearInterval(timer);

        sortiranjeNiza();

        setTimeout(() => {
          btnSledecaIgra.classList.add("sledeca-igra-visible");
          btnSledecaIgra.style.display = "block";
        }, 3000);

        return;
      } else {
        prvaKolona[brojac].classList.add("active");
      }
    } else {
      prvaKolona[brojac].classList.add("yellow");
      e.target.classList.add("yellow");

      pokusajCoveka = Array.from(drugaKolona).find(
        (d) => d.innerHTML === e.target.innerHTML
      );

      setTimeout(() => {
        prvaKolona[brojac].classList.remove("yellow");
        pokusajCoveka.classList.remove("yellow");
      }, 300);

      if (brojac > 8 && nizPitanjaNaKojaJeOdgovoreno2[brojac]) {
        sortiranjeNiza();
        clearInterval(timer);

        setTimeout(() => {
          btnSledecaIgra.classList.add("sledeca-igra-visible");
          btnSledecaIgra.style.display = "block";
        }, 3000);
      }

      btnsDrugaKolona.removeEventListener("click", spajanje);
      setTimeout(() => {
        pokusajProtivnika();
      }, 1000);
    }
  }
}
btnsDrugaKolona.addEventListener("click", spajanje);

function sortiranjeNiza() {
  setTimeout(() => {
    drugaKolona.forEach((btn, i) => {
      btn.innerHTML = deo2[i];

      if (prvaKolona[i].classList.contains("blue")) {
        drugaKolona[i].classList.add("blue");
      } else {
        drugaKolona[i].classList.remove("blue");
      }

      if (prvaKolona[i].classList.contains("red")) {
        drugaKolona[i].classList.add("red");
      } else {
        drugaKolona[i].classList.remove("red");
      }
    });
  }, 3000);
}

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
    sortiranjeNiza();

    brPoenaPlavog = 0;
    brPoenaCrvenog = 0;
    btnsDrugaKolona.removeEventListener("click", spajanje);

    drugaKolona.forEach((btn) => {
      btn.disabled = true;
    });

    setTimeout(() => {
      btnSledecaIgra.classList.add("sledeca-igra-visible");
      btnSledecaIgra.style.display = "block";
    }, 3000);
  }
}, 1000);

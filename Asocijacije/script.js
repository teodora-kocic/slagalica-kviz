const divAsocijacije = document.querySelector("#asocijacije");
const btns = document.querySelectorAll("#asocijacije button");
const inputKonacnoResenje = document.querySelector("#konacno-resenje");
const sviInputi = document.querySelectorAll(".sva-resenja");
const btnDalje = document.querySelector(".dalje");
const btnRezultat = document.querySelector(".rezultat");

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

const asocijacija1 = {
  A: ["VEZ", "PESAK", "NOVAC", "MALI"],
  resenjeKoloneA: "SITAN",
  B: ["MIS", "ORAO", "DVOR", "MEDVED"],
  resenjeKoloneB: "BELI",
  C: ["POD", "PEGLANJE", "GLAVA", "GRADJA"],
  resenjeKoloneC: "DASKA",
  D: ["TALASI", "JAHANJE", "INTERNET", "KRSTARENJE"],
  resenjeKoloneD: "SURFOVANJE",
  konacnoResenje: "SNEG",
};

const asocijacija2 = {
  A: ["KUM", "SUD", "SARADNIK", "JEHOVA"],
  resenjeKoloneA: "SVEDOK",
  B: ["MATERIJAL", "TEOREMA", "POTVRDA", "ZIVI"],
  resenjeKoloneB: "DOKAZ",
  C: ["SUMA", "EDVARD GRIG", "EDVARD MUNK", "FJORDOVI"],
  resenjeKoloneC: "NORVESKA",
  D: ["SAH", "KARTE", "MILUTIN", "DRAGUTIN"],
  resenjeKoloneD: "KRALJ",
  konacnoResenje: "KRUNA",
};

let asocijacije = [asocijacija1, asocijacija2];

let randomAsocijacija = asocijacije
  .sort(() => Math.random() - Math.random())
  .slice(0, 1);

const kolone = {
  A: randomAsocijacija[0].A,
  B: randomAsocijacija[0].B,
  C: randomAsocijacija[0].C,
  D: randomAsocijacija[0].D,
};

const btnSvihPolja = {
  A: document.querySelectorAll("#kolona-A button"),
  B: document.querySelectorAll("#kolona-B button"),
  C: document.querySelectorAll("#kolona-C button"),
  D: document.querySelectorAll("#kolona-D button"),
};

let btnPojedinacnihPoljaKopija = {
  A: Array.from(document.querySelectorAll("#kolona-A button")),
  B: Array.from(document.querySelectorAll("#kolona-B button")),
  C: Array.from(document.querySelectorAll("#kolona-C button")),
  D: Array.from(document.querySelectorAll("#kolona-D button")),
};

const svaResenjaKolona = {
  A: randomAsocijacija[0].resenjeKoloneA,
  B: randomAsocijacija[0].resenjeKoloneB,
  C: randomAsocijacija[0].resenjeKoloneC,
  D: randomAsocijacija[0].resenjeKoloneD,
};

const inputSvihResenja = {
  A: document.querySelector("#resenje-A"),
  B: document.querySelector("#resenje-B"),
  C: document.querySelector("#resenje-C"),
  D: document.querySelector("#resenje-D"),
};

const konacnoResenje = randomAsocijacija[0].konacnoResenje;

let polja;
let btnPojedinacnihPolja;
let resenjeKolone;
let inputResenja;
let proveriResenje;

btnDalje.disabled = true;

let timer;
let clock;
function vreme() {
  clock = 60;
  divVreme.innerHTML = clock;
  divVreme.style.color = "black";

  timer = setInterval(function () {
    if (clock > 0) {
      clock--;
      divVreme.innerHTML = clock;
    }

    if (clock <= 10) {
      divVreme.style.color = "red";
    }

    if (clock <= 0) {
      clearInterval(timer);

      sviInputi.forEach((input, i) => {
        input.disabled = true;
      });
      btnDalje.disabled = true;

      // pokusajProtivnika();

      ["A", "B", "C", "D"].forEach((kolona, i) => {
        sviInputi[i].value = svaResenjaKolona[kolona];
      });

      ["A", "B", "C", "D"].forEach((kolona) => {
        btnPojedinacnihPoljaKopija[kolona].forEach((btn, i) => {
          btn.innerHTML = kolone[kolona][i];
        });
      });

      inputKonacnoResenje.value = konacnoResenje;
      inputKonacnoResenje.disabled = true;

      divAsocijacije.removeEventListener("click", pokusajIgraca);
      pogledajRezultat();
    }
  }, 1000);
}

vreme();

function aktivirajInputPolja() {
  if (daLiJeKonacnoResenjeDostupno()) {
    inputKonacnoResenje.disabled = false;
    inputKonacnoResenje.classList.remove("disabled");
  }

  Object.keys(btnPojedinacnihPoljaKopija).forEach((kolona) => {
    if (btnPojedinacnihPoljaKopija[kolona].length < 4) {
      inputSvihResenja[kolona].disabled = false;
      inputSvihResenja[kolona].classList.remove("disabled");
    }
  });
}

function pokusajIgraca(e) {
  if (e.target.tagName === "BUTTON") {
    if (btnPojedinacnihPoljaKopija[e.target.dataset.id].includes(e.target)) {
      aktivirajInputPolja();

      e.target.disabled = true;
      e.target.classList.add("kliknuto");

      polja = kolone[e.target.dataset.id];
      e.target.innerHTML = polja[0];

      let index = polja.findIndex((p) => p === e.target.innerHTML);

      polja.splice(index, 1);

      btnPojedinacnihPolja = btnSvihPolja[e.target.dataset.id];

      btns.forEach((btn) => {
        btn.disabled = true;
      });

      let indeks = btnPojedinacnihPoljaKopija[e.target.dataset.id].findIndex(
        (btn) => e.target === btn
      );

      btnPojedinacnihPoljaKopija[e.target.dataset.id].splice(indeks, 1);

      resenjeKolone = svaResenjaKolona[e.target.dataset.id];

      inputResenja = inputSvihResenja[e.target.dataset.id];

      inputResenja.classList.remove("disabled");
      inputResenja.disabled = false;
      inputResenja.focus();

      btnDalje.disabled = false;
    }
  }
}

divAsocijacije.addEventListener("click", pokusajIgraca);

let brPoenaPlavog = 2;

sviInputi.forEach((input) => {
  input.addEventListener("keypress", function (e) {
    e.target.closest(`#kolona-${e.target.dataset.id}`).classList.add("active");

    btnDalje.disabled = true;

    if (e.key === "Enter") {
      e.target.disabled = true;

      resenjeKolone = svaResenjaKolona[e.target.dataset.id];

      inputResenja = inputSvihResenja[e.target.dataset.id];

      let value = e.target.value.toLowerCase();

      if (value === resenjeKolone.toLowerCase()) {
        btnDalje.disabled = false;

        btnPojedinacnihPoljaKopija[e.target.dataset.id].forEach((btn, i) => {
          btn.innerHTML = polja[i];
          brPoenaPlavog += 2;
        });

        let kolona = document.querySelectorAll(".active button");

        e.target.value = resenjeKolone;

        kolona.forEach((btn) => {
          btn.style.backgroundColor = "blue";
          btn.classList.add("blue");

          localStorage.setItem("poeni1", +poeniPrvog + brPoenaPlavog);

          divPoeniPrvog.innerHTML = +poeniPrvog + +brPoenaPlavog;
        });

        btnPojedinacnihPoljaKopija[e.target.dataset.id] = [];
        e.target.style.backgroundColor = "blue";
        e.target.classList.add("reseno");
        inputKonacnoResenje.disabled = false;
        inputKonacnoResenje.focus();
      } else {
        // Object.values(btnPojedinacnihPoljaKopija).forEach((arr) => {
        //   if (arr.length < 4) {
        //     arr.forEach((a) => {
        //       inputSvihResenja[a.dataset.id].disabled = true;
        //     });
        //   }
        // });

        Object.keys(btnPojedinacnihPoljaKopija).forEach((kolona) => {
          if (btnPojedinacnihPoljaKopija[kolona].length < 4) {
            inputSvihResenja[kolona].disabled = true;
          }
        });

        let kolona = document.querySelectorAll(".active button");
        kolona.forEach((k) => {
          k.closest(`#kolona-${k.dataset.id}`).classList.remove("active");
        });
        pogresenoPolje(inputResenja);

        setTimeout(() => {
          pokusajProtivnika();
        }, 1000);

        setTimeout(() => {
          vratiPoljeUPocetnoStanje(inputResenja);
        }, 700);
      }
    }
  });
});

inputKonacnoResenje.addEventListener("keypress", function (e) {
  btnDalje.disabled = true;

  if (e.key === "Enter") {
    inputKonacnoResenje.disabled = true;
    let value = inputKonacnoResenje.value.toLowerCase();
    if (value === konacnoResenje.toLowerCase()) {
      inputKonacnoResenje.value = konacnoResenje;
      inputKonacnoResenje.style.backgroundColor = "blue";

      ["A", "B", "C", "D"].forEach((kol) => {
        btnPojedinacnihPoljaKopija[kol].forEach((btn, index) => {
          btn.innerHTML = kolone[kol][index];
          brPoenaPlavog += 2;
        });
      });

      localStorage.setItem("poeni1", +poeniPrvog + (brPoenaPlavog + 5));

      divPoeniPrvog.innerHTML = +poeniPrvog + (+brPoenaPlavog + 5);

      let plaviIcrveniInputi = Array.from(sviInputi).filter((input) => {
        return (
          input.classList.contains("reseno") ||
          input.classList.contains("protivnik-reseno")
        );
      });

      let sviInputiKopija = Array.from(sviInputi).slice();

      let preostaliInputi = sviInputiKopija.filter(
        (i) => !plaviIcrveniInputi.includes(i)
      );

      let preostaleKolone = [];

      preostaliInputi.forEach((p) => {
        p.value = svaResenjaKolona[p.dataset.id];
        p.style.backgroundColor = "blue";

        preostaleKolone.push(p.closest(`#kolona-${p.dataset.id}`));
      });

      preostaleKolone.forEach((p) => {
        let btns = p.querySelectorAll("button");

        btns.forEach((btn) => (btn.style.backgroundColor = "blue"));

        clearInterval(timer);

        pogledajRezultat();
      });
    } else {
      Object.keys(btnPojedinacnihPoljaKopija).forEach((kolona) => {
        if (btnPojedinacnihPoljaKopija[kolona].length < 4) {
          inputSvihResenja[kolona].disabled = true;
        }
      });

      pogresenoPolje(inputKonacnoResenje);

      setTimeout(() => {
        pokusajProtivnika();
      }, 1000);

      setTimeout(() => {
        vratiPoljeUPocetnoStanje(inputKonacnoResenje);
      }, 700);
    }
  }
});

let resenjaProtivnika = {
  A: [
    "SVEDOK",
    "SVEDOK",
    "SVEDOK",
    "SITAN",
    "SITAN",
    "SITAN",
    "PLAZA",
    "PLATA",
    "PRINC",
    "FILM",
  ],

  B: ["BELI", "BELI", "BELI", "DOKAZ", "DOKAZ", "DOKAZ", "ZIVOTINJA", "BELO"],
  C: [
    "DASKA",
    "DASKA",
    "DASKA",
    "NORVESKA",
    "NORVESKA",
    "NORVESKA",
    "SVEDSKA",
    "KUCA",
  ],
  D: [
    "SURFOVANJE",
    "SURFOVANJE",
    "SURFOVANJE",
    "KRALJ",
    "KRALJ",
    "KONJ",
    "MORE",
  ],
};

let konacnoResenjeProtivnika = ["KRUNA", "SNEG"];

function pokusajProtivnika() {
  if (daLiJeKonacnoResenjeDostupno()) {
    inputKonacnoResenje.disabled = false;
    inputKonacnoResenje.classList.remove("disabled");
  }

  const { A, B, C, D } = btnPojedinacnihPoljaKopija;
  let odabraniNiz = [A, B, C, D]
    .flat()
    .filter((r) => !r.classList.contains("blue"));

  let randomPolje = odabraniNiz
    .sort(() => Math.random() - Math.random())
    .slice(0, 1);

  let randomPoljeOdabrano = randomPolje[0];

  if (randomPoljeOdabrano) {
    randomPoljeOdabrano.classList.add("kliknuto-racunar");
    randomPoljeOdabrano.disabled = false;

    odabraniInput = Array.from(sviInputi).find(
      (i) => i.dataset.id === randomPoljeOdabrano.dataset.id
    );

    let poljaProtivnika = kolone[randomPoljeOdabrano.dataset.id];

    randomPoljeOdabrano.innerHTML = poljaProtivnika[0];
    randomPoljeOdabrano.disabled = true;

    poljaProtivnika.splice(0, 1);

    let indeks = btnPojedinacnihPoljaKopija[
      randomPoljeOdabrano.dataset.id
    ].findIndex((btn) => randomPoljeOdabrano === btn);

    btnPojedinacnihPoljaKopija[randomPoljeOdabrano.dataset.id].splice(
      indeks,
      1
    );

    pokusajProtivnikaKolona(
      odabraniInput,
      randomPoljeOdabrano,
      poljaProtivnika
    );
  } else {
    pokusajProtivnikaKonacno();
  }
}

let brPoenaCrvenog = 2;
function pokusajProtivnikaKolona(
  odabraniInput,
  randomPoljeOdabrano,
  poljaProtivnika
) {
  let nizResenja = resenjaProtivnika[randomPoljeOdabrano.dataset.id];

  let randomResenjeProtivnika = nizResenja
    .sort(() => Math.random() - Math.random())
    .slice(0, 1);

  odabraniInput.disabled = true;

  setTimeout(() => {
    odabraniInput.value = randomResenjeProtivnika[0];
  }, 500);

  let resenjeKoloneProtivnika =
    svaResenjaKolona[randomPoljeOdabrano.dataset.id];

  odabraniInput
    .closest(`#kolona-${randomPoljeOdabrano.dataset.id}`)
    .classList.add("protivnik-active");
  inputResenja.focus();

  if (randomResenjeProtivnika[0] === resenjeKoloneProtivnika) {
    setTimeout(() => {
      odabraniInput.style.backgroundColor = "red";
      odabraniInput.classList.add("protivnik-reseno");

      btnPojedinacnihPoljaKopija[randomPoljeOdabrano.dataset.id].forEach(
        (btn, i) => {
          btn.innerHTML = poljaProtivnika[i];
          brPoenaCrvenog += 2;
        }
      );

      localStorage.setItem("poeni2", +poeniDrugog + brPoenaCrvenog);

      divPoeniDrugog.innerHTML = +poeniDrugog + +brPoenaCrvenog;

      let kolona = document.querySelectorAll(".protivnik-active button");

      kolona.forEach((btn) => {
        btn.style.backgroundColor = "red";
        btn.classList.add("red");
      });

      btnPojedinacnihPoljaKopija[randomPoljeOdabrano.dataset.id].forEach(
        (btn, i) => {
          btn.innerHTML = poljaProtivnika[i];
        }
      );

      btnPojedinacnihPoljaKopija[randomPoljeOdabrano.dataset.id] = [];

      pokusajProtivnikaKonacno();

      inputKonacnoResenje.disabled = false;
    }, 1000);
  } else {
    setTimeout(() => {
      pogresenoPolje(odabraniInput);
    }, 500);

    setTimeout(() => {
      let kolona = document.querySelectorAll(".protivnik-active button");
      kolona.forEach((k) => {
        k.closest(`#kolona-${k.dataset.id}`).classList.remove(
          "protivnik-active"
        );
      });

      if (Object.values(btnPojedinacnihPoljaKopija).flat().length === 0) {
        aktivirajInputPolja();
      }
      vratiPoljeUPocetnoStanje(odabraniInput);

      btns.forEach((btn) => {
        if (
          btn.classList.contains("red") ||
          btn.classList.contains("blue") ||
          btn.classList.contains("kliknuto")
        ) {
          btn.disabled = true;
        } else {
          btn.disabled = false;
        }
      });

      if (
        Array.from(sviInputi).some((i) => {
          return (
            i.style.backgroundColor === "red" ||
            i.style.backgroundColor === "blue"
          );
        })
      ) {
        inputKonacnoResenje.disabled = false;
      }
    }, 1500);
  }
}

function pokusajProtivnikaKonacno() {
  let randomKonacnoResenje = konacnoResenjeProtivnika
    .sort(() => Math.random() - Math.random())
    .slice(0, 1);

  setTimeout(() => {
    inputKonacnoResenje.value = randomKonacnoResenje[0];

    if (randomKonacnoResenje[0] === konacnoResenje) {
      inputKonacnoResenje.style.backgroundColor = "red";

      btns.forEach((btn, i) => {
        if (!btn.classList.contains("blue")) {
          btn.style.backgroundColor = "red";
        }
      });

      ["A", "B", "C", "D"].forEach((kol) => {
        btnPojedinacnihPoljaKopija[kol].forEach((btn, index) => {
          btn.innerHTML = kolone[kol][index];
          brPoenaCrvenog += 2;
        });
      });

      localStorage.setItem("poeni2", +poeniDrugog + (+brPoenaCrvenog + 5));

      divPoeniDrugog.innerHTML = +poeniDrugog + (+brPoenaCrvenog + 5);

      sviInputi.forEach((input, i) => {
        if (!input.classList.contains("reseno")) {
          input.value = svaResenjaKolona[input.dataset.id];
          input.style.backgroundColor = "red";
        }

        inputKonacnoResenje.disabled = false;
      });

      inputKonacnoResenje.disabled = true;
      clearInterval(timer);

      pogledajRezultat();
    } else {
      pogresenoPolje(inputKonacnoResenje);

      setTimeout(() => {
        vratiPoljeUPocetnoStanje(inputKonacnoResenje);

        if (Object.values(btnPojedinacnihPoljaKopija).flat().length === 0) {
          aktivirajInputPolja();
        }
        btns.forEach((btn) => {
          if (
            !btn.classList.contains("red") ||
            !btn.classList.contains("blue") ||
            !btn.classList.contains("kliknuto")
          ) {
            btn.disabled = false;
          }
        });

        if (
          Array.from(sviInputi).some((i) => {
            return (
              i.style.backgroundColor === "red" ||
              i.style.backgroundColor === "blue"
            );
          })
        ) {
          inputKonacnoResenje.disabled = false;
        }
      }, 800);
    }
  }, 700);
}

function daLiJeKonacnoResenjeDostupno() {
  return Array.from(sviInputi).some((input) => {
    return (
      input.classList.contains("reseno") ||
      input.classList.contains("protivnik-reseno")
    );
  });
}

function pogresenoPolje(polje) {
  if (clock > 0) {
    polje.style.backgroundColor = "yellow";
    polje.style.color = "black";
  }
}

function vratiPoljeUPocetnoStanje(polje) {
  if (clock > 0) {
    polje.style.backgroundColor = "#1a274b";
    polje.style.color = "white";
    polje.value = "";
  }
}

btnDalje.addEventListener("click", function () {
  btnDalje.disabled = true;

  sviInputi.forEach((input) => {
    input.disabled = true;
  });
  pokusajProtivnika();
});

function pogledajRezultat() {
  btnDalje.style.display = "none";
  btnRezultat.style.display = "block";
  btnRezultat.classList.add("rezultat-visible");
}

btnRezultat.addEventListener("click", function () {
  btnRezultat.style.display = "none";
  divAsocijacije.style.display = "none";
  document.querySelector("h1").style.display = "none";
  divVreme.style.display = "none";

  let rezultatPrvog = localStorage.getItem("poeni1");
  let rezultatDrugog = localStorage.getItem("poeni2");

  if (+rezultatPrvog > +rezultatDrugog) {
    document.querySelector(".poruka1").style.display = "block";
  } else if (+rezultatPrvog === +rezultatDrugog) {
    document.querySelector(".poruka3").style.display = "block";
  } else {
    document.querySelector(".poruka2").style.display = "block";
  }

  document.querySelector("#igraj-ponovo").style.display = "block";
});

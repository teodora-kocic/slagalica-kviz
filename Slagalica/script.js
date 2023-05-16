const divSlova = document.querySelector("#slova");
const btnsSlova = document.querySelectorAll("#slova button");
const btnStop = document.querySelector("#stop");
const divRec = document.querySelector("#rec");
const divRecProtivnika = document.querySelector("#rec-protivnika");
const divNajduzaRec = document.querySelector("#najduza-rec");
const btnPotvrdi = document.querySelector("#potvrdi");
const btnObrisi = document.querySelector("#obrisi");
const btnSledecaIgra = document.querySelector("#sledeca-igra");

const divPoeniPrvog = document.getElementById("poeni-prvog");
const divPoeniDrugog = document.getElementById("poeni-drugog");

const divVreme = document.getElementById("vreme");

const divIme = document.getElementById("ime-prvog");

let ime = localStorage.getItem("ime");
if (localStorage.getItem("ime")) {
  divIme.innerHTML = ime;
}

let rec1 = {
  slova: ["Nj", "U", "Č", "I", "F", "T", "O", "S", "M", "I", "Ć", "I"],
  kombinacije: [
    "OSIM",
    "MITO",
    "SOFT",
    "SITI",
    "ISTI",
    "SMUČITI",
    "UČITI",
    "ČUTI",
    "STOČIĆ",
    "STOČIĆI",
    "UOČITI",
    "STIĆI",
    "SIT",
    "OČISTI",
    "ČIST",
    "ČISTO",
    "ČISTI",
    "STO",
    "FIT",
    "SUOČI",
    "SUOČITI",
    "SUMNjIČI",
    "OSUMNjIČI",
    "OSUMNjIČITI",
  ],
  najduzaRec: "OSUMNjIČITI",
};

let rec2 = {
  slova: ["C", "I", "N", "I", "Dj", "A", "V", "J", "Č", "A", "G", "A"],
  kombinacije: [
    "JAČI",
    "ČIVIJA",
    "VINA",
    "NAIVAC",
    "ČIN",
    "ČINI",
    "ČINIJA",
    "DjACI",
    "ČADjAV",
    "ČADjAVI",
    "ČADjAVA",
    "ČAJ",
    "ČAJNA",
    "ČAJNI",
    "VAJNI",
    "VIC",
    "JAČINA",
    "NAVIJAČ",
    "NAVIJAČI",
    "NAVIJAČICA",
    "VIJAČA",
    "VAGA",
    "VAGICA",
    "IVICA",
    "NAVIGACIJA",
    "NACIJA",
  ],
  najduzaRec: "NAVIGACIJA",
};

let reci = [rec1, rec2];

let randomRec = reci.sort(() => Math.random() - Math.random()).slice(0, 1)[0];
console.log(randomRec);

btnsSlova.forEach((btn) => {
  btn.disabled = true;
});

btnPotvrdi.disabled = true;

btnObrisi.disabled = true;

let interval;
function randomString(length) {
  let text = "";
  let possible = "ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";

  for (let i = 0; i < length; i++) {
    text = possible.charAt(
      Math.floor(Math.random() * (possible.length - 1 + 1) + 1)
    );
    return text;
  }
}

function changingRandomString(length) {
  interval = setInterval(() => {
    btnsSlova.forEach((btn) => {
      btn.textContent = randomString(length);
    });
  }, 100);
}
changingRandomString(30);

function prikaziSlova() {
  let randomSlova = randomRec.slova.sort(() => Math.random() - Math.random());

  randomSlova.forEach((slovo, i) => {
    btnsSlova[i].innerHTML = slovo;
  });
}

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
      pokusajProtivnika();
      najduzaRec();
      btnSledecaIgra.style.display = "block";
      btnSledecaIgra.classList.add("sledeca-igra-visible");

      localStorage.setItem("poeni1", 0);

      let poeniPlavog = localStorage.getItem("poeni1");
      divPoeniPrvog.innerHTML = poeniPlavog;

      btnsSlova.forEach((btn) => {
        btn.disabled = true;
      });

      btnPotvrdi.disabled = true;

      btnObrisi.disabled = true;
    }
  }, 1000);
}

btnStop.addEventListener("click", function () {
  vreme();
  btnStop.disabled = true;
  prikaziSlova();
  clearInterval(interval);
  btnsSlova.forEach((btn) => {
    btn.disabled = false;
  });
});

divSlova.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    btnPotvrdi.disabled = false;
    btnObrisi.disabled = false;
    e.target.disabled = true;
    e.target.classList.add("disabled");
    let btn = document.createElement("button");
    btn.innerHTML = e.target.innerHTML;
    divRec.append(btn);
  }
});

btnPotvrdi.addEventListener("click", function () {
  clearInterval(timer);

  btnsSlova.forEach((btn) => {
    btn.disabled = true;
  });

  btnObrisi.disabled = true;
  btnPotvrdi.disabled = true;
  let btns = divRec.querySelectorAll("button");
  console.log(btns);

  let nizSlova = [];
  btns.forEach((btn) => {
    nizSlova.push(btn.innerHTML);
  });

  let konacnaRec = nizSlova.join("");
  console.log(konacnaRec);

  if (randomRec.kombinacije.find((k) => k === konacnaRec)) {
    if (randomRec.najduzaRec === konacnaRec) {
      localStorage.setItem("poeni1", nizSlova.length * 2 + 5);

      let poeniPlavog = localStorage.getItem("poeni1");
      divPoeniPrvog.innerHTML = poeniPlavog;
    } else {
      localStorage.setItem("poeni1", nizSlova.length * 2);

      let poeniPlavog = localStorage.getItem("poeni1");
      divPoeniPrvog.innerHTML = poeniPlavog;
    }
  } else {
    localStorage.setItem("poeni1", 0);

    let poeniPlavog = localStorage.getItem("poeni1");
    divPoeniPrvog.innerHTML = poeniPlavog;
  }

  setTimeout(() => {
    pokusajProtivnika();
  }, 500);

  setTimeout(() => {
    btnSledecaIgra.style.display = "block";
    btnSledecaIgra.classList.add("sledeca-igra-visible");
    najduzaRec();
  }, 1000);
});

btnObrisi.addEventListener("click", function () {
  let btns = divRec.querySelectorAll("button");
  if (btns.length === 0) {
    btnObrisi.disabled = true;
    btnPotvrdi.disabled = true;
    return;
  }

  if (divRec.innerHTML === "") {
    btnObrisi.disabled = true;
    btnPotvrdi.disabled = true;
    return;
  }
  let arrDisabled = [];
  btnsSlova.forEach((btn) => {
    if (btn.classList.contains("disabled")) {
      arrDisabled.push(btn);
    }
  });

  let letterDisabled = arrDisabled.find(
    (btn) => btn.innerHTML === divRec.lastElementChild.innerHTML
  );

  console.log(letterDisabled);
  letterDisabled.disabled = false;
  letterDisabled.classList.remove("disabled");

  divRec.removeChild(divRec.lastElementChild);
});

function pokusajProtivnika() {
  let randomResenje = randomRec.kombinacije
    .slice()
    .sort(() => Math.random() - Math.random())
    .slice(0, 1)[0];

  console.log([...randomResenje]);

  let randomResenjeNiz = [...randomResenje];

  let indeksMalogSlova = randomResenjeNiz.findIndex(
    (char) => char === char.toLowerCase()
  );
  console.log(indeksMalogSlova);

  if (indeksMalogSlova > 0) {
    console.log(indeksMalogSlova);

    let slovo1 = randomResenjeNiz.splice(indeksMalogSlova, 1);
    let slovo2 = randomResenjeNiz.splice(indeksMalogSlova - 1, 1);
    console.log(slovo1, slovo2);

    let spojenaSlova = slovo2.concat(slovo1).join("");

    randomResenjeNiz.splice(indeksMalogSlova - 1, 0, spojenaSlova);
    console.log(spojenaSlova);
  }
  console.log(randomResenjeNiz);

  randomResenjeNiz.forEach((slovo) => {
    let btn = document.createElement("button");

    btn.innerHTML = slovo;

    divRecProtivnika.append(btn);
  });

  if (randomResenje === randomRec.najduzaRec) {
    localStorage.setItem("poeni2", randomResenjeNiz.length * 2 + 5);

    let poeniCrvenog = localStorage.getItem("poeni2");
    divPoeniDrugog.innerHTML = poeniCrvenog;
  } else {
    localStorage.setItem("poeni2", randomResenjeNiz.length * 2);

    let poeniCrvenog = localStorage.getItem("poeni2");
    divPoeniDrugog.innerHTML = poeniCrvenog;
  }
}

function najduzaRec() {
  let najduzaRecNiz = [...randomRec.najduzaRec];

  let indeksMalogSlova = najduzaRecNiz.findIndex(
    (char) => char === char.toLowerCase()
  );

  if (indeksMalogSlova > 0) {
    let slovo1 = najduzaRecNiz.splice(indeksMalogSlova, 1);
    let slovo2 = najduzaRecNiz.splice(indeksMalogSlova - 1, 1);
    console.log(slovo1, slovo2);

    let spojenaSlova = slovo2.concat(slovo1).join("");

    najduzaRecNiz.splice(indeksMalogSlova - 1, 0, spojenaSlova);
  }

  najduzaRecNiz.forEach((slovo) => {
    let btn = document.createElement("button");
    btn.innerHTML = slovo;

    divNajduzaRec.append(btn);
  });
}

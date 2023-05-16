const divPoeniPrvog = document.getElementById("poeni-prvog");
const divPoeniDrugog = document.getElementById("poeni-drugog");
const divVreme = document.getElementById("vreme");

const divIme = document.getElementById("ime-prvog");

const divDobijenBroj = document.getElementById("dobijen-broj");
const divRezultatPrvog = document.getElementById("rezultat-prvog");
const divRezultatDrugog = document.getElementById("rezultat-drugog");
const divRacunanje = document.querySelector("#racunanje");
const btnPotvrdi = document.getElementById("potvrdi");
const btnObrisi = document.getElementById("obrisi");
const divKliknuti = document.getElementById("kliknuti");

const divPonudjen1 = document.getElementById("ponudjen-1");
const divPonudjen2 = document.getElementById("ponudjen-2");
const divPonudjen3 = document.getElementById("ponudjen-3");
const divPonudjen4 = document.getElementById("ponudjen-4");

const divDvocifrenPrvi = document.getElementById("prvi");
const divDvocifrenDrugi = document.getElementById("drugi");

const btnStop = document.getElementById("stop");
const btnSledecaIgra = document.getElementById("sledeca-igra");

let operations = ["+", "-", "*", "/", "(", ")"];
let numbers = [];
let racunanjeArray = [];
const btns = document.querySelectorAll(".btns");
const operacije = document.querySelectorAll(".operacija");
const zagrade = document.querySelectorAll(".zagrade");

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

function randomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDvocifreni(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  const item = arr[randomIndex];

  return item;
}

const counters = document.querySelectorAll("#jednocifreni button");
const countersDvocifreni = document.querySelectorAll("#dvocifreni button");
let counter;
let counterDvocifreni;
let counterDobijeniBroj;
function countTo() {
  let from = 0;
  let to = 9;

  let step = to > from ? 1 : -1;

  let interval = 50;

  if (from == to) {
    counters.forEach((count) => {
      count.textContent = from;
      return;
    });
  }

  counter = setInterval(function () {
    from += step;

    counters.forEach((count) => {
      count.textContent = from;
    });

    if (from == to) {
      clearInterval(counter);
      countTo();
    }
  }, interval);
}

countTo();

function countTo2() {
  let from = 10;
  let to = 99;

  let step = to > from ? 1 : -1;

  let interval = 50;

  if (from == to) {
    countersDvocifreni.forEach((count) => {
      count.textContent = from;
      return;
    });
  }

  counterDvocifreni = setInterval(function () {
    from += step;

    countersDvocifreni.forEach((count) => {
      count.textContent = from;
    });

    if (from == to) {
      clearInterval(counterDvocifreni);
      countTo2();
    }
  }, interval);
}

countTo2();

function countTo3() {
  let from = 1;
  let to = 999;

  let step = to > from ? 1 : -1;

  let interval = 50;

  if (from == to) {
    divDobijenBroj.textContent = from;
    return;
  }

  counterDobijeniBroj = setInterval(function () {
    from += step;

    divDobijenBroj.textContent = from;

    if (from == to) {
      clearInterval(counterDobijeniBroj);
      countTo3();
    }
  }, interval);
}

countTo3();

let result;

let timer;
btnStop.addEventListener("click", () => {
  clearInterval(counter);
  clearInterval(counterDvocifreni);
  clearInterval(counterDobijeniBroj);

  let clock = 60;
  timer = setInterval(function () {
    if (clock > 0) {
      clock--;
      divVreme.innerHTML = clock;
    }

    if (clock <= 10) {
      divVreme.style.color = "red";
    }

    if (clock <= 0) {
      result = 0;
      clearInterval(timer);
      operacije.forEach((o) => {
        o.disabled = true;
      });

      zagrade.forEach((z) => {
        z.disabled = true;
      });

      btns.forEach((btn) => {
        btn.disabled = true;
      });

      btnObrisi.disabled = true;
      btnPotvrdi.disabled = true;

      divRezultatPrvog.innerHTML = 0;

      const dobijenBroj = divDobijenBroj.innerHTML;

      const rezultatDrugog = randomNumbers(+dobijenBroj - 5, +dobijenBroj + 5);
      divRezultatDrugog.innerHTML = rezultatDrugog;

      if (rezultatDrugog == dobijenBroj) {
        divPoeniDrugog.innerHTML = 10;
      } else if (Math.abs(+rezultatDrugog - +dobijenBroj) < 5) {
        divPoeniDrugog.innerHTML = 5;
      }

      btnSledecaIgra.style.display = "block";
      btnSledecaIgra.classList.add("sledeca-igra-visible");
    }
  }, 1000);

  const randomSolution = randomNumbers(1, 999);
  divDobijenBroj.innerHTML = randomSolution;

  const randomPonudjen1 = randomNumbers(1, 9);
  divPonudjen1.innerHTML = randomPonudjen1;

  const randomPonudjen2 = randomNumbers(1, 9);
  divPonudjen2.innerHTML = randomPonudjen2;

  const randomPonudjen3 = randomNumbers(1, 9);
  divPonudjen3.innerHTML = randomPonudjen3;

  const randomPonudjen4 = randomNumbers(1, 9);
  divPonudjen4.innerHTML = randomPonudjen4;

  const randomDvocifrenPrvi = randomDvocifreni([10, 15, 25]);
  divDvocifrenPrvi.innerHTML = randomDvocifrenPrvi;

  const randomDvocifrenDrugi = randomDvocifreni([50, 75, 100]);
  divDvocifrenDrugi.innerHTML = randomDvocifrenDrugi;
  btnStop.classList.add("clicked");
  btnStop.disabled = true;
});

divKliknuti.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  operacije.forEach((o) => {
    o.disabled = true;
  });

  if (btnStop.classList.contains("clicked")) {
    if (e.target.closest("div.ponudjeni")) {
      numbers.push(e.target.innerHTML);

      operacije.forEach((o) => {
        o.disabled = false;
      });

      e.target.classList.add("disabled1");

      btns.forEach((btn) => {
        btn.disabled = true;
      });
    } else if (e.target.classList.contains("zagrade")) {
      operacije.forEach((o) => {
        o.disabled = false;
      });
    } else {
      btns.forEach((btn) => {
        btn.disabled = false;
      });
      operacije.forEach((o) => {
        o.disabled = true;
      });

      zagrade.forEach((z) => {
        z.disabled = false;
      });
    }

    divRacunanje.innerHTML += e.target.innerHTML;
    racunanjeArray.push(e.target.innerHTML);
  } else {
    operacije.forEach((o) => {
      o.disabled = true;
    });
  }
});

btnPotvrdi.addEventListener("click", function () {
  btnPotvrdi.disabled = true;
  if (!btnStop.classList.contains("clicked")) return;
  if (!divRacunanje.innerHTML) return;

  clearInterval(timer);

  operacije.forEach((o) => {
    o.disabled = true;
  });

  btns.forEach((btn) => {
    btn.disabled = true;
  });

  zagrade.forEach((z) => {
    z.disabled = true;
  });

  btnObrisi.disabled = true;

  try {
    result = eval(divRacunanje.innerHTML);
  } catch (err) {
    result = 0;
    console.error(err);
  }

  divRezultatPrvog.innerHTML = result;

  const dobijenBroj = +divDobijenBroj.innerHTML;

  const rezultatDrugog = randomNumbers(+dobijenBroj - 5, +dobijenBroj + 5);
  divRezultatDrugog.innerHTML = +rezultatDrugog;

  if (result == dobijenBroj) {
    divPoeniPrvog.innerHTML = +divPoeniPrvog.innerHTML + 10;
  }

  if (rezultatDrugog == dobijenBroj) {
    divPoeniDrugog.innerHTML = +divPoeniDrugog.innerHTML + 10;
  }

  if (result == dobijenBroj && rezultatDrugog == dobijenBroj) {
    divPoeniPrvog.innerHTML = +divPoeniPrvog.innerHTML + 10;
    divPoeniDrugog.innerHTML = +divPoeniDrugog.innerHTML + 5;
  }

  if (result != dobijenBroj && rezultatDrugog != dobijenBroj) {
    if (
      Math.abs(+result - +dobijenBroj) < 5 ||
      Math.abs(+rezultatDrugog - +dobijenBroj) < 5
    ) {
      if (
        Math.abs(+result - +dobijenBroj) <
        Math.abs(+rezultatDrugog - +dobijenBroj)
      ) {
        divPoeniPrvog.innerHTML = +divPoeniPrvog.innerHTML + 5;
      } else {
        divPoeniDrugog.innerHTML = +divPoeniDrugog.innerHTML + 5;
      }
    }
  }

  let poeniPrvog = +divPoeniPrvog.innerHTML;
  let poeniDrugog = +divPoeniDrugog.innerHTML;

  localStorage.setItem("poeni1", poeniPrvog);
  localStorage.setItem("poeni2", poeniDrugog);

  btnSledecaIgra.style.display = "block";
  btnSledecaIgra.classList.add("sledeca-igra-visible");
});

let numberArray = [];
btnObrisi.addEventListener("click", function () {
  let dvocifreni = document.querySelectorAll("#dvocifreni .btns");

  let obrisanZnak = racunanjeArray.pop();

  if (!obrisanZnak) {
    return;
  }

  const nizZnakova = divRacunanje.innerHTML
    .split("")
    .slice(0, divRacunanje.innerHTML.length - obrisanZnak.length);

  let newTextArea = nizZnakova.join("");
  divRacunanje.innerHTML = newTextArea;

  btns.forEach((btn) => {
    numberArray.push(btn.innerHTML);
  });

  if (numberArray.includes(obrisanZnak)) {
    let alreadyEnabled = false;

    btns.forEach((btn) => {
      if (btn.classList.contains("disabled1") && alreadyEnabled === false) {
        if (btn.innerHTML == obrisanZnak) {
          btn.classList.remove("disabled1");
          alreadyEnabled = true;
        }
      }
      btn.disabled = false;
    });
  } else {
    operacije.forEach((o) => {
      o.disabled = false;
    });
  }

  if (numberArray.includes(obrisanZnak)) {
    dvocifreni.forEach((btn) => {
      if (btn.classList.contains("disabled1")) {
        if (btn.innerHTML == obrisanZnak) {
          btn.classList.remove("disabled1");
        }
      }
      btn.disabled = false;
    });
  } else {
    operacije.forEach((o) => {
      o.disabled = false;
    });
  }
});

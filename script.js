const btnZapocniIgru = document.getElementById("zapocni-igru");
const inputIme = document.getElementById("ime");

btnZapocniIgru.addEventListener("click", function () {
  let value = inputIme.value;

  localStorage.setItem("ime", value);
  inputIme.value = "";

  if (inputIme.value == "" || Number(inputIme.value)) return;
});

inputIme.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    let value = inputIme.value;

    localStorage.setItem("ime", value);

    if (inputIme.value == "" || Number(inputIme.value)) return;

    btnZapocniIgru.click();
    inputIme.value = "";
  }
});

const csvForm = document.getElementById("csvForm");
const csvFile = document.getElementById("csvFile");
let currentData;

csvForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text);
        populateTable(initTable, data);
        currentData = data;
    };
    reader.readAsText(input);
});

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).replace("\r", "").replace(" ", "").toLowerCase().split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).replaceAll("\r", "").split("\n");

    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
          object[header] = values[index];
          return object;
        }, {});
        return el;
      });

      return arr;
}

const initTable = document.getElementById("init-table");
const resultTable = document.getElementById("result-table");

const populateTable = (table, data) => {
  data.forEach(object => {
    let row = table.insertRow();
    for (const value in object) {
      let cell = row.insertCell();
      cell.innerHTML = `${object[value]}`;
    }
  })
};


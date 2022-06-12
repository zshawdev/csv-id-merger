const csvForm = document.getElementById("csvForm");
const csvFile = document.getElementById("csvFile");

csvForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text);
        // console.log(data);
    };
    reader.readAsText(input);
});

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).replace("\r", "").split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).replaceAll("\r", "").split("\n");
    console.log(headers, rows);

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
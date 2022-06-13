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
    const headers = str.slice(0, str.indexOf("\n")).replace("\r", "").replaceAll(" ", "").toLowerCase().split(delimiter);
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

const mergeToResultTable = (currentData) => {
  const fullNameData = createFullName(currentData);
  const mergeDataComplete = mergeFromMergeEnabledColumns(fullNameData); 
  populateTable(resultTable, mergeDataComplete);
};

const createFullName = (data) => {
  const newArr = data.map(object => {
    object.name = `${object.firstname} ${object.lastname}`;
    delete object.firstname;
    delete object.lastname;
    return object;
  });
  return newArr;
};

mergeFromMergeEnabledColumns = (data) => {
  let uniqueObjects = [];
  data.forEach(object => {
    const isAlreadyPresentIdentifier = uniqueObjects.findIndex(matchingObject => {
      return matchingObject.identifier === object.identifier
    });
    if (isAlreadyPresentIdentifier !== -1) {
      const mergeProperty = (property) => {
        uniqueObjects[isAlreadyPresentIdentifier][property] += `;${object[property]}`;
      }
      if (true) {
        mergeProperty("email");
      }
      if (true) {
        mergeProperty("name");
      }
      if (true) {
        mergeProperty("cust1");
      }
      if (true) {
        mergeProperty("cust2");
      }
      if (true) {
        mergeProperty("cust3");
      }
      if (true) {
        mergeProperty("cust4");
      }
      if (true) {
        mergeProperty("cust5");
      }
    }
    else {
      return uniqueObjects.push(object);
    }
  });
  console.log(uniqueObjects);
  return uniqueObjects;
};


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
    const createCell = (propertyName, index) => {
      const cell = row.insertCell(index)
      cell.innerHTML = object[propertyName];
    }
    createCell("identifier", 0);
    createCell("email", 1);
    if (!object.name) {
      createCell("firstname", 2);
      createCell("lastname", 3);
      createCell("cust1", 4);
      createCell("cust2", 5);
      createCell("cust3", 6);
      createCell("cust4", 7);
      createCell("cust5", 8);

    } else {
      createCell("name", 2);
      createCell("cust1", 3);
      createCell("cust2", 4);
      createCell("cust3", 5);
      createCell("cust4", 6);
      createCell("cust5", 7);
    }
  })
};

const mergeButton = document.getElementById("merge-button");
mergeButton.addEventListener("click", () => {
  mergeToResultTable(currentData);
})

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

const checkboxMergeEmail = document.getElementById("checkbox-merge-email");
const checkboxMergeName = document.getElementById("checkbox-merge-name");
const checkboxMergeCust1 = document.getElementById("checkbox-merge-cust-1");
const checkboxMergeCust2 = document.getElementById("checkbox-merge-cust-2");
const checkboxMergeCust3 = document.getElementById("checkbox-merge-cust-3");
const checkboxMergeCust4 = document.getElementById("checkbox-merge-cust-4");
const checkboxMergeCust5 = document.getElementById("checkbox-merge-cust-5");

mergeFromMergeEnabledColumns = (data) => {
  let uniqueObjects = [];
  data.forEach(object => {
    const isAlreadyPresentIdentifier = uniqueObjects.findIndex(matchingObject => {
      return matchingObject.identifier === object.identifier
    });
    if (isAlreadyPresentIdentifier !== -1) {
      const mergeProperty = (property) => {
        if (object[property]) {
          uniqueObjects[isAlreadyPresentIdentifier][property] += `;${object[property]}`;
        }
      }
      const mergeIfChecked = (checkbox, property) => {
        if (checkbox.checked) {
          mergeProperty(property);
        }
      }
      mergeIfChecked(checkboxMergeEmail, "email");
      mergeIfChecked(checkboxMergeName, "name");
      mergeIfChecked(checkboxMergeCust1, "cust1");
      mergeIfChecked(checkboxMergeCust2, "cust2");
      mergeIfChecked(checkboxMergeCust3, "cust3");
      mergeIfChecked(checkboxMergeCust4, "cust4");
      mergeIfChecked(checkboxMergeCust5, "cust5");
    }
    else {
      return uniqueObjects.push(object);
    }
  });
  return uniqueObjects;
};


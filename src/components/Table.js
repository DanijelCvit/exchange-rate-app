import { AMOUNT_ID, SAVE_BTN_ID } from "../constants.js";

export const createTable = () => {
  let rowArray = [];

  // Create row array where to store future rows
  if (!localStorage.getItem("rows")) {
    const rows = { rowArray };
    localStorage.setItem("rows", JSON.stringify(rows));
  } else {
    const rowsString = localStorage.getItem("rows");
    const rowsData = JSON.parse(rowsString);
    rowArray = rowsData.rowArray;
  }

  let rowsTemplate = "";
  for (let i = 0; i < rowArray.length; i++) {
    rowsTemplate += String.raw`${createTableRow(
      {
        fromCurrency: rowArray[i].fromCurrency,
        toCurrency: rowArray[i].toCurrency,
      },
      rowArray[i].rate,
      rowArray[i].id
    )}`;
  }

  return String.raw`
<div class="row shadow mb-5 p-2">
<table class="table table-hover align-items-center mt-3">
  <thead >
    <tr>
      <th scope="col">#</th>
      <th class="table-head" scope="col">From</th>
      <th class="table-head" scope="col">To</th>
      <th class="table-head" scope="col">Rate</th>
      <th class="table-head" scope="col"></th>

    </tr>
  </thead>
  <tbody>
    ${rowsTemplate}
  </tbody>
</table>
</div>

    `;
};

const createTableRow = (data, rate, newId) => {
  return String.raw`
     <tr id="${newId}">
      <th scope="row">${newId}</th>
      <td>${data.fromCurrency}</td>
      <td>${data.toCurrency}</td>
      <td>${rate}</td>
      <td><button class="btn btn-secondary"><i class="far fa-trash-alt"></i></button></td>

    </tr>
  `;
};

export const addTableRow = () => {
  const newId = document.querySelectorAll("table tbody tr").length + 1;

  if (newId === 10) {
    document.getElementById(SAVE_BTN_ID).disabled = true;
  }

  const storedData = localStorage.getItem("exchangeData");
  const data = JSON.parse(storedData);
  const rate = localStorage.getItem("rate");

  // Save data in local storage
  const rowsString = localStorage.getItem("rows");
  const rowsData = JSON.parse(rowsString);
  rowsData.rowArray.push({
    fromCurrency: data.fromCurrency,
    toCurrency: data.toCurrency,
    rate,
    id: newId,
  });

  localStorage.setItem("rows", JSON.stringify(rowsData));

  const tableBodyElement = document.querySelector("table tbody");
  const tableRowTemplate = createTableRow(data, rate, newId);
  tableBodyElement.insertAdjacentHTML("beforeend", tableRowTemplate);

  const rowArray = document.querySelectorAll("table tbody tr");
  rowArray[rowArray.length - 1].addEventListener("click", deleteTableRow);
};

export const deleteTableRow = (e) => {
  if (!e.target.classList.contains("fa-trash-alt")) {
    return;
  }

  const currentRow = e.currentTarget;
  const saveButton = document.getElementById(SAVE_BTN_ID);

  // Get saved rows from local storage
  const rowsString = localStorage.getItem("rows");
  let { rowArray } = JSON.parse(rowsString);

  // Remove deleted row
  rowArray = rowArray.filter((row) => row.id !== +currentRow.id);
  localStorage.setItem("rows", JSON.stringify({ rowArray }));

  currentRow.remove();

  if (saveButton.disabled) {
    saveButton.disabled = false;
  }
};

export const restoreTableRows = () => {};

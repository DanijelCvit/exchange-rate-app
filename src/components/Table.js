import { SAVE_BTN_ID, TABLE_ID } from "../constants.js";

export const createTable = () => {
  if (!localStorage.getItem("rows")) {
    const rows = { rowArray: [] };
    localStorage.setItem("rows", JSON.stringify(rows));
  }

  return String.raw`
<div id=${TABLE_ID} class="row shadow mb-5 p-2">
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
    ${updateTableRows()}
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
  const storedData = localStorage.getItem("exchangeData");
  const data = JSON.parse(storedData);
  const rate = localStorage.getItem("rate");

  // Save data in local storage
  const rowsString = localStorage.getItem("rows");
  const rowsData = JSON.parse(rowsString);

  const tableBodyElement = document.querySelector("table tbody");
  if (!rowsData.rowArray.length) {
    tableBodyElement.innerHTML = "";
  }

  const newId = rowsData.rowArray.length + 1;

  if (newId === 10) {
    document.getElementById(SAVE_BTN_ID).disabled = true;
  }

  rowsData.rowArray.push({
    fromCurrency: data.fromCurrency,
    toCurrency: data.toCurrency,
    rate,
    id: newId,
  });

  localStorage.setItem("rows", JSON.stringify(rowsData));

  const tableRowTemplate = createTableRow(data, rate, newId);
  tableBodyElement.insertAdjacentHTML("beforeend", tableRowTemplate);

  const rowArray = document.querySelectorAll("table tbody tr");
  rowArray[rowArray.length - 1].addEventListener("click", deleteTableRow);
};

export const deleteTableRow = (e) => {
  if (
    !e.target.classList.contains("fa-trash-alt") &&
    !e.target.classList.contains("btn")
  ) {
    return;
  }

  const currentRow = e.currentTarget;
  const saveButton = document.getElementById(SAVE_BTN_ID);

  // Get saved rows from local storage
  const rowsString = localStorage.getItem("rows");
  let { rowArray } = JSON.parse(rowsString);

  // Remove deleted row
  rowArray = rowArray.filter((row, index) => index + 1 !== +currentRow.id);
  localStorage.setItem("rows", JSON.stringify({ rowArray }));

  const tableRowsTemplate = updateTableRows();
  const tableBodyElement = document.querySelector("table tbody");

  tableBodyElement.innerHTML = "";
  tableBodyElement.insertAdjacentHTML("afterbegin", tableRowsTemplate);

  // innerHTML clears event handlers, re-adding them here
  document
    .querySelectorAll("table tbody tr")
    .forEach((row) => row.addEventListener("click", deleteTableRow));

  if (saveButton.disabled) {
    saveButton.disabled = false;
  }
};

export const updateTableRows = () => {
  const rowsString = localStorage.getItem("rows");
  const rowsData = JSON.parse(rowsString);
  const { rowArray } = rowsData;

  if (!rowArray.length) {
    return String.raw`
  <tr>
    <td colspan="5" style="border-bottom:0;"><div class="text-center table-text-opacity">Save rates here</div></td>
  </tr>
  `;
  }

  let rowsTemplate = "";
  for (let i = 0; i < rowArray.length; i++) {
    rowsTemplate += String.raw`${createTableRow(
      {
        fromCurrency: rowArray[i].fromCurrency,
        toCurrency: rowArray[i].toCurrency,
      },
      rowArray[i].rate,
      i + 1
    )}`;
  }
  return rowsTemplate;
};

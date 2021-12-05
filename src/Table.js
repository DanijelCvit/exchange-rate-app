import { AMOUNT_ID, SAVE_BTN_ID } from "./constants.js";

export const createTable = () => {
  // Create row array where to store future rows
  const rows = { rowArray: [] };
  localStorage.setItem("rows", JSON.stringify(rows));

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
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><a class="btn btn-secondary" href="#"><i class="far fa-trash-alt"></i></a></td>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><a class="btn btn-secondary" href="#"><i class="far fa-trash-alt"></i></a></td>

    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><a class="btn btn-secondary" href="#"><i class="far fa-trash-alt"></i></a></td>

    </tr>
  </tbody>
</table>
</div>

    `;
};

const createTableRow = (data, rate, newId) => {
  return String.raw`
     <tr id="table-row-${newId}">
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
  });

  localStorage.setItem("rows", JSON.stringify(rowsData));

  const tableBodyElement = document.querySelector("table tbody");
  const tableRowTemplate = createTableRow(data, rate, newId);
  tableBodyElement.insertAdjacentHTML("beforeend", tableRowTemplate);

  const rowArray = document.querySelectorAll("table tbody tr");
  rowArray[rowArray.length - 1].addEventListener("click", deleteTableRow);
};

export const deleteTableRow = (e) => {
  const saveButton = document.getElementById(SAVE_BTN_ID);

  e.currentTarget.remove();

  if (saveButton.disabled) {
    saveButton.disabled = false;
  }
};

export const restoreTableRows = () => {};

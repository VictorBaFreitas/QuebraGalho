document.addEventListener("DOMContentLoaded", function () {
  const checkbox8 = document.getElementById("cto8Conectores");
  const checkbox16 = document.getElementById("cto16Conectores");
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("m-3");
  document.querySelector(".container.mt-5").appendChild(tableContainer);

  function createTable(rows) {
    let tableHTML = `
        <table class="table caption-top mb-5">
          <caption>Lista de Portas</caption>
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Porta Livre (Sim ou Não)</th>
              <th scope="col">ID do Cliente</th>
              <th scope="col">Nome do Cliente</th>
            </tr>
          </thead>
          <tbody>`;

    for (let i = 1; i <= rows; i++) {
      tableHTML += `
          <tr>
            <th scope="row">${i}</th>
            <td><input type="text" class="form-control" /></td>
            <td><input type="text" class="form-control" /></td>
            <td><input type="text" class="form-control" /></td>
          </tr>`;
    }

    tableHTML += `</tbody></table>`;
    tableContainer.innerHTML = tableHTML;
  }

  function updateTable() {
    if (checkbox8.checked && checkbox16.checked) {
      createTable(16);
    } else if (checkbox8.checked) {
      createTable(8);
    } else if (checkbox16.checked) {
      createTable(16);
    } else {
      tableContainer.innerHTML = "";
    }
  }

  checkbox8.addEventListener("change", updateTable);
  checkbox16.addEventListener("change", updateTable);
});

export const createTable = () => {
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

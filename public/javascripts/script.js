$(document).ready(function () {
  getTodos();
  function getTodos() {
    $("#todolist").html("");
    $.ajax({
      url: "/todo",
      type: "POST",
    }).then(function (data) {
      if (data.length > 0) {
        $("#todolist").html(
          data.map((todo) => {
            return `<li class="list-group-item d-flex justify-content-between align-items-center mb-2 ${
              todo.completed ? "bg-success" : "bg-light"
            }  row ">
        <div class="ms-3 todo d-inline-block col-3">
          <label for="check" class="form-check-label fw-semibold text-dark user-select-none ${
            todo.completed ? "text-decoration-line-through" : ""
          }">
            ${todo.activity}
          </label>
        </div>
        <label class="badge bg-primary rounded-pill text-light fw-semibold col-3 ${
          todo.completed ? "" : "bg-danger"
        }">
          ${todo.completed ? "Completed" : "Not Completed"}</label>
          <div class="col-3 d-flex justify-content-end">
        <form id="updateForm" method="POST" action="/todo/${todo._id}?_method=PUT" class="d-inline me-3">
          <input type="hidden" name="completed" value="${
            todo.completed ? 0 : 1
          }">
          <button type="submit" class="btn btn-primary fw-semibold ${
            todo.completed ? "btn-danger" : "btn-success"
          }">
            ${todo.completed ? "Uncomplete" : "Complete"}
          </button>
        </form>
        <form id="deleteForm" method="POST" action="/todo/${todo._id}?_method=DELETE" class="d-inline">
          <button type="submit" class="btn btn-danger fw-semibold" onclick="return confirm('Are you sure?')">
            Remove
          </button>
        </form>
        </div>
      </li>`;
          })
        );
      } else {
        $("#todolist")
          .html(`<li class="list-group-item d-flex justify-content-between align-items-center mb-2 bg-light row">
        <div class="ms-3 todo d-inline-block col-12">
          <label for="check" class="form-check-label fw-semibold text-dark user-select-none">
            No Todos
          </label>
        </div>
        </li>`);
      }
    });
  }

  $("#todoForm").submit(function (e) {
    e.preventDefault();
    if ($("#taskAdd").val() == "") {
      alert("Please fill the form");
    } else {
      $.ajax({
        url: "/todo/add",
        type: "POST",
        data: {
          activity: $("#taskAdd").val(),
          completed: 0,
        },
      }).then(function (data) {
        getTodos();
        $("#taskAdd").val("");
      });
    }
  });

  $("#deleteAll").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/todo",
      type: "DELETE",
    }).then(function (data) {
      getTodos();
    });
  });
});

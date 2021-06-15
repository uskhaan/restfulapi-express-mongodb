//main function
$(function() {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function() {
    var id = $("#updateId").val();
    var name = $("#updateName").val();
    var email = $("#updateEmail").val();
    $.ajax({
      url: "https://wtassign3.herokuapp.com/api/products/" + id,
      data: { name, email },
      method: "PUT",
      success: function(response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});

//updating current data
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://wtassign3.herokuapp.com/api/products/" + id, function(
    response
  ) {
    $("#updateId").val(response._id);
    $("#updateName").val(response.name);
    $("#updateEmail").val(response.email);
    $("#updateFID").val(response.fid);
    $("#updateGender").val(response.gender);
    $("#updateCourseC").val(response.coursecode);
    $("#updatePhone").val(response.phone);
    $("#updateModal").modal("show");
  });
}
//function to insert new record
function addRecipe() {
  var name = $("#name").val();
  var email = $("#email").val();
  var fid   = $("#fid").val();
  var gender   = $("#gender").val();
  var coursecode   = $("#coursecode").val();
  var phone   = $("#phone").val();
  $.ajax({
    url: "https://wtassign3.herokuapp.com/api/products/",
    method: "POST",
    data: { name, email, fid, gender, coursecode, phone},
    success: function(response) {
      console.log(response);
      $("#name").val("");
      $("#email").val("");
      $("#fid").val("");
      $("#gender").val("");
      $("#coursecode").val("");
      $("#phone").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://wtassign3.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function() {
      loadRecipies();
    }
  });
}

//loading data from api
function loadRecipies() {
  $.ajax({
    url: "https://wtassign3.herokuapp.com/api/products/",
    method: "GET",
    error: function(response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec._id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> E-Mail: ${rec.email}</p><p>ID: ${rec.fid}</p><p>Gender: ${rec.gender}</p><p>Course Code: ${rec.coursecode}</p><p>Phone#: ${rec.phone}</p><p>City: ${rec.address.city}</p></div>`
        );
        
      }
    }
  });
}

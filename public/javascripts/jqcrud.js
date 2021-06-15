//main function
$(function () {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    console.log("CLICKED");
    var id = $("#updateId").val();
    var name = $("#updateName").val();
    var email = $("#updateEmail").val();
    var course_code = $("#updateCourse_code").val();
    var gender = $("#updateGender").val();
    var street_address = $("#updateStreet").val();
    var city = $("#updateCity").val();
    var country = $("#updateCountry").val();
    var phone1 = $("#updatePhone1").val();
    var phone2 = $("#updatePhone2").val();
    console.log(
      "DATA to update: ",
      id,
      name,
      email,
      course_code,
      gender,
      street_address,
      city,
      country,
      phone1,
      phone2
    );
    $.ajax({
      url: "https://wtassign3.herokuapp.com/api/products/" + id,
      // url: "http://localhost:3000/api/products/" + id,
      data: {
        name,
        email,
        course_code,
        gender,
        street_address,
        city,
        country,
        phone1,
        phone2,
      },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      },
    });
  });
});

//updating current data
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://wtassign3.herokuapp.com/api/products/" + id,
    function (response) {
      $("#updateId").val(response._id);
      $("#updateName").val(response.name);
      $("#updateName").val(response.name);
      $("#updateEmail").val(response.email);
      $("#updateCourse_code").val(response.course_code);
      $("#updateGender").val(response.gender);
      $("#updateStreet").val(response.address.street_address);
      $("#updateCity").val(response.address.city);
      $("#updateCountry").val(response.address.country);
      $("#updatePhone1").val(response.phone_numbers[0]);
      $("#updatePhone2").val(response.phone_numbers[1]);
      $("#updateModal").modal("show");
    }
  );
}
//function to insert new record
function addRecipe() {
  var name = $("#name").val();
  var email = $("#email").val();
  var course_code = $("#course_code").val();
  var gender = $("#gender").val();
  var street_address = $("#street_address").val();
  var city = $("#city").val();
  var country = $("#country").val();
  var phone1 = $("#phone1").val();
  var phone2 = $("#phone2").val();
  console.log(
    "REQ:",
    name,
    email,
    course_code,
    gender,
    street_address,
    city,
    country,
    phone1,
    phone2
  );
  $.ajax({
    url: "https://wtassign3.herokuapp.com/api/products/",
    // url: "http://localhost:3000/api/products/",
    method: "POST",
    data: {
      name,
      email,
      course_code,
      gender,
      street_address,
      city,
      country,
      phone1,
      phone2,
    },

    success: function (response) {
      console.log("Res:", response);
      $("#name").val("");
      $("#email").val("");
      $("#course_code").val("");
      $("#gender").val("");
      $("#street_address").val("");
      $("#city").val("");
      $("#country").val("");
      $("#phone1").val("");
      $("#phone2").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    },
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://wtassign3.herokuapp.com/api/products/" + id,
    // url: "http://localhost:3000/api/products/" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    },
  });
}

//loading data from api
function loadRecipies() {
  $.ajax({
    url: "https://wtassign3.herokuapp.com/api/products/",
    // url: "http://localhost:3000/api/products/",
    method: "GET",
    error: function (response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function (response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        console.log("REC: ", rec);
        recipes.append(
          `<div class="recipe" data-id="${rec._id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> E-Mail: ${rec.email}</p><p>Gender: ${rec.gender}</p><p>Course Code: ${rec.course_code}</p><p>Street Address: ${rec.address.street_address}</p><p>City: ${rec.address.city}</p><p>Country: ${rec.address.country}</p><p>Phone#1: ${rec.phone_numbers[0]}</p><p>Phone#1: ${rec.phone_numbers[1]}</p></div>`
        );
      }
    },
  });
}

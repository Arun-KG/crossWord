let rows,
  cols,
  temp,
  err = { stat: false, errloc: [], errFlg: false },
  matrix = [],
  rowsArry = [];

$("#firstSBMT").click(function() {
  rows = $("#noOfRows").val();
  cols = $("#noOfCols").val();

  if (!isNaN(rows) && !isNaN(cols) && rows !== "" && cols !== "") {
    if (rows > 20 || cols > 20) {
      alert("Dimensions are too BIG!");
    } else if (rows < 3 || cols < 3) {
      alert("Dimensions are too small!");
    } else {
      $("#content").html("");
      generateTables();
    }
  } else {
    alert("You must fill up both text boxes with NUMBERS!");
  }
});

function generateTables() {
  temp = 0;
  let j, i;
  let hText = "";

  hText += "<div id='table'>";
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      hText +=
        "<input type='text' class='tableField' maxlength='1' id='" +
        (temp + j) +
        "'></text>";
    }
    temp += j;
    hText += "<br />";
  }
  hText += "</div>";
  hText += "<button class='btn btn-primary' id='submitTable'>Sublimt</button>";

  $("#content").append(hText);
}

$(document).on("click", "#submitTable", function() {
  temp = 0;
  let j, i;
  matrix = [];

  if (err.errFlg) {
    errClear();
  }

  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      if (
        $("#" + (temp + j)).val() !== "" &&
        isNaN($("#" + (temp + j)).val())
      ) {
        rowsArry.push($("#" + (temp + j)).val());
      } else {
        err.stat = true;
        err.errloc.push($("#" + (temp + j)));
      }
    }
    temp += j;
    matrix.push(rowsArry);
    rowsArry = [];
  }

  if (!err.stat) {
    rowsArry = [];
  } else {
    matrix = [];
    errHandle();
    err.stat = false;
  }

  if (matrix.length !== 0) {
    getKey();
  }
});

function errHandle() {
  alert("There are numbers or there is one or more empty fields in the table");
  setCellColor(err.errloc, "#FF0000");
  err.errFlg = true;
}

function setCellColor(arr, color) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].css("background-color", color);
  }
}

function errClear() {
  for (let i = 0; i < err.errloc.length; i++) {
    $(err.errloc[i]).css("background-color", "#FFFFFF");
  }

  err.errFlg = false;
  err.errloc = [];
}

function getKey() {
  let serchElm =
    "<div> <input type='text' id='keyElment' class='key_elm' /> <br /> <button id='chkBtn'>Check</button> </div>";
  $("#content").append(serchElm);
}

$(document).on("click", "#chkBtn", function() {
  let key = $("#keyElment").val();

  if (key !== "") {
    console.log(key);
    console.log(matrix);

    let cw = new CrossWord({
      matrix: matrix,
      key: key
    });

    console.log(cw.solvedMatrix());
  } else {
    alert("You must enter the content that you want to find from the matrix");
  }
});

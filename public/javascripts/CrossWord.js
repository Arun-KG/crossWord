function CrossWord(data) {
  "use strict";

  let rows = data.matrix.length;
  let cols = data.matrix[0].length;
  let matrix = data.matrix;
  let key = data.key;

  let resFinal = [];
  let resultArray = [];
  let counter = 0;
  let i,
    j,
    x,
    temp_i = null;
  let temp_j = null;
  let tracker = {
    trackEnable: false,
    trackNewPosition: {
      track_i: null,
      track_j: null
    },
    defaultPosition: {
      defaultEnabled: false,
      default_i: null,
      default_j: null
    },
    triggerCondition: null,
    traverse: {
      excludePath: []
    }
  };

  (function findWord() {
    for (i = 0; i < rows; i++) {
      for (j = 0; j < cols; j++) {
        if (i === 0 && j === 0) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("", i, "++j", j) &&
                key[x + 1] === matrix[i][j + 1] &&
                checkPattern("i, j+1")
              ) {
                setValues("j += 1;", "i, j+1");
              } else if (
                isLegit("++i", i, "", j) &&
                key[x + 1] === matrix[i + 1][j] &&
                checkPattern("i+1, j")
              ) {
                setValues("i += 1;", "i+1, j");
              } else if (
                isLegit("++i", i, "++j", j) &&
                key[x + 1] === matrix[i + 1][j + 1] &&
                checkPattern("i+1, j+1")
              ) {
                setValues("i += 1; j += 1;", "i+1, j+1");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else if (i === 0 && j === cols - 1) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("", i, "--j", j) &&
                key[x + 1] === matrix[i][j - 1] &&
                checkPattern("i, j-1")
              ) {
                setValues("j -= 1;", "i, j-1");
              } else if (
                isLegit("++i", i, "--j", j) &&
                key[x + 1] === matrix[i + 1][j - 1] &&
                checkPattern("i+1, j-1")
              ) {
                setValues("i += 1; j -= 1;", "i+1, j-1");
              } else if (
                isLegit("++i", i, "", j) &&
                key[x + 1] === matrix[i + 1][j] &&
                checkPattern("i+1, j")
              ) {
                setValues("i += 1;", "i+1, j");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else if (i === rows - 1 && j === 0) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("", i, "++j", j) &&
                key[x + 1] === matrix[i][j + 1] &&
                checkPattern("i, j+1")
              ) {
                setValues("j += 1;", "i, j+1");
              } else if (
                isLegit("--i", i, "++j", j) &&
                key[x + 1] === matrix[i - 1][j + 1] &&
                checkPattern("i-1, j+1")
              ) {
                setValues("i -= 1; j += 1;", "i-1, j+1");
              } else if (
                isLegit("--i", i, "", j) &&
                key[x + 1] === matrix[i - 1][j] &&
                checkPattern("i-1, j")
              ) {
                setValues("i -= 1;", "i-1, j");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else if (i === rows - 1 && j === cols - 1) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("--i", i, "", j) &&
                key[x + 1] === matrix[i - 1][j] &&
                checkPattern("i-1, j")
              ) {
                setValues("i -= 1;", "i-1, j");
              } else if (
                isLegit("--i", i, "--j", j) &&
                key[x + 1] === matrix[i - 1][j - 1] &&
                checkPattern("i-1, j-1")
              ) {
                setValues("i -= 1; j -= 1;", "i-1, j-1");
              } else if (
                isLegit("", i, "--j", j) &&
                key[x + 1] === matrix[i][j - 1] &&
                checkPattern("i, j-1")
              ) {
                setValues("j -= 1;", "i, j-1");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else if (i === rows - 1 && j !== 0 && j !== cols - 1) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("", i, "++j", j) &&
                key[x + 1] === matrix[i][j + 1] &&
                checkPattern("i, j+1")
              ) {
                setValues("j += 1;", "i, j+1");
              } else if (
                isLegit("--i", i, "++j", j) &&
                key[x + 1] === matrix[i - 1][j + 1] &&
                checkPattern("i-1, j+1")
              ) {
                setValues("i -= 1; j += 1;", "i-1, j+1");
              } else if (
                isLegit("--i", i, "", j) &&
                key[x + 1] === matrix[i - 1][j] &&
                checkPattern("i-1, j")
              ) {
                setValues("i -= 1;", "i-1, j");
              } else if (
                isLegit("--i", i, "--j", j) &&
                key[x + 1] === matrix[i - 1][j - 1] &&
                checkPattern("i-1, j-1")
              ) {
                setValues("i -= 1; j -= 1;", "i-1, j-1");
              } else if (
                isLegit("", i, "--j", j) &&
                key[x + 1] === matrix[i][j - 1] &&
                checkPattern("i, j-1")
              ) {
                setValues("j -= 1;", "i, j-1");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else if (i === 0 && j !== 0 && j !== cols - 1) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("", i, "++j", j) &&
                key[x + 1] === matrix[i][j + 1] &&
                checkPattern("i, j+1")
              ) {
                setValues("j += 1;", "i, j+1");
              } else if (
                isLegit("", i, "--j", j) &&
                key[x + 1] === matrix[i][j - 1] &&
                checkPattern("i, j-1")
              ) {
                setValues("j -= 1;", "i, j-1");
              } else if (
                isLegit("++i", i, "--j", j) &&
                key[x + 1] === matrix[i + 1][j - 1] &&
                checkPattern("i+1, j-1")
              ) {
                setValues("i += 1; j -= 1;", "i+1, j-1");
              } else if (
                isLegit("++i", i, "", j) &&
                key[x + 1] === matrix[i + 1][j] &&
                checkPattern("i+1, j")
              ) {
                setValues("i += 1;", "i+1, j");
              } else if (
                isLegit("++i", i, "++j", j) &&
                key[x + 1] === matrix[i + 1][j + 1] &&
                checkPattern("i+1, j+1")
              ) {
                setValues("i += 1; j += 1;", "i+1, j+1");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else if (i !== 0 && j === 0 && i !== rows - 1) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("", i, "++j", j) &&
                key[x + 1] === matrix[i][j + 1] &&
                checkPattern("i, j+1")
              ) {
                setValues("j += 1;", "i, j+1");
              } else if (
                isLegit("--i", i, "++j", j) &&
                key[x + 1] === matrix[i - 1][j + 1] &&
                checkPattern("i-1, j+1")
              ) {
                setValues("i -= 1; j += 1;", "i-1, j+1");
              } else if (
                isLegit("--i", i, "", j) &&
                key[x + 1] === matrix[i - 1][j] &&
                checkPattern("i-1, j")
              ) {
                setValues("i -= 1;", "i-1, j");
              } else if (
                isLegit("++i", i, "", j) &&
                key[x + 1] === matrix[i + 1][j] &&
                checkPattern("i+1, j")
              ) {
                setValues("i += 1;", "i+1, j");
              } else if (
                isLegit("++i", i, "++j", j) &&
                key[x + 1] === matrix[i + 1][j + 1] &&
                checkPattern("i+1, j+1")
              ) {
                setValues("i += 1; j += 1;", "i+1, j+1");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else if (i !== 0 && j === cols - 1 && i !== rows - 1) {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("--i", i, "", j) &&
                key[x + 1] === matrix[i - 1][j] &&
                checkPattern("i-1, j")
              ) {
                setValues("i -= 1;", "i-1, j");
              } else if (
                isLegit("--i", i, "--j", j) &&
                key[x + 1] === matrix[i - 1][j - 1] &&
                checkPattern("i-1, j-1")
              ) {
                setValues("i -= 1; j -= 1;", "i-1, j-1");
              } else if (
                isLegit("", i, "--j", j) &&
                key[x + 1] === matrix[i][j - 1] &&
                checkPattern("i, j-1")
              ) {
                setValues("j -= 1;", "i, j-1");
              } else if (
                isLegit("++i", i, "--j", j) &&
                key[x + 1] === matrix[i + 1][j - 1] &&
                checkPattern("i+1, j-1")
              ) {
                setValues("i += 1; j -= 1;", "i+1, j-1");
              } else if (
                isLegit("++i", i, "", j) &&
                key[x + 1] === matrix[i + 1][j] &&
                checkPattern("i+1, j")
              ) {
                setValues("i += 1;", "i+1, j");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        } else {
          initial();
          for (x = 0; x < key.length; x++) {
            if (key[x] === matrix[i][j]) {
              if (
                isLegit("", i, "++j", j) &&
                key[x + 1] === matrix[i][j + 1] &&
                checkPattern("i, j+1")
              ) {
                setValues("j += 1;", "i, j+1");
              } else if (
                isLegit("--i", i, "++j", j) &&
                key[x + 1] === matrix[i - 1][j + 1] &&
                checkPattern("i-1, j+1")
              ) {
                setValues("i -= 1; j += 1;", "i-1, j+1");
              } else if (
                isLegit("--i", i, "", j) &&
                key[x + 1] === matrix[i - 1][j] &&
                checkPattern("i-1, j")
              ) {
                setValues("i -= 1;", "i-1, j");
              } else if (
                isLegit("--i", i, "--j", j) &&
                key[x + 1] === matrix[i - 1][j - 1] &&
                checkPattern("i-1, j-1")
              ) {
                setValues("i -= 1; j -= 1;", "i-1, j-1");
              } else if (
                isLegit("", i, "--j", j) &&
                key[x + 1] === matrix[i][j - 1] &&
                checkPattern("i, j-1")
              ) {
                setValues("j -= 1;", "i, j-1");
              } else if (
                isLegit("++i", i, "--j", j) &&
                key[x + 1] === matrix[i + 1][j - 1] &&
                checkPattern("i+1, j-1")
              ) {
                setValues("i += 1; j -= 1;", "i+1, j-1");
              } else if (
                isLegit("++i", i, "", j) &&
                key[x + 1] === matrix[i + 1][j] &&
                checkPattern("i+1, j")
              ) {
                setValues("i += 1;", "i+1, j");
              } else if (
                isLegit("++i", i, "++j", j) &&
                key[x + 1] === matrix[i + 1][j + 1] &&
                checkPattern("i+1, j+1")
              ) {
                setValues("i += 1; j += 1;", "i+1, j+1");
              } else {
                setElse();
                if (counter > 8) break;
                else ++counter;
              }
            } else break;
          }
        }
      }
    }
  })();

  function initial() {
    counter = 0;
    tracker.traverse.excludePath = [];
    setDefault();
  }

  function setValues(update, set) {
    setTrigger(i, j);
    eval(update);
    tracker.triggerCondition = set;
    resultArray.push([i, j]);
  }

  function setElse() {
    if (checkResult(resultArray, key)) {
      resFinal.push(resultArray);
      tracker.traverse.excludePath.push(tracker.triggerCondition);
      setDefault();
      x = -1;
    } else {
      if (tracker.triggerCondition !== null && tracker.trackEnable) {
        tracker.traverse.excludePath.push(tracker.triggerCondition);
      }
      setDefault();
      x = -1;
    }
  }

  function setTrigger(i, j) {
    temp_i = i;
    temp_j = j;

    if (!tracker.trackEnable) {
      resultArray.push([i, j]);
      tracker.trackEnable = true;
    }

    if (!tracker.defaultPosition.defaultEnabled) {
      tracker.defaultPosition.default_i = temp_i;
      tracker.defaultPosition.default_j = temp_j;
      tracker.defaultPosition.defaultEnabled = true;
    }
    tracker.trackNewPosition.track_i = i;
    tracker.trackNewPosition.track_j = j;
  }

  function setDefault() {
    if (tracker.defaultPosition.defaultEnabled) {
      i = tracker.defaultPosition.default_i;
      j = tracker.defaultPosition.default_j;
    }
    tracker.trackNewPosition.track_i = null;
    tracker.trackNewPosition.track_j = null;
    tracker.trackEnable = false;
    tracker.defaultPosition.defaultEnabled = false;
    tracker.triggerCondition = null;
    resultArray = [];
  }

  function checkResult(arr) {
    let fetchVal = [];
    for (let c = 0; c < arr.length; c++) {
      fetchVal.push(matrix[arr[c][0]][arr[c][1]]);
    }
    return fetchVal.join("") === key ? true : false;
  }

  function checkPattern(str) {
    let a = false,
      b = false;
    tracker.triggerCondition === str || tracker.triggerCondition === null
      ? (a = true)
      : (a = false);
    if (tracker.traverse.excludePath.length === 0) {
      b = true;
    } else {
      for (let c = 0; c < tracker.traverse.excludePath.length; c++) {
        if (tracker.traverse.excludePath[c] === str) {
          b = false;
          break;
        } else {
          b = true;
        }
      }
    }
    return a && b ? true : false;
  }

  function isLegit(inst_0, val_0, inst_1, val_1) {
    let n_val_i = val_0;
    let n_val_j = val_1;
    let a = false;
    let b = false;

    if (inst_0 === "++i") {
      ++n_val_i >= rows ? (a = false) : (a = true);
    } else if (inst_0 === "--i") {
      --n_val_i < 0 ? (a = false) : (a = true);
    } else {
      val_0 < rows ? (a = true) : (a = false);
    }

    if (inst_1 === "++j") {
      ++n_val_j >= cols ? (b = false) : (b = true);
    } else if (inst_1 === "--j") {
      --n_val_j < 0 ? (b = false) : (b = true);
    } else {
      val_1 < cols ? (b = true) : (b = false);
    }

    return a && b ? true : false;
  }

  this.solvedMatrix = function(arg) {
    let mesh_arry = [];
    let ret = resFinal;
    if (arg) {
      for (let i = 0; i < resFinal.length; i++) {
        for (let j = 0; j < resFinal[i].length; j++) {
          mesh_arry.push(resFinal[i][j]);
        }
      }
      ret = mesh_arry;
    }

    if (resFinal.length !== 0) {
      return {
        atLeastOne: true,
        positionMatrix: ret
      };
    } else {
      return {
        atLeastOne: false
      };
    }
  };
}

if (typeof module === "object" && module.exports) {
  module.exports = CrossWord;
}

const array = Array.from({ length: 3 }, () => Array(3).fill(null));
let player = 0;
let count = 0;

let buttons = document.querySelectorAll(".matrix");
buttons.forEach((box) => {
  box.addEventListener("click", function () {
    if (count % 2 == 0) {
      box.textContent = "O";
      count++;
    } else {
      box.textContent = "X";
      count++;
    }
    assign_input(array, box.dataset.row, box.dataset.col);
    if (win_find(array)) {
      document.querySelector(".winner").textContent = `Player ${
        count % 2 ? 0 : 1
      } Wins!`;
      buttons.forEach((b) => (b.disabled = true));
    }
    box.disabled = true;
  });
});

document.querySelector(".new_game").addEventListener("click", function () {
  buttons.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  array.forEach((row) => row.fill(null));
  player = 0;
  count = 0;
  document.querySelector(".winner").textContent = "Tic Tac Toe";
});

function assign_input(array, row, col) {
  if (array[row][col] == null) {
    array[row][col] = player;
    player = 1 - player;
  }
}

function win_find(array) {
  // Row search
  for (let i = 0; i < 3; i++) {
    if (
      array[i][0] !== null &&
      array[i][0] === array[i][1] &&
      array[i][0] === array[i][2]
    ) {
      return true;
    }
  }

  // Column search
  for (let i = 0; i < 3; i++) {
    if (
      array[0][i] !== null &&
      array[0][i] === array[1][i] &&
      array[0][i] === array[2][i]
    ) {
      return true;
    }
  }

  // Diagonal search
  if (
    array[1][1] !== null &&
    ((array[0][0] === array[1][1] && array[0][0] === array[2][2]) ||
      (array[0][2] === array[1][1] && array[0][2] === array[2][0]))
  ) {
    return true;
  }

  return false;
}

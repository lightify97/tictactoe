"use strict";
window.onload = function init() {
  let $board = document.getElementById('board');
  let $boxes = document.querySelectorAll('.box');
  let $turn = document.getElementById('turn');
  let $result = document.getElementById('result');
  let $refresh = document.getElementById('refresh');
  $refresh.addEventListener('click', init);
  let w = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let turn = 'X';
  $turn.innerHTML = `X`;
  if ($turn.innerHTML == 'X') $turn.style.color = '#ddd';
  $boxes.forEach((box) => box.innerHTML = '');
  $board.style.display = 'flex';
  $result.style.opacity = 0;

  $boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
      if (turn == 'X' && !box.innerHTML) {
        box.innerHTML = 'X';
        box.style.color = '#ddd';
        turn = 'O';
        $turn.innerHTML = `${turn}`;
        $turn.style.color = '#000';
        w[box.dataset.box] = 'X';
      } else if (turn == 'O' && !box.innerHTML) {
        box.innerHTML = 'O';
        box.style.color = '#000';
        turn = 'X';
        $turn.innerHTML = `${turn}`;
        $turn.style.color = '#ddd';
        w[box.dataset.box] = 'O';
      }
      let status = {
        'won': gameWon(w).won,
        'draw': draw(w)
      };
      if (status.won || status.draw) {
        $board.style.display = 'none';
        w = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (status.won) {
          $result.innerHTML = `<h1>${status.won} Won</h1>`;
        } else {
          $result.innerHTML = `<h1 style="color: slateblue">XOXOXO</h1>`;
        }
        $result.style.opacity = '1';
        $result.style.fontSize = '6rem';
        $result.style.marginTop = '0';
        turn = turn == 'X' ? 'O' : 'X';
        $turn.innerHTML = `${turn}`;
        if (turn == 'X') $turn.style.color = '#ddd';
      }
    });
  });
}

function gameWon(w) {
  let xWon = false,
    oWon = false;
  let res = {
    'won': null
  };
  // these are the only possible conditions for a player to win
  // turns out there are only 8
  let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  conditions.forEach((condition) => {
    xWon = condition.every((i) => w[i] == 'X');
    oWon = condition.every((i) => w[i] == 'O');
    if (xWon) {
      res.won = 'X';
      return;
    } else if (oWon) {
      res.won = 'O';
      return;
    }
  });

  return res;
}

function draw(w) {
  return !gameWon(w).won && w.every((i) => i != 0);
}
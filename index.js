let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let main = document.querySelector(".main");
let count = 0;
let turn0 = true;

let winning_term = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        box.classList.add("disabled"); // Add disabled class for styling

        count++;

        let isWinner = checkWin();
        if (isWinner) {
            return;
        }
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw, Try Again";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.add("disabled");
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("disabled");
    });
};

const checkWin = () => {
    for (let pattern of winning_term) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true; // Return true when a winner is found
            }
        }
    }
    return false; // Return false when no winner
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, ${winner} wins!`;
    msgContainer.classList.remove("hide");
    main.classList.add("hidemain");
    disableBoxes();
};

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("hidemain");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

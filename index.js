let boxes = document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset_btn");
let newGameBtn=document.querySelector("#newgame");
let msgContainer=document.querySelector(".msg_container");
let msg= document.querySelector("#msg");
let count=0;
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
] 

boxes.forEach((box)=>{
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText="O";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;

        count++;

        let isWinner = checkWin();
    
        if (count === 9 && !isWinner) {
          gameDraw();
        }
    })
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw, Try Again`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""; 
    }
};
const checkWin=()=>{
            for(let pattern of winning_term){
                let pos1val= boxes[pattern[0]].innerText;
                let pos2val= boxes[pattern[1]].innerText;
                let pos3val= boxes[pattern[2]].innerText;
                if(pos1val!=""&& pos2val!=""&&pos3val!=""){
                    if(pos1val==pos2val&&pos2val==pos3val){
                        showWinner(pos1val);
                    }
                }
            }
};
const showWinner = (winner) =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    main.classList.add("hidemain");
    disableBoxes();
  
};
const resetgame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("hidemain");
};

newGameBtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);
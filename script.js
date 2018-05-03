
const GameBoard = ( ()=>{

    let CurrentBox = document.querySelectorAll('.Box');

    let Board = [["","",""],
                 ["","",""],
                 ["","",""]];
    function ChangeBoard(row,column,marker){
        Board[row][column] = marker;
    }

    //Player Factory

    const PlayerFactory = (name,marker)=>{
        let Chance = "0";
        return{name,marker,Chance};
    };

    Check_The_Winning_Status = (marker)=>{
        //Check For All Rows
        for(var i = 0 ; i < 3 ; i++){
            if(Board[i][0] == marker && Board[i][1] == marker && Board[i][2] == marker){return true;}
        }
      //Check For All Columns
       for(var i = 0 ; i < 3 ; i++){  
            if(Board[0][i] == marker && Board[1][i] == marker && Board[2][i] == marker){  return true;} 
        }
      // Check For Diagonals
       if(Board[0][0] == marker && Board[1][1] == marker && Board[2][2] == marker){ return true;}
       if(Board[0][2] == marker && Board[1][1] == marker && Board[2][0] == marker){return true;}
        return false;
    }

    // Function to get data from the from
    let Submit_button = document.getElementsByTagName('button')[0];


    Submit_button.onclick = ()=>{
        let Total_Boxes_Got_Filled = 0;
        let firstPlayerName = document.getElementById('firstPlayer');
        let secondPlayerName = document.getElementById('secondPlayer');
        const Player1 = PlayerFactory("firstPlayerName","o");
        const Player2 = PlayerFactory("secondPlayerName","x");
        //

        ResetAll = ()=>{
            //reset Board Array
            for(var i = 0 ; i < 3 ; i++){
                for(var j = 0 ; j < 3 ; j++){
                    Board[i][j] = "";
                }
            }
            //reset innerHtml of Board
            CurrentBox.forEach((Box)=>{
                Box.innerHTML = "<h1> </h1>";
            });
            Player1.Chance = "0";
            Player2.Chance = "0";
        }

        //Add Marker to Boxs
            console.log(Total_Boxes_Got_Filled);
            CurrentBox.forEach((Box)=>{
                Box.addEventListener('click',()=>{
                    let nth_child = Box.getAttribute('data-number');
                    if(Player1.Chance === "0" && Box.innerHTML === "<h1> </h1>"){
                        //Change in Board Array
                        console.log("hereeee");
                        var row  = Math.floor(Number(nth_child/3));
                        var column = nth_child%3;
                        ChangeBoard(row,column,0);
    
                        Box.innerHTML = '<h1>o</h1';
                        Player1.Chance = "1";
                        Player2.Chance = "0";
    
                        Total_Boxes_Got_Filled += 1;
                        if(Total_Boxes_Got_Filled > 4){
                            if(Check_The_Winning_Status("0")){
                                console.log("Player1 Won");
                                Total_Boxes_Got_Filled = 0;
                                ResetAll();
                            }
                        }
                    }
                    else if(Player2.Chance === "0" && Box.innerHTML === "<h1> </h1>"){
                        //Change in Board Array
                        var row  = Math.floor(Number(nth_child/3));
                        var column = nth_child%3;
                        ChangeBoard(row,column,1);
                        Box.innerHTML = '<h1>x</h1';
                        Player1.Chance = "0";
                        Player2.Chance = "1";
    
                        Total_Boxes_Got_Filled += 1;
                        if(Total_Boxes_Got_Filled > 4){
                            if(Check_The_Winning_Status("1")){
                                console.log("Player2 Won");
                                Total_Boxes_Got_Filled = 0;
                                ResetAll();
                            }
                        }
                    }
                    if(Total_Boxes_Got_Filled == 9){
                        console.log("Draw");
                        Total_Boxes_Got_Filled = 0;
                        ResetAll();
                    }
                });
            });
     };
})();
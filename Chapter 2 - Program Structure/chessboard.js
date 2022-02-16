function chessboard(size){
    let chessboard = "";
    for (let row=0; row<size; row++){
        for (let column=0; column<size; column++){
            if (row %2 == 0){ // For even rows, put a # in odd columns
                if (column %2 != 0) {
                    chessboard += "#";
                } else {
                    chessboard += " ";
                }
            } else { // For odd rows, put a # in even columns
                if (column %2 == 0) {
                    chessboard += "#";
                } else {
                    chessboard += " ";
                }
            }
        }
        chessboard += "\n"; // at the end of each row, go at the next line
    }
    console.log(chessboard);
}
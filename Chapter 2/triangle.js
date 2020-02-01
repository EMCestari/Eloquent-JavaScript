function triangle(linesNumber){
    var drawnTriangle = '';
    for (var i=0; i<linesNumber; i++){
        var currentLine = drawLine(i+1);
        drawnTriangle += currentLine;
        if (i+1<linesNumber){
            drawnTriangle += "\n";
        }
    }
    console.log(drawnTriangle);
    return drawnTriangle;
}

function drawLine(len){
    line = '';
    for (var j=0; j<len; j++){
        line += "*";
    }
    return line;
}


module.exports = triangle;
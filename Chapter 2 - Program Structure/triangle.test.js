test('One line triangle', () => {
    expect(triangle(1)).toBe("*");
});

test('Two Lines Triangle', () => {
    expect(triangle(2)).toBe("*\n**");
})

test('Seven lines Triangle', () => {
    expect(triangle(7)).toBe("*\n**\n***\n****\n*****\n******\n*******");
})


function triangle(linesNumber){
    let drawnTriangle = '';
    for (let i=0; i<linesNumber; i++){
        let currentLine = drawLine(i+1);
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
    for (let j=0; j<len; j++){
        line += "*";
    }
    return line;
}
const triangle = require("./triangle");

test('One line triangle', () => {
    expect(triangle(1)).toBe("*");
});

test('Two Lines Triangle', () => {
    expect(triangle(2)).toBe("*\n**");
})

test('Seven lines Triangle', () => {
    expect(triangle(7)).toBe("*\n**\n***\n****\n*****\n******\n*******");
})
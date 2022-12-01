const board = [];
for (var i = 0; i < 8; i++) { 
    let row = [];
    for (var j = 0; j < 8; j++) {
        row.push(j);
    }
    board.push(row);
}

export default board;
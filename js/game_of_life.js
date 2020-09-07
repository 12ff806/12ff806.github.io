/*
 * author: 12ff806
 * Sep 07 2020
 */

var ctx = document.getElementById("gol_canvas").getContext("2d");
var canvas_width = 800, canvas_height = 600;
var box_size = 10;


function draw_board(board, m, n) {
    for(var i=0; i<m; ++i) {
        for(var j=0; j<n; ++j) {
            if(board[i][j] & 0x1) {
                ctx.beginPath();
                ctx.rect(i*box_size, j*box_size, box_size, box_size);
                ctx.fillStyle = "black";
                ctx.fill();
            }
            else {
                ctx.clearRect(i*box_size, j*box_size, box_size, box_size);
            }
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black";
            ctx.rect(i*box_size, j*box_size, box_size, box_size);
            ctx.stroke();
        }
    }
}


function get_neighbors(board, x, y, m, n) {
    var cnt = 0;
    for(var i=x-1; i<=x+1; ++i) {
        for(var j=y-1; j<=y+1; ++j) {
            if(i>=0 && j>=0 && i<m && j<n) {
                if(i!=x || j!=y) {
                    cnt += board[i][j] & 0x1;
                }
            }
        }
    }
}


function game_of_life(board, m, n) {
    for(var i=0; i<m; ++i) {
        for(var j=0; j<n; ++j) {
            var neighbors = get_neighbors(board, i, j, m, n);
            // 不变
            if(neighbors == 2) {
                board[i][j] |= (board[i][j] & 0x1) << 1;
            }
            // 重生
            else if(neighbors == 3) {
                board[i][j] |= 0x2;
            }
            // 死亡
            else {
                board[i][j] &= 0x1;
            }
        }
    }
    for(var i=0; i<m; ++i) {
        for(var j=0; j<n; ++j) {
            board[i][j] >>= 1;
        }
    }
}


function run() {
    // 初始化数组
    if(typeof this.init == "undefined") {
        board = [];
        m = parseInt(canvas_width/box_size);
        n = parseInt(canvas_height/box_size);
        for(var i=0; i<m; ++i) {
            board[i] = []
            for(var j=0; j<n; ++j) {
                board[i][j] = Math.round(Math.random());
                board[i][j] = 0;
            }
        }
        this.init = true;
    }
    game_of_life(board, m, n);
    draw_board(board, m, n);
}


setInterval("run()", 400);


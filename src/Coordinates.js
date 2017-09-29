"use strict";

Lyngk.Coordinates = function (c, l) {
    var lignes;
    var colonnes;
    var grid;

     var Init = function(c,l){
        colonnes = (c.charCodeAt(0))-65;
        lignes = (l-1);
        grid =  [
            [0,0,1,0,0,0,0,0,0],
            [0,1,1,1,1,0,0,0,0],
            [1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1],
            [0,0,0,0,1,1,1,1,0],
            [0,0,0,0,0,0,1,0,0]
        ];
    };

    Init(c,l);

    this.is_valid  = function(){
        return grid[colonnes][lignes] == 1;
    };

    this.number_valid = function(){
        var number=0;
        for (var i = 0;i<9;i++){
            for (var j = 0;j<9;j++){
                if (grid[i][j]==1)number++;
            }
        }
        console.log(number);
        return number;
    };
};

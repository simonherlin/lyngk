"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var key= []; var value=[];
    var plateau = new Object();   //
    plateau = {};

    var Init = function () {
        for (var i = 0; i < Lyngk.grid.length; i++) {
            plateau[Lyngk.grid[i]] = new Lyngk.Intersection();
        }
    };
    Init();

    this.initialisationUnePiece = function() {
        for (var key in plateau) {
            if (plateau.hasOwnProperty(key)) {
                plateau[key].pose(Lyngk.Color.BLUE);
            }
        }
    };

    this.full = function (){
        var valid=0;
        var keys = Object.keys(plateau);

        for (var i = 0; i < keys.length; i++) {
            if (plateau[keys[i]].getState() === Lyngk.State.ONE_PIECE){
                valid++;
            }

        }
        return valid;
        if (valid== 43){
            return true;
        }
        return false;
    };
};
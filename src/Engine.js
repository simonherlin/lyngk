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

    this.full = function () {
        for (var key in plateau) {
            if (plateau.hasOwnProperty(key)) {
                if (plateau[key].getState() != Lyngk.State.ONE_PIECE) {
                    return false;
                }

            }
        }
        return true;
    };
};
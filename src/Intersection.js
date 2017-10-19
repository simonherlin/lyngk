"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var nbPieces=[];

    this.getState = function() {
                return state;
    };

    function valueState() {
        if (nbPieces.length ==0 || nbPieces == undefined){
            state = Lyngk.State.ONE_PIECE;
        }
        else{
            if (nbPieces.length < 4){
                state = Lyngk.State.STACK;
            }
            else{
                state = Lyngk.State.FULL_STACK;
            }
        }
    }

    this.pose = function(couleur){
        valueState();
        nbPieces.push(new Lyngk.Piece(couleur));
    };

    this.remove = function(){
        nbPieces = nbPieces.shift();
        valueState();
    };

    this.getColor = function(){
        return nbPieces[nbPieces.length -1].getColor();
    };

    this.getFirstColor = function(){
        return nbPieces[0].getColor();
    };
    this.getHauteur = function(){
        return nbPieces.length;
    };
};
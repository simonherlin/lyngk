"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var nbPieces=[];

    this.getState = function() {
                return state;
        //}
    };

    this.pose = function(couleur){
        if (nbPieces.length ==0){
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
        nbPieces.push(new Lyngk.Piece(couleur));
    };

    this.getColor = function(){
        return nbPieces[nbPieces.length-1].getColor();
    };
    this.getHauteur = function(){
        return nbPieces.length;
    };

};

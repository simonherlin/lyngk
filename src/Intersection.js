"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (/*c*/) {
    var state = Lyngk.State.VACANT;
    var nbPieces=[];

    this.getState = function() {
        //if (c.is_valid()){
                return state;
        //}
    };

    this.pose=function(couleur){
        if (nbPieces.length ==0){
            state = Lyngk.State.ONE_PIECE;
        }
        else{
            state = Lyngk.State.STACK;
        }
        nbPieces.push(new Lyngk.Piece(couleur));
    };

    this.getColor=function(){
        return nbPieces[nbPieces.length-1].getColor();
    };

};

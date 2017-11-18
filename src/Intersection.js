"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var nbPieces = [];

    this.getState = function() {
                return state;
    };

    this.pose = function(couleur){
        valuePose();
        nbPieces.push(new Lyngk.Piece(couleur));
    };

    this.remove = function (){
        nbPieces.shift();
        valueRemove();
    };

    this.getColor = function () {
        return nbPieces[nbPieces.length - 1].getColor();
    };

    this.getFirstColor = function(){
        return nbPieces[0].getColor();
    };

    this.getCouleurChoix = function(nb){
        return nbPieces[nb].getColor();
    };

    this.getHauteur = function(){
        return nbPieces.length;
    };

    function valuePose() {
        if (nbPieces.length ===0 ){
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

    function valueRemove() {
        if (nbPieces.length === 0 || nbPieces.length === undefined) {
            valueVacant();
        }
        else {
            valueNoVacant();
        }
    }

    function valueVacant() {
        state = Lyngk.State.VACANT;
    }

    function valueNoVacant() {
        if(nbPieces.length === 1){
            state = Lyngk.State.ONE_PIECE;
        }
        else
        {
            if (nbPieces.length < 4) {
                state = Lyngk.State.STACK;
            }
            else {
                state = Lyngk.State.FULL_STACK;
            }
        }
    }
};
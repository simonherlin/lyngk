"use strict";
Lyngk.grid =
    [  13,
    22,23,24,25,
 31,32,33,34,35,36,37,
    42,43,44,45,46,47,
    52,53,54,55,56,57,58,
       63,64,65,66,67,68,
       73,74,75,76,77,78,79,
             85,86,87,88,
                   97
    ];
Lyngk.Coordinates = function (c, l) {
    var lignes;
    var colonnes;

     var Init = function(c,l){
        colonnes = (c.charCodeAt(0))-65 + 1;
        lignes = l;
    };
    Init(c,l);

    this.isValid = function(){
        return Lyngk.grid.indexOf(colonnes*10+lignes)!==-1;
    };

    this.numberValid = function(){
        return Lyngk.grid.length;
    };

    this.representation = function (){
        if (this.isValid()){
            return (String.fromCharCode(colonnes+64)+(lignes));
        }
        else{
            return "invalid";
        }
    };

    this.clone = function(){
        return new Lyngk.Coordinates(String.fromCharCode(colonnes+64), lignes);
    };

    this.hash = function(){
        return colonnes*10+lignes;
    };

    this.tabCoordo = function(){
        var tab = [];
        tab[0] = new Lyngk.Coordinates(returnCharCoordo(0), lignes + 1);
        tab[1] = new Lyngk.Coordinates(returnCharCoordo(1),lignes+0);
        tab[2] = new Lyngk.Coordinates(returnCharCoordo(1),lignes+1);
        tab[3] = new Lyngk.Coordinates(returnCharCoordo(0),lignes-1);
        tab[4] = new Lyngk.Coordinates(returnCharCoordo(-1),lignes+0);
        tab[5] = new Lyngk.Coordinates(returnCharCoordo(-1),lignes-1);
        return tab;
    };

    this.getLigne = function(){return lignes;};

    this.getColonne = function(){return colonnes;};

    function returnCharCoordo(column){
        return String.fromCharCode(colonnes + 64 + column);
    }
};
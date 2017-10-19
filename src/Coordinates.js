"use strict";
Lyngk.grid =
    [13,
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
    var grid;

     var Init = function(c,l){
        colonnes = (c.charCodeAt(0))-65 + 1;
        lignes = l;
    };
    Init(c,l);

    this.is_valid  = function(){
        return Lyngk.grid.indexOf(colonnes*10+lignes)!=-1;
    };

    this.number_valid = function(){
        return Lyngk.grid.length;
    };

    this.representation = function (){
        if (this.is_valid()){
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
};
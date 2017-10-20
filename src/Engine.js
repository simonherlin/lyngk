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

    function testPosition(debut, fin){
        if (debut.is_valid() && fin.is_valid()) // test que les positions sont correct
            if ((plateau[fin.hash()].getState() != Lyngk.State.VACANT)&& (plateau[debut.hash()].getState() != Lyngk.State.VACANT)) // test qu'il y a bien des pieces
                if ((Math.abs(fin.hash() - debut.hash())) != 0) // verifie que l'on met pas a la meme place
                    return true;
        return false;
    };

    function testLigne(debut,fin){
        var resultat = Math.abs(fin-debut);
        if (resultat<10){ // verification que se soit que les decimal qui change
            return true
        }
        if ((fin - Math.floor(fin/10)*10) == (debut - Math.floor(debut/10)*10)){ // verification que se soit que les dizaines qui change
            return true;
        }
        if ((Math.floor(resultat/10)) == (resultat - Math.floor(resultat/10)*10)){ // verification diagonal
            return true;
        }
        return false;
    }

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

    this.initialisationMultiCouleur = function() {
        //var couleurDispo = {};
        var couleurDispo = [8,8,8,8,8,3];
        for (var key in plateau) {
            if (plateau.hasOwnProperty(key)) {
                var randomCouleur;
                do{
                    randomCouleur = Math.floor(Math.random() * 6);
                }while(couleurDispo[randomCouleur] <= 0);
                couleurDispo[randomCouleur]--;
                plateau[key].pose(randomCouleur);
            }
        }
    };

    this.move = function(base, fin){
        if (!(testPosition(base, fin)) || !(testLigne(base.hash(), fin.hash())))// test position
            return false;
        if (plateau[fin.hash()].getState() === Lyngk.State.VACANT)// test ligne diagonal
            return false;
        var hauteur =  plateau[base.hash()].getHauteur(); // obliger pour garder la meme hauteur car hauteur change quand on retire des pieces
        for (var i=0;i<hauteur;i++) {
            plateau[fin.hash()].pose(plateau[base.hash()].getFirstColor());
            plateau[base.hash()].remove();
        }
        return true;
    };

    this.getPlat = function(){
        return plateau;
    }
};
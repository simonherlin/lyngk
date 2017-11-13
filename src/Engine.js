"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    //var key= []; var value=[];
    var numPlayer;
    var colorByPlayer = [];
    var pointByPlayer = [];
    var plateau = new Object();
    var nbPieces;
    plateau = {};

    var Init = function () {
        numPlayer = 1;
        nbPieces = 43;
        for (var i = 0; i < Lyngk.grid.length; i++) { plateau[Lyngk.grid[i]] = new Lyngk.Intersection(); }
        for (var i =0; i < 6;i++)   { colorByPlayer[i]=0; }
        for (var i =1; i<3;i++)     { pointByPlayer[i] = 0; }
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
        if ((resultat<10)&&(resultat ==1)) return true;// verification que se soit que les decimal qui change et que de 1
        if (((fin - Math.floor(fin/10)*10) == (debut - Math.floor(debut/10)*10)) && (Math.abs(Math.floor(debut/10) - Math.floor(fin/10)) == 1)) return true;// verification que se soit que les dizaines qui change // verif deplacement que de 1 en dizaine
        if (((Math.floor(resultat/10)) == (resultat - Math.floor(resultat/10)*10)) && (Math.floor(resultat/10) == 1)) return true; // verification diagonal
        return false;
    };

/*    function testPieceAvant(debut,fin){
        var resultat = Math.abs(fin.hash()-debut.hash());
        if (resultat<10) return verifDecimal(resultat,debut,fin);
        if ((fin - Math.floor(fin/10)*10) == (debut - Math.floor(debut/10)*10)) return verifDizaine(resultat,debut,fin);
        if (((Math.floor(resultat/10)) == (resultat - Math.floor(resultat/10)*10))) return verifDiagonal(resultat,fin);
    };

    function verifDiagonal(nb,debut,fin){
        var dizaine = Round(nb/10,0), unite = nb- dizaine*10, temp;
        for (var i =1;i<nb;i++){
            if (fin.hash() - debut.hash() < 0)
                if (((fin.hash() - debut.hash()) + Round((fin.hash() - debut.hash())/10,0)*10 )<0)
                    temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64-i),debut.getLigne()-i);
                else
                    temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64-i),debut.getLigne()+i);
            else
                if (((fin.hash() - debut.hash()) - Round((fin.hash() - debut.hash())/10,0)*10 )<0)
                    temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64+i),debut.getLigne()-i);
                else
                    temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64+i),debut.getLigne()+i);
            if (plateau[temp.hash()].getState() != Lyngk.State.VACANT) return false;
        }
        return true;
    };*/

    function verifDizaine(nb, debut,fin){
        var dizaine = nb/10,temp;
        for (var i =1;i<dizaine;i++){
            if ((fin.hash() - debut.hash()) > 0)
                temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64+i),debut.getLigne());
            else
                temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64-i),debut.getLigne());
            if (plateau[temp.hash()].getState() != Lyngk.State.VACANT) return false;
        }
        return true;
    };

    function verifDecimal(nb, debut,fin){
        var temp;
        for (var i =1;i<nb;i++){
            if ((fin.hash() - debut.hash()) > 0)
                temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64),debut.getLigne()+i);
            else
                temp = new Lyngk.Coordinates(String.fromCharCode(debut.getColonne()+64),debut.getLigne()-i);
            if (plateau[temp.hash()].getState() != Lyngk.State.VACANT) return false;
        }
        return true;
    };

    function testHauteur(debut,fin){
        if ((plateau[debut].getHauteur() + plateau[fin].getHauteur()) <=5) return true;
        else return false;
    };

    function testDifHauteur(debut,fin){
      if (plateau[debut].getHauteur() < plateau[fin].getHauteur()) return false;
      else return true;
    };

    function testColor(debut,fin){
        for(var i=0;i<plateau[debut].getHauteur();i++){
            for(var j=0;j<plateau[fin].getHauteur();j++){
                if (plateau[debut].getCouleurChoix(i) == plateau[fin].getCouleurChoix(j))
                    if (plateau[debut].getCouleurChoix(i) != Lyngk.Color.WHITE) return false;
            }
        }
        if(colorByPlayer[plateau[debut].getColor()] == joueurAdverse()) return false;
        return true;
    };

    function player(){
      if (numPlayer == 1) numPlayer++;
      else numPlayer--;
    };

    function point(coordo){
        if (plateau[coordo.hash()].getHauteur() == 5)
            if (colorByPlayer[plateau[coordo.hash()].getColor()] == numPlayer){
                pointByPlayer[numPlayer]++;
                nbPieces -= plateau[coordo.hash()].getHauteur();
            }
    };

    function joueurAdverse() {
        var tempo;
        (numPlayer== 1)? tempo =2:tempo = 1;
        return tempo;
    };

    this.initialisationUnePiece = function() {
        for (var key in plateau) {
            if (plateau.hasOwnProperty(key)) {
                plateau[key].pose(Lyngk.Color.BLUE);
            }
        }
    };

    this.full = function () {
        for (var key in plateau)
            if (plateau.hasOwnProperty(key))
                if (plateau[key].getState() != Lyngk.State.ONE_PIECE)
                    return false;
        return true;
    };

    this.initialisationMultiCouleur = function() {
        var couleurDispo = [8,8,8,8,8,3];
        for (var key in plateau) {
            if (plateau.hasOwnProperty(key)) {
                var randomCouleur;
                do{  randomCouleur = Math.floor(Math.random() * 6); }while(couleurDispo[randomCouleur] <= 0);
                couleurDispo[randomCouleur]--;
                plateau[key].pose(randomCouleur);
            }
        }
    };

    this.move = function(base, fin){
        if (!(testPosition(base, fin)) || !(testLigne(base.hash(), fin.hash())) || !(testDifHauteur(base.hash(),fin.hash())) || (!testHauteur(base.hash(),fin.hash())) || (!testColor(base.hash(),fin.hash())) /*|| (!testPieceAvant(base,fin))*/) return false;// test position et ligne diagonal hauteur
        var hauteur =  plateau[base.hash()].getHauteur(); // obliger pour garder la meme hauteur car hauteur change quand on retire des pieces
        for (var i=0;i<hauteur;i++) {
            plateau[fin.hash()].pose(plateau[base.hash()].getFirstColor());
            plateau[base.hash()].remove();
        }
        point(fin);
        player();
        return true;
    };

    this.put = function(coordonee,couleur){
        if (coordonee.is_valid() && plateau[coordonee.hash()].getHauteur()<4)
            plateau[coordonee.hash()].pose(couleur);
    };

    this.claim = function(color){
        if (colorByPlayer[color] != 0)return false;
        colorByPlayer[color] = numPlayer;
        return true;
    };

    this.nbPointJoueur = function(nb){
        return pointByPlayer[nb];
    };

    this.nbPossibilite = function() {
        var adversaire = joueurAdverse(), nbPossibilite=0;
        for (var i=0; i< Lyngk.grid.length;i++){
                if (plateau[Lyngk.grid[i]].getHauteur() > 0 && colorByPlayer[plateau[Lyngk.grid[i]].getColor()] != adversaire && plateau[Lyngk.grid[i]].getColor() != Lyngk.Color.WHITE) nbPossibilite++;
        }
        return nbPossibilite;
    };

    this.nbPossibilitePosition = function (coordo) {
        var nbPossibilité=0, adversaire = joueurAdverse();
        var k = coordo.tabCoordo();
        for (var i=0;i<k.length;i++){
            debugger;
            if ((k[i].is_valid()))
                if (plateau[k[i].hash()].getHauteur() > 0 && colorByPlayer[plateau[k[i].hash()].getColor()] != adversaire && plateau[k[i].hash()].getColor() != plateau[coordo.hash()].getColor())
                    nbPossibilité++;
        }
        return nbPossibilité;
    };

    this.getPlat = function(){
        return plateau;
    };

    this.getNumPlayer = function() {return numPlayer};

    this.getNbPiece = function() {
        return nbPieces;
    }
};
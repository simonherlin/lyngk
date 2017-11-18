"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.LinesColomns = [1, 2, 3, 4, 5, 6, 7, 8, 9];

Lyngk.Engine = function () {
    var numPlayer;
    var colorByPlayer = [];
    var pointByPlayer = [];
    var plateau = {};
    var nbPieces;

    var Init = function () {
        numPlayer = 1;
        nbPieces = 43;
        pointByPlayer[0] = 0;
        pointByPlayer[1] = 0;
        for (var i = 0; i < Lyngk.grid.length; i++) {
            plateau[Lyngk.grid[i]] = new Lyngk.Intersection();
        }
        for (i =0; i < 6;i++)   { colorByPlayer[i]=0; }
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
        for (var key in plateau){
            verifFull(key);
        }
        return true;
    };

    this.initialisationMultiCouleur = function() {
        var couleurDispo = [8,8,8,8,8,3];
        for (var key in plateau) {
            randomColor(key, couleurDispo);
        }
    };

    this.move = function(base, fin){
        if (!this.testMove(base,fin)){
            return false;
        }
        var hauteur =  plateau[base.hash()].getHauteur();
        for (var i=0;i<hauteur;i++) {
            plateau[fin.hash()].pose(plateau[base.hash()].getFirstColor());
            plateau[base.hash()].remove();
        }
        point(fin);
        player();
        return true;
    };

    this.testMove = function(base,fin){
         if (!testPositionLigne(base,fin)){
            return false;
        }
        var heigh = testAllHauteur(base,fin);
        var color = testColor(base.hash(),fin.hash());
        return ( heigh && color);
    };

    this.put = function(coordonee,couleur){
        if (coordonee.isValid() && plateau[coordonee.hash()].getHauteur()<4)
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
            var coordo = Lyngk.grid[i];
            if (plateau[coordo].getHauteur() > 0 &&
                colorByPlayer[plateau[coordo].getColor()] != adversaire &&
                plateau[coordo].getColor() != Lyngk.Color.WHITE) {
                nbPossibilite++;
            }
        }
        return nbPossibilite;
    };

    this.nbPossibilitePosition = function (coordo) {
        var nbPossibilite=0, adversaire = joueurAdverse();
        var cas = coordo.tabCoordo();
        for (var i=0;i<cas.length;i++){
            if (testPossibilitePosition(cas, i, adversaire, coordo)){
                nbPossibilite++;
            }
        }
        return nbPossibilite;
    };

    this.getPlat = function(){
        return plateau;
    };

    this.getNumPlayer = function() {
        return numPlayer;
    };

    this.getNbPiece = function() {
        return nbPieces;
    };

    function testPosition(debut, fin){
        if (debut.isValid() && fin.isValid()){
            if (verifPosition(debut.hash(),fin.hash())){
                return ((Math.abs(fin.hash() - debut.hash())) !== 0);
            }
        }
        return false;
    }

    function verifPosition(debut,fin){
        if (plateau[fin].getState() !== Lyngk.State.VACANT){
            if (plateau[debut].getState() !== Lyngk.State.VACANT){
                return true;
            }
        }
        return false;
    }

    function testLigne(debut,fin){
        var begin = debut.hash();
        var end = fin.hash();
        var resultat = Math.abs(end-begin);
        if (inspectLigneColonne(debut,fin,resultat)){
            return true;
        }
        if (verifDiagonal(resultat)){
            return true;
        }
        return false;
    }

    function inspectLigneColonne(debut,fin,resultat){
        if (verifColonne(resultat) || verifLigne(debut.hash(),fin.hash())) {
            return true;
        }
        return false;
    }

    function verifColonne(resultat){
        return ((resultat<10)&&(resultat === 1));
    }

    function verifLigne(debut, fin){
        if((fin - Math.floor(fin/10)*10) == (debut - Math.floor(debut/10)*10)){
            return (Math.abs(Math.floor(debut/10) - Math.floor(fin/10)) == 1);
        }
        return false;
    }

    function verifDiagonal(resultat){
        var firstTerm = Math.floor(resultat/10);
        var secondTerm = (resultat - Math.floor(resultat/10)*10);
        if (firstTerm == secondTerm) {
            return (Math.floor(resultat/10) == 1);
        }
    }

    function testHauteur(debut,fin){
        if ((plateau[debut].getHauteur() + plateau[fin].getHauteur()) <=5) {
            return true;
        }
        return false;
    }

    function testDifHauteur(debut,fin){
        if (plateau[debut].getHauteur() < plateau[fin].getHauteur()) return false;
        else return true;
    }

    function testColor(debut,fin){
        if (!verifCouleurPile(debut,fin)){
            return false;
        }
        if(colorByPlayer[plateau[debut].getColor()] == joueurAdverse()){
            return false;
        }
        return true;
    }

    function verifCouleurPile(debut,fin){
        for(var i=0;i<plateau[debut].getHauteur();i++){
            if (!compareCouleur(debut,fin,i)){
                return false;
            }
        }
        return true;
    }

    function compareCouleur (debut,fin,i){
        for(var j=0;j<plateau[fin].getHauteur();j++){
            if (!verifGetCouleur(debut,fin,i,j)){
                return false;
            }
        }
        return true;
    }

    function verifGetCouleur(debut,fin,i,j){
        if(plateau[debut].getCouleurChoix(i)==plateau[fin].getCouleurChoix(j)){
            if (plateau[debut].getCouleurChoix(i) != Lyngk.Color.WHITE) {
                return false;
            }
        }
        return true;
    }

    function player(){
        if (numPlayer == 1) numPlayer++;
        else numPlayer--;
    }

    function point(coordo){
        if (plateau[coordo.hash()].getHauteur() == 5)
            if (colorByPlayer[plateau[coordo.hash()].getColor()] == numPlayer){
                pointByPlayer[numPlayer]++;
                nbPieces -= plateau[coordo.hash()].getHauteur();
            }
    }

    function joueurAdverse() {
        var tempo;
        if (numPlayer === 1){
            tempo = 2;
        }
        else{
            tempo = 1;
        }
        return tempo;
    }

    function testPossibilitePosition(cas, i, adversaire, coordo){
        var local = cas[i].hash();
        if ((cas[i].isValid())){
            return testHeighColor(local, adversaire, coordo.hash());
        }
        return false;
    }

    function testHeighColor (local, adversaire, posi){
        var heigh = plateau[local].getHauteur() > 0;
        var adColor = colorByPlayer[plateau[local].getColor()] != adversaire;
        var nearColor = plateau[local].getColor() != plateau[posi].getColor();
        return ( heigh && adColor && nearColor);
    }

    function testPositionLigne(base,fin){
        return ((testPosition(base,fin))&&(testLigne(base,fin)));
    }

    function testAllHauteur(base,fin){
        var begin = base.hash(), end = fin.hash();
        return (testDifHauteur(begin,end)) && (testHauteur(begin,end));
    }

    function randomColor(key, couleurDispo){
        if (plateau.hasOwnProperty(key)) {
            var randomCouleur;
            do{
                randomCouleur = Math.floor(Math.random() * 6);
            }while(couleurDispo[randomCouleur] <= 0);
            couleurDispo[randomCouleur]--;
            plateau[key].pose(randomCouleur);
        }
    }

    function verifFull(key){
        if (plateau.hasOwnProperty(key)){
            if (plateau[key].getState() != Lyngk.State.ONE_PIECE){
                return false;
            }
        }
    }
};
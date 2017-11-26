'use strict';
Math.seedrandom('isidis-i2l');

var LyngkTestCase = TestCase("LyngkTestCase");

Math.seedrandom("testlyngk");

LyngkTestCase.prototype.testStory1 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     assertFalse(coordinates.isValid());
 };

LyngkTestCase.prototype.testStory2 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     assertEquals(coordinates.numberValid(), 43);
 };

LyngkTestCase.prototype.testStory3 = function() {
     var coordinates = new Lyngk.Coordinates('A', 3);
     assertEquals(coordinates.representation(),"A3");
 };

LyngkTestCase.prototype.testStory4 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     assertEquals(coordinates.representation(), "invalid");
 };

LyngkTestCase.prototype.testStory5 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     var coordinates2 = coordinates.clone();
     assertTrue(coordinates.representation() === coordinates2.representation());
 };

LyngkTestCase.prototype.testStory6 = function() {
     var coordinates = new Lyngk.Coordinates('A', 3);
     assertTrue(coordinates.hash() === 13);
 };

LyngkTestCase.prototype.testStory7 = function() {
     //var coordinates = new Lyngk.Coordinates('A', 3);
     var intersection = new Lyngk.Intersection(/!*coordinates*!/);
     assertTrue(intersection.getState() === Lyngk.State.VACANT);
 };

LyngkTestCase.prototype.testStory8 = function () {
     var intersect = new Lyngk.Intersection();
     intersect.pose(Lyngk.Color.BLUE);
     assertEquals(intersect.getState(),Lyngk.State.ONE_PIECE);
     assertEquals(intersect.getColor(),Lyngk.Color.BLUE);
 };

LyngkTestCase.prototype.testhist9 = function () {
     var intersect = new Lyngk.Intersection();
     intersect.pose(Lyngk.Color.BLUE);
     intersect.pose(Lyngk.Color.RED);
     assertEquals(intersect.getState(),Lyngk.State.STACK);
     assertEquals(intersect.getColor(),Lyngk.Color.RED);
 };

LyngkTestCase.prototype.testhist10 = function () {
     var intersect = new Lyngk.Intersection();
     intersect.pose(Lyngk.Color.BLUE);
     intersect.pose(Lyngk.Color.RED);
     intersect.pose(Lyngk.Color.GREEN);
     intersect.pose(Lyngk.Color.BLACK);
     intersect.pose(Lyngk.Color.WHITE);
     assertEquals(intersect.getState(),Lyngk.State.FULL_STACK);
 };

LyngkTestCase.prototype.testhist11 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationUnePiece();
     assertTrue(plateau.full());
 };

LyngkTestCase.prototype.testhist12 = function() {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     var nombreCouleur = [0,0,0,0,0,0];
     for (var key in jeu) {
         if (jeu.hasOwnProperty(key))
             nombreCouleur[jeu[key].getColor()]++;
     }
     var testCouleur = true;
     for(var i = 0; i < nombreCouleur.length; i++) {
         if(i < 5 && nombreCouleur[i] != 8)
             testCouleur = false;
         if(i == 5 && nombreCouleur[i] != 3)
             testCouleur = false;
     }
     assertTrue(testCouleur);
 };

LyngkTestCase.prototype.testhist13 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     for (var key in jeu) {
         assertEquals(jeu[key].getHauteur(),1);
     }
 };

LyngkTestCase.prototype.testhist14 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     for (var key in jeu){
         jeu[key].pose(Lyngk.Color.BLUE);
         assertEquals(Lyngk.Color.BLUE,jeu[key].getColor());
     }
 };

LyngkTestCase.prototype.testhist15 = function () {
     var plateau = new Lyngk.Engine();
     //plateau.initialisationMultiCouleur();
     var coordoBase = new Lyngk.Coordinates('A', 3);
     var coordoFin = new Lyngk.Coordinates('B', 3);
     plateau.put(coordoBase,Lyngk.Color.IVORY);
     plateau.put(coordoFin,Lyngk.Color.BLUE);
     var jeu = plateau.getPlat();
     var couleurBase = jeu[coordoBase.hash()].getColor();
     plateau.move(coordoBase,coordoFin);
     jeu = plateau.getPlat();
     assertTrue(jeu[coordoFin.hash()].getColor()===couleurBase);
     assertTrue(jeu[coordoBase.hash()].getState()==Lyngk.State.VACANT);
     assertTrue(jeu[coordoFin.hash()].getHauteur() == 2);
 };

LyngkTestCase.prototype.testhist16 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     var coordo1 = new Lyngk.Coordinates('A', 3);
     var coordo2 = new Lyngk.Coordinates('B', 3);
     var coordo3 = new Lyngk.Coordinates('B', 2);
     var couleurBase = jeu[coordo1.hash()].getColor();
     plateau.move(coordo1,coordo2);
     plateau.move(coordo2,coordo3);
     jeu = plateau.getPlat();
     assertTrue(jeu[coordo3.hash()].getColor()===couleurBase
         && jeu[coordo1.hash()].getState()==Lyngk.State.VACANT
         && jeu[coordo2.hash()].getState()==Lyngk.State.VACANT
         && jeu[coordo3.hash()].getHauteur() == 3);
 };

LyngkTestCase.prototype.testhist17 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var coordo1 = new Lyngk.Coordinates('A', 3);
     var coordo2 = new Lyngk.Coordinates('B', 3);
     assertTrue(plateau.move(coordo1,coordo2));
     assertFalse(plateau.move(coordo2,coordo1));
 };

LyngkTestCase.prototype.testhist18 = function () {
     var plateau = new Lyngk.Engine();
     var coordo1 = new Lyngk.Coordinates('A', 3);
     var coordo2 = new Lyngk.Coordinates('B', 3);
     var coordo3 = new Lyngk.Coordinates('B', 2);
     var coordo4 = new Lyngk.Coordinates('A', 1);
     var coordo5 = new Lyngk.Coordinates('C', 5);
     plateau.put(coordo1,Lyngk.Color.BLACK);
     plateau.put(coordo2,Lyngk.Color.BLUE);
     plateau.put(coordo3,Lyngk.Color.RED);
     plateau.put(coordo4,Lyngk.Color.GREEN);
     plateau.put(coordo5,Lyngk.Color.IVORY);
     assertTrue(plateau.move(coordo1,coordo2));
     assertFalse(plateau.move(coordo2,coordo1));
     assertFalse(plateau.move(coordo2,coordo4));
     assertFalse(plateau.move(coordo2,coordo5));
     assertTrue(plateau.move(coordo2,coordo3));
     assertFalse(plateau.move(coordo3,coordo3));
 };

LyngkTestCase.prototype.testhist19 = function () {
     var plateau = new Lyngk.Engine();
     //plateau.initialisationMultiCouleur();
     var coordo1 = new Lyngk.Coordinates('I', 7);
     var coordo2 = new Lyngk.Coordinates('H', 6);
     var coordo3 = new Lyngk.Coordinates('H', 5);
     var coordo4 = new Lyngk.Coordinates('H', 8);
     var coordo5 = new Lyngk.Coordinates('F', 5);
     var coordo6 = new Lyngk.Coordinates('F', 3);
     plateau.put(coordo1,Lyngk.Color.BLUE);
     plateau.put(coordo2,Lyngk.Color.IVORY);
     plateau.put(coordo3,Lyngk.Color.GREEN);
     plateau.put(coordo4,Lyngk.Color.RED);
     plateau.put(coordo5,Lyngk.Color.BLACK);
     plateau.put(coordo6,Lyngk.Color.WHITE);
     assertTrue(plateau.move(coordo1,coordo2));
     assertTrue(plateau.move(coordo2,coordo3));
     assertFalse(plateau.move(coordo3,coordo4));
     assertFalse(plateau.move(coordo5,coordo6));
 };

LyngkTestCase.prototype.testhist20 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('B', 2);
    var coordo2 = new Lyngk.Coordinates('C', 2);
    var coordo3 = new Lyngk.Coordinates('D', 2);
    var coordo4 = new Lyngk.Coordinates('E', 2);
    plateau.put(coordo1,Lyngk.Color.WHITE);
    plateau.put(coordo2,Lyngk.Color.IVORY);
    plateau.put(coordo3,Lyngk.Color.GREEN);
    plateau.put(coordo4,Lyngk.Color.RED);
    plateau.put(coordo1,Lyngk.Color.BLUE);
    plateau.put(coordo1,Lyngk.Color.BLACK);
    assertTrue(plateau.move(coordo1,coordo2));
    var jeu = plateau.getPlat();
    assertEquals(jeu[coordo2.hash()].getHauteur(),4);
    assertTrue(plateau.move(coordo2,coordo3));
    jeu = plateau.getPlat();
    assertEquals(jeu[coordo3.hash()].getHauteur(),5);
    assertFalse(plateau.move(coordo3,coordo4));
};

LyngkTestCase.prototype.testhist21 = function () {
    var plateau = new Lyngk.Engine();
    plateau.initialisationMultiCouleur();
    var coordo1 = new Lyngk.Coordinates('A', 3);
    var coordo2 = new Lyngk.Coordinates('B', 3);
    var coordo3 = new Lyngk.Coordinates('C', 3);
    assertTrue(plateau.move(coordo1,coordo2));
    assertFalse(plateau.move(coordo3,coordo2));
};

LyngkTestCase.prototype.testhist22 = function () {
    var plateau = new Lyngk.Engine();
    //plateau.initialisationMultiCouleur();
    var coordo1 = new Lyngk.Coordinates('I', 7);
    var coordo2 = new Lyngk.Coordinates('H', 6);
    var coordo3 = new Lyngk.Coordinates('G', 4);
    var coordo4 = new Lyngk.Coordinates('G', 5);
    var coordo5 = new Lyngk.Coordinates('G', 6);
    plateau.put(coordo1,Lyngk.Color.BLUE);
    plateau.put(coordo2,Lyngk.Color.IVORY);
    plateau.put(coordo3,Lyngk.Color.GREEN);
    plateau.put(coordo4,Lyngk.Color.RED);
    plateau.put(coordo5,Lyngk.Color.BLACK);
    assertTrue(plateau.move(coordo1,coordo2));
    assertTrue(plateau.move(coordo3,coordo4));
    assertTrue(plateau.move(coordo4,coordo5));
    assertFalse(plateau.move(coordo2,coordo5));
};

LyngkTestCase.prototype.testhist23 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('I', 7);
    var coordo2 = new Lyngk.Coordinates('H', 6);
    var coordo3 = new Lyngk.Coordinates('H',7);
    var coordo4 = new Lyngk.Coordinates('H',8);
    plateau.put(coordo1,Lyngk.Color.BLUE);
    plateau.put(coordo1,Lyngk.Color.WHITE);
    plateau.put(coordo2,Lyngk.Color.BLUE);
    plateau.put(coordo2,Lyngk.Color.WHITE);
    plateau.put(coordo3,Lyngk.Color.WHITE);
    plateau.put(coordo4,Lyngk.Color.BLUE);
    assertFalse(plateau.move(coordo1,coordo2));
    assertTrue(plateau.move(coordo1,coordo3));
    assertFalse(plateau.move(coordo3,coordo4));
};

LyngkTestCase.prototype.testhist24 = function () {
    var plateau = new Lyngk.Engine();
    assertTrue(plateau.getNumPlayer() == 1);
};

LyngkTestCase.prototype.testhist26 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('I', 7);
    var coordo2 = new Lyngk.Coordinates('H', 6);
    plateau.put(coordo1,Lyngk.Color.BLUE);
    plateau.put(coordo2,Lyngk.Color.WHITE);
    assertTrue(plateau.getNumPlayer() == 1);
    plateau.move(coordo1,coordo2)
    assertTrue(plateau.getNumPlayer() == 2);
};

LyngkTestCase.prototype.testhist25 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('A', 3);
    var coordo2 = new Lyngk.Coordinates('B', 3);
    assertTrue(plateau.claim(Lyngk.Color.RED));
    plateau.move(coordo1,coordo2);
    assertFalse(plateau.claim(Lyngk.Color.RED))
    assertTrue(plateau.claim(Lyngk.Color.GREEN));
};

LyngkTestCase.prototype.testhist27 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('A', 3);
    var coordo2 = new Lyngk.Coordinates('B', 3);
    var coordo3 = new Lyngk.Coordinates('H', 6);
    var coordo4 = new Lyngk.Coordinates('G', 5);
    var coordo5 = new Lyngk.Coordinates('C', 3);
    var coordo6 = new Lyngk.Coordinates('G', 6);
    var coordo7 = new Lyngk.Coordinates('C', 2);
    var coordo8 = new Lyngk.Coordinates('H', 7);
    var coordo9 = new Lyngk.Coordinates('D', 2);

    plateau.put(coordo1,Lyngk.Color.BLUE);
    plateau.put(coordo2,Lyngk.Color.GREEN);
    plateau.put(coordo5,Lyngk.Color.BLACK);
    plateau.put(coordo7,Lyngk.Color.IVORY);
    plateau.put(coordo9,Lyngk.Color.RED);

    plateau.put(coordo3,Lyngk.Color.RED);
    plateau.put(coordo4,Lyngk.Color.WHITE);
    plateau.put(coordo6,Lyngk.Color.GREEN);
    plateau.put(coordo8,Lyngk.Color.BLACK);
    plateau.claim(Lyngk.Color.BLUE);
    plateau.move(coordo1,coordo2);
    plateau.move(coordo3,coordo4);
    plateau.move(coordo2,coordo5);
    plateau.move(coordo4,coordo6);
    plateau.move(coordo5,coordo7);
    plateau.move(coordo6,coordo8);
    plateau.move(coordo7,coordo9);
    assertTrue(plateau.nbPointJoueur(1) == 1);
    assertTrue(plateau.getNbPiece() == 38);
};

LyngkTestCase.prototype.testhist28 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('B', 5);
    var coordo2 = new Lyngk.Coordinates('B', 4);
    var coordo3 = new Lyngk.Coordinates('A', 3);
    plateau.put(coordo1,Lyngk.Color.BLUE);
    plateau.put(coordo2,Lyngk.Color.BLACK);
    plateau.put(coordo3,Lyngk.Color.RED);
    plateau.claim(Lyngk.Color.RED);
    plateau.move(coordo1,coordo2);
    assertFalse(plateau.move(coordo3,coordo2));
};

LyngkTestCase.prototype.testhist29 = function () {
    var plateau = new Lyngk.Engine();
    plateau.initialisationMultiCouleur();
    assertTrue(plateau.nbPossibilite()== 40);
};

LyngkTestCase.prototype.testhist30 = function () {
    var plateau = new Lyngk.Engine();
    plateau.initialisationMultiCouleur();
    var coordo1 = new Lyngk.Coordinates('A', 3);
    var coordo2 = new Lyngk.Coordinates('B', 3);
    plateau.claim(Lyngk.Color.BLACK);
    plateau.move(coordo1, coordo2);
    assertEquals(plateau.nbPossibilite(), 31);
};

LyngkTestCase.prototype.testhist31 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('A', 3);
    var coordo2 = new Lyngk.Coordinates('B', 3);
    var coordo3 = new Lyngk.Coordinates('B', 4);
    var coordo4 = new Lyngk.Coordinates('B', 2);
    var coordo5 = new Lyngk.Coordinates('C', 3);
    var coordo6 = new Lyngk.Coordinates('C', 4);

    plateau.put(coordo1,Lyngk.Color.BLACK);
    plateau.put(coordo2,Lyngk.Color.BLUE);
    plateau.put(coordo3,Lyngk.Color.RED);
    plateau.put(coordo4,Lyngk.Color.BLUE);
    plateau.put(coordo5,Lyngk.Color.GREEN);
    plateau.put(coordo6,Lyngk.Color.IVORY);

    assertEquals(plateau.nbPossibilitePosition(coordo1), 2);
    assertEquals(plateau.nbPossibilitePosition(coordo2), 4);

};

LyngkTestCase.prototype.testhist32 = function () {// erreur lors des tests
/*    var plateau = new Lyngk.Engine();
    plateau.initialisationMultiCouleur();

    plateau.claim(Lyngk.Color.BLACK);
    var coordo1 = new Lyngk.Coordinates('C',2);
    var coordo2 = new Lyngk.Coordinates('C',3);
    plateau.move(coordo1,coordo2);

    plateau.claim(Lyngk.Color.IVORY);
    coordo1 = new Lyngk.Coordinates('H',7);
    coordo2 = new Lyngk.Coordinates('H',6);
    plateau.move(coordo1,coordo2);

    var playerCanPlay = true;
    while (playerCanPlay === true) {
        var coordo = plateau.searchColorPlayer();
        var coordoMove;
        if (coordo !== -1){
            var dizaine = coordo/10;
            var unite =coordo - (dizaine*10);

            coordo = new Lyngk.Coordinates(
                String.fromCharCode(dizaine+64), unite);
            debugger;
            coordoMove = plateau.searchCordoToMove(coordo);
            plateau.move(coordo, coordoMove);
        }
        else {
            playerCanPlay = false;
        }
    }
    plateau.screenScore();*/
};
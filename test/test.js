'use strict';
//Math.seedrandom('isidis-i2l');

var LyngkTestCase = TestCase("LyngkTestCase");
/*

 // Partie 1
 // histoire 1
 LyngkTestCase.prototype.testStory1 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     assertFalse(coordinates.is_valid());
 };

 //histoire 2
 LyngkTestCase.prototype.testStory2 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     assertEquals(coordinates.number_valid(), 43);
 };

 //histoire 3
 LyngkTestCase.prototype.testStory3 = function() {
     var coordinates = new Lyngk.Coordinates('A', 3);
     assertEquals(coordinates.representation(),"A3");
 };

 //histoire 4
 LyngkTestCase.prototype.testStory4 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     assertEquals(coordinates.representation(), "invalid");
 };

 //histoire 5
 LyngkTestCase.prototype.testStory5 = function() {
     var coordinates = new Lyngk.Coordinates('A', 1);
     var coordinates2 = coordinates.clone();
     assertTrue(coordinates.representation() === coordinates2.representation());
 };

 //histoire 6
 LyngkTestCase.prototype.testStory6 = function() {
     var coordinates = new Lyngk.Coordinates('A', 3);
     assertTrue(coordinates.hash() === 13);
 };

 //histoire 7
 LyngkTestCase.prototype.testStory7 = function() {
     //var coordinates = new Lyngk.Coordinates('A', 3);
     var intersection = new Lyngk.Intersection(/!*coordinates*!/);
     assertTrue(intersection.getState() === Lyngk.State.VACANT);
 };

 //histoire 8
 LyngkTestCase.prototype.testStory8 = function () {
     var intersect = new Lyngk.Intersection();
     intersect.pose(Lyngk.Color.BLUE);
     assertEquals(intersect.getState(),Lyngk.State.ONE_PIECE);
     assertEquals(intersect.getColor(),Lyngk.Color.BLUE);
 };

 //histoire 9
 LyngkTestCase.prototype.testhist9 = function () {
     var intersect = new Lyngk.Intersection();
     intersect.pose(Lyngk.Color.BLUE);
     intersect.pose(Lyngk.Color.RED);
     assertEquals(intersect.getState(),Lyngk.State.STACK);
     assertEquals(intersect.getColor(),Lyngk.Color.RED);
 };

 //histoire 10
 LyngkTestCase.prototype.testhist10 = function () {
     var intersect = new Lyngk.Intersection();
     intersect.pose(Lyngk.Color.BLUE);
     intersect.pose(Lyngk.Color.RED);
     intersect.pose(Lyngk.Color.GREEN);
     intersect.pose(Lyngk.Color.BLACK);
     intersect.pose(Lyngk.Color.WHITE);
     assertEquals(intersect.getState(),Lyngk.State.FULL_STACK);
 };

 //histoire 11
 LyngkTestCase.prototype.testhist11 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationUnePiece();
     assertTrue(plateau.full());
 };

 //histoire 12
 LyngkTestCase.prototype.testhist12 = function() {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     //var nombreCouleur = {"BLACK": 0, "IVORY": 0, "BLUE": 0, "RED": 0, "GREEN": 0, "WHITE": 0};
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

 // Partie 2
 //histoire 13
 LyngkTestCase.prototype.testhist13 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     for (var key in jeu) {
         assertEquals(jeu[key].getHauteur(),1);
     }
 };

 //histoire 14
 LyngkTestCase.prototype.testhist14 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     for (var key in jeu){
         jeu[key].pose(Lyngk.Color.BLUE);
         assertEquals(Lyngk.Color.BLUE,jeu[key].getColor());
     }
 };

 //histoire 15
 LyngkTestCase.prototype.testhist15 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var jeu = plateau.getPlat();
     var coordoBase = new Lyngk.Coordinates('A', 3);
     var coordoFin = new Lyngk.Coordinates('B', 3);
     var couleurBase = jeu[coordoBase.hash()].getColor();
     //jeu = plateau.getPlat();
     plateau.move(coordoBase,coordoFin);
     jeu = plateau.getPlat();
     assertTrue(jeu[coordoFin.hash()].getColor()===couleurBase
         && jeu[coordoBase.hash()].getState()==Lyngk.State.VACANT
         && jeu[coordoFin.hash()].getHauteur() == 2);
 };

 //histoire 16
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

 //histoire 17
 LyngkTestCase.prototype.testhist17 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var coordo1 = new Lyngk.Coordinates('A', 3);
     var coordo2 = new Lyngk.Coordinates('B', 3);
     assertTrue(plateau.move(coordo1,coordo2));
     assertFalse(plateau.move(coordo2,coordo1));
 };

 //histoire 18
 LyngkTestCase.prototype.testhist18 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var coordo1 = new Lyngk.Coordinates('A', 3);
     var coordo2 = new Lyngk.Coordinates('B', 3);
     var coordo3 = new Lyngk.Coordinates('B', 2);
     var coordo4 = new Lyngk.Coordinates('A', 1);
     var coordo5 = new Lyngk.Coordinates('C', 5);
     assertTrue(plateau.move(coordo1,coordo2));
     assertFalse(plateau.move(coordo2,coordo1));
     assertFalse(plateau.move(coordo2,coordo4));
     assertFalse(plateau.move(coordo2,coordo5));
     assertTrue(plateau.move(coordo2,coordo3));
     assertFalse(plateau.move(coordo3,coordo3));
 };

 //histoire 19
 LyngkTestCase.prototype.testhist19 = function () {
     var plateau = new Lyngk.Engine();
     plateau.initialisationMultiCouleur();
     var coordo1 = new Lyngk.Coordinates('I', 7);
     var coordo2 = new Lyngk.Coordinates('H', 6);
     var coordo3 = new Lyngk.Coordinates('H', 5);
     var coordo4 = new Lyngk.Coordinates('H', 8);
     var coordo5 = new Lyngk.Coordinates('F', 5);
     var coordo6 = new Lyngk.Coordinates('F', 3);
     assertTrue(plateau.move(coordo1,coordo2));
     assertTrue(plateau.move(coordo2,coordo3));
     assertFalse(plateau.move(coordo3,coordo4));
     assertFalse(plateau.move(coordo5,coordo6));
 };

 //histoire 20
LyngkTestCase.prototype.testhist20 = function () {
    var plateau = new Lyngk.Engine();
    plateau.initialisationMultiCouleur();
    var coordo1 = new Lyngk.Coordinates('B', 2);
    var coordo2 = new Lyngk.Coordinates('C', 2);
    var coordo3 = new Lyngk.Coordinates('D', 2);
    var coordo4 = new Lyngk.Coordinates('E', 2);
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

 //histoire 21
LyngkTestCase.prototype.testhist21 = function () {
    var plateau = new Lyngk.Engine();
    plateau.initialisationMultiCouleur();
    var coordo1 = new Lyngk.Coordinates('A', 3);
    var coordo2 = new Lyngk.Coordinates('B', 3);
    var coordo3 = new Lyngk.Coordinates('C', 3);
    assertTrue(plateau.move(coordo1,coordo2));
    assertFalse(plateau.move(coordo3,coordo2));
};

 //histoire 22
LyngkTestCase.prototype.testhist22 = function () {
    var plateau = new Lyngk.Engine();
    plateau.initialisationMultiCouleur();
    var coordo1 = new Lyngk.Coordinates('I', 7);
    var coordo2 = new Lyngk.Coordinates('H', 6);
    var coordo3 = new Lyngk.Coordinates('G', 4);
    var coordo4 = new Lyngk.Coordinates('G', 5);
    var coordo5 = new Lyngk.Coordinates('G', 6);
    assertTrue(plateau.move(coordo1,coordo2));
    assertTrue(plateau.move(coordo3,coordo4));
    assertTrue(plateau.move(coordo4,coordo5));
    assertFalse(plateau.move(coordo2,coordo5));
};
*/

 //histoire 23
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

 //histoire 24
LyngkTestCase.prototype.testhist24 = function () {
    var plateau = new Lyngk.Engine();
    assertTrue(plateau.getNumPlayer() == 1);
};

 //histoire 25
LyngkTestCase.prototype.testhist25 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('I', 7);
    var coordo2 = new Lyngk.Coordinates('H', 6);
    plateau.put(coordo1,Lyngk.Color.BLUE);
    plateau.put(coordo2,Lyngk.Color.WHITE);
    assertTrue(plateau.getNumPlayer() == 1);
    plateau.move(coordo1,coordo2)
    assertTrue(plateau.getNumPlayer() == 2);
};

 // histoire 26
LyngkTestCase.prototype.testhist25 = function () {
    var plateau = new Lyngk.Engine();
    var coordo1 = new Lyngk.Coordinates('A', 3);
    var coordo2 = new Lyngk.Coordinates('B', 3);
    var coordo3 = new Lyngk.Coordinates('C', 3);
    assertTrue(plateau.claim(Lyngk.Color.RED));
    plateau.move(coordo1,coordo2);
    assertFalse(plateau.claim(Lyngk.Color.RED))
    assertTrue(plateau.claim(Lyngk.Color.GREEN));
};
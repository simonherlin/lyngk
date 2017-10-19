'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

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

// hsitoire 7
LyngkTestCase.prototype.testStory7 = function() {
    //var coordinates = new Lyngk.Coordinates('A', 3);
    var intersection = new Lyngk.Intersection(/*coordinates*/);
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

// histoire 10
LyngkTestCase.prototype.testhist10 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.pose(Lyngk.Color.BLUE);
    intersect.pose(Lyngk.Color.RED);
    intersect.pose(Lyngk.Color.GREEN);
    intersect.pose(Lyngk.Color.BLACK);
    intersect.pose(Lyngk.Color.WHITE);
    assertEquals(intersect.getState(),Lyngk.State.FULL_STACK);
};

// histoire 11
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
    debugger;
    assertEquals(jeu[coordoFin.hash()].getColor(),couleurBase );
    //assertEquals(/*jeu[coordoFin.hash()].getColor()===couleurBase &&*/ jeu[coordoBase.hash()].getState(),Lyngk.State.VACANT);
};
'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");


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
    assertEquals(plateau.full(),43);
};
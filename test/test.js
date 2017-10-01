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
LyngkTestCase.prototype.testStory2 = function() {
    var coordinates = new Lyngk.Coordinates('A', 1);
    assertEquals(coordinates.representation(), "invalid");
};

//histoire 5
LyngkTestCase.prototype.testStory2 = function() {
    var coordinates = new Lyngk.Coordinates('A', 1);
    var coordinates2 = coordinates.clone();
    assertTrue(coordinates.representation() === coordinates2.representation());
};

//histoire 6
LyngkTestCase.prototype.testStory2 = function() {
    var coordinates = new Lyngk.Coordinates('A', 3);
    assertTrue(coordinates.hash() === 2);
};

// hsitoire 7
LyngkTestCase.prototype.testStory2 = function() {
    var coordinates = new Lyngk.Coordinates('A', 3);
    var intersection = new Lyngk.Intersection(coordinates);
    assertTrue(intersection.getState() === Lyngk.State.VACANT);
};
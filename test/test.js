'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);

    // histoire 1
    assertFalse(coordinates.is_valid());

    //histoire 2
    assertEquals(coordinates.number_valid(),43);

    //histoire 3
    coordinates.setLigne(3);
    assertEquals(coordinates.representation(),"A3");

    //histoire 4
    coordinates.setLigne(1);
    assertEquals(coordinates.representation(),"invalid");

    //histoire 5
    var coordinates2 = coordinates.clone();
    assertTrue(coordinates.representation() === coordinates2.representation());

    //histoire 6
    coordinates.setLigne(3);
    assertTrue(coordinates.hash() === 2);

};
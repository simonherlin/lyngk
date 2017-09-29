'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function(){
    var coordinates = new lyngk.Coordinates('A',1);

    assertFalse(coordinates.is_valid());
};s
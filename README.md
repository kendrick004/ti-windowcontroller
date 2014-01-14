ti-windowcontroller
===================

Controller that manages windows created in titanium

Manages windows created in titanium.

Create new window.

var controller = require('WindowController');

var win = controller.createWindow({

  backgroundColor: 'white',
  
  layout: 'vertical',
  
  winGroup: 'group1',
  
  winName : 'homepage'  //add win name property so it can be close by its name
  
});

win.open();

controller.closeWindow('homepage'); //close window with window name 'homepage'

controller.closeWinGroup('group1'); //close window with group name 'group1'

controller.windowHome();  //redirect to root window


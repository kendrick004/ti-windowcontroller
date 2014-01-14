//WindowController.js
var controller = {};

var windowStack=[];

//get array of windows
controller.appWindows = windowStack;

//create window
controller.createWindow = function(instance){
	//hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
	instance.navBarHidden = true;
	//hack - setting this property ensures the window gesture is only PORTRAIT
	instance.orientationModes = [Titanium.UI.PORTRAIT];
	
	//This is the first/root window
	if(!windowStack.length) {
		instance.exitOnClose = true;
	}
	
	instance.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	
	var win = Ti.UI.createWindow(instance);
	windowStack.push(win);

	
	win.addEventListener('close', function(e){
	//Window Manager... manipulates the array of windows
		windowStack.concat([]);
	    for (var i = 0; i < windowStack.length; i++) {
			if(windowStack[i].winName == win.winName){
		    	windowStack.splice(i,1);
		   	}
		}
	});
	return win;
};

//go to root/home window
controller.windowHome = function(){
	for (var i = windowStack.length; i > 1; i--) {
	    windowStack[i-1].close();
	}
};

//close window
controller.closeWindow = function(thisWindow){
	for (var i = windowStack.length; i > 1; i--) {
		if(windowStack[i-1].winName == thisWindow){
	    	windowStack[i-1].close();
	   	}
	}
};

//Redirect to window
//only existing windows are shown
controller.winLocation = function(thisWindow, args){
	for (var i = 0; i < windowStack.length; i++){
		if(windowStack[i].winName == thisWindow){
	    	windowStack[i].close();
	   	}
	}
	args.concat({
		backgroundColor: '#ffffff',
		winName: thisWindow
	});
    var win = exports.createWindow(args);
	win.open();
};

//close window group
controller.closeWinGroup = function(thisGroup){
	for (var i = windowStack.length; i > 1; i--) {
		if(windowStack[i-1].winGroup == thisGroup){
	    	windowStack[i-1].close();
	   	}
	}
};

//if window exist
controller.isWinExist = function(thisWindow) {
	var exist = false;
	for (var i = windowStack.length; i > 0; i--) {
	    if(windowStack[i-1].winName == thisWindow){
	    	exist = true;
	   	}
	}
	return exist;
};

module.exports = controller;
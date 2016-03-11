angular.module('ionicApp', ['ionic'])

.run(function($ionicPlatform) {
    
	  $ionicPlatform.ready(function() {
	    
	    if(window.StatusBar) {
	    	StatusBar.hide();
	    }
	    
	    var scope = angular.element(document.getElementById("pane")).scope();
	    if (scope) {
	    	scope.$apply(function () {
	    		scope.startup();
	    	});
	    }
	  });
}) 


.controller("AppController", function($scope, $timeout, $ionicPopover, $ionicModal ) {
	
    $scope.showPicture = false;
    
    
    // MENU POPOVER
    $ionicPopover.fromTemplateUrl('menu-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.menuPopover = popover;
    });

    $scope.openMenuPopover = function($event) {
        $scope.menuPopover.show($event);
    };
  
    $scope.closeMenuPopover = function() {
        $scope.menuPopover.hide();
    };
    
  
    // EXHIBIT GALLERY MODAL
    $ionicModal.fromTemplateUrl('exhibit-modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        id: 'art'
    }).then(function(exhibitModal) {
        $scope.exhibitModal = exhibitModal;
    }); 

    $scope.openExhibitModal = function() {
        $scope.closeMenuPopover();
        $scope.exhibitModal.show();
    }
    
    $scope.closeExhibitModal = function() {
        $scope.exhibitModal.hide();
    };

    
    
    $scope.exhibits = [
        {name: 'Lennon',
         src: 'https://farm7.staticflickr.com/6182/6060262574_d0195af1af_s.jpg',
         width: 75, height: 75, selected: true},
        {name: 'vanGogh',
         src: 'https://farm7.staticflickr.com/6028/6016464897_4c4c1b0d2d_t.jpg',
         width: 84, height: 100, selected: false},
        {name: 'Washington',
         src: 'https://farm5.staticflickr.com/4034/5164408549_f248954f26_t.jpg',
         width: 89, height: 100, selected: false},
        {name: 'Bogart',
         src: 'https://farm8.staticflickr.com/7410/9741795472_9d8b8b3bd9_t.jpg',
         width: 77, height: 100, selected: false}
         ];
    
   
    // HELP MODAL 
    $ionicModal.fromTemplateUrl('help-modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        id: 'help'
    }).then(function(helpModal) {
        $scope.helpModal = helpModal;
    }); 

    $scope.openHelpModal = function() {
        $scope.closeMenuPopover();
        $scope.helpModal.show();
    }
    
    $scope.closeHelpModal = function() {
        $scope.helpModal.hide();
    };
    
    // ABOUT MODAL 
    $ionicModal.fromTemplateUrl('about-modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        id: 'about'
    }).then(function(aboutModal) {
        $scope.aboutModal = aboutModal;
    }); 

    $scope.openAboutModal = function() {
        $scope.closeMenuPopover();
        $scope.aboutModal.show();
    }
    
    $scope.closeAboutModal = function() {
        $scope.aboutModal.hide();
    };
    
    $scope.$on('modal.hidden', function(ev, modal) {
        if (modal.id && modal.id == "help") {
            $scope.showPicture = true;
        }
    });
    
    
    //CLEANUP MODALS & POPOVERS
    $scope.$on('$destroy', function() {
        $scope.menuPopover.remove();
        $scope.exhibitModal.remove();
        $scope.helpModal.remove();
        $scope.aboutModal.remove();
    });
    
    
    
    
    
    // PICTURE MGMT
    $scope.exhibit = $scope.exhibits[0];
    $scope.selectExhibit = function(exhibitIdx) {
        $scope.exhibit.selected = false;
        $scope.exhibits[exhibitIdx].selected = true;
        $scope.exhibit = $scope.exhibits[exhibitIdx];
        //console.log('new img: ' + exhibitIdx);
    }
    
   
      //initialize - replace
	  $scope.startup = function() {
	  	$timeout(function() {
            $scope.openHelpModal(null);
        }, 1000);
          
        if (window.ezar) {
           ezar.initializeVideoOverlay(
	  			function() {
                    ezar.getBackCamera().start();
                },
	  			function(err) {
	  				alert('unable to init ezar: ' + err);
	  			});
	  
        }
	  
//		  $ionicGesture.on('tap', function(ev) {
//			  console.log("IONIC TAP");
//		  });
	  }
      

      $scope.snapshotTimestamp = Date.now();

      $scope.snapshot = function() {
        //ignore ghost clicks
        if (Date.now() - $scope.snapshotTimestamp < 3000) return;
        $scope.snapshotTimestamp = Date.now();
          
        console.log('snapshot');
        //hide snapshot button
        
        var element = document.getElementById("camera");
        element.className += " " + "hide";

        ezar.snapshot(
          function() {
              //perform screen capture
              //show snapshot button
              element.className = "";
          },null,
          {encodingType: ezar.ImageEncoding.PNG,
           saveToPhotoAlbum: true});
        
      }
      
     
});

function startCam() {
	ezar.getBackCamera().start();
}


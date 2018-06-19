var shake = false; //declare global variable

$(document).ready(function(){
  
  //function to dictate shake animation from codepen
    (function($){
    $.fn.shake = function(settings) {
        if(typeof settings.interval == 'undefined'){
            settings.interval = 100;
        }
        
        if(typeof settings.distance == 'undefined'){
            settings.distance = 10;
        }
        
        if(typeof settings.times == 'undefined'){
            settings.times = 4;
        }
        
        if(typeof settings.complete == 'undefined'){
            settings.complete = function(){};
        }
        
        $(this).css('position','relative');
        
        for(var iter=0; iter<(settings.times+1); iter++){
            $(this).animate({ left:((iter%2 == 0 ? settings.distance : settings.distance * -1)) }, settings.interval);
        }

        $(this).animate({ left: 0}, settings.interval, settings.complete);  
    }; 
    
    $.fn.bounce = function(settings) {
        if(typeof settings.interval == 'undefined'){
            settings.interval = 100;
        }

        if(typeof settings.distance == 'undefined'){
            settings.distance = 10;
        }

        if(typeof settings.times == 'undefined'){
            settings.times = 4;
        }

        if(typeof settings.complete == 'undefined'){
            settings.complete = function(){};
        }

        $(this).css('position','relative');

        for(var iter=0; iter<(settings.times+1); iter++){
            $(this).animate({ top:((iter%2 == 0 ? settings.distance : settings.distance * -1)) }, settings.interval);
        }

        $(this).animate({ top: 0}, settings.interval, settings.complete);  
    };
    })(jQuery);
    
    //add event listener to shake class
    $(document).ready(function(){
        $('button.shake').click(function(e){
                if (shake == true){
                    $(this).shake({
                    interval: 100,
                    distance: 20,
                    times: 5
                });
            }
            
        });
       
    });
    
})


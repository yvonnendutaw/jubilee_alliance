$(document).foundation()


var slider = new slider();

$(document).ready(function() {

});

function slider() {
  
  //init slider
  slides = $('.slider>.slides');
  current = 1;
  paginationButtons = $('.slider-controls>ul').children();
  length = paginationButtons.length;

  //functions
  var play = function() {
    playID = setTimeout(function() {
      next();
      play();
    }, 6000);
  }
  
  var next = function() {
    if (current>=length) {
      current=1;
    } else {
      current++;
    }
    goTo(current);
  }
  
  var previous = function() {
    if (current<=1) {
      current=length;
    } else {
      current--;
    }
    goTo(current);
  }
    
  var goTo = function(i) {
    current = i;
    $(slides).css('transform','translateX(-' + (current-1)*100 + 'vw)');
    $(slides).children().removeClass('active');
    $($(slides).children()[current-1]).addClass('active');
    $(paginationButtons).removeClass('active');
    $(paginationButtons[current-1]).addClass('active');
    animateSlide();
  }
    
  var abortTimer = function(tid) {
    clearTimeout(tid);
  }

  var resetTimer = function(tid) {
    clearTimeout(tid);
    play();
  }
  
  var animateSlide = function() {
    var color = $($('.slide')[current-1]).attr('background-color');
    setTimeout(function() {
      $('.slider').css('background',color);
    }, 100);
  }

  //register Event Listeners
  $(paginationButtons).click(function(){
    goTo($(paginationButtons).index(this)+1);
    resetTimer(playID);
  });
  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        previous();
        resetTimer(playID);
        break;
        
        case 38:
        previous();           
        resetTimer(playID);
        break;

        case 39: // right
        next();
        resetTimer(playID);
        break;
        
        case 40:
        next();
        resetTimer(playID);
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
  
  //Run
  play();
  $($(slides).children()[current-1]).addClass('active');
  
}





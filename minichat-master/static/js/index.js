var $messages = $('.messages-content'),
                d, h, m,
                i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    //fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date();
 /*  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
	
	
	
  }  */
  $('<div class="timestamp">' + d.getHours() + ':' + d.getMinutes() + '</div>').appendTo($('.message:last'));
	
}
function setDate(user){
  d = new Date();
 /*  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
	
	
	
  }  */
  $('<div class="userinfo">'+'~'+user+'</div>').appendTo($('.message:last'));
  $('<div class="timestamp">'+ d.getHours() + ':' + d.getMinutes()+'</div>').appendTo($('.message:last'));
	
}

function insertMessage(option) {
  msg = $('.message-input').val();
 
  if (option==0||option==1||option==2||option==3||option==4||option==5){
    var option_ =option+1;
    $('<div class="message message-personal">Selected Option - ' + option_ + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
	interact(option);
   }
  if (option==10) {
   
	setDate();
	$('.message-input').val(null);
	updateScrollbar();
	interact(msg);
	setTimeout(function() {
    //fakeMessage();
		}, 1000 + (Math.random() * 20) * 100);
	}
   }
   /* $('.message-submit').click(function() {
    var option =10; 
    insertMessage(option); 
}); */

function option0(option) { 

  insertMessage(option);
        
    }

function option1(option) {
      
  insertMessage(option);
        
    }
function option2(option) { 

  insertMessage(option);
        
    }
function option3(option) {
      
  insertMessage(option);
        
    }
function option4(option) {
 
  insertMessage(option);
        
    }

$('.message-speech').click(function() {
	document.getElementById("myNav").style.height = "100%";
	$.post('/speech', {
    }).done(function(speech_) {
//	document.getElementById("myNav").style.height = "0%";	
    $('.message-input').val(speech_['text']) ;
    }).fail(function() {
    alert('e speak agaaxs  fail in') ;
    });
});

$('.call').click(function() {
   document.getElementById("myCall").style.height = "100%";
 
});

/* 
$(window).on('keydown', function(e) {
  if (e.which == 13) {
     var option =10; 
    insertMessage(option);
    return false;
  }
  
}) */



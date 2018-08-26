var streamapi="https://wind-bow.glitch.me/twitch-api/streams/";
var channelapi="https://wind-bow.glitch.me/twitch-api/channels/";
var channels=["freecodecamp", "GamingProdigy", "ESL_SC2"];

function allStreamCall(streamchannel){ // it will call twitch APIs to get both streaming and channel information about that  specific channel.
	var logo,name,game,status,statusdesc,channel_link;

	var streamchannel_url=streamapi+streamchannel+"?callback=?";
	var channel_url=channelapi+streamchannel+"?callback=?";

  /**
   * call streaming channels API to see if it is streaming or not and if it is then it'll display who's streaming 
   */
	$.getJSON(streamchannel_url,function(data){
		if(data.status=='404'){ /* number used when something is unidentified or not found */
			game=data.message;
			status="offline";
			statusdesc="";
		}
		else if(data.status=='422'){ // When user is not available or have their account closed 
			game=data.message;
			status="offline";
			statusdesc="";
		}
		else{
			data=data.stream;
			if(data===null){ // Displays when the streamer is offline
				game="offline";
				status="offline";
				statusdesc="";
				logo="http://www.gravatar.com/avatar/3c069b221c94e08e84aafdefb3228346?s=47&d=http%3A%2F%2Fwww.techrepublic.com%2Fbundles%2Ftechrepubliccore%2Fimages%2Ficons%2Fstandard%2Ficon-user-default.png";
			}
			else{
				game=data.channel.game;
				status="online";
				statusdesc=":"+data.channel.status;
			}
		}
    /*
      Calls the channels api so that it will show the streamers info such as name, the logo etc...
    >> this is all displayed under */
    $.getJSON(channel_url,function(data){
			name=data.display_name;
			logo=data.logo;
    	channel_link=data.url;
    	if(data.status=='404'){ // if the channel isn't found 
    		name=streamchannel;
    		channel_link="#";
    		logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
    	}
    	else if(data.status=='422'){ /* if channel unavailable or closed their account */
    		name=streamchannel;
    		channel_link="#";
    		logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
    	}
    	else if(logo===null){ /* if channel does not have a logo then show the following logo */
       logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
			}

      /* prepare a row for the result in html */
			var result="\
			<div class='row' id='"+status+"'>\
				<div class='col-md-3 col-xs-4'>\
					<span class='logo'><img class='img img-circle' src='"+logo+"'></span>\
					<a href='"+channel_link+"'>\
						<span class='name text-center'>"+name+"</span>\
					</a>\
				</div>\
				<div class='col-md-9 col-xs-8 text-center' id='statusdescription'>\
					<span class='game'>"+game+"</span>\
					<span class='status'>"+statusdesc+"</span>\
				</div>\
			</div>";

			if(status=='offline')
		   $('.res').append(result);
	    else
    	$('.res').prepend(result);
		});
   });
};

$(document).ready(function(){
  /**
   * Calling allStreamCall function on every channel
   */
	channels.forEach(function(channel){
		allStreamCall(channel);
	});

  /**
   * Show all channels when clicked on All button
   */
  $('#all').click(function(){
  	var all=$('.res .row');
  	all.each(function(index){
  		$(this).css({'display':'block'});
  	});
  });

  /**
   * Show Only online streaming channels and hide the offline ones.
   */
  $('#online').click(function(){
  	var online=$('.res .row');
  	online.each(function(index){
  		var toggle=$(this).attr('id');
  		if(toggle=='online'){
  			$(this).css({'display':'block'});
  		}
  		else if(toggle=='offline'){
  			$(this).css({'display':'none'});
  		}
  	});
  });

  /**
   * Show Only offline channels
   */
  $('#offline').click(function(){
  	var offline=$('.res .row');
  	offline.each(function(index){
  		var toggle=$(this).attr('id');
  		if(toggle=='online'){
  			$(this).css({'display':'none'});
  		}
  		else if(toggle=='offline'){
  			$(this).css({'display':'block'});
  		}
  	});
  });

});
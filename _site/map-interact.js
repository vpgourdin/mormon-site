// Quick feature detection
function isTouchEnabled() {
	return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
}

$(function(){
	addEvent('st_1');addEvent('st_2');addEvent('st_3');addEvent('st_4');addEvent('st_5');addEvent('st_6');addEvent('st_7');addEvent('st_8');addEvent('st_9');addEvent('st_10');addEvent('st_11');addEvent('st_12');addEvent('st_13');addEvent('st_14');addEvent('st_15');addEvent('st_16');addEvent('st_17');addEvent('st_18');addEvent('st_19');addEvent('st_20');addEvent('st_21');addEvent('st_22');addEvent('st_23');addEvent('st_24');addEvent('st_25');addEvent('st_26');addEvent('st_27');addEvent('st_28');addEvent('st_29');addEvent('st_30');addEvent('st_31');addEvent('st_32');addEvent('st_33');addEvent('st_34');addEvent('st_35');addEvent('st_36');addEvent('st_37');addEvent('st_38');addEvent('st_39');addEvent('st_40');addEvent('st_41');addEvent('st_42');addEvent('st_43');addEvent('st_44');addEvent('st_45');addEvent('st_46');addEvent('st_47');addEvent('st_48');addEvent('st_49');addEvent('st_50');
})
$(function(){
	$('#lakes').find('path').attr({'fill':map_config['default']['lakesFill']}).css({'stroke':map_config['default']['lakesOutline']});
	$('#mapshadow').find('path').attr({'fill':map_config['default']['mapShadow']});
});

function addEvent(id,relationId){
	var _obj = $('#'+id);
	var _Textobj = $('#'+id+','+'#'+map_config[id]['iso']);

	$('#'+['text-abb']).attr({'fill':map_config['default']['namesColor']});

	_obj.attr({'fill':map_config[id]['upColor'],'stroke':map_config['default']['borderColor']});
	_Textobj.attr({'cursor':'default'});
	if(map_config[id]['enable'] == true){
		if (isTouchEnabled()) {
			//clicking effect
			_Textobj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip-us').outerWidth(), tiph=$('#map-tip-us').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':map_config[id]['downColor']});
				$('#map-tip-us').show().html(map_config[id]['hover']);
				$('#map-tip-us').css({left:x, top:y})
			})
			_Textobj.on('touchend', function(){
				$('#'+id).css({'fill':map_config[id]['upColor']});
				if(map_config[id]['target'] == 'new_window'){
					window.open(map_config[id]['url']);
				}else if(map_config[id]['target'] == 'same_window'){
					window.parent.location.href=map_config[id]['url'];
				}
			})
		}
		_Textobj.attr({'cursor':'pointer'});
		_Textobj.hover(function(){
			//moving in/out effect
			$('#map-tip-us').show().html(map_config[id]['hover']);
			_obj.css({'fill':map_config[id]['overColor']})
		},function(){
			$('#map-tip-us').hide();
			$('#'+id).css({'fill':map_config[id]['upColor']});
		})
		//clicking effect
		_Textobj.mousedown(function(){
			$('#'+id).css({'fill':map_config[id]['downColor']});
		})
		_Textobj.mouseup(function(){
			$('#'+id).css({'fill':map_config[id]['overColor']});
			if(map_config[id]['target'] == 'new_window'){
				window.open(map_config[id]['url']);
			}else if(map_config[id]['target'] == 'same_window'){
				window.parent.location.href=map_config[id]['url'];
			}
		})
		_Textobj.mousemove(function(e){
			var x=e.pageX+10, y=e.pageY+15;
			var tipw=$('#map-tip-us').outerWidth(), tiph=$('#map-tip-us').outerHeight(),
			x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
			y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
			$('#map-tip-us').css({left:x, top:y})
		})
	}
}


//The pins code
$(function(){
	if($('#pin-shadow').find('path').eq(0).attr('fill') != 'undefined'){
		var pinShadowOpacity = pins_config['default']['pinShadowOpacity'];
		var pinShadowOpacity = parseInt(pinShadowOpacity);
		if (pinShadowOpacity >=100){pinShadowOpacity = 1;}else if(pinShadowOpacity <=0){pinShadowOpacity =0;}else{pinShadowOpacity = pinShadowOpacity/100;}

		$('#pin-shadow').find('path').attr({'fill':pins_config['default']['pinShadow']}).css({'fill-opacity':pinShadowOpacity})
};


	var points_len = pins_config['points'].length;
	if( points_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("map_points");
		var svg_circle,svg_rect;
		for(var i=0;i<points_len;i++){
			if (pins_config['points'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", pins_config['points'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", pins_config['points'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", pins_config['points'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", pins_config['default']['pinShadow']);
				svg_circle.setAttributeNS(null, "style",'fill-opacity:'+pinShadowOpacity);
				svg_circle.setAttributeNS(null, "id",'map_points_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", pins_config['points'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", pins_config['points'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", pins_config['points'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", pins_config['points'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",pins_config['points'][i]['outline']);
				svg_circle.setAttributeNS(null, "stroke-width",pins_config['points'][i]['thickness']);
				svg_circle.setAttributeNS(null, "id",'map_points_'+i);
				tsvg_obj.appendChild(svg_circle);
				dynamicAddEvent(i);
			}
			else if(pins_config['points'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", pins_config['points'][i]['pos_X']- pins_config['points'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", pins_config['points'][i]['pos_Y']- pins_config['points'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", pins_config['points'][i]['width']);
				svg_rect.setAttributeNS(null, "height", pins_config['points'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", pins_config['default']['pinShadow']);
				svg_rect.setAttributeNS(null, "style",'fill-opacity:'+pinShadowOpacity);
				svg_rect.setAttributeNS(null, "id",'map_points_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", pins_config['points'][i]['pos_X']- pins_config['points'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", pins_config['points'][i]['pos_Y']- pins_config['points'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", pins_config['points'][i]['width']);
				svg_rect.setAttributeNS(null, "height", pins_config['points'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", pins_config['points'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",pins_config['points'][i]['outline']);
				svg_rect.setAttributeNS(null, "stroke-width",pins_config['points'][i]['thickness']);
				svg_rect.setAttributeNS(null, "id",'map_points_'+i);
				tsvg_obj.appendChild(svg_rect);
				dynamicAddEvent(i);
			}
		}
	}
});

function dynamicAddEvent(id){
	var obj = $('#map_points_'+id);

	if(pins_config['points'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip-us').outerWidth(), tiph=$('#map-tip-us').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':pins_config['points'][id]['downColor']});
				$('#map-tip-us').show().html(pins_config['points'][id]['hover']);
				$('#map-tip-us').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':pins_config['points'][id]['upColor']});
				if(pins_config['points'][id]['target'] == 'new_window'){
					window.open(pins_config['points'][id]['url']);
				}else if(pins_config['points'][id]['target'] == 'same_window'){
					window.parent.location.href=pins_config['points'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip-us').show().html(pins_config['points'][id]['hover']);
			obj.css({'fill':pins_config['points'][id]['overColor']})
		},function(){
			$('#map-tip-us').hide();
			obj.css({'fill':pins_config['points'][id]['upColor']});
		})
		//clicking effect
		obj.mousedown(function(){
			obj.css({'fill':pins_config['points'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':pins_config['points'][id]['overColor']});
			if(pins_config['points'][id]['target'] == 'new_window'){
				window.open(pins_config['points'][id]['url']);
			}else if(pins_config['points'][id]['target'] == 'same_window'){
				window.parent.location.href=pins_config['points'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip-us').outerWidth(), tiph=$('#map-tip-us').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip-us').css({left:x, top:y})
		})
	}
}

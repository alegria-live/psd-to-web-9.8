$(function(){
	var i = 0;
	$listImgLeft = $('#fourth-left-window img');
	$listImgRight = $('#fourth-right-window img');

	$($listImgLeft).each(function(index, element){
		$(element).attr('data-id-left', index);
	});
	$($listImgRight).each(function(index, element){
		$(element).attr('data-id-right', index);
	});

	function animAll(){

		if(i==3) {i=0}
		if(i < 0) {i=2}
				
		$($listImgLeft[i]).animate({
			opacity: 1
		}, 500);
		$($listImgRight[i]).animate({
			opacity :1
		}, 500);
		
	}
	intervalSlider = setInterval(function(){animAll();
		$($listImgLeft).css({'opacity': 0});
		$($listImgRight).css({'opacity': 0});
		i++}, 3000);

	$('#fourth-left, .fourth-camera').on('click', function(){
		$($listImgLeft).css({'opacity': 0});
		$($listImgRight).css({'opacity': 0});
		animAll();
		i++;
	});
		$('#fourth-right').on('click', function(){
		$($listImgLeft).css({'opacity': 0});
		$($listImgRight).css({'opacity': 0});
		animAll();
		i--;
	});
	
	$('#fourth-right, #fourth-left, .fourth-camera')
	.on('mouseover', function(){
		clearInterval(intervalSlider);
	});
	
	$('#fourth-right, #fourth-left, .fourth-camera')
	.mouseout(function() {intervalSlider = setInterval(function(){
		animAll();
		$($listImgLeft).css({'opacity': 0});
		$($listImgRight).css({'opacity': 0});
		i++},
		3000);
	});
});
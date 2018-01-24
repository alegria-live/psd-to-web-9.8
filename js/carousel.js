
$(function(){

	var imgList = $('.img-container img');
	var pointsList = $('#points li');
	var slideNumber = $('#slide-number');
	var slideTime = 300;
	var position, activeSlide;
	var interval = 2000;
	var imgListPositionLeft = -261;
	var imgListPositionRight = 261;
	var imgListPosition = imgListPositionLeft;

	var intervalSet = setInterval(slideLeft, interval);

	imgList.each(function(index, element){
		$(element).attr('data-id-img', index);
	});
	pointsList.each(function(index, element){
		$(element).attr('data-id-point', index);
	});

	imgList.css({'left':imgListPosition});
	$(imgList[0]).css({'left':0});

	activeSlide = $('img[style="left: 0px;"]').data('id-img');

	$(pointsList[activeSlide]).addClass('active');
	slideNumber.text('0'+ (activeSlide + 1) +'/05');

	function moveSlide(position, direction, next){
		if(activeSlide == next) {}
		else {
		$('.img-container img:not([style="left: 0px;"])').css({'left':position});
		$(imgList[activeSlide]).animate({"left":direction}, slideTime);
		$(imgList[next]).animate({"left": 0}, slideTime, afterMove);
		}
	}

	function afterMove(){
		$(imgList[activeSlide]).css({"left":position});
		activeSlide = $('img[style="left: 0px;"]').data('id-img');
		pointsList.removeClass('active');
		$(pointsList[activeSlide]).addClass('active');
		slideNumber.text('0'+ (activeSlide + 1) +'/05');
	}

	function slideRight() {
		position = imgListPositionLeft;
		direction = imgListPositionRight;
		if(activeSlide == 0){moveSlide(position, direction, 4);}
		else {
		moveSlide(position, direction, activeSlide -1);
		}
	}
	
	function slideLeft() {
		position = imgListPositionRight;
		direction = imgListPositionLeft;
		if(activeSlide == 4){moveSlide(position, direction, 0);}
		else {
			moveSlide(position, direction, activeSlide +1);
		}
	}

	function setMove(getCurrentId){
		if(activeSlide < getCurrentId) {
			position = imgListPositionRight;
			direction = imgListPositionLeft;
		}
		else {
		position =  imgListPositionLeft;
		direction = imgListPositionRight;
		}
		moveSlide(position, direction, getCurrentId);
	}

	$('#right, #left, #points')
	.on('mouseover', function(){
		clearInterval(intervalSet);
	});
	
	$('#right, #left, #points')
	.mouseout(function() {
		intervalSet = setInterval(slideLeft, interval);
	});
	
	$('#right').click(slideRight);
	$('#left').click(slideLeft);
	
	$('#points li').on('click', function(e){
		var currentId = $(this).data('id-point');
		setMove(currentId);
	});
});

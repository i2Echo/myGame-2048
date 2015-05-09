// JavaScript Document
function showNumberAnimation( i, j, randNumber){

	var numberCell = $("#number-cell-"+i+"-"+j);
	
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.text(textView(randNumber));
	numberCell.animate({
		width:cellSide,
		height:cellSide,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	
	var numberCell = $("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}


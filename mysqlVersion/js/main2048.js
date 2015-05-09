// JavaScript Document
var board = new Array();//放数字
var score = 0;//分数
var hasAdd = new Array();//看是否已经叠加

//for mobile touchEvent
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

//设备自适应处理
function prepareForMobile(){

	if(documentWidth > 500){
		gridWidth = 500;
		cellSpace = 20;
		cellSide = 100;
	}

	$('#grid').css('width',gridWidth-2*cellSpace);
	$('#grid').css('height',gridWidth-2*cellSpace);
	$('#grid').css('padding',cellSpace);
	$('#grid').css('border-radius',0.02*gridWidth);

	$('.grid-cell').css('width',cellSide);
	$('.grid-cell').css('height',cellSide);
	$('.grid-cell').css('border-radius',0.02*cellSide);
}

function newgame(){
	//初始化格子
	init();
	//随机两个格子赋2或4
	getNewNumber();
	getNewNumber();
}

function init(){
	//遍历棋盘格定位
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
		
		var gridCell = $("#grid-cell-"+i+"-"+j);
		gridCell.css('top',getPosTop(i,j));
		gridCell.css('left',getPosLeft(i,j));
		}
	for(var i=0;i<4;i++){
		board[i] = new Array();
		hasAdd[i] = new Array();
		for(var j=0;j<4;j++)
			board[i][j] = 0;
			hasAdd[i][j] = false;
	}	
	updateBoardView();
	score = 0;
	updateScore(score);
}

function updateBoardView(){
	$(".number-cell").remove();	
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			hasAdd[i][j] = false;
			$("#grid").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numberCell = $("#number-cell-"+i+"-"+j);
			
			if(board[i][j]==0){
				numberCell.css('width','0px');
				numberCell.css('height','0px');
				numberCell.css('top',getPosTop(i,j)+cellSide/2);
				numberCell.css('left',getPosLeft(i,j)+cellSide/2);
			}
			else{
				numberCell.css('width',cellSide);
				numberCell.css('height',cellSide);
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				//numberCell.css = ('color',getNumberColor(board[i][j]));
				numberCell.text(textView(board[i][j]));
			}
		}
	$('.number-cell').css('line-height',cellSide+'px');
    $('.number-cell').css('font-size',0.3*cellSide+'px');
}

function getNewNumber(){
	if(noSpace(board))
		return false;
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	var times = 50;
	while(times){
		if(board[randx][randy]==0)
			break;
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		times--;
	}
	if(!times)
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
	//随机一个数
	var randNumber = Math.random()>0.5 ? 2:4;
	//随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberAnimation(randx,randy,randNumber);
	
	return true;
}

$(document).keydown(function(event){
	event.preventDefault();
	switch(event.keyCode){
		case 37: //left
			if(moveLeft()){
				setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38: //up
			if(moveUp()){
				setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39: //right
			if(moveRight()){
				setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40: //down
			if(moveDown()){
				setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		default:
			break;
	}
});

//touchEvent
document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){	
		event.preventDefault();//消除滑动事件默认效果（消除屏幕滚动）
	
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var dx = endx - startx;
	var dy = endy - starty;

	if(Math.abs(dx) < 0.1*documentWidth && Math.abs(dy) < 0.1*documentWidth)
		return;

	if( Math.abs( dx ) >= Math.abs( dy ) ){

        if( dx > 0 ){
            //move right
            if( moveRight() ){
                setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
            }
        }
        else{
            //move left
            if( moveLeft() ){
                setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
            }
        }
    }
    else{
        if( dy > 0 ){
            //move down
            if( moveDown() ){
                setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
            }
        }
        else{
            //move up
            if( moveUp() ){
                setTimeout("getNewNumber()",210);
				setTimeout("isGameOver()",300);
            }
        }
    }
})

function updateScore(score){
	$("#score").text(score);	
}

function isGameOver(){
	if(noSpace(board)&&noMove(board))
		gameOver();
}

function gameOver(){
	//newgame();
	window.location.href="#gameOverPage";
	$("#allScore").text(score);

	$.ajax({     
	    url:'php/updateList.php',     
	    type:'post',     
	    data:'data='+score,  
	    async : false, //默认为true 异步     
	    error:function(){     
	       alert('error');     
	    },     
	    success:function(data){     
	      // alert("Data: " + data + "\nStatus: " + status);     
	    }  
	});  

}

function moveLeft(){
	
	if(!canMoveLeft(board)){
		return false;
	}
	
	//moveLeft
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0)
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&(!hasAdd[i][k])){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j] = 0;
						hasAdd[i][k] = true;
						score += board[i][k];
						updateScore(score);
						continue;
					}
				}
		}
	setTimeout("updateBoardView()",200);	
	return true;
}

function moveUp(){
	
	if(!canMoveUp(board)){
		return false;
	}
	
	//moveUp
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[j][i]!=0)
				for(var k=0;k<j;k++){
					if(board[k][i]==0&&noBlockVertical(i,k,j,board)){
						//move
						showMoveAnimation(j,i,k,i);
						board[k][i]=board[j][i];
						board[j][i] = 0;
						continue;
					}
					else if(board[k][i]==board[j][i]&&noBlockVertical(i,k,j,board)&&(!hasAdd[k][i])){
						//move
						showMoveAnimation(j,i,k,i);
						//add
						board[k][i]+=board[j][i];
						board[j][i] = 0;
						hasAdd[k][i] = true;
						score += board[k][i];
						updateScore(score);
						continue;
					}
				}
		}
	setTimeout("updateBoardView()",200);	
	return true;
}

function moveRight(){
	
	if(!canMoveRight(board)){
		return false;
	}
	
	//moveRight
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0)
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&(!hasAdd[i][k])){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j] = 0;
						hasAdd[i][k] = true;
						score += board[i][k];
						updateScore(score);
						continue;
					}
				}
		}
	setTimeout("updateBoardView()",200);	
	return true;
}

function moveDown(){
	
	if(!canMoveDown(board)){
		return false;
	}
	
	//moveDown
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[j][i]!=0)
				for(var k=3;k>j;k--){
					if(board[k][i]==0&&noBlockVertical(i,j,k,board)){
						//move
						showMoveAnimation(j,i,k,i);
						board[k][i]=board[j][i];
						board[j][i] = 0;
						continue;
					}
					else if(board[k][i]==board[j][i]&&noBlockVertical(i,j,k,board)&&(!hasAdd[k][i])){
						//move
						showMoveAnimation(j,i,k,i);
						//add
						board[k][i]+=board[j][i];
						board[j][i] = 0;
						hasAdd[k][i] = true;
						score += board[k][i];
						updateScore(score);
						continue;
					}
				}
		}
	setTimeout("updateBoardView()",200);	
	return true;
}

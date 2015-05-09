// JavaScript Document

documentWidth = window.screen.availWidth < window.screen.availHeight ? 
				window.screen.availWidth : window.screen.availHeight;
gridWidth = 0.92 * documentWidth;
cellSide = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;

function getPosTop( i , j ){
	return cellSpace + i*(cellSpace + cellSide);
}

function getPosLeft( i , j ){
	return cellSpace + j*(cellSpace + cellSide);
}
function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";   break;
        case 4:return "#ede0c8";   break;
        case 8:return "#f2b179";   break;
        case 16:return "#f59563";  break;
        case 32:return "#f67c5f";  break;
        case 64:return "#f65e3b";  break;
        case 128:return "#edcf72"; break;
        case 256:return "#edcc61"; break;
        case 512:return "#9c0";    break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";   break;
        case 4096:return "#a6c";   break;
        case 8192:return "#93c";   break;
    }

    return "black";
}

function noSpace( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}

function canMoveLeft(board){
	
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0)
				if(board[i][j]==board[i][j-1]||board[i][j-1]==0)
					return true;
		}
	return false;
}

function canMoveUp(board){
	
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[j][i]!=0)
				if(board[j][i]==board[j-1][i]||board[j-1][i]==0)
					return true;
		}
	return false;
}

function canMoveRight(board){
	
	for(var i=0;i<4;i++)
		for(var j=0;j<3;j++){
			if(board[i][j]!=0)
				if(board[i][j]==board[i][j+1]||board[i][j+1]==0)
					return true;
		}
	return false;
}

function canMoveDown(board){
	
	for(var i=0;i<4;i++)
		for(var j=0;j<3;j++){
			if(board[j][i]!=0)
				if(board[j][i]==board[j+1][i]||board[j+1][i]==0)
					return true;
		}
	return false;
}

function noBlockHorizontal(row,col1,col2,board){

	for(var i=col1+1;i<col2;i++)
		if(board[row][i]!=0)
			return false;
	return true;
}

function noBlockVertical(col,row1,row2,board){

	for(var i=row1+1;i<row2;i++)
		if(board[i][col]!=0)
			return false;
	return true;
}

function noMove(board){
	if(canMoveLeft(board)||
	   canMoveUp(board)||
	   canMoveRight(board)||
	   canMoveDown(board))
		return false;
	return true;
}

function textView(textNumber){
	 switch(textNumber){
        case 2:return "小白";break;
        case 4:return "菜鸟";break;
        case 8:return "大虾";break;
        case 16:return "牛人";break;
        case 32:return "大牛";break;
        case 64:return "专家";break;
        case 128:return "学者";break;
        case 256:return "大师";break;
        case 512:return "科学家";break;
        case 1024:return "大家";break;
        case 2048:return "大哲";break;
		case 4096:return "上帝";break;
    }
	
}
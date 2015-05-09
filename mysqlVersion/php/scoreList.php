<?php
	$con = mysql_connect("localhost","root","root");
	if (!$con){
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("test", $con);

	$result = mysql_query("SELECT * FROM `scorelist` ORDER BY `score` DESC") or die(mysql_error());
	//mysql_query("SELECT * FROM scoreList ORDER BY score DESC");这个查询语句可能有的服务器不支持
	
	$scoreData = array();
	$i = 0;
	while($row = mysql_fetch_array($result)){
		$scoreData[$i] = $row['score'];
		$i++;
	}

	$reStr = implode(",",$scoreData);
	echo $reStr;
?>
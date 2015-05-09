<?php
	$score = $_POST['data'];
	$score = intval($score);
	
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
	$flag = array(0,0,0);
	if($score > $scoreData[2])
		if($score!=$scoreData[0]&&$score!=$scoreData[1]){
			if($score>$scoreData[0]){
				$scoreData[2] = $scoreData[1];
				$flag[2] = 1;
				$scoreData[1] = $scoreData[0];
				$flag[1] = 1;
				$scoreData[0] = $score;
				$flag[0] = 1;

			}
			elseif ($score>$scoreData[1]) {
					$scoreData[2] = $scoreData[1];
					$flag[2] = 1;
					$scoreData[1] = $score;
					$flag[1] = 1;
				}	
				else {
					$scoreData[2] = $score;
					$flag[2] = 1;
				}
		}

	for ($i=0; $i < 3; $i++) {
		if($flag[$i]){
			mysql_query("UPDATE scoreList SET score=$scoreData[$i] WHERE id=$i+1");
			$flag[$i] = 0;
		}
	}
	//echo "ok";
?>
<?php
	$xmldoc=new DOMDocument('1.0');
	$score = $_POST['data'];
	$score = intval($score);
	$xmldoc->load('score.xml');
	$elem = $xmldoc->getElementsByTagName('score')->item(0);

	$firstScore = intval($elem->getElementsByTagName('first')->item(0)->nodeValue);
	$secondScore = intval($elem->getElementsByTagName('second')->item(0)->nodeValue);
	$thirdScore = intval($elem->getElementsByTagName('third')->item(0)->nodeValue);

	if($score!=$firstScore&&$score!=$secondScore&&$score!=$thirdScore&&$score>$thirdScore){
		if($score>$firstScore){
			$thirdScore = $secondScore;
			$secondScore = $firstScore;
			$firstScore = $score;
		}
		elseif ($score>$secondScore) {
				$thirdScore = $secondScore;
				$secondScore = $score;
			}	
			else
				$thirdScore = $score;
	}
	$elem->getElementsByTagName('first')->item(0)->nodeValue = $firstScore;
	$elem->getElementsByTagName('second')->item(0)->nodeValue = $secondScore;
	$elem->getElementsByTagName('third')->item(0)->nodeValue = $thirdScore;
	if($xmldoc->save("score.xml"))
		$message="修改成功";
	else
		$message="修改失败";
	//echo $message;
?>
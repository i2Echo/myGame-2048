<?php
	$xmldoc=new DOMDocument('1.0');
	$xmldoc->load('score.xml');
	$elem = $xmldoc->getElementsByTagName('score')->item(0);

	$firstScore = $elem->getElementsByTagName('first')->item(0)->nodeValue;
	$secondScore = $elem->getElementsByTagName('second')->item(0)->nodeValue;
	$thirdScore = $elem->getElementsByTagName('third')->item(0)->nodeValue;

	$reStr = $firstScore.",".$secondScore.",".$thirdScore;
	echo $reStr;
?>
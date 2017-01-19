<?php

    // memo
    // http://on-ze.com/archives/5062
    // http://qiita.com/katzueno/items/b80d76d86314f62e53bc
    // http://stackoverflow.com/questions/4540068/php-simplexml-parse-error

    function utf8_for_xml($string){
        // return preg_replace ('/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u', ' ', $string);
         return preg_replace('/[\x00-\x1f]/','',$string);
    }

    // RSS読み込み
    $url = "http://heimusu.hatenablog.com/rss";
    $xmlFile = file_get_contents($url);
    $xml = utf8_for_xml($xmlFile);
    $xmlObject = simplexml_load_string($xml);

    // XMLからJSONにつめつめ
    for($i = 0; $i < 4; $i++){
        $entryList[$i]['title'] = (string)$xmlObject->channel->item[$i]->title;
        $entryList[$i]['link'] = (string)$xmlObject->channel->item[$i]->link;
        $entryList[$i]['description'] = strip_tags((string)$xmlObject->channel->item[$i]->description);
    }

    // JSONで出力
    header('Content-Type: application/json');
    echo json_encode( $entryList );
    // echo json_encode( compact('entryList') );

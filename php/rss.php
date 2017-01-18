<?php

    // memo
    // http://on-ze.com/archives/5062
    
    $url = "http://heimusu.hatenablog.com/rss";
    $xml = file_get_contents($url);
    header("Content-type: application/xml; charset=UTF-8");
    print $xml;

    // ライブラリの読み込み
    // require_once ($_SERVER['DOCUMENT_ROOT'] . './feed.php');
    // require_once ('feed.php');
    //
    // $url = 'http://heimusu.hatenablog.com/rss';
    // // $url = 'http://www.lesson5.info/?feed=rss2';
    // $feed = new Feed;
    // $rss = $feed->loadRss($url);

    // echo 'Title: ', $rss->title;
    // echo 'Description: ', $rss->description;
    // echo 'Link: ', $rss->link;
  // キャッシュの設定
  // Feed::$cacheDir = $_SERVER['DOCUMENT_ROOT'] . '/temp';
  // Feed::$cacheExpire = '1 hours';
  //
  // // HTML表示用
  // $html = '' ;
  //
  // // 取得するフィードのURLを指定
  // $urls = array(
  //   "http://www.lesson5.info/?feed=rss2",
  //   "http://www.lesson5.info/?feed=rss2",
  //   "http://www.lesson5.info/?feed=rss2",
  //   "http://www.lesson5.info/?feed=rss2",
  //   "http://www.lesson5.info/?feed=rss2",
  //   "http://www.lesson5.info/?feed=rss2"
  // );
  //
  // // 各rssをまとめた配列
  // $entrylist = array();
  //
  // // RSSごとに1エントリづつ抽出
  // for ($i = 0; $i < count($urls); $i++) {
  //     $url = $urls[$i];
  //
  //     // インスタンスの作成
  //     $feed = new Feed ;
  //
  //     // RSSを読み込む
  //     $rss = Feed::loadRss($url);
  //
  //     for ($entry = 0; $entry < 1; $entry++) {
  //       $sitename = $rss->title ;
  //       $sitelink = $rss->link ;
  //       $item = $rss->item[$entry];
  //       // 各エントリーの処理
  //       $title = $item->title ;
  //       $link = $item->link ;
  //       $timestamp = strtotime( $item->pubDate ) ;
  //       // 配列に
  //       $entrylist[$i]['sitename'] = $sitename;
  //       $entrylist[$i]['sitelink'] = $sitelink;
  //       $entrylist[$i]['title'] = $title;
  //       $entrylist[$i]['link'] = $link;
  //       $entrylist[$i]['timestamp'] = $timestamp;
  //     }
  // }
  //
  // // 日付でソート
  // foreach ((array)$entrylist as $key => $value) {
  //   $sort[$key] = $value['timestamp'];
  // }
  // array_multisort($sort, SORT_DESC, $entrylist);
  //
  // // JSONを返す
  // echo json_encode($entrylist);
  // exit;

?>

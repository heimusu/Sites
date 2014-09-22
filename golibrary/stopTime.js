/*残り時間をカウントする*/
function countDown(){
    var lefthour=0;
	var leftminute=0;
	var nowtime = new Date();
	var nowHour = hour2;//nowtime.getHours();
	var nowMinute = minute2;//nowtime.getMinute();;
	var nexthour=0;
	var nextminute=0;
	var a_day = 24 * 60 * 60 * 1000;
	/*バスが一時間以内にくる場合*/
	if(flag1 == 1){
	/*同じ時間帯にバスが来る（例：現在8時，次のバスは8時台）の場合*/
	    if(flag2 == 1){
		    lefthour = 0;
			leftminute = res2 - minute2;
		}
		else if(res1 - hour2 == 2){
		    lefthour = 1;
			leftminute = res2 + 60 - minute2;
			if(minute2 <= res2){
		        lefthour = 2;
				leftminute = res2 - minute2;
			}
		}
		else if(hour2 < res1){
		    lefthour = res1 - hour2;
			leftminute = res2 - minute2;
			if(minute2 > res2){
				lefthour -= 1;
				leftminute += 60;
			}
		}
		/*次の時間帯にバスが来る（例：現在8時台，次のバスは9時台）の場合*/
		else{
			if((res2 - minute2) < 0){
			lefthour = 0;
			leftminute = res2 + 60 - minute2;
			if(hour2 < starthour || hour2 != res1){
				lefthour = res1 - hour2;
				if(minute2 > res2){
				lefthour = 0;
				}
			}
			}
			else{
			    lefthour = res1 - hour2;
				leftminute = res2 - minute2;
			}
		}
	}
	/*次のバスまで一時間以上ある場合*/
	else if(flag3 == 1){
	    tmp = res3 - hour2;
		lefthour = 1;
		leftminute = res4 - minute2;
		if(minute2 > res4){
		    lefthour = 0;
			leftminute = res4 + 60 - minute2;
			if(tmp != 1){
				lefthour = 1;
			}
		}
	}
	/*次のバスまで2時間以上ある場合*/
	else if(flag4 == 1){
	    lefthour = 2;
		leftminute = res2 - minute2;
	}
	
    /*バスが来る場合，残り時間を表示*/
	if(lefthour != 0 || leftminute != 0 && leftminute > 0){
		$("#time").html("発車まで残り"+ lefthour + "時間" + leftminute + "分");
		setTimeout('countDown()',1000);
	}
			    
    /*バスが来ない場合，メッセージを表示*/
	else{
		$("#time").html("しばらくお待ちください");
		setTimeout('countDown()',1000);
	}
}

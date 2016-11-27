/*残り時間をカウントする*/
function countDown(){
    $.extend(this,init);
    var lefthour=0;
	var leftminute=0;
	var nowtime = new Date();
	var nexthour=0;
	var nextminute=0;
	var a_day = 24 * 60 * 60 * 1000;
	/*バスが一時間以内にくる場合*/
	if(this.flag1 == 1){
	/*同じ時間帯にバスが来る（例：現在8時，次のバスは8時台）の場合*/
	    if(this.flag2 == 1){
		    lefthour = 0;
			leftminute = this.res2 - this.minute2;
		}
		else if(this.res1 - this.hour2 == 2){
		    lefthour = 1;
			leftminute = this.res2 + 60 - this.minute2;
			if(this.minute2 <= this.res2){
		        lefthour = 2;
				leftminute = res2 - minute2;
			}
		}
		else if(this.hour2 < this.res1){
		    lefthour = this.res1 - this.hour2;
			leftminute = this.res2 - this.minute2;
			if(this.minute2 > this.res2){
				lefthour -= 1;
				leftminute += 60;
			}
		}
		/*次の時間帯にバスが来る（例：現在8時台，次のバスは9時台）の場合*/
		else{
			if((this.res2 - this.minute2) < 0){
			lefthour = 0;
			leftminute = this.res2 + 60 - this.minute2;
			if(this.hour2 < starthour || this.hour2 != this.res1){
				lefthour = this.res1 - this.hour2;
				if(this.minute2 > this.res2){
				lefthour = 0;
				}
			}
			}
			else{
			    lefthour = this.res1 - this.hour2;
				leftminute = this.res2 - this.minute2;
			}
		}
	}
	/*次のバスまで一時間以上ある場合*/
	else if(this.flag3 == 1){
	    this.tmp = this.res3 - this.hour2;
		lefthour = 1;
		leftminute = this.res4 - this.minute2;
		if(minute2 > res4){
		    lefthour = 0;
			leftminute = this.res4 + 60 - this.minute2;
			if(this.tmp != 1){
				lefthour = 1;
			}
		}
	}
	/*次のバスまで2時間以上ある場合*/
	else if(this.flag4 == 1){
	    lefthour = 2;
		leftminute = this.res2 - this.minute2;
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

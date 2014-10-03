//初期変数
init = {
    hour1 : 0,
	minute1 : 0,
	hour2 : 0,
	minute2 : 0,
	comp1 : 0,
	res1 : 0,
    res2 : 0,
	res3 : 0,
	res4 : 0,
	DD : new Date(),
	flag1 : 0,
	flag2 : 0,
	flag3 : 0,
	flag4 : 0,
	flag5 : 0,
	flag6 : 0,
	flag7 : 0,
	tmp : 0,
	hash : location.hash.substring(1)
};



//時刻表・バス時刻サジェスト
$(function(){
	$.ajax({
		url:'http://tutujibus.com/timetableLookup.php?rosenid=1&callback=?',
		type:'GET',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(data){
            $.extend(this,init);
			/*時刻表描画用変数*/
			var length = data.timetable.length;
			var table;
			var row_no=1;
			
			/*到着時刻表示用変数*/
			var k = 0;
			var l = 0;
			var bustime = new Array();
			var bin_num = new Array();
			var arriveTime;
			
            /*現在時刻の取得*/
			this.hour2 = this.DD.getHours();
			this.minute2 = this.DD.getMinutes();
            
            //debug
            this.hour2 = 8;
            this.minute2 = 30;
			

			/*時刻表を出力*/
			for(var i=0;i<length;i++){
			    var arraylistlength = data.timetable[i].list.length;
			    for(var j=0;j<arraylistlength;j++){
				    if(data.timetable[i].list[j].busstopid == this.hash){
					    /*indicate table*/
					    table = document.getElementById("table1");
					    var row = table.insertRow(-1);
					    var cell = row.insertCell(-1);
					    cell.appendChild(document.createTextNode(data.timetable[i].destination));
					    cell = row.insertCell(-1);
					    cell.appendChild(document.createTextNode(data.timetable[i].list[j].time));
					    row_no++;
					    bustime[k] = data.timetable[i].list[j].time;
					    bin_num[k] = Number(data.timetable[i].binid);
					    tmp = bustime[k];
					    k++;
				    }
			    }
			}

			/*次のバスの発車時刻を表示*/
			/*hour2 & minute2 = 現在時刻, hour1&minute1 = 次のバスの発車時刻*/
			var starthour = Number(bustime[0][0] + bustime[0][1]);
			var lasthour = Number(bustime[k-1][0] + bustime[k-1][1]);
			for(i=0;i<k;i++){
			    this.hour1 = Number(bustime[i][0] + bustime[i][1]);
			    this.minute1 = Number(bustime[i][3] + bustime[i][4]);
			    this.comp1 = this.hour1 - this.hour2;
			    /*始発より早い段階で閲覧した場合*/
			    if(this.hour2 < starthour){
				    this.res1 = starthour;
				    this.res2 = Number(bustime[0][3] + bustime[0][4]);
				    this.flag1 = 1;
			    }
			    /*終発より後の段階で閲覧した場合*/
			    else if(this.hour2 > lasthour){
				    this.flag5 = 1;
			    }
			    /*バスが一時間以内にくる場合*/
			    else if(this.comp1 == 0 && this.flag1 == 0 && this.flag5 == 0){
				    /*次の時間帯に来る（例：8時現在，次のバスは9時台)場合*/
				    if(this.minute2 > this.minute1 && i != k-1 || this.minute2 == this.minute1 && i != k-1){
				        this.res1 = Number(bustime[i+1][0] + bustime[i+1][1]);
				        this.res2 = Number(bustime[i+1][3] + bustime[i+1][4]);
				        if(this.minute2 == this.minute1){
					        this.res3 = this.res1;
					        this.res4 = this.res2;
					        this.flag3 = 1;
				        }
				        else if(this.minute2 > this.minute1 && this.res1 == this.hour2){
					        this.res2 = Number(bustime[i][3] + bustime[i][4]);
				        }
				        else{
					        this.flag1 = 1;
				        }
				    
				    }
				    /*次のバスがもう無い場合*/
				    else if(i == k-1){
				        if(this.minute2 <this. minute1){
					        this.res1 = lasthour;
					        this.res2 = Number(bustime[k-1][3] + bustime[k-1][4]);
					        this.flag1 = 1;
				        }
				        else{
					        this.flag5 = 1;
				        }
				    }
				
                    /*次のバス（例：8時現在，次のバスは8時台）が来る場合*/
				    else{
				        this.res1 = this.hour1;
				        this.res2 = this.minute1;
				        this.flag1 = 1;
				        this.flag2 = 1;
				    }
			    }
			    /*バスが来るまで一時間以上ある場合*/
			    else if(this.comp1 == 1 && this.flag1 == 0 && this.flag2 == 0 && this.flag3 == 0 && this.flag5 == 0){
				    this.res3 = Number(bustime[i][0] + bustime[i][1]);
				    this.res4 = Number(bustime[i][3] + bustime[i][4]);
				    this.flag3 = 1;
			    }
			    /*バスが来るまで二時間以上ある場合*/
			    else if(this.comp1 == 2 && this.flag1 == 0 && this.flag2 == 0 && this.flag3 == 0 && this.flag4 == 0 && this.flag5 == 0){
				    this.res3 = Number(bustime[i+2][0] + bustime[i+2][1]);
				    this.res4 = Number(bustime[i+2][3] + bustime[i+2][4]);
				    this.flag4 = 1;
			    }
			}
			/*バスが来ない場合*/
			if(this.flag1 == 0 && this.flag2 == 0 && this.flag3 == 0 && this.flag4 == 0){
			    this.flag5 = 1;
			}

			/*フラグを基に表示する時刻を判定*/
			/*次のバスが1時間以内にくる場合*/
			if(this.flag1 == 1 && this.flag3 == 0 || this.flag2 == 1 && this.res2 >= 0){
			    $("#message").html("次のバスは"+this.res1+"時"+this.res2+"分発車です");
			    this.flag6 = 1;
			}
			/*次のバスまで1時間以上ある場合*/
			else if(this.flag3 == 1 && this.res3 >= 0 && this.res4 >= 0){
			    $("#message").html("次のバスは" + this.res3 + "時" + this.res4 + "分発車です");
			    this.flag7 = 1;
			}
			/*次のバスまで2時間以上ある場合*/
			else if(this.flag4 == 1 && this.res3 >= 0 && this.res4 >= 0){
			    $("#message").html("次のバスは" + this.res3 + "時" + this.res4 + "分発車です");
			    this.flag7= 1;
			}
			/*バスがもう無い場合*/
			else if(this.res3 < 0 || this.flag5 == 1){
			    $("#message").html("バスはしばらくこないようです");
			}
			//乗車したバスの便番号を取得
			var checkbin = 0; //取得した発車時刻が他の便の図書館到着と一致するケースがあるため，誤検出を防ぐ
            //hitNum = 該当した便番号
			for(i=0;i<length;i++){
			    arraylistlength = data.timetable[i].list.length;
			    for(j=0;j<arraylistlength;j++){
                    //次のバスが1時間以内に来る場合 <- 1時間に2本くる場合，先に来る便しか取得できない！
				    if(this.flag6 == 1){
				        var tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				        var tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				        if(this.res1 == tmpHour && this.res2 == tmpMinute && checkbin == 0){
					        var hitNum = Number(data.timetable[i].binid);
					        checkbin = 1;
				        }
                        else if(checkbin === 1){
                            console.log('hoge');
                        }
				    }
                    //次のバスまで1時間以上ある場合
				    else if(this.flag7 == 1){
				        var tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				        var tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				        if(this.res3 == tmpHour && this.res4 == tmpMinute && checkbin == 0){
					        var hitNum = Number(data.timetable[i].binid);
					        checkbin = 1;
				        }
				    }
			    }
			}
			
            var hitflag = 0;
            console.log(hitNum);
			//該当便の時刻表を取得し，図書館にいつ着くのかを調べる
            //便番号の取得状態では，エラーを発生させる可能性がある(未修正)(便番号1,2) <- 便番号取得がおかしい
            //時間をまたぐと正しく動作しない？
			for(i=0;i<length;i++){
			    arraylistlength = data.timetable[i].list.length;
			    for(j=0;j<arraylistlength;j++){
                    //時刻表総当り
				    var tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				    var tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				    //図書館のバス停1つ目
				    if(data.timetable[i].binid == hitNum && data.timetable[i].list[j].busstopid == 20){
				        arriveTime = data.timetable[i].list[j].time;
				        $('#arrivetime').html(arriveTime + "に図書館に到着します");
				        hitflag = 1;
				        tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				        tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				        //乗車するバス停の，乗車した便によって図書館へ行かない場合がある
				        if(this.res2 > tmpMinute || this.res1 > tmpHour && this.res2 < tmpMinute){
					        $('#arrivetime').html("このバスは図書館へは参りません");
					        hitflag = 0;
				        }
				        else if(this.res4 > tmpMinute || this.res3 > tmpHour && this.res4 < tmpMinute){
					        $('#arrivetime').html("このバスは図書館へは参りません");
					        hitflag = 0;
				        }
				    }
				    //図書館のバス停2つ目
				    else if(data.timetable[i].binid == hitNum && data.timetable[i].list[j].busstopid == 28){
				        arriveTime = data.timetable[i].list[j].time;
				        $('#arrivetime').html(arriveTime + "に図書館に到着します");
				        hitflag = 1;
				        var tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				        var tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				        //乗車するバス停の，乗車した便によって図書館へ行かない場合がある
				        if(this.res2 > tmpMinute || this.res1 > tmpHour && this.res2 < tmpMinute){
					        $('#arrivetime').html("このバスは図書館へは参りません");
					        hitflag = 0;
				        }
				        else if(this.res4 > tmpMinute || this.res3 > tmpHour && this.res4 < tmpMinute){
					        $('#arrivetime').html("このバスは図書館へは参りません");
					        hitflag = 0;
				        }
				    }
			    }
		    }

            tmpHour = Number(arriveTime[0] + arriveTime[1]);
            tmpMinute = Number(arriveTime[3] + arriveTime[4]);

			if(hitflag == 0){
			    $('#arrivetime').html("このバスは図書館へは参りません");
			}
            
            //バスが次の時間にくる場合（時間をまたぐ場合）の処理
            if((this.res1 + 1) === tmpHour && this.res2 > tmpMinute && this.flag5 != 1){
                $('#arrivetime').html(tmpHour + '時' + tmpMinute + '分に図書館に到着します');
                hitflag = 1;
            }

			if(this.hash == 20 || this.hash == 28 || this.flag5 == 1){
			    $('#arrivetime').html(" ");
			}

            //図書館から帰りのバスを表示させる
            if(this.hash != 20 && this.hash != 28 && checkbin === 1 && hitNum != null && hitflag != 0){
                leaveNextBus(data,hitNum);
            }
            //変数の更新と，次のバスが来るまでの時間を計る関数を呼び出す
            $.extend(init,this);
            countDown();
        },

        //通信エラー時
		error:function(){
		    alert("Access NG");
		}
	});
});

$(function(){
	$.ajax({
		url:'http://tutujibus.com/timetableLookup.php?rosenid=1&callback=?',
		type:'GET',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(data){
            $(function(){
			/*table variable*/
			var length = data.timetable.length;
			var table;
			var row_no=1;
			
			/*time variable*/
			var hour1;
			var minute1;
			var hour2;
			var minute2;
			var comp1;
			var res1=0;
			var res2=0;
			var res3=0;
			var res4=0;
			var DD = new Date();
			var flag1 = 0;
			var flag2 = 0;
			var flag3 = 0;
			var flag4 = 0;
			var flag5 = 0;
			var flag6 = 0;
			var flag7 = 0;
			var tmp;
			var hash = location.hash;
			hash = hash.substring(1);
			//console.log(hash);
			/*busstop time array*/
			var k = 0;
			var l = 0;
			var bustime = new Array();
			var bin_num = new Array();
			var arriveTime;
			/*nowtime*/
			hour2 = DD.getHours();
			minute2 = DD.getMinutes();
			

			/*main function*/
			for(var i=0;i<length;i++){
			    var arraylistlength = data.timetable[i].list.length;
			    for(var j=0;j<arraylistlength;j++){
				if(data.timetable[i].list[j].busstopid == hash){
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

			/*debug code*/
			/*hour2 = 16;
			minute2 = 55;*/

			/*indicate next time*/
			/*hour2 & minute2 = nowtime, hour1&minute1 = next time*/
			starthour = Number(bustime[0][0] + bustime[0][1]);
			lasthour = Number(bustime[k-1][0] + bustime[k-1][1]);
			//console.log(starthour,lasthour);
			for(i=0;i<k;i++){
			    hour1 = Number(bustime[i][0] + bustime[i][1]);
			    minute1 = Number(bustime[i][3] + bustime[i][4]);
			    comp1 = hour1 - hour2;
			    /*始発より早い段階で閲覧した場合*/
			    if(hour2 < starthour){
				res1 = starthour;
				res2 = Number(bustime[0][3] + bustime[0][4]);
				flag1 = 1;
			    }
			    /*終発より後の段階で閲覧した場合*/
			    else if(hour2 > lasthour){
				flag5 = 1;
			    }
			    /*バスが一時間以内にくる場合*/
			    else if(comp1 == 0 && flag1 == 0 && flag5 == 0){
				/*次の時間帯に来る（例：8時現在，次のバスは9時台)場合*/
				if(minute2 > minute1 && i != k-1 || minute2 == minute1 && i != k-1){
				    res1 = Number(bustime[i+1][0] + bustime[i+1][1]);
				    res2 = Number(bustime[i+1][3] + bustime[i+1][4]);
				    if(minute2 == minute1){
					res3 = res1;
					res4 = res2;
					flag3 = 1;
				    }
				    else if(minute2 > minute1 && res1 == hour2){
					res2 = Number(bustime[i][3] + bustime[i][4]);
				    }
				    else{
					flag1 = 1;
				    }
				    
				}
				/*次のバスがもう無い場合*/
				else if(i == k-1){
				    if(minute2 < minute1){
					res1 = lasthour;
					res2 = Number(bustime[k-1][3] + bustime[k-1][4]);
					flag1 = 1;
				    }
				    else{
					flag5 = 1;
				    }
				}
				/*次のバス（例：8時現在，次のバスは8時台）が来る場合*/
				else{
				    res1 = hour1;
				    res2 = minute1;
				    flag1 = 1;
				    flag2 = 1;
				}
			    }
			    /*バスが来るまで一時間以上ある場合*/
			    else if(comp1 == 1 && flag1 == 0 && flag2 == 0 && flag3 == 0 && flag5 == 0){
				//res3 = Number(bustime[i+1][0] + bustime[i+1][1]);
				//res4 = Number(bustime[i+1][3] + bustime[i+1][4]);
				res3 = Number(bustime[i][0] + bustime[i][1]);
				res4 = Number(bustime[i][3] + bustime[i][4]);
				flag3 = 1;
			    }
			    /*バスが来るまで二時間以上ある場合*/
			    else if(comp1 == 2 && flag1 == 0 && flag2 == 0 && flag3 == 0 && flag4 == 0 && flag5 == 0){
				res3 = Number(bustime[i+2][0] + bustime[i+2][1]);
				res4 = Number(bustime[i+2][3] + bustime[i+2][4]);
				flag4 = 1;
			    }
			}
			/*バスが来ない場合*/
			if(flag1 == 0 && flag2 == 0 && flag3 == 0 && flag4 == 0){
			    flag5 = 1;
			}


			//console.log(flag1,flag2,flag3,flag4,flag5,flag6);
			//console.log(res1,res2,res3,res4);
			/*フラグを基に表示する時刻を判定*/
			/*次のバスが1時間以内にくる場合*/
			if(flag1 == 1 && flag3 == 0 || flag2 == 1 && res2 >= 0){
			    $("#message").html("次のバスは"+res1+"時"+res2+"分発車です");
			    flag6 = 1;
			}
			/*次のバスまで1時間以上ある場合*/
			else if(flag3 == 1 && res3 >= 0 && res4 >= 0){
			    $("#message").html("次のバスは" + res3 + "時" + res4 + "分発車です");
			    flag7 = 1;
			}
			/*次のバスまで2時間以上ある場合*/
			else if(flag4 == 1 && res3 >= 0 && res4 >= 0){
			    $("#message").html("次のバスは" + res3 + "時" + res4 + "分発車です");
			    flag7= 1;
			}
			/*バスがもう無い場合*/
			else if(res3 < 0 || flag5 == 1){
			    $("#message").html("バスはしばらくこないようです");
			}
			//console.log(Number(data.timetable[0].list[0].time[0] + data.timetable[0].list[0].time[1]));
			//乗車したバスの便番号を取得
			var checkbin = 0; //取得した発車時刻が他の便の図書館到着と一致するケースがあるため，誤検出を防ぐ
			for(i=0;i<length;i++){
			    arraylistlength = data.timetable[i].list.length;
			    for(j=0;j<arraylistlength;j++){
				if(flag6 == 1){
				    var tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				    var tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				    if(res1 == tmpHour && res2 == tmpMinute && checkbin == 0){
					var hitNum = Number(data.timetable[i].binid);
					checkbin = 1;
				    }
				}
				else if(flag7 == 1){
				    var tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				    var tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				    if(res3 == tmpHour && res4 == tmpMinute && checkbin == 0){
					var hitNum = Number(data.timetable[i].binid);
					checkbin = 1;
				    }
				}
			    }
			}
			console.log(hitNum);
			var hitflag = 0;
			//該当便の時刻表を取得し，図書館にいつ着くのかを調べる
			for(i=0;i<length;i++){
			    arraylistlength = data.timetable[i].list.length;
			    for(j=0;j<arraylistlength;j++){
				tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				//図書館のバス停1つ目
				if(data.timetable[i].binid == hitNum && data.timetable[i].list[j].busstopid == 20){
				    arriveTime = data.timetable[i].list[j].time;
				    $('#arrivetime').html(arriveTime + "に図書館に到着します");
				    hitflag = 1;
				    tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				    tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				    //乗車するバス停の，乗車した便によって図書館へ行かない場合がある
				    if(res2 > tmpMinute || res1 > tmpHour && res2 < tmpMinute){
					$('#arrivetime').html("このバスは図書館へは参りません");
					hitflag = 0;
				    }
				    else if(res4 > tmpMinute || res3 > tmpHour && res4 < tmpMinute){
					$('#arrivetime').html("このバスは図書館へは参りません");
					hitflag = 0;
				    }
				}
				//図書館のバス停2つ目
				else if(data.timetable[i].binid == hitNum && data.timetable[i].list[j].busstopid == 28){
				    arriveTime = data.timetable[i].list[j].time;
				    $('#arrivetime').html(arriveTime + "に図書館に到着します");
				    hitflag = 1;
				    tmpHour = Number(data.timetable[i].list[j].time[0] + data.timetable[i].list[j].time[1]);
				    tmpMinute = Number(data.timetable[i].list[j].time[3] + data.timetable[i].list[j].time[4]);
				    //乗車するバス停の，乗車した便によって図書館へ行かない場合がある
				    if(res2 > tmpMinute || res1 > tmpHour && res2 < tmpMinute){
					$('#arrivetime').html("このバスは図書館へは参りません");
					hitflag = 0;
				    }
				    else if(res4 > tmpMinute || res3 > tmpHour && res4 < tmpMinute){
					$('#arrivetime').html("このバスは図書館へは参りません");
					hitflag = 0;
				    }
				}
			}
		}


			if(hitflag == 0){
			    $('#arrivetime').html("このバスは図書館へは参りません");
			}

			if(hash == 20 || hash == 28){
			    $('#arrivetime').html(" ");
			}
            });
        },

		error:function(){
		    alert("Access NG");
		}
	});
});

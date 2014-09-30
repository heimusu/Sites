//実装内容
/* 1.バス停(2種類)の時刻表を取得
 * 2.現在乗車しているバスの便番号を取得(現在バスに乗車していることが前提．
 *   図書館帰りのバスに乗車する場合(= hash == 20 or 28) は表示しない．
 *   また，図書館に到着しないバスに乗っている場合も表示しない
 * 3.次の便の，図書館発のバスを表示(DOMの設定・生成が必要)
 */

var leaveNextBus =  function(data,busNumber){
    //図書館発バス停の時刻一覧格納配列
    var busstopLibwest = new Array();
    var busstopLibeast = new Array();
    //受け取った便番号に該当する図書館発バスの時間を格納
    var nextBuswest;
    var nextBuseast;
    var numberWest = new Array();
    var numberEast = new Array();
    var k = 0;
	var length = data.timetable.length;
    //図書館西側バス停の時刻一覧を取得
    for(var i=0;i<length;i++){
        var arraylistlength = data.timetable[i].list.length;
	    for(var j=0;j<arraylistlength;j++){
	        if(data.timetable[i].list[j].busstopid == 28){
		        busstopLibwest[k] = data.timetable[i].list[j].time;
		        numberWest[k] = Number(data.timetable[i].binid);
	            k++;
		    }
	    }
    }
    console.log(numberWest);
    //図書館東側バス停の時刻一覧を取得
    for(var i=0,k=0;i<length;i++){
        var arraylistlength = data.timetable[i].list.length;
	    for(var j=0;j<arraylistlength;j++){
	        if(data.timetable[i].list[j].busstopid == 20){
		        busstopLibeast[k] = data.timetable[i].list[j].time;
		        numberEast[k] = Number(data.timetable[i].binid);
	            k++;
		    }
	    }
    }
    console.log(numberEast);
    //該当する便番号の，次の出発バスを提示する
    //西と東で同時に,for文を使って処理をする（理由：西側と東側の2つのバス停でそれぞれの便番号に対して網羅的に対応しているから)
    //ただし，18便目のみ欠便（図書館には到着しない）
    //それぞれのバス停に到着するバスの便番号(配列numberWest,Eastに格納)を参照して，処理を書く
    //西側or東側のバス停から○○時○○分に○○行きのバスが発車します．
    for(var i=1; i<=19; i++){
        if(busNumber === numberEast[i]){
            for(i=0;i<9;i++){
                if(numberEast[i] === (busNumber+1)){
                    nextBuseast = busstopLibeast[i];
                    $("#leaveNextbus").html("東側バス停に"+nextBuseast+"に帰りのバスが来ます");
                }
                else if(numberWest[i] === (busNumber+1)){
                    nextBuswest = busstopLibwest[i];
                    $("#leaveNextbus").html("西側バス停に"+nextBuswest+"に帰りのバスが来ます");
                }
            }
        }
        else if(busNumber === numberWest[i]){
            for(i=0;i<9;i++){
                if(numberWest[i] === (busNumber+1)){
                    nextBuswest = busstopLibwest[i];
                    $("#leaveNextbus").html("西側バス停に"+nextBuswest+"に帰りのバスが来ます");
                }
                else if(numberEast[i] === (busNumber+1)){
                    nextBuseast = busstopLibeast[i];
                    $("#leaveNextbus").html("東側バス停に"+nextBuseast+"に帰りのバスが来ます");
                }
            }
        }
    }
    console.log(nextBuswest,nextBuseast);
};

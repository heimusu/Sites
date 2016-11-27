function changeTab(tabname){
    document.getElementById('tab1').style.display = 'none';
    document.getElementById('tab2').style.display = 'none';
    document.getElementById('tab3').style.display = 'none';

    document.getElementById(tabname).style.display= 'block';

}

$(function(){
  changeTab('tab1');
});

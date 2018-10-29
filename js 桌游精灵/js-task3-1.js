var pNum = JSON.parse(sessionStorage.getItem("pNum"));//获得玩家身份的数组
var Num = pNum.length;//获得玩家数量

//上一页
function back() {
    var i = confirm("您是否要返回上一个页面？");
    if(i){
        history.back();
    }
};

//退出
function bye() {
    var i = confirm("确定结束游戏？");
    if(i){
        sessionStorage.clear();
        window.location.href = "js-task2-1.html";
    }
};

//法官页面
//生成动态div
var playbox=$('.play-box');
// function oDiv(){
for(var i = 0; i < Num; i++ ) {
    $(".player-box").append(
        '<div class="player">' +
        '<div class="top">' + pNum[i] + '</div>' +
        '<div class="bottom">' + (i+1) + '</div>' +
        '<div class="knife">' + '</div>' +
        '</div>')
}
// }


$("#start").click(function(){
    window.location.href='js-task4.html';
})

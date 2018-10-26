var pNum = JSON.parse(sessionStorage.getItem("pNum"));//获得玩家身份的数组
var ciWord = JSON.parse(sessionStorage.getItem("ciWord"));//获得平民词汇
var kiWord = JSON.parse(sessionStorage.getItem("kiWord"));//获得杀手词汇
var Num = pNum.length;//获得玩家数量

var na=0;

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

//button 计数
function count(){
    na++;
    return na;//button点击次数
};

//词汇
function word() {
    if(pNum[Math.round((na/2)-1)] == "平民"){
        $("#text2").html("词组 ： "+ciWord);
    }else{
        $("#text2").html("词组： "+kiWord);
    }
};

//角色分配
function role() {
    $("#text1").html("角色 ："+pNum[Math.round((na/2)-1)]);
};

//判断planA or plan B
function plan(){
    if(na<=(Num-1) * 2){
        $("#next2").toggle();
    }else{
        if (na ==(Num* 2)-1 ) {
            $("#next").toggle();
        }
    }
    $("#no_know").toggle();
    $("#know").toggle();
    $("#next1").toggle();
};

$("button").click(function(){
    if(na <(Num * 2 )){
        plan();
        count();
        $("p").html(Math.round(na/2));
        $("#Num").html(Math.round(na/2));
        $("#nextNum").html(Math.round(na/2+1));
        role();
        word();
        // console.log("na="+na);
        // console.log("Num="+Num);
    }else{
        window.location.href='js-task3-1.html';
    }
});

$("#next1").trigger("click");











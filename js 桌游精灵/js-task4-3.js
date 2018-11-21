var ciWord = JSON.parse(sessionStorage.getItem("ciWord"));//获得平民词汇
var kiWord = JSON.parse(sessionStorage.getItem("kiWord"));//获得杀手词汇
var kiNum = sessionStorage.getItem("kiNum");//获得杀手人数
var ciNum = sessionStorage.getItem("ciNum");//获得平民人数
var killDead = JSON.parse(sessionStorage.getItem("killDead"));//获得被杀死的死亡数组
var voteDead = JSON.parse(sessionStorage.getItem("voteDead"));//获得被票死的死亡数组
var day = +sessionStorage.getItem("day");//获得游戏进行天数

$("#kiNum").text("杀手:"+kiNum+"人");
$("#ciNum").text("平民:"+ciNum+"人");
$("#kiWord").text("杀手词汇:"+kiWord);
$("#ciWord").text("平民词汇:"+ciWord);

$(function(){
    //天数
    for (var i=2; i <= day ;i++){
        $(".log").find(".day1").clone().attr("class","day"+i).appendTo(".log");
    } ;

    //日志
    for(var i=1; i <= day ;i++){
        var temp = ".day"+ i;
        var temp1 = ".day" +(i-1);
        $(temp).find("#day").text("第"+ i +"天");
        $(temp).find("#moon").text("晚上："+killDead[i-1]);
        if(killDead.length == voteDead.length){
            $(temp).find("#sun").text("白天："+voteDead[i-1]);
        }else{
            $(temp1).find("#sun").text("白天："+voteDead[i-2]);
        }
    }
})

//获胜方
if( kiNum == 0){
    $("#success").text("平民胜利");
}else{
    $("#success").text("杀手胜利");
}


//再来一局
$("#new").click(function () {
    sessionStorage.clear();
    location.href="js-task2-1.html";
});

//home键
$("#homepage").click(function () {
    sessionStorage.clear();
   location.href="js-task2-1.html";
});
var kiNum = +sessionStorage.getItem("kiNum");//获得杀手人数
var ciNum = +sessionStorage.getItem("ciNum");//获得平民人数
var playerLife = JSON.parse(sessionStorage.getItem("playerLife"));//获得玩家状态的数组
var day = +sessionStorage.getItem("day", day);//获取游戏天数

// 声明被选择的玩家
var choosePlayer;

//声明 被杀死数组
if (sessionStorage.getItem("voteDead")) {
    var voteDead = JSON.parse(sessionStorage.getItem("voteDead"));
} else {
    var voteDead = [];
}

//死亡玩家样式改变
for(var i = 0;i<playerLife.length; i++){
    if( playerLife[i] == "死亡"){
        $(".player").eq(i).find('.top').css('background', 'red');
    }
}

//选择玩家的点击事件
$(".player").click(function () {
    $(".knife").css("visibility","hidden" );//默认刀子隐藏
    choosePlayer = $(this).index();//获取被选择玩家的下角标
    $(".knife").eq(choosePlayer).css("visibility","visible" );//被选择玩家刀子显示
    sessionStorage.setItem("choosePlayer",choosePlayer );
});

//确认事件
$("#sure").click(function () {
    if (choosePlayer == undefined) {
        alert("必须选择杀死一个玩家");
    }else{
        if(playerLife[choosePlayer] == "死亡"){
            alert("当前玩家已死，请选择其他玩家");
        }else{
            if(pNum[choosePlayer] == "杀手"){//投死杀手
                kiNum--;
                sessionStorage.setItem("kiNum", kiNum);//存入剩余杀手人数
                var temp = (choosePlayer + 1 ) + "号被票死，他的身份是杀手";
                voteDead.push(temp);
                if(kiNum == 0){
                    window.location.href='js-task4-3.html';
                }else{
                    day += 1;
                    window.location.href='js-task4.html';
                }
            }else{//投死平民
                ciNum --;
                sessionStorage.setItem("ciNum", ciNum);//存入剩余平民人数
                var temp = (choosePlayer + 1 ) + "号被票死，他的身份是平民";
                voteDead.push(temp);
                if(ciNum == kiNum ){
                    window.location.href='js-task4-3.html';
                }else{
                    day += 1;
                    window.location.href='js-task4.html';
                }
            }
        }
        playerLife[choosePlayer] = "死亡";//存储玩家状态
        sessionStorage.setItem("day",day);//存入游戏天数
        sessionStorage.setItem("voteDead", JSON.stringify(voteDead));//存入投票死亡数组
        sessionStorage.setItem("playerLife", JSON.stringify(playerLife));//存入玩家状态
    }
});
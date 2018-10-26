var pNum = JSON.parse(sessionStorage.getItem("pNum"));//获得玩家身份的数组
var killDead = JSON.parse(sessionStorage.getItem("killDead"));//获得被杀死的死亡数组
var voteDead = JSON.parse(sessionStorage.getItem("voteDead"));//获得被票死的死亡数组
var stateMachine = +sessionStorage.getItem("stateMachine");//获得状态机状态
var choosePlayer = +sessionStorage.getItem("choosePlayer");//获得被选择玩家
var playerLife = JSON.parse(sessionStorage.getItem("playLife"));//获得玩家状态的数组

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
    };
};

var stateMachine;//存储状态机状态
var state=["kill","lastwords","playerwords","vote"];//创建状态数组
var $state=new StateMachine({
    init:"kill",
    transitions: [{
            name: "killing",
            from: "kill",
            to: "lastWords"
        }, {
            name:"lastSpeaking",
            from:"lastWords",
            to:"playerWords"
        }, {
            name:"playerSpeaking",
            from:"playerWords",
            to:"vote"
        }, {
            name:"voting",
            from:"vote",
            to:"kill"
        }],
    methods:{/*转换无效时执行下列函数*/
        onInvalidTransition: function (transitions , from , to) {
            switch (from){
                case "kill":alert("请点击杀手杀人");break;
                case "lastWords":alert("请点击亡灵发表遗言");break;
                case "playerWords":alert("请点击玩家依次发言");break;
                case "vote":alert("请点击投票");break;
            }
        }
    }
});

//声明天数
var day = ~~sessionStorage.getItem("day");
if(day == 0){
    day = 1;
}
sessionStorage.setItem("day",day);

// 声明天数数组
 var dayArray = ["一", "二", "三", "四", "五", "六", "七", "八", "九","十"];
//切换天数
 for (let i = 0; i < day-1 ; i++){
     $(".day1").clone().attr("class","day"+(i+2)).appendTo("main");
     let temp = ".day"+(i+2);
     $(temp).find(".dayNum").html(dayArray[i+1]);
};

//更改点击过的样式
function changeStyle(a) {//最后一天
    for (i = 0; i <= a; i++) {
        var temp = ".day" + day + " .step";
        var after = "<style>li:nth-child(" + (a + 1) + ") .triangle{border-right: 13px solid #1fba6e !important;}</style>";
        $(temp).eq(i).css("background", "#1fba6e");
        $(temp).eq(i).append(after);
    }
    if (day > 1) {//前几天
        for (let preDay = day - 1; preDay > 0; preDay--) {
            var temp = ".day" + preDay + " .step";
            var after = "<style>.day" + preDay + " .triangle{ border-right: 13px solid #1fba6e !important;} </style>";
            $(temp).css("background", "#1fba6e");
            $(temp).append(after);
            $("ul.day"+ preDay).hide();
            $("ul.day" + day).siblings().find("p").click(function () {
                alert("请进行下一步操作！");
            });
        }
    }
}

$(function() {
    if (sessionStorage.getItem("stateMachine")) {
        stateMachine = +sessionStorage.getItem("stateMachine");
        console.log("stateMachine" + stateMachine);

        if (stateMachine) {
            console.log(stateMachine);
            // 切换状态机
            switch (stateMachine) {
                case 1:
                    $state.killing();
                    break;
                case 2:
                    $state.killing();
                    $state.lastSpeaking();
                    break;
                case 3:
                    $state.killing();
                    $state.lastSpeaking();
                    $state.playerSpeaking();
                    break;
            }
        }
        ;
    }

    // 绑定事件
    var step = ".day" + day + " .step";
    changeStyle(stateMachine - 1);
    // 杀人事件
    $(step).eq(0).click(function () {
        if ($state.can("killing")) {
            changeStyle(stateMachine);
            stateMachine = 1;
            sessionStorage.setItem("stateMachine", stateMachine);
            location.href = "js-task4-1.html";
        }
        $state.killing();

    });
    //亡灵发言
    $(step).eq(1).click(function () {
        if ($state.can("lastSpeaking")) {
            changeStyle(stateMachine);
            stateMachine = 2;
            sessionStorage.setItem("stateMachine", stateMachine);
            alert("蓝瘦香菇TAT");
        }
        $state.lastSpeaking();
    });
    //玩家依次发言
    $(step).eq(2).click(function () {
        if ($state.can("playerSpeaking")) {
            changeStyle(stateMachine);
            stateMachine = 3;
            sessionStorage.setItem("stateMachine", stateMachine);
            alert("好好聊聊！");
        }
        $state.playerSpeaking();
    });
    //投票
    $(step).eq(3).click(function () {
        if ($state.can("voting")) {
            changeStyle(stateMachine);
            stateMachine = 0;
            sessionStorage.setItem("stateMachine", stateMachine);
            location.href = "js-task4-2.html";
        }
        $state.voting();
    });
    //每日日志
    if ((choosePlayer+1)) {
        //获取被杀手杀死的玩家
        for (let i = 0; i < killDead.length; i++) {
            var temp = ".day" + (i + 1) + " #killed";
            $(temp).text(killDead[i]);
            $(temp).css("display", "block");
            //获取被票死的玩家
            if (voteDead !== null){
                for (let i = 0; i < voteDead.length; i++) {
                    var temp = ".day" + (i + 1) + " #voted";
                    $(temp).text(voteDead[i]);
                    $(temp).css("display", "block");
                }
            }
        }
    };
});

//每天事件显示和隐藏
$("main>p").click(function () {
    $(this).next().toggle();
});

//结束事件
$("#playerLog").click( function () {
    location.href = "js-task3-1.html";
});

//法官日志
$("#gameOver").click( function () {
    var a = confirm("结束本轮游戏吗？");
    if (a) {
        sessionStorage.clear();
        location.href = "js-task2-1.html";
    }
});

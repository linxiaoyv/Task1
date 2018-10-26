/*获取玩家人数*/
var iNum = document.getElementById('iNumber');
var rNum = document.getElementById('rNumber');
/*获取词汇*/
var ciWord = document.getElementById("civilianWord");
var kiWord = document.getElementById("killerWord");

/*进度条赋值给text*/
function sure(){
    iNum.value = rNum.value;
    role();
}

/*判断输入是否为4-18的数字*/
function check() {
    /*text赋值给进度条*/
    if (iNum.value <= 18 && iNum.value >= 4) {
        rNum.value = iNum.value;
    }
    else {
        alert("请正确输入4-18的数字");
    }
}

/*button-*/
function less() {
    if(rNum.value<=4){
        alert("人数不足，请继续召唤哦");
    }else{
        rNum.value--;
        sure();
    }
}

/*button+*/
function more(){
    if(rNum.value >=18){
        alert("人数过多，请分开游戏哦");
    }else{
        rNum.value ++;
        sure();
    }
}

/*角色分配*/
function role(){
    var pNum = []; /*玩家数组*/
    var killer = Math.floor(iNum.value/3); /*杀手数量*/
    var civilian = iNum.value - killer;/*平民数量*/
    sessionStorage.setItem("kiNum", JSON.stringify(killer));//存入杀手人数
    sessionStorage.setItem("ciNum", JSON.stringify(civilian));//存入平民人数

    for(var i = 0; i< killer;i++){
        pNum[i]="杀手";
    };
    for(var i = killer; i< iNum.value;i++){
        pNum[i]="平民";
    };

    /*洗牌算法*/
    for (var i = iNum.value -1; i >=0; i--) {
        var j = Math.floor(Math.random()*(i+1));
        var t = pNum[j];
        pNum[j] = pNum[i];
        pNum[i] = t;
    };
    // document.getElementById("killer").innerHTML = killer;/*输出杀手人数*/
    // document.getElementById("civilian").innerHTML = civilian;/*输出平民人数*/
    console.log(pNum);

    /*玩家角色显示在列表中*/
    var ul = document.getElementsByTagName("ul");
   /*删除ul所有子节点*/
    $(ul).children().remove();
    for(var i = 0;i < pNum.length;i++){
        var li = document.createElement("li");
        li.innerHTML = pNum[i] + "1人";
        $(ul).append(li);
    }
    sessionStorage.setItem("pNum", JSON.stringify(pNum));//存入玩家数组
    return pNum;
};




$("#sure").click(function(){
    role();
    if (ciWord.value =="" ){
        alert("请输入平民词汇");
    }else{
        sessionStorage.setItem("ciWord", JSON.stringify(ciWord.value));//存入平民词汇
        if (kiWord.value =="" ){
            alert("请输入杀手词汇");
        } else{
            sessionStorage.setItem("kiWord", JSON.stringify(kiWord.value));//存入杀手词汇
            window.location.href='js-task3.html';
        }
    }
});




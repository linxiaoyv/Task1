var ul = document.getElementsByClassName("square")//获得9个方块


/*遍历9个格子重置颜色*/
function reset() {
    for (var i = 0; i < ul.length; i++) {
        ul[i].style.background = "orange";
    }
}

function change() {
    reset();

    //不重复的随机三个方块

    function squares() {
        var a = [];
        for (var i = 0; i < 9; i++) {
            a[i] = i;
        };
        /*a.sort(() => Math.random() - 0.5);*/
        for (var i = a.length-1; i >=0; i--) {
             var j = Math.floor(Math.random()*(i+1));
             var t = a[j];
             a[j] = a[i];
             a[i] = t;
        };
        console.log(a);
        return a;
    };
    var a = squares();


    //不重复的三种颜色
    function color() {
        var colors = [];
        while (colors.length < 3) {
            var color = "#";
            for (var i = 0; i < 3; i++) {
                var n = Math.round((Math.random() * 255));
                if (n < 16) {
                    color += "0";
                    color += n.toString(16);
                } else {
                    color += n.toString(16);
                }
            }
            colors.push(color);
        }
        console.log(colors);
        return colors;
    }

    var colors = color();
    //赋值颜色
    ul[a[0]].style.background = colors[0];
    ul[a[1]].style.background = colors[1];
    ul[a[2]].style.background = colors[2];

}

    var b;

    function start() {
        clearInterval(b);
        /*避免越跑越快*/
        b = setInterval('change()', 2000);
    }

    /*清空计时器，重置样式*/
    function over() {
        clearInterval(b);
        reset();
    }


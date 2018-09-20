//1:引入所需要的模块

var gulp  =require("gulp");

var less  =require("gulp-less");
//css前缀兼容

var auto  =require("gulp-autoprefixer");
//2:创建编译less任务，第一个参数为任务名称

gulp.task("compileLess",function(){

    //找到项目中less文件夹中所有文件夹下的所有less文件

    gulp.src("./less/**/*.less")

    //进行预编译处理,保持与引入的模块一致

        .pipe(less())

        .pipe(auto({

            grid:true,

            browsers:['last 2 version']

        }))

        //编译后将less编译成的css文件保存到项目目录下的css文件夹中

        .pipe(gulp.dest('./css'))

})

//拓展：在最后添加以下代码，在终端直接输入：gulp 也可以达到相同效果。这个适用于编译多个不同类型的文件

//第一个参数为要预编译的目标文件，第二个参数为数组，数组存储各个任务名

gulp.task("watch:less",function(){

    gulp.watch('./less/**/*.less',['compileLess']);

})
//数组存储各个任务名

gulp.task("default",["compileLess","watch:less"]);


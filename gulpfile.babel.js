import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
//HTML
import htmlmin from 'gulp-htmlmin';
//CSS
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
//PUG
import pug from 'gulp-pug';
//Cache bust
import cacheBust from 'gulp-cache-bust';
//Optimizar imágenes
import imagemin from 'gulp-imagemin';

//Variables/Constantes:
const production = false;
const cssPlugins = [
    cssnano(),
    autoprefixer()
]


gulp.task('html-min', ()=>{

    return gulp                          
        .src("./src/*.html")             //De donde toma los archivos convvertir.
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public'))     //Donde deja los archivos convertidos.
    
});


gulp.task('styles', ()=>{
    return gulp
        .src("./src/css/*.css")
        .pipe(concat('styles-min.css'))     //Concatena todos los archivos en uno solo.
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest("./public/css"))
});


gulp.task('babel', ()=>{

    return gulp                            //Convertir codigo nuevo a codigo compatible con todos los navegadores.
        .src("./src/js/*.js")              //De donde toma los archivos convvertir.
        .pipe(concat('scripts-total.js'))  //Concatena todos los archivos js en uno solo.
        .pipe(babel({
            presets: ['@babel/env']
        }))

        .pipe(terser())
        .pipe(gulp.dest('./public/js'))   //Donde deja los archivos convertidos.
    
});


gulp.task('views', ()=>{
    return gulp
        .src('./src/views/pages/*.pug')
        .pipe(pug({
            pretty: production ? false : true
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public'))
})


//CÓDIGO PARA MINIMIZAR EL TAMAÑO DE LAS IMG PERO SALE ERROR.
gulp.task('imgmin', ()=>{
    return gulp.src('./src/image/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
    .pipe(gulp.dest('./public/image'))
})

gulp.task('default', ()=>{                                //Para que se ejecuten las tareas automáticamente.
    //gulp.watch("./src/*.html", gulp.series('html-min'))   //Se establece un vigilante para que detecte los cambios.
    gulp.watch("./src/views/**/*.pug", gulp.series('views'))
    gulp.watch("./src/css/*.css", gulp.series('styles'))  
    gulp.watch("./src/js/*.js", gulp.series('babel'))  
});
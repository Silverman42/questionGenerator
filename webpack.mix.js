let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .babel(['resources/assets/js/modules.js','resources/assets/js/app/sidebar.js','resources/assets/js/app/department.js'],'public/js/department.js')
   .babel(['resources/assets/js/modules.js','resources/assets/js/app/sidebar.js','resources/assets/js/app/faculty.js'],'public/js/faculty.js')
   .babel(['resources/assets/js/modules.js','resources/assets/js/app/sidebar.js','resources/assets/js/app/course.js'],'public/js/course.js')
   .scripts(['resources/assets/js/modules.js','resources/assets/js/app/sidebar.js','resources/assets/js/app/manage_admin.js'],'public/js/manage_admin.js')
   .scripts(['resources/assets/js/modules.js','resources/assets/js/app/sidebar.js','resources/assets/js/app/restore_deactive_admins.js'],'public/js/restore_deactive_admins.js')
   .styles('resources/assets/sass/app.css','public/css/app2.css');
mix.browserSync('localhost:8000');
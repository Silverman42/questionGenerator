<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(QuestGen\User::class, function (Faker $faker) {
    return [
        'firstname' => $faker->name,
        'surname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => bcrypt('secret'),
        'remember_token' => str_random(10),
        'role'=>'admin',
        'avatar'=>'avatar.png'
    ];
});
$factory->define(QuestGen\Faculty::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description'=> str_random(100)
    ];
});

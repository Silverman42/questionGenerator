<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory(QuestGen\User::class,5)->create();
        factory(QuestGen\Faculty::class,5)->create();
    }
}

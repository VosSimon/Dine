<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AllergensTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(ClientTypesTableSeeder::class);
        $this->call(RolesTableSeeder::class);
    }
}

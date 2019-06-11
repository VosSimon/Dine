<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'name' => 'Brood'
            ],
            [
                'name' => 'Stockbrood'
            ],
            [
                'name' => 'Pistolets'
            ],
            [
                'name' => 'Koffiekoeken'
            ],
            [
                'name' => 'Drooggebak'
            ],
            [
                'name' => 'Pattiserie'
            ],
            [
                'name' => 'Taarten'
            ],
            [
                'name' => 'Klassieke broodjes'
            ],
            [
                'name' => 'Speciale broodjes'
            ],
            [
                'name' => 'Ei-gerechten'
            ],
            [
                'name' => 'Snacks'
            ]
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert($category);
        }
    }
}

<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AllergensTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $allergens = [
            [
                'name' => 'Gluten'
            ],
            [
                'name' => 'Noten'
            ],
            [
                'name' => 'Eiren'
            ],
            [
                'name' => 'Vis'
            ],
            [
                'name' => 'Schaaldier'
            ],
            [
                'name' => 'Pinda'
            ],
            [
                'name' => 'Soja'
            ],
            [
                'name' => 'Melk'
            ],
            [
                'name' => 'Selderij'
            ],
            [
                'name' => 'Mosterd'
            ],
            [
                'name' => 'Sesamzaad'
            ],
            [
                'name' => 'Lupine'
            ],
            [
                'name' => 'Sufliet'
            ],
            [
                'name' => 'Weekdieren'
            ],
            [
                'name' => 'Zwaveldioxide'
            ]
        ];

        foreach ($allergens as $allergen) {
            DB::table('allergens')->insert($allergen);
        }
    }
}

<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $client_types = [
            [
                'type' => 'private'
            ],
            [
                'type' => 'buisiness'
            ]
        ];

        foreach ($client_types as $type) {
            DB::table('client_types')->insert($type);
        }
    }
}

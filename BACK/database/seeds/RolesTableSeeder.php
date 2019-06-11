<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'role' => 'user'
            ],
            [
                'role' => 'admin'
            ],
            [
                'role' => 'owner'
            ]
        ];

        foreach ($roles as $role) {
            DB::table('roles')->insert($role);
        }
    }
}

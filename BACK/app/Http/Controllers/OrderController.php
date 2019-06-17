<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderDetail;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;
use App\Notifications\OrderConfirmation;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    use Notifiable;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id = $request->userId;
        $order = Order::create(
            [
            'user_id' => $request->userId,
            'bruto' => $request->totalPrice,
            'netto' => $request->totalPrice
            ]
        );
        $orderDetail = [];
        foreach ($request->items as $item) {
            $detail = OrderDetail::create(
                [
                'order_id' => $order->id,
                'product_id' => $item['product']['id'],
                'quantity' => $item['quantity']
                ]
            );
            array_push($orderDetail, $detail);
        }

        // $order = Order::where('user_id', $id)->first();
        $orderid = $order->id;
        $user = User::where('id', $id)->first();
        $user->notify(new OrderConfirmation($orderid));

        return [$order, $orderDetail];
        // return response()->json(
        //     [
        //     'orderid' => $orderid,
        //     'user' => $user
        //     ]
        // );

        // TODO add payment method and userHasPayed when implementing online payment
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}

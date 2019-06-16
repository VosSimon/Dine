<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Order;
use App\OrderDetail;
use App\Product;

class OrderConfirmation extends Notification
{
    use Queueable;

    protected $orderid;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct( $orderid)
    {
        $this->orderid = $orderid;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $detail = OrderDetail::where('order_id', $this->orderid)->first();
        $product_id = $detail['product_id'];
        $quantity = $detail['quantity'];
        $order = Order::where('id', $this->orderid)->first();
        $price = $order['bruto'];
        $product = Product::where('id', $product_id)->get();
        // $prodName = $product['name'];

        return (new MailMessage)
            ->line('Your order details')
            ->line('Your order number: ' . $this->orderid)
            ->line('Price: ' . $price)
            ->line('Product: ' . $product . ' x ' . $quantity)
            ->line('Thank you for using our purchase!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

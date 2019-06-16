<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Order;
use App\OrderDetail;
use App\Product;

class OrderConfirmation extends Notification
{
    use Queueable, Notifiable;

    protected $orderid;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($orderid)
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
        $orderNr = $detail['order_id'];
        $product_id = $detail[ 'product_id'];
        $quantity = $detail['quantity'];
        $order = Order::where('id', $this->orderid)->first();
        $price = $order['bruto'];
        $product = Product::where('id', $product_id)->first();
        $prodName = $product['name'];
        $prodPrice = $product['price'];

        return (new MailMessage)
            ->line('Your order details')
            ->line('Your order number: ' . $orderNr)
            ->line('Product:  ' . $prodName)
            ->line('Price/piece:  ' . $prodPrice)
            ->line('Quantity ' . $quantity)
            ->line('Total to pay: ' . $price)
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

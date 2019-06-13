<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ContactMessage;

class ContactMessageController extends Controller
{
    /**
     * Send email with requested data
     */
    public function sendMessage(Request $request)
    {
        $request->validate(
            [
                'email' => 'string|email',
                'message' => 'string'
            ]
        );

        $email = $request->email;
        $message =  $request->message;

        if (!$email) {
            return response()->json(
                [
                    'message' => 'No email was provided.'
                ],
                404
            );
        }
        if (!$message) {
            return response()->json(
                [
                    'message' => 'No messagel was provided.'
                ],
                404
            );
        }

        if ($email && $message) {
            Notification::route('mail', 'BestMarvelFanSite@gmail.com')->notify(
                new ContactMessage($email, $message)
            );
        }
        return response()->json(
            [
                'message' => 'Thank you! Your message was sent!'
            ]
        );

    }
}

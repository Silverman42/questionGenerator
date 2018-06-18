<?php

namespace QuestGen\Http\Controllers\Auth;

use QuestGen\Http\Controllers\Controller;
use Illuminate\Http\Request;
use QuestGen\PasswordReset;
use QuestGen\User;
use Illuminate\Support\Facades\Mail;
use QuestGen\Mail\ResetPassword;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */
    /**
     * Link to recover-password view.
     *
     * @return void
     */
     public function password_recovery()
    {
        return view('authentication.recover_password');
    }

    /**
     * Create password reset token.
     *
     * @return void
     */
     public function create_token(Request $request)
    {
        $request->validate([
            'email'=>'required|email'
        ]);
        $check_user = User::where('email',$request->email);
        $user_data = $check_user->first();
        $email_count = $check_user->count();
        if($email_count == 1){
            $token = str_random(25);
            $new_pass_reset = new PasswordReset;
            $new_pass_reset->email = $request->email;
            $new_pass_reset->token = md5($token);
            $new_pass_reset->save();
            Mail::to($user_data)->send(new ResetPassword($token));
            return response()->json('Password reset token sent', 200);
        }
        return response()->json('Email not found', 404);
    }
}

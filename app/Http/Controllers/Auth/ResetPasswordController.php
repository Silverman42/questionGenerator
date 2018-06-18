<?php

namespace QuestGen\Http\Controllers\Auth;

use QuestGen\Http\Controllers\Controller;
use QuestGen\PasswordReset;
use QuestGen\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */
    /**
     * Link to change-password view
     *
     * @return view
     */
    public function reset_password(Request $request, $id){
        $check_token = PasswordReset::where('token',md5($id));
        $check_token_count = $check_token->count();
        $token_detail = $check_token->first();
        if($check_token_count >= 1){
            return view('authentication.reset_password')->with(['email'=>$token_detail->email]);
        }
        return view('authentication.failed_password_reset');
    }
    /**
     * Link to update the password
     *
     * @return view
     */
    public function update_password(Request $request){
        $request->validate([
            'password'=>'required|min:6|string|confirmed',
            'email'=>'required|email'
        ]);
        $check_email = PasswordReset::where('email',$request->email);
        $check_email_count = $check_email->count();
        if($check_email_count >= 1){
            PasswordReset::where('email',$request->email)->delete();
            $change_password = User::where('email',$request->email)
            ->update(['password'=>bcrypt($request->password)]);
            if ($change_password) {
                Auth::logout();
                return response()->json('Successful Password Change', 200);
            }
            return response()->json('Failed Password Change', 422);
        }
        return response()->json('Email not found', 404);
    }
}

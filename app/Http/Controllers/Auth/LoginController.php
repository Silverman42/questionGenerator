<?php

namespace QuestGen\Http\Controllers\Auth;

use QuestGen\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /**
     * Authenticate an Admin login
     *
     * @param Request $request
     * @return Response 
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password,'active'=> 1])){
            $success = 'Login successfull';
            if($request->ajax()){
                return response()->json($success, 200);
            }
            return redirect()->route('dashboard');
        }
        $error = 'Login Failed. Your credentials do not match database records';
        return response()->json($error, 404);
    }
    /**
     * Log out Admin
     *
     *
     * @return Redirect 
     */
    public function logout()
    {
        Auth::logout();
        return redirect()->route('index');
    }
}

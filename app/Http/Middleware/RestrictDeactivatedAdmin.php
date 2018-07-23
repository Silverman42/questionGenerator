<?php

namespace QuestGen\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RestrictDeactivatedAdmin
{
    /**
     * Check if admin has been dactivated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check()){
            if($request->user()->active === 0){
                Auth::logout();
                $message = "Your account has been deactvated";
                if($request->ajax()){
                    return response()->json($message,422);;
                }
                return redirect()->route('index')->with("message",$message);
            }
        }
        return $next($request);
    }
}

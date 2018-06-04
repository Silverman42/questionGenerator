<?php

namespace QuestGen\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AllowOnlyAdmin
{
    /**
     * Give only admin access.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::user()->role !== "admin") {
            if($request->ajax()){
                return response()->json('Permission not granted', 404);
            }
            return redirect()->back();
        }
        return $next($request);
    }
}

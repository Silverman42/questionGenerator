<?php

namespace QuestGen\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AllowAdminDeanHod
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!in_array(Auth::user()->role, ["admin","dean","hod"])) {
            if($request->ajax()){
                return response()->json('Permission not granted', 404);
            }
            return redirect()->back();
        }
        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'No autenticat'], 401);
        }

        if (!in_array($user->rol, $roles)) {
            return response()->json(['message' => 'No autoritzat'], 403);
        }

        return $next($request);
    }
}

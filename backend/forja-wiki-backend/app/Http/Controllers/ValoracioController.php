<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Valoracio;
use App\Models\Post;

class ValoracioController extends Controller
{
    public function storeOrUpdate(Request $request, Post $post)
    {
        $request->validate([
            'puntuacio' => 'required|integer|min:1|max:5',
        ]);

        $valoracio = Valoracio::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'post_id' => $post->id,
            ],
            [
                'puntuacio' => $request->puntuacio,
            ]
        );

        return response()->json([
            'message' => 'Valoració guardada correctament',
            'valoracio' => $valoracio
        ]);
    }

    public function destroy(Post $post)
    {
        $valoracio = Valoracio::where('user_id', auth()->id())
            ->where('post_id', $post->id)
            ->first();

        if (!$valoracio) {
            return response()->json(['message' => 'No existeix valoració'], 404);
        }

        $valoracio->delete();

        return response()->json(['message' => 'Valoració eliminada']);
    }

    public function average(Post $post)
    {
        $avg = Valoracio::where('post_id', $post->id)->avg('puntuacio');

        return response()->json([
            'post_id' => $post->id,
            'valoracio_mitjana' => round($avg, 2),
            'total_valoracions' => Valoracio::where('post_id', $post->id)->count()
        ]);
    }
}
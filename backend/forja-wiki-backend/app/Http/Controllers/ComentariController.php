<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comentari;
use App\Models\Post;

class ComentariController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'contingut' => 'required',
            'parent_id' => 'nullable|exists:comentaris,id',
        ]);

        $comentari = Comentari::create([
            'contingut' => $request->contingut,
            'user_id' => auth()->id(),
            'post_id' => $post->id,
            'parent_id' => $request->parent_id,
        ]);

        return response()->json([
            'message' => 'Comentari creat',
            'comentari' => $comentari
        ]);
    }

    public function destroy(Comentari $comentari)
    {
        if ($comentari->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autoritzat'], 403);
        }

        $comentari->delete();

        return response()->json(['message' => 'Comentari eliminat']);
    }

    public function index(Post $post)
    {
        $comentaris = Comentari::with('user', 'replies.user')
            ->where('post_id', $post->id)
            ->whereNull('parent_id')
            ->get();

        return response()->json($comentaris);
    }
}
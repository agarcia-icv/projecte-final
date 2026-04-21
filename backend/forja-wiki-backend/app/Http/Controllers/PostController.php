<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user', 'tipus');

        if ($request->has('search') && $request->search) {
            $query->where('titol', 'like', '%' . $request->search . '%');
        }

        return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titol' => 'required',
            'descripcio' => 'required',
        ]);

        return Post::create([
            'titol' => $request->titol,
            'descripcio' => $request->descripcio,
            'user_id' => auth()->id(),
            'tipus_eina_id' => $request->tipus_eina_id
        ]);
    }

    public function show(Post $post)
    {
        return $post->load('comentaris', 'valoracions');
    }

    public function update(Request $request, Post $post)
    {
        $post->update($request->all());
        return $post;
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['ok' => true]);
    }
}
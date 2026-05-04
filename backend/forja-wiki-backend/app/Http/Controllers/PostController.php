<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user', 'tipus')
            ->withAvg('valoracions', 'puntuacio');

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
            'tipus_eina_id' => 'required|exists:tipus_eines,id',
            'imatge' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $path = null;

        if ($request->hasFile('imatge')) {
            $path = $request->file('imatge')->store('posts', 'public');
        }

        return Post::create([
            'titol' => $request->titol,
            'descripcio' => $request->descripcio,
            'user_id' => auth()->id(),
            'tipus_eina_id' => $request->tipus_eina_id,
            'imatge' => $path
        ]);
    }

    public function show(Post $post)
    {
        return $post->load('comentaris', 'valoracions');
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autoritzat'], 403);
        }

        $request->validate([
            'titol' => 'required',
            'descripcio' => 'required',
            'tipus_eina_id' => 'required|exists:tipus_eines,id',
            'imatge' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $data = [
            'titol' => $request->titol,
            'descripcio' => $request->descripcio,
            'tipus_eina_id' => $request->tipus_eina_id,
            'epoca' => $request->epoca,
        ];

        if ($request->hasFile('imatge')) {
            $data['imatge'] = $request->file('imatge')->store('posts', 'public');
        }

        $post->update($data);

        return $post;
    }

    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'No autoritzat'
            ], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post eliminat correctament'
        ]);
    }
}
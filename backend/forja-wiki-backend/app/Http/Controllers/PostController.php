<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user', 'tipus')
            ->withAvg('valoracions', 'puntuacio')
            ->orderBy('created_at', 'desc');

        if ($request->has('search') && $request->search) {
            $query->where('titol', 'like', '%' . $request->search . '%');
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'titol' => 'required|string|max:255',
            'descripcio' => 'required|string',
            'epoca' => 'required|string|max:255',
            'tipus_eina_id' => 'required|exists:tipus_eines,id',
            'imatge' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $path = null;

        if ($request->hasFile('imatge')) {
            $path = $request->file('imatge')->store('posts', 'public');
        }

        $post = Post::create([
            'titol' => $request->titol,
            'descripcio' => $request->descripcio,
            'epoca' => $request->epoca,
            'user_id' => auth()->id(),
            'tipus_eina_id' => $request->tipus_eina_id,
            'imatge' => $path
        ]);

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = Post::with(['user', 'tipus', 'comentaris.user', 'valoracions'])
            ->find($id);

        if (!$post) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autoritzat'], 403);
        }

        $request->validate([
            'titol' => 'required|string|max:255',
            'descripcio' => 'required|string',
            'epoca' => 'required|string|max:255',
            'tipus_eina_id' => 'required|exists:tipus_eines,id',
            'imatge' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $data = [
            'titol' => $request->titol,
            'descripcio' => $request->descripcio,
            'epoca' => $request->epoca,
            'tipus_eina_id' => $request->tipus_eina_id,
        ];

        if ($request->hasFile('imatge')) {
            $data['imatge'] = $request->file('imatge')->store('posts', 'public');
        }

        $post->update($data);

        return response()->json($post);
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
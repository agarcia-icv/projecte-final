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

    if ($request->has('tipus') && $request->tipus) {
        $query->where('tipus_eina_id', $request->tipus);
    }

    $sort = $request->get('sort', 'created_at');
    $direction = $request->get('direction', 'desc');

    $allowedSorts = [
        'titol',
        'created_at',
        'valoracions_avg_puntuacio'
    ];

    if (!in_array($sort, $allowedSorts)) {
        $sort = 'created_at';
    }

    if (!in_array($direction, ['asc', 'desc'])) {
        $direction = 'desc';
    }

    if ($sort === 'valoracions_avg_puntuacio') {

    $query->orderByRaw(
        "COALESCE(valoracions_avg_puntuacio, 0) $direction"
    );

} else {

    $query->orderBy($sort, $direction);

}

    $posts = $query->get();

    $tipusNom = null;

    if ($request->has('tipus')) {
        $tipus = \App\Models\TipusEina::find($request->tipus);

        if ($tipus) {
            $tipusNom = $tipus->nom;
        }
    }

    return response()->json([
        'categoria' => $tipusNom,
        'posts' => $posts
    ]);


return response()->json([
    'categoria' => $tipusNom,
    'posts' => $posts
]);
}

    public function store(Request $request)
    {
        $request->validate([
            'titol' => 'required|string|max:255',
            'descripcio' => 'required|string',
            'epoca' => 'required|string|max:255',
            'tipus_eina_id' => 'required|exists:tipus_eines,id',
            'imatge' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
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
        $user = auth()->user();

        if (
            $user->rol !== 'admin' &&
            $user->rol !== 'editor'
        ) {
            return response()->json([
                'message' => 'No autoritzat'
            ], 403);
        }

        foreach ($post->comentaris as $comentari) {
            $comentari->deleteWithChildren();
        }

        $post->valoracions()->delete();

        $post->delete();

        return response()->json([
            'message' => 'Post eliminat correctament'
        ]);
    }
}
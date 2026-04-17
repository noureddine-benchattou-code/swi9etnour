<?php
namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index() {
        return response()->json(Produit::all());
    }

    public function store(Request $request) {
        $request->validate([
            'nom'       => 'required|string',
            'prix'      => 'required|numeric',
            'categorie' => 'required|in:legumes,fruits,artisanat,autre',
            'stock'     => 'required|integer',
        ]);

        $produit = Produit::create($request->all());
        return response()->json($produit, 201);
    }

    public function show($id) {
        return response()->json(Produit::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $produit = Produit::findOrFail($id);
        $produit->update($request->all());
        return response()->json($produit);
    }

    public function destroy($id) {
        Produit::findOrFail($id)->delete();
        return response()->json(['message' => 'Produit supprimé']);
    }
}
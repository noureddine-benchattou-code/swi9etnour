<?php
namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function index(Request $request) {
        return response()->json(
            Commande::where('user_id', $request->user()->id)->get()
        );
    }

    public function store(Request $request) {
        $request->validate([
            'total'             => 'required|numeric',
            'adresse_livraison' => 'required|string',
        ]);

        $commande = Commande::create([
            'user_id'           => $request->user()->id,
            'total'             => $request->total,
            'adresse_livraison' => $request->adresse_livraison,
            'statut'            => 'en_attente',
        ]);

        return response()->json($commande, 201);
    }

    public function show(Request $request, $id) {
        $commande = Commande::where('id', $id)
                            ->where('user_id', $request->user()->id)
                            ->firstOrFail();
        return response()->json($commande);
    }
}
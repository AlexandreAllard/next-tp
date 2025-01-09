"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface PokemonDetail {
    id: number;
    pokedexId: number;
    name: string;
    image: string;
    stats: {
        HP: number;
        speed: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        special_attack: number;
        special_defense: number;
    };
    evolutions: { name: string; pokedexId: number }[];
    types: { id: number; name: string; image: string }[];
}

export default function PokemonPage() {
    const router = useRouter();
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

    useEffect(() => {
        if (!id) return;
        async function fetchPokemon() {
            try {
                const res = await fetch(
                    `https://nestjs-pokedex-api.vercel.app/pokemons/${id}`
                );
                const data = await res.json();
                setPokemon(data);
            } catch {
                console.error("Erreur lors de la récupération des données.");
            }
        }
        fetchPokemon();
    }, [id]);

    if (!pokemon) return <div>Chargement...</div>;

    return (
        <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
            <button
                onClick={() => router.push("/")}
                style={{
                    backgroundColor: "#FFD733",
                    border: "2px solid #999",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "1rem",
                }}
            >
                Retour
            </button>

            <div
                style={{
                    background: "radial-gradient(circle, #FFEE99 0%, #F9C645 50%, #FEE76B 100%)",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    border: "15px solid #FEE76B",
                    padding: "10px",
                    gap: "10px",
                    width: "400px",
                    color: "#000",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{pokemon.name}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {pokemon.types[0] && (
                            <img
                                src={pokemon.types[0].image}
                                alt={pokemon.types[0].name}
                                style={{ width: "24px", height: "24px" }}
                            />
                        )}
                        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                            {pokemon.stats.HP} PV
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "center",
                        backgroundColor: "#E5E5E5",
                        backgroundImage:
                            "url('https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/masters/forest.jpg')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{ width: "250px", height: "250px", objectFit: "contain" }}
                    />
                </div>

                <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <span style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <p style={{fontWeight: "bold"}}>Frotte frimousse</p>
                            <p style={{textAlign: "center"}}> Lancez une pièce. Si c'est face, le Pokémon Actif de votre adversaire est maintenant Paralysé.</p>
                        </span>
                        <span style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <p style={{fontWeight: "bold"}}>Frotte frimousse</p>
                            <p style={{textAlign: "center"}}> Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts supplémentaires. </p>
                        </span>
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <p style={{fontWeight: "bold"}}>Points de vie</p>
                            <p>{pokemon.stats.HP}</p>
                        </span>
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <p style={{fontWeight: "bold"}}>Vitesse</p>
                            <p>{pokemon.stats.speed}</p>
                        </span>
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <p style={{fontWeight: "bold"}}>Attaque</p>
                            <p>{pokemon.stats.attack}</p>
                        </span>
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <p style={{fontWeight: "bold"}}>Défense</p>
                            <p>{pokemon.stats.defense}</p>
                        </span>
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <p style={{fontWeight: "bold"}}>Attaque spéciale</p>
                            <p>{pokemon.stats.specialAttack}</p>
                        </span>
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <p style={{fontWeight: "bold"}}>Défense spéciale</p>
                            <p>{pokemon.stats.specialDefense}</p>
                        </span>
                    </div>
                </div>
            </div>

            {pokemon.evolutions.length > 0 && (
                <div
                    style={{
                        marginTop: "2rem",
                        backgroundColor: "#F9C645",
                        borderRadius: "8px",
                        border: "4px solid #FEE76B",
                        padding: "16px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        maxWidth: "400px",
                        width: "100%",
                    }}
                >
                    <h3>Évolutions</h3>
                    <ul style={{listStyle: "none", paddingLeft: 0, margin: 0}}>
                        {pokemon.evolutions.map((evo) => (
                            <li
                                key={evo.pokedexId}
                                style={{
                                    cursor: "pointer",
                                    color: "#007BFF",
                                    textDecoration: "underline",
                                    marginBottom: "4px",
                                }}
                                onClick={() => router.push(`/pokemon/${evo.pokedexId}`)}
                            >
                                {evo.name} (#{evo.pokedexId})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
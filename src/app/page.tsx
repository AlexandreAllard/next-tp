"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import axios from "axios"

interface TypeData {
    id: number
    name: string
    image: string
}

interface PokemonType {
    id: number
    name: string
    image: string
    sprite: string
    pokedexId: number
    types: TypeData[]
}

export default function HomePage() {
    const [pokemons, setPokemons] = useState<PokemonType[]>([])
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(50)
    const [searchName, setSearchName] = useState<string>("")
    const [types, setTypes] = useState<TypeData[]>([])
    const [selectedTypes, setSelectedTypes] = useState<number[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const menuRef = useRef<HTMLDivElement | null>(null)
    const loaderRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await axios.get("https://nestjs-pokedex-api.vercel.app/types")
                setTypes(data)
            } catch {}
        })()
    }, [])

    useEffect(() => {
        setPokemons([])
        setPage(1)
        setHasMore(true)
    }, [searchName, selectedTypes, limit])

    async function fetchPokemons() {
        setIsFetching(true)
        try {
            const params = new URLSearchParams()
            params.append("page", page.toString())
            params.append("limit", limit.toString())
            if (searchName) params.append("name", searchName)
            selectedTypes.forEach(typeId => params.append("types[]", typeId.toString()))
            const { data } = await axios.get("https://nestjs-pokedex-api.vercel.app/pokemons", { params })
            if (Array.isArray(data)) {
                if (data.length < limit) setHasMore(false)
                setPokemons(prev => [...prev, ...data])
            } else setHasMore(false)
        } catch {
            setHasMore(false)
        } finally {
            setIsFetching(false)
        }
    }

    useEffect(() => {
        fetchPokemons()
    }, [page])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetching && hasMore) setPage(p => p + 1)
        })
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current)
        }
    }, [loaderRef, isFetching, hasMore])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function toggleMenu() {
        setMenuOpen(o => !o)
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchName(e.target.value)
    }

    function handleTypeCheck(typeId: number, checked: boolean) {
        if (checked) setSelectedTypes(prev => [...prev, typeId])
        else setSelectedTypes(prev => prev.filter(id => id !== typeId))
    }

    function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setLimit(Number(e.target.value))
    }

    return (
        <div>
            <div style={{background: "#DD524B", display: "flex", flexDirection:"column", padding:"10px"}}>
                <h1 style={{fontFamily: "Roboto, sans-serif", fontSize:"32px"}}>Pokédex</h1>
                <div style={{ display: "flex", gap:"20px"}}>
                <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchName}
                    onChange={handleNameChange}
                    style={{ padding:"10px", borderRadius: "100px", backgroundColor: "#fff", position: "relative", color: "#000", cursor: "pointer"}}                />
                <div  style={{ padding:"10px", borderRadius: "100px", backgroundColor: "#fff", position: "relative", color: "#000", cursor: "pointer"}}
                >
                    <button onClick={toggleMenu} style={{minWidth: "100px"}}>
                        Types
                    </button>
                    {menuOpen && (
                        <div
                            ref={menuRef}
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                background: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "8px",
                                zIndex: 10,
                                maxHeight: "200px",
                                overflowY: "auto",
                                width: "180px"
                            }}
                        >
                            {types.map(t => {
                                const checked = selectedTypes.includes(t.id)
                                return (
                                    <label
                                        key={t.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "4px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={e => handleTypeCheck(t.id, e.target.checked)}
                                        />
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                marginLeft: "6px",
                                                marginRight: "4px",
                                                objectFit: "contain"
                                            }}
                                        />
                                        <span>{t.name}</span>
                                    </label>
                                )
                            })}
                        </div>
                    )}
                </div>
                <select value={limit} onChange={handleLimitChange}
                        style={{ padding:"10px", borderRadius: "100px", backgroundColor: "#fff", position: "relative", color: "#000", cursor: "pointer"}}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                </div>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "1rem",
                    backgroundColor: "#FFF",
                    border: "10px solid #DD524B",
                    padding: "20px",
                }}
            >
                {pokemons.map(pokemon => (
                    <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                        <div
                            style={{
                                position: "relative",
                                border: "1px solid lightgrey",
                                borderRadius: "8px",
                                padding: "10px 0px",
                                placeItems: "center",
                                color: "#000",
                            }}
                        >
                            <p style={{
                                position: "absolute",
                                right: "10px",
                                top: "10px",
                                fontWeight: "bold",
                                color: "grey",
                            }}>#{pokemon.pokedexId}</p>
                            <img
                                src={pokemon.image}
                                alt={pokemon.name}
                                style={{ width: "100px", height: "100px", objectFit: "contain" }}
                            />
                            <p>{pokemon.name}</p>
                            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4 }}>
                                {pokemon.types.map(t => (
                                    <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            style={{ width: "20px", height: "20px", objectFit: "contain" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {hasMore && (
                <div
                    ref={loaderRef}
                    style={{
                        margin: "2rem auto",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {isFetching ? "Chargement" : "Défiler"}
                </div>
            )}
        </div>
    )
}
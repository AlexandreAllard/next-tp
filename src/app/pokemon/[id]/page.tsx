"use client";

import { useParams } from 'next/navigation';

export default function Pokemon() {
    const { id } = useParams();

    return (
        <div>
            <h1>Numéro {id}</h1>
        </div>
    );
}

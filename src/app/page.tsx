import Link from 'next/link';

export default function Home() {
  return (
      <div>
          <h1>Trop cool React</h1>

            <Link href="/pokemon/1">
                Pokémon 1
            </Link>
      </div>
  );
}
# Énoncé:
Consommer l'API à l'URL: https://nestjs-pokedex-api.vercel.app/pokemons

# Page 1:
Liste des pokémons, par défaut 50 par 50
Scroll en fin de page => refetch n pokémons en fonction du filtre "limit"
Filtre le nom du pokémon
Filtre simple sur le type du pokémon
Sélecteur pour augmenter la limit => 10, 20, 50, 100
Affiche des pokémons sur des cards avec l'ID, l'image, le nom, les types

# Page 2:
Au clic sur une card afficher les informations du pokémon concerné => sur une autre page ou modal ou autre
Afficher un bouton retour pour retourner sur la liste des pokémons
Afficher le nom, l'image et les stats
Afficher la ou les évolutions de ce pokémon

### /pokemons
page => précise la page à récupérer (par défaut 1)
limit => le nomde de pokémons à récupérer (par défaut 50)
typeId => l'ID du type
types => un tableau d'ID de types
name => le nom du pokémon

### /pokemons/:pokedexId
Ne prend aucun paramètre

/types
Ne prend aucun paramètre
export async function getCharacters(name) {
  const query = `
    query {
      characters(filter: { name: "${name}" }) {
        results {
          name
        }
      }
    }
  `;

  const response = await fetch('https://rickandmortyapi.com/graphql/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  const characters = json.data.characters.results;

  return characters;
}

export async function getCharacters(name) {
  if (name === '') {
    return [];
  }

  const query = `
    query {
      characters(filter: { name: "${name}" }) {
        results {
          id
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

  let characters;
  try {
    characters = json.data.characters.results;
  } catch (e) {
    characters = [];
  }

  return characters;
}

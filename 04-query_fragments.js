// Source https://studio.apollographql.com/public/star-wars-swapi/
const axios = require("axios");

console.log(
    `Source API Example: "https://studio.apollographql.com/public/star-wars-swapi/"`
);

const url = "https://swapi-graphql.netlify.app/.netlify/functions/index";
const method = "post";
const query = `
        query ExampleQuery {
            film_A: film(filmID: 1 ) {
                ...FilmFragment
                releaseDate
                openingCrawl
            }
            film_B: film(filmID: 2 ) {
                ...FilmFragment
            }
        }
        
        fragment FilmFragment on Film {
            title
            director
            created
            episodeID
        }
      `;

async function main() {
    const response = await axios({
        url,
        method,
        data: {
            query,
        },
    });
    console.log(JSON.stringify(response.data, 0, (space = 2)));
}

main();

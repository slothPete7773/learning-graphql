// Source https://studio.apollographql.com/public/star-wars-swapi/
const axios = require("axios");

console.log(
    `Source API Example: "https://studio.apollographql.com/public/star-wars-swapi/"`
);

const url = "https://swapi-graphql.netlify.app/.netlify/functions/index";
const method = "post";
const query = `
        query ExampleQuery {
            film(filmID: 1 ) {
                created
                director
                episodeID
                openingCrawl
                releaseDate
                title
                planetConnection {
                planets {
                    name
                    population
                    terrains
                }
                }
            }
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

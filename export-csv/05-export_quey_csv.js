// Source https://studio.apollographql.com/public/star-wars-swapi/
const axios = require("axios");
const fs = require("fs");

console.log(
    `Source API Example: "https://studio.apollographql.com/public/star-wars-swapi/"`
);

const url = "https://swapi-graphql.netlify.app/.netlify/functions/index";
const method = "post";
const query = `
        query ExampleQuery {
            allFilms {
                totalCount
                films {
                title
                releaseDate
                episodeID
                director
                }
            }
        }
      `;

function mapper(films_data) {
    // Logic to transform the raw API data into CSV-friendly format
    return films_data.map((film) => ({
        title: film.title,
        releaseDate: film.releaseDate,
        episodeID: film.episodeID,
        director: film.director,
        // ... other mapped fields
    }));
}

function exportToCSV(mappedData, exportFilePath) {
    const header = Object.keys(mappedData[0]).join(","); // Extract headers dynamically
    const rows = mappedData.map((item) => Object.values(item).join(","));

    const csvContent = `${header}\n${rows.join("\n")}`;
    fs.writeFileSync(exportFilePath, csvContent);
    console.log("CSV export complete!");
}

async function main() {
    const response = await axios({
        url,
        method,
        data: {
            query,
        },
    });
    // console.log(JSON.stringify(response.data, 0, (space = 2)));
    films = response.data.data.allFilms.films;
    mappedFilms = mapper(films);
    item = mappedFilms[0];

    exportFilePath = "export-csv/sample.csv";
    exportToCSV(mappedFilms, exportFilePath);
    // console.log(item);
    // console.log(Object.keys(mappedFilms[0]));
}

main();

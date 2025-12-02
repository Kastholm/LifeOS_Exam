// Simpelt eksempel på DBpedia API kald
export default async function fetchDbpedia(title?: string) {

    if (!title) {
        return null;
    }

    const endpoint = "https://dbpedia.org/sparql";
    // Forbedret query der henter flere relevante data
    const query = `
        PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>

        SELECT DISTINCT
        ?movie
        ?label
        ?abstract
        (GROUP_CONCAT(DISTINCT ?directorName; separator=", ") AS ?directors)
        (GROUP_CONCAT(DISTINCT ?producerName; separator=", ") AS ?producers)
        (GROUP_CONCAT(DISTINCT ?writerName; separator=", ") AS ?writers)
        (GROUP_CONCAT(DISTINCT ?starringName; separator=", ") AS ?starring)
        (GROUP_CONCAT(DISTINCT ?composerName; separator=", ") AS ?musicComposers)
        (GROUP_CONCAT(DISTINCT ?cinematographerName; separator=", ") AS ?cinematographers)
        (GROUP_CONCAT(DISTINCT ?editorName; separator=", ") AS ?editors)
        ?runtime
        ?budget
        ?gross
        ?releaseDate
        ?rating
        (GROUP_CONCAT(DISTINCT ?countryName; separator=", ") AS ?countries)
        (GROUP_CONCAT(DISTINCT ?languageName; separator=", ") AS ?languages)
        (GROUP_CONCAT(DISTINCT ?genreName; separator=", ") AS ?genres)
        (GROUP_CONCAT(DISTINCT ?distributorName; separator=", ") AS ?distributors)
        WHERE {
        ?movie a dbo:Film ;
                rdfs:label ?label .

        FILTER(LANG(?label) = "en")
        FILTER(CONTAINS(LCASE(?label), LCASE("${title}")))

        OPTIONAL { ?movie dbo:abstract ?abstract . FILTER(LANG(?abstract) = "en") }
        OPTIONAL { 
            ?movie dbo:director ?director .
            OPTIONAL { ?director foaf:name ?directorName . FILTER(LANG(?directorName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:producer ?producer .
            OPTIONAL { ?producer foaf:name ?producerName . FILTER(LANG(?producerName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:writer ?writer .
            OPTIONAL { ?writer foaf:name ?writerName . FILTER(LANG(?writerName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:starring ?starringActor .
            OPTIONAL { ?starringActor foaf:name ?starringName . FILTER(LANG(?starringName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:musicComposer ?composer .
            OPTIONAL { ?composer foaf:name ?composerName . FILTER(LANG(?composerName) = "en") }
        }
        OPTIONAL { ?movie dbo:runtime ?runtime }
        OPTIONAL { ?movie dbo:budget ?budget }
        OPTIONAL { ?movie dbo:gross ?gross }
        OPTIONAL { ?movie dbo:releaseDate ?releaseDate }
        OPTIONAL { 
            ?movie dbo:country ?country .
            OPTIONAL { ?country rdfs:label ?countryName . FILTER(LANG(?countryName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:language ?language .
            OPTIONAL { ?language rdfs:label ?languageName . FILTER(LANG(?languageName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:genre ?genre .
            OPTIONAL { ?genre rdfs:label ?genreName . FILTER(LANG(?genreName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:cinematography ?cinematographer .
            OPTIONAL { ?cinematographer foaf:name ?cinematographerName . FILTER(LANG(?cinematographerName) = "en") }
        }
        OPTIONAL { 
            ?movie dbo:editing ?editor .
            OPTIONAL { ?editor foaf:name ?editorName . FILTER(LANG(?editorName) = "en") }
        }
        OPTIONAL { ?movie dbo:rating ?rating }
        OPTIONAL { 
            ?movie dbo:distributor ?distributor .
            OPTIONAL { ?distributor rdfs:label ?distributorName . FILTER(LANG(?distributorName) = "en") }
        }
        }
        GROUP BY ?movie ?label ?abstract ?runtime ?budget ?gross ?releaseDate ?rating
        LIMIT 1
      `;

    try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/sparql-results+json",
          },
          body: new URLSearchParams({ query }).toString(),
        });

        if (!res.ok) {
            console.error("DBpedia HTTP error", res.status, await res.text());
            return null;
          }
          
          const data = await res.json();
          // Parse SPARQL resultat
          if (data.results?.bindings?.length > 0) {
            const result = data.results.bindings[0];
            
            // Hjælpefunktion til at formatere tal (budget, gross)
            const formatCurrency = (value: string | null) => {
              if (!value) return null;
              const num = parseFloat(value);
              if (isNaN(num)) return value;
              if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
              if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
              return `$${num.toFixed(0)}`;
            };

            // Konverter runtime fra sekunder til minutter
            const formatRuntime = (value: string | null) => {
              if (!value) return null;
              const seconds = parseInt(value);
              if (isNaN(seconds)) return value;
              const minutes = Math.floor(seconds / 60);
              return `${minutes} minutter`;
            };

            // Formatér dato
            const formatDate = (value: string | null) => {
              if (!value) return null;
              try {
                const date = new Date(value);
                return date.toLocaleDateString('da-DK', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                });
              } catch {
                return value;
              }
            };

            return {
              abstract: result.abstract?.value || null,
              directors: result.directors?.value || null,
              producers: result.producers?.value || null,
              writers: result.writers?.value || null,
              starring: result.starring?.value || null,
              musicComposers: result.musicComposers?.value || null,
              cinematographers: result.cinematographers?.value || null,
              editors: result.editors?.value || null,
              runtime: formatRuntime(result.runtime?.value),
              budget: formatCurrency(result.budget?.value),
              gross: formatCurrency(result.gross?.value),
              releaseDate: formatDate(result.releaseDate?.value),
              rating: result.rating?.value || null,
              countries: result.countries?.value || null,
              languages: result.languages?.value || null,
              genres: result.genres?.value || null,
              distributors: result.distributors?.value || null,
              label: result.label?.value || null,
            };
          }
          
          return null;

  } catch (error) {
        console.error("Error fetching from DBpedia:", error);
        return null;
  }
}


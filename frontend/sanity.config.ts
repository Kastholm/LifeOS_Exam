import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

// Definer custom struktur
const structure = (S: any) =>
  S.list()
    .title("Indhold")
    .items([
      S.listItem()
        .title("Bøger")
        .id("boger")
        .child(S.documentTypeList("book").title("Bøger").filter('_type == "book"')),
      S.listItem()
        .title("Notesbog")
        .id("notesbog")
        .child(S.documentTypeList("note").title("Notesbog").filter('_type == "note"')),
      S.listItem()
        .title("Månedsbog")
        .id("maanedsbog")
        .child(S.documentTypeList("monthlyJournal").title("Månedsbog").filter('_type == "monthlyJournal"')),
      S.listItem()
        .title("Ugebog")
        .id("ugebog")
        .child(S.documentTypeList("weeklyJournal").title("Ugebog").filter('_type == "weeklyJournal"')),
      S.listItem()
        .title("Nytårsforsæt")
        .id("nytaarsforsaet")
        .child(S.documentTypeList("newYearResolution").title("Nytårsforsæt").filter('_type == "newYearResolution"')),
      S.divider(),
      S.listItem()
        .title("Mad")
        .id("mad")
        .child(
          S.list()
            .title("Mad")
            .items([
              S.listItem()
                .title("Opskrifter")
                .id("opskrifter")
                .child(S.documentTypeList("recipe").title("Opskrifter").filter('_type == "recipe"')),
              S.listItem()
                .title("Kategorier")
                .id("madkategorier")
                .child(
                  S.documentTypeList("recipeCategory").title("Madkategorier").filter('_type == "recipeCategory"'),
                ),
              S.listItem()
                .title("Tags")
                .id("madtags")
                .child(S.documentTypeList("recipeTag").title("Mad Tags").filter('_type == "recipeTag"')),
            ]),
        ),
      S.listItem()
        .title("Ejendele")
        .id("ejendele")
        .child(
          S.list()
            .title("Ejendele")
            .items([
              S.listItem()
                .title("Genstande")
                .id("genstande")
                .child(S.documentTypeList("item").title("Genstande").filter('_type == "item"')),
              S.listItem()
                .title("Kategorier")
                .id("kategorier")
                .child(S.documentTypeList("category").title("Kategorier").filter('_type == "category"')),
              S.listItem()
                .title("Lokationer")
                .id("lokationer")
                .child(S.documentTypeList("location").title("Lokationer").filter('_type == "location"')),
            ]),
        ),
    ])

export default defineConfig({
  name: "default",
  title: "LifeOS",
  
  projectId,
  dataset,
  basePath: "/pages/sanity",

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})


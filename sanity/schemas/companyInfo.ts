import { defineField, defineType } from "sanity";

const locales = [
  { title: "English", value: "en" },
  { title: "Arabic", value: "ar" },
  { title: "Farsi", value: "fa" },
];

export default defineType({
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mission",
      title: "Mission Statement",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroVideoURL",
      title: "Hero Video URL",
      type: "url",
    }),
    defineField({
      name: "introVideoURL",
      title: "Intro Logo Video URL",
      type: "url",
      description:
        "Optional short mp4/webm clip that plays on page load before fading into the hero.",
    }),
    defineField({
      name: "description",
      title: "Company Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "locale",
      title: "Language",
      type: "string",
      options: { list: locales },
      initialValue: "en",
      validation: (rule) => rule.required(),
    }),
  ],
});


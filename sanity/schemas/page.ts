import { defineField, defineType } from "sanity";

const locales = [
  { title: "English", value: "en" },
  { title: "Arabic", value: "ar" },
  { title: "Farsi", value: "fa" },
];

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
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


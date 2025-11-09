import { defineField, defineType } from "sanity";

const locales = [
  { title: "English", value: "en" },
  { title: "Arabic", value: "ar" },
  { title: "Farsi", value: "fa" },
];

export default defineType({
  name: "division",
  title: "Division",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Division Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (rule) => rule.min(1),
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
  preview: {
    select: {
      title: "name",
      subtitle: "locale",
      media: "image",
    },
  },
});


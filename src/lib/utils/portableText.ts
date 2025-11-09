import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

export function portableTextToPlainText(blocks: PortableTextBlock[] = []) {
  return blocks
    .map((block) => {
      if (block?._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) => (isSpan(child) ? child.text ?? "" : ""))
        .join(" ");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function isSpan(child: unknown): child is PortableTextSpan {
  return Boolean(
    child &&
      typeof child === "object" &&
      "_type" in child &&
      (child as { _type?: string })._type === "span",
  );
}


export const slugToName = (slug: string) => {
  return slug
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const nameToSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const prepareBoardData = (
  board_name: string,
  columns: { column_title: string }[],
) => {
  return {
    slug: nameToSlug(board_name),
    columnsWithPositions: columns.map((col, index) => ({
      title: col.column_title,
      position: index,
    })),
  };
};

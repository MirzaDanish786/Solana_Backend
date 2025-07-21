import fs from "fs";
import path from "path";

export const loadTemplate = (filename, replacements = {}) => {
  const filePath = path.join(process.cwd(), "templates", "emails", filename);
  let html = fs.readFileSync(filePath, "utf8");

  for (const key in replacements) {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), replacements[key]);
  }

  return html;
};

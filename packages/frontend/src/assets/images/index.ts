// index.ts
const images = import.meta.glob('./**/*.{png,jpg,jpeg,svg,gif,webp}', {
  eager: true,
}) as Record<string, { default: string }>;

const imageMap: Record<string, string> = {};

for (const path in images) {
  const fileName = path
    .split('/')
    .pop()!
    .replace(/\.(png|jpe?g|svg|gif|webp)$/, '');
  imageMap[fileName] = images[path].default;
}

export default imageMap;

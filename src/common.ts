const OUTPUT_EXTENSIONS = ['svg', 'png', 'jpg', 'jpeg'] as const;
type OutputExtension = (typeof OUTPUT_EXTENSIONS)[number];

const isOutputExtension = (obj: any): obj is OutputExtension => {
  return OUTPUT_EXTENSIONS.includes(obj);
};

export {
  OUTPUT_EXTENSIONS,
  OutputExtension,
  isOutputExtension,
};

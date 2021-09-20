interface BaseRenderer {
  renderSvg: () => Promise<Buffer>;
  renderPng: () => Promise<Buffer>;
  renderJpeg: () => Promise<Buffer>;
}

export {
  BaseRenderer
};

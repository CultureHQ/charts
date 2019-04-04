class XMLSerializer {
  // eslint-disable-next-line class-methods-use-this
  serializeToString() {
    return "svg";
  }
}

window.XMLSerializer = XMLSerializer;

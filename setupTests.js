// eslint-disable-next-line import/no-extraneous-dependencies
import "react-testing-library/cleanup-after-each";

class XMLSerializer {
  // eslint-disable-next-line class-methods-use-this
  serializeToString() {
    return "svg";
  }
}

window.XMLSerializer = XMLSerializer;

// eslint-disable-next-line import/no-extraneous-dependencies
import "react-testing-library/cleanup-after-each";

class XMLSerializer {
  serializeToString(svg) {
    return "svg";
  }
}

window.XMLSerializer = XMLSerializer;

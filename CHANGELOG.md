# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.2] - 2019-06-12

### Changed

- Get rid of `Object.values` usage so that it doesn't need to be polyfilled.

## [1.2.1] - 2019-06-07

### Changed

- [INTERNAL] Switched to using `@culturehq/scripts` for development.
- [INTERNAL] Switched to using `@testing-library/react` for tests.
- Use the `prepublishOnly` npm script so that the `dist` directory does not need to be checked in.

## [1.2.0] - 2018-12-24

### Added

- The lines no longer overlap with the text on `PieChart` by virtue of the text alignment being adjusted based on how far around the circle the label is.
- The ability to export to `.png`.

## [1.1.1] - 2018-12-07

### Changed

- Properly escape fields in CSV when exporting.
- Properlty display ellipsized keys on charts.

## [1.1.0] - 2018-12-07

### Added

- The `rotateKeys` option on `VerticalBarChart`.

### Changed

- The `dy` of the `PieChart` label to be in terms of the overall SVG instead of `em`s.

### Removed

- Remove 0s on `HorizontalBarChart` and `VerticalBarChart`.
- Remove rounded mean display.

## [1.0.4] - 2018-12-04

### Changed

- Enforce `box-sizing: content-box` on the export SVG icons in case normalizer is being used.

## [1.0.3] - 2018-12-04

### Changed

- Cut off the keys when they get too long.
- Lower the size of the export icons.

## [1.0.2] - 2018-12-04

### Added

- Handle case when no data is available.

## [1.0.1] - 2018-12-03

### Added

- The ability to support a `className` prop on all three chart types.

### Changed

- The height on the export buttons from `1.5em` to `40px` to be more consistent.
- Moved the info box up higher to support smaller screens.

### Removed

- The `module` directive from `package.json` since we need `preset-react` in order for it to work.

## [1.0.0] - 2018-12-03

### Added

- Initial release 🎉

[unreleased]: https://github.com/CultureHQ/charts/compare/v1.2.2...HEAD
[1.2.2]: https://github.com/CultureHQ/charts/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/CultureHQ/charts/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/CultureHQ/charts/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/CultureHQ/charts/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/CultureHQ/charts/compare/v1.0.4...v1.1.0
[1.0.4]: https://github.com/CultureHQ/charts/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/CultureHQ/charts/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/CultureHQ/charts/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/CultureHQ/charts/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/CultureHQ/charts/compare/9508ac...v1.0.0

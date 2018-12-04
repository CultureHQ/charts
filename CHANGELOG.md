# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/CultureHQ/components/compare/v1.0.4...HEAD
[1.0.4]: https://github.com/CultureHQ/components/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/CultureHQ/components/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/CultureHQ/components/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/CultureHQ/components/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/CultureHQ/components/compare/9508ac...v1.0.0

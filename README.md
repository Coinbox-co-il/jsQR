# jsQR — Coinbox fork

JavaScript QR decoder forked from [danimoh/jsQR](https://github.com/danimoh/jsQR)
(`jsqr-es6`), derived from [cozmo/jsQR](https://github.com/cozmo/jsQR). It locates
and decodes QR codes from raw RGBA pixels in a browser or Node.js.

For camera access, image-file loading and continuous scanning, use
[Coinbox's QR scanner](https://github.com/Coinbox-co-il/qr-scanner).

## Installation

Install the GitHub release under the existing package name:

```sh
npm install jsqr-es6@https://github.com/Coinbox-co-il/jsQR/releases/download/v1.4.3/coinbox-co-il-jsqr-1.4.3.tgz --save
```

ES module:

```js
import jsQR from "jsqr-es6";
```

CommonJS:

```js
const jsQR = require("jsqr-es6");
```

For direct browser use, copy `dist/jsQR.js` and import it as a module:

```html
<script type="module">
    import jsQR from 'path/to/jsQR.js';
</script>
```

## Usage

```js
const code = jsQR(imageData.data, imageData.width, imageData.height, {
    canOverwriteImage: false,
});

if (code) {
    console.log(code.data);
}
```

### Arguments

- `imageData`: a `Uint8ClampedArray` of RGBA pixels with length `4 * width * height`,
  such as the `data` field of browser `ImageData`.
- `width`, `height`: image dimensions in pixels.
- `options` (optional):
  - `inversionAttempts`: `attemptBoth` (default), `dontInvert`, `onlyInvert` or
    `invertFirst`. Inversion also detects light QR modules on dark backgrounds;
    trying both polarities costs more work than trying one.
  - `canOverwriteImage`: `true` by default to reuse the input buffer. Set `false`
    when the image pixels must remain unchanged.
  - `greyScaleWeights`: `{ red, green, blue, useIntegerApproximation? }` controls
    RGB conversion. Defaults to `{ red: 0.2126, green: 0.7152, blue: 0.0722,
    useIntegerApproximation: false }`. Use weights totaling 1 for floating-point
    conversion or 256 when `useIntegerApproximation` is `true`.

### Return value

Returns `null` if no QR code is decoded, otherwise:

- `binaryData`: raw QR bytes as `number[]`.
- `data`: decoded text.
- `chunks`: decoded QR segments.
- `version`: QR version.
- `location`: `{ x, y }` coordinates for `topRightCorner`, `topLeftCorner`,
  `bottomRightCorner`, `bottomLeftCorner`, `topRightFinderPattern`,
  `topLeftFinderPattern`, `bottomLeftFinderPattern`, and an optional
  `bottomRightAlignmentPattern`.
- `matrix`: the extracted QR `BitMatrix`.

See the [TypeScript definitions](./dist/index.d.ts) for the complete types.

## Development and releases

Use Node 26:

```sh
npm ci
npm run check
```

`check` typechecks, builds ES module and CommonJS bundles with TypeScript and
esbuild, checks the published declarations with NodeNext resolution, then runs
Jest. `npm run build` builds without testing.

The [image fixtures](./tests/end-to-end/) include successful and unsuccessful
decodes; [report.json](./tests/end-to-end/report.json) records the expected
results. Preserve these expectations during tooling changes. For an intentional
decoder change, `npm run generate-test-data` rewrites the fixture outputs and
report; review each changed result before accepting it.

After checks pass, create the tarball locally with `npm pack` and attach it to a
GitHub release. The scanner pins that release URL; consumers do not install the
build tools.

Keep GitHub Actions disabled and run all builds and tests locally; do not add
cloud CI or self-hosted test runners. Coinbox's manual Patch Tuesday procedure
reviews upstream changes and dependency updates.

Report issues in [this fork](https://github.com/Coinbox-co-il/jsQR/issues).
See [LICENSE](./LICENSE) for attribution and licence terms.

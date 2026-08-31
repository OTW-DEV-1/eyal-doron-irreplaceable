import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  { ignores: ['.next/**', 'node_modules/**'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Several images are deliberately oversized and positioned by CSS, and
      // next/image would need per-image dimensions the design does not fix.
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config

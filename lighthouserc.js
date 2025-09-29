module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/projects',
        'http://localhost:3000/projects/propsage',
        'http://localhost:3000/projects/stocksense',
        'http://localhost:3000/about',
        'http://localhost:3000/contact'
      ],
      settings: {
        chromeFlags: '--no-sandbox --headless --disable-gpu'
      },
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'speed-index': ['error', { maxNumericValue: 3000 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
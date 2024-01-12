function metaDesc(description) {
  return `
    <meta name="description" content="${ description }" />
    <meta name='twitter:description' content="${ description }" />
    <meta property='og:description' content="${ description }" />
  `;
}

function metaImage(ogImage) {
  return `
    <meta property='og:image' content="${ ogImage }" />
    <meta name='twitter:image' content="${ ogImage }" />
  `;
}

export default function({ page, title = 'Audio TESS', description, ogImage }){
  return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Audio TESS" />
    <meta property='og:url' content="https://zooniverse.github.io/audio-tess${ page.url }" />
    <meta property='og:title' content="${ title }" />
    ${ description ? metaDesc(description) : ''}
    ${ ogImage ? metaImage(ogImage) : ''}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@pekingspring" />
    <meta name="twitter:site" content="@pekingspring" />
    <title>${ title }</title>
  `
};

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { siteContent } from './src/data/siteContent.js';

function localSeoPlugin() {
  return {
    name: 'local-seo-plugin',
    transformIndexHtml(html) {
      const socialImageExists = true; // verified at public/images/social/social-share-1200x630.webp
      const imageUrl = `${siteContent.brand.siteUrl}images/social/social-share-1200x630.webp`;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Electrician',
        name: siteContent.brand.name,
        url: siteContent.brand.siteUrl,
        telephone: siteContent.contact.phoneTel,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteContent.contact.address.district,
          addressLocality: siteContent.contact.address.city,
          postalCode: siteContent.contact.address.postalCode,
          addressCountry: 'SA',
        },
        sameAs: [
          siteContent.socialLinks.instagram?.url,
          siteContent.socialLinks.facebook?.url,
        ].filter(Boolean),
      };

      // Replace or insert JSON-LD and key meta tags
      const jsonLdScript = `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`;

      return html.replace(
        /<\/head>/i,
        `${jsonLdScript}\n  </head>`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localSeoPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});

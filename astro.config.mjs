import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/conics-app',
  integrations: [
    starlight({
      title: '🔮 Conics Explorer',
      description: 'Interactive visualizations of conic sections and lattice intersections',
      social: {
        github: 'https://github.com/your-username/conics-app',
      },
      sidebar: [
        {
          label: '🌟 Getting Started',
          items: [
            { label: 'Welcome', link: '/' },
            { label: 'About Conics', link: '/about/' },
            { label: 'Color Code System', link: '/color-system/' },
          ],
        },
        {
          label: '📐 Conic Sections',
          items: [
            { label: '📈 Parabolas', link: '/parabolas/' },
            { label: '⭕ Circles', link: '/circles/' },
            { label: '🥚 Ellipses', link: '/ellipses/' },
            { label: '🔄 Hyperbolas', link: '/hyperbolas/' },
            { label: '🔮 General Conics', link: '/general-conics/' },
          ],
        },
        {
          label: '👼 Special Features',
          items: [
            { label: '😇 Angels Explorer', link: '/angels/' },
            { label: '🎨 Gallery', link: '/gallery/' },
            { label: '🔧 Spare Parts', link: '/spare-parts/' },
          ],
        },
        {
          label: '📋 Documentation',
          items: [
            { label: '📝 Corporate Solutions', link: '/corporate-solutions/' },
            { label: '📊 Project Plan', link: '/project-plan/' },
            { label: '⚙️ Setup Guide', link: '/setup/' },
            { label: '🔨 Todo List', link: '/todo/' },
          ],
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      components: {
        // Override default components if needed
      },
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  trailingSlash: 'ignore',
});

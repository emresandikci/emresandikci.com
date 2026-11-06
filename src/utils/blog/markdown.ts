import Shiki, { type MarkdownItShikiOptions } from '@shikijs/markdown-it';
import MarkdownIt from 'markdown-it';

let renderer: Promise<ReturnType<typeof MarkdownIt>> | undefined;

async function createRenderer() {
  const md = MarkdownIt({ html: false, linkify: true, typographer: true });
  md.use(
    await Shiki({
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      // Shiki always has plain text loaded, but its type only lists bundled grammars.
      fallbackLanguage: 'text' as 'tex',
      // Keep the themes but lift the colors under 4.5:1 on their backgrounds.
      colorReplacements: {
        'github-light': { '#e36209': '#bc4c00' },
        'github-dark': { '#6a737d': '#959da5' },
      },
      transformers: [
        {
          // Shiki makes the scrollable pre focusable, so give it a role and a name.
          pre(node) {
            node.properties.role = 'group';
            node.properties['aria-label'] = 'Code sample';
          },
        },
      ],
      // The plugin forwards every option to Shiki, but its type omits colorReplacements.
    } as MarkdownItShikiOptions)
  );
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    if (/^https?:\/\//.test(String(tokens[idx].attrGet('href')))) {
      tokens[idx].attrSet('target', '_blank');
      tokens[idx].attrSet('rel', 'noreferrer');
    }
    return self.renderToken(tokens, idx, options);
  };
  return md;
}

export async function renderMarkdown(body: string) {
  renderer ??= createRenderer();
  return (await renderer).render(body);
}

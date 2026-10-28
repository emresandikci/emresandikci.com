import Shiki from '@shikijs/markdown-it';
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
    })
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

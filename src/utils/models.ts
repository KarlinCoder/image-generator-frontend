export interface IModel {
  name: string;
  base_provider: string;
  providers: string;
  website: string;
}

export const models: Array<IModel> = [
  {
    name: "sd-3.5",
    base_provider: "Stability AI",
    providers: "1+ Providers",
    website: "huggingface.co",
  },
  {
    name: "flux",
    base_provider: "Black Forest Labs",
    providers: "5+ Providers",
    website: "github.com/black-forest-labs/flux",
  },
  {
    name: "flux-pro",
    base_provider: "Black Forest Labs",
    providers: "1+ Providers",
    website: "huggingface.co",
  },
  {
    name: "flux-dev",
    base_provider: "Black Forest Labs",
    providers: "4+ Providers",
    website: "huggingface.co",
  },
  {
    name: "flux-schnell",
    base_provider: "Black Forest Labs",
    providers: "4+ Providers",
    website: "huggingface.co",
  },
  {
    name: "dall-e-3",
    base_provider: "OpenAI",
    providers: "5+ Providers",
    website: "openai.com",
  },
  {
    name: "midjourney",
    base_provider: "Midjourney",
    providers: "1+ Providers",
    website: "docs.midjourney.com",
  },
];

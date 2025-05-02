import supabase from "./supabase";

export const addRequestToDB = async (
  prompt: string,
  model: string,
  translated: boolean,
  translated_prompt: string,
  image_url: string
) => {
  try {
    const { error } = await supabase
      .from("txt2img_prompts")
      .insert({ prompt, model, translated, translated_prompt, image_url });

    if (error) throw error;
    return "done";
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  }
};

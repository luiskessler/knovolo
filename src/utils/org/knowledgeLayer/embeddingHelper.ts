import pdfParse from "pdf-parse"

export async function generateEmbedding(input: string) {
  const type = detectType(input);
  const buffer = await Buffer.from(input, 'base64');

  switch (type) {
    case 'text':
      return await textEmbedding(input as string); // using multilingual model
    case 'image':
        return await imageEmbedding(input); // e.g., CLIP
    //case 'audio':
      //const transcript = await transcribeAudio(input as File);
      //return await textEmbedding(transcript);
    case 'pdf':
      const content = await extractTextFromPDF(input);
      return await textEmbedding(content!);
    default:
      throw new Error("Unsupported type");
  }
}

function detectType(input: File | string): 'text' | 'image' | 'audio' | 'pdf' {
  if (typeof input === 'string') {
      return 'text';
  }
  const type = input.type.split('/')[0];
  if (type === 'image') {
      return 'image';
  }
  if (type === 'application') {
      return input.name.endsWith('.pdf') ? 'pdf' : 'text';
  }
  throw new Error("Unsupported file type");
}

const textEmbedding = async (text: string) => {
//placeholder 
};

const imageEmbedding = async (image: string) => {
//placeholder 
};

const transcribeAudio = async (audio: string) => {
//placeholder 
};

const extractTextFromPDF = async (pdf: string) => {
    //placeholder
};

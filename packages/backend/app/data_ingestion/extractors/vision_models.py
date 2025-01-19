import os
import fitz  # PyMuPDF
from PIL import Image
from transformers import AutoProcessor, VisionEncoderDecoderModel
import torch
from tqdm import tqdm
import shutil

class NougatExtractor:
    """
    Handles PDF text extraction using the Nougat model (Vision Transformer).
    Converts PDF pages to images and extracts Markdown-formatted text.
    """
    def __init__(self, model_name="facebook/nougat-small"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Device found: {self.device}")

        # Load Nougat model and processor
        self.processor = AutoProcessor.from_pretrained(model_name)
        self.model = VisionEncoderDecoderModel.from_pretrained(model_name)
        self.model.to(self.device)

    def _pixmap_to_pil(self, pixmap):
        """
        Convert PyMuPDF pixmap to PIL Image.
        """
        mode = "RGB" if pixmap.n == 3 else "L"
        img_bytes = pixmap.samples
        size = (pixmap.width, pixmap.height)
        return Image.frombytes(mode, size, img_bytes)

    def extract(self, pdf_path, output_dir):
        """
        Extract text as Markdown from a PDF using Nougat.
        Args:
            pdf_path (str): Path to the input PDF.
            output_dir (str): Directory to save the output Markdown file.
        Returns:
            str: Extracted Markdown text.
        """
        print("Starting Nougat-based extraction...")
        markdown = ""
        pdf_document = fitz.open(pdf_path)

        # Create a temporary directory for images
        temp_image_dir = os.path.join(output_dir, "temp_images")
        os.makedirs(temp_image_dir, exist_ok=True)

        # Convert PDF pages to images and process them
        pixel_values = []
        for page_number in range(len(pdf_document)):
            page = pdf_document.load_page(page_number)
            pix = page.get_pixmap()
            image_path = os.path.join(temp_image_dir, f"page_{page_number + 1}.png")
            pix.save(image_path)

            # Convert to PIL image and process
            image = self._pixmap_to_pil(pix)
            inputs = self.processor(images=image, return_tensors="pt").pixel_values.to(self.device)
            pixel_values.append(inputs)

        # Generate text from images
        for i, inputs in enumerate(tqdm(pixel_values, desc="Processing images")):
            try:
                outputs = self.model.generate(
                    inputs,
                    min_length=1,
                    max_new_tokens=4096,
                    bad_words_ids=[[self.processor.tokenizer.unk_token_id]],
                )
                sequence = self.processor.batch_decode(outputs, skip_special_tokens=True)[0]
                sequence = self.processor.post_process_generation(sequence, fix_markdown=True)
                markdown += sequence
            except Exception as e:
                print(f"Error on page {i + 1}: {e}")
                markdown += f"\n\n**Note**: Failed to process page {i + 1}.\n\n"

        # Clean up temporary images
        shutil.rmtree(temp_image_dir)
        print("Temporary images deleted.")

        pdf_document.close()
        return markdown

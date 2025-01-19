from docling.document_converter import DocumentConverter
import spacy
import fitz
import os
import subprocess
from .base_extractor import DocumentExtractor
from src.utils.file_management import preserve_structure
from src.data_ingestion.extractors.vision_models import NougatExtractor


class PDFExtractor(DocumentExtractor):
    """
    PDF-specific implementation of the DocumentExtractor.
    """

    def __init__(self, source_path, output_dir, enable_fallback=True):
        super().__init__(source_path, output_dir)
        self.model_name = "de_core_news_sm"
        self.enable_fallback = enable_fallback  # Flag to enable fallback to extraction methods
        self._ensure_spacy_model()
        self.nlp = spacy.load(self.model_name)

    def _ensure_spacy_model(self):
        """
        Checks if the SpaCy model is available, and downloads it if not.
        """
        try:
            spacy.load(self.model_name)
        except OSError:
            print(f"Model '{self.model_name}' not found. Downloading...")
            subprocess.run(["python", "-m", "spacy", "download", self.model_name], check=True)
            print(f"Model '{self.model_name}' downloaded successfully.")

    def _extract_images(self, save_dir):
        """
        Extract images from the PDF using pdf2image.
        """
        print("Checking for images in the PDF...")
        pdf_document = fitz.open(self.source_path)
        image_dir = os.path.join(save_dir, "attachments")
        os.makedirs(image_dir, exist_ok=True)

        image_count = 0
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]
            for img_index, img in enumerate(page.get_images(full=True)):
                xref = img[0]
                base_image = pdf_document.extract_image(xref)
                image_bytes = base_image["image"]
                image_path = os.path.join(image_dir, f"image_{image_count}.png")
                with open(image_path, "wb") as image_file:
                    image_file.write(image_bytes)
                image_count += 1
        pdf_document.close()
        print(f"Extracted {image_count} images from the PDF.")
        return image_count

    def _fallback_extract(self):
        """
        Fallback to text extraction if text extraction fails or not all text is extracted.
        this method will use vision transformer (nougat) as a fallback method.
        """
        print("Primary extraction failed, using vision transformer as fallback method. this method is computationally"
              " expensive.")

        # TODO - Implement fallback extraction method with Noguat model (vision transformer)
        nougat = NougatExtractor()
        text = nougat.extract(self.source_path, self.output_dir)
        return text

    def extract(self):
        """
        Extract text and structure from PDF using Docling.
        if the primary extraction fails, fallback to text extraction.
        it also extracts images.
        """
        print(f"Extracting content from PDF: {self.source_path}")
        save_dir = preserve_structure(self.source_path, self.output_dir)

        # Step 1 : Docling text extraction
        converter = DocumentConverter()
        result = converter.convert(self.source_path)
        content = result.document.export_to_markdown()

        # Step 2 : Fallback to text extraction if content is empty or too short
        if len(content) < 100 and self.enable_fallback:
            content = self._fallback_extract()

        # Step 3 : Extract images
        image_count = self._extract_images(save_dir)

        if not content and image_count == 0:
            print("No content extracted. Please check the PDF and extraction methods.")

        return content

    def normalize(self, content):
        """
        Normalize extracted text using SpaCy (e.g., clean, tokenize).
        """
        print("Normalizing content...")
        doc = self.nlp(content)
        normalized_text = "\n".join([sent.text for sent in doc.sents])
        return normalized_text

    def save(self, content, output_filename):
        """
        Save file while preserving folder structure.
        """
        save_dir = preserve_structure(self.source_path, self.output_dir)
        output_path = os.path.join(save_dir, output_filename)

        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"File saved to: {output_path}")

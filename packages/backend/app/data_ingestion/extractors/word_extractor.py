import os
from .base_extractor import DocumentExtractor
from src.utils.file_management import preserve_structure
from docling.document_converter import (
    DocumentConverter,
    WordFormatOption,
)

from docling.pipeline.simple_pipeline import SimplePipeline
from docling.backend.msword_backend import MsWordDocumentBackend
from docling.datamodel.base_models import InputFormat


class WordExtractor(DocumentExtractor):
    """
    Word-specific implementation of the DocumentExtractor.
    Supports DOCX files using Docling's MsWordDocumentBackend.
    """

    def __init__(self, source_path, output_dir):
        super().__init__(source_path, output_dir)
        self.allowed_formats = [InputFormat.DOCX]
        self.format_options = {
            InputFormat.DOCX: WordFormatOption(
                pipeline_cls=SimplePipeline, # backend=MsWordDocumentBackend
            )
        }
        self.converter = DocumentConverter(
            allowed_formats=self.allowed_formats, format_options=self.format_options
        )

    def _extract_images(self, save_dir):
        pass

    def extract(self):
        """
        Extract text from Word documents using MsWordDocumentBackend.
        """
        try:
            # Perform conversion
            conv_results = self.converter.convert_all([self.source_path])

            # Extract text from results
            text = ""
            for result in conv_results:
                text += result.document.export_to_markdown()

            if not text.strip():
                print("No text extracted from the document. (TODO extend)")

            return text

        except Exception as e:
            print(f"Error during Word extraction: {e}")
            return ""

    def normalize(self, content):
        """
        Normalize extracted text.
        """
        print("Normalizing extracted content...")
        normalized_text = "\n".join([line.strip() for line in content.splitlines() if line.strip()])
        return normalized_text

    def save(self, content, output_filename):
        """
        Save the normalized content as a Markdown file, preserving folder structure.
        """
        save_dir = preserve_structure(self.source_path, self.output_dir)
        output_path = os.path.join(save_dir, output_filename)

        with open(output_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"File saved to: {output_path}")

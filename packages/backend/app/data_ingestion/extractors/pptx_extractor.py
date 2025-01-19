import os
from .base_extractor import DocumentExtractor
from docling.backend.pypdfium2_backend import PyPdfiumDocumentBackend
from src.utils.file_management import preserve_structure
from docling.document_converter import (
    DocumentConverter,
    PdfFormatOption,
    WordFormatOption,
)

from docling.pipeline.simple_pipeline import SimplePipeline
from docling.pipeline.standard_pdf_pipeline import StandardPdfPipeline
from docling.datamodel.base_models import InputFormat


class PPTXExtractor(DocumentExtractor):
    """
    Word-specific implementation of the DocumentExtractor.
    Supports DOCX files using Docling's MsWordDocumentBackend.
    """

    def __init__(self, source_path, output_dir):
        super().__init__(source_path, output_dir)
        self.allowed_formats = [InputFormat.PPTX]
        # self.format_options = {
        #     InputFormat.PDF: PdfFormatOption(
        #         pipeline_cls=StandardPdfPipeline, backend=PyPdfiumDocumentBackend
        #     ),
        #     InputFormat.DOCX: WordFormatOption(
        #         pipeline_cls=SimplePipeline  # , backend=MsWordDocumentBackend
        #     ),
        # },

        self.converter = DocumentConverter(
            allowed_formats=self.allowed_formats,
            # format_options=self.format_options
        )

    def _extract_images(self, save_dir):
        pass

    def extract(self):
        """
        Extract text from Word documents using MsWordDocumentBackend.
        """
        try:
            # Perform conversion
            conv_results = self.converter.convert(self.source_path)
            # Extract text
            text  = conv_results.document.export_to_markdown()

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

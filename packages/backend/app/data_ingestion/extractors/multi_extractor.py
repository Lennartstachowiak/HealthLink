import os
from src.data_ingestion.extractors.pdf_extractor import PDFExtractor
from src.data_ingestion.extractors.word_extractor import WordExtractor
from src.data_ingestion.extractors.pptx_extractor import PPTXExtractor
from src.utils.file_management import get_files_from_directory


class MultiFileExtractor:
    """
    Handles extraction and normalization for multiple file types in a directory.
    Supports PDFs, Word, and PPTX files (can be extended).
    """
    SUPPORTED_EXTENSIONS = {
        '.pdf': PDFExtractor,
        '.docx': WordExtractor,
        '.pptx': PPTXExtractor
    }

    def __init__(self, source_dir, output_dir):
        self.source_dir = source_dir
        self.output_dir = output_dir

    def process(self):
        """
        Process all supported files in the source directory while preserving file structure.
        """
        files = get_files_from_directory(self.source_dir, extensions=self.SUPPORTED_EXTENSIONS.keys())
        print(f"Found {len(files)} supported files.")

        for file_path in files:
            extension = os.path.splitext(file_path)[1].lower()
            extractor_class = self.SUPPORTED_EXTENSIONS.get(extension)

            if extractor_class:
                print(f"Processing file: {file_path}")
                extractor = extractor_class(file_path, self.output_dir)
                extractor.process()
            else:
                print(f"Unsupported file type: {file_path}")

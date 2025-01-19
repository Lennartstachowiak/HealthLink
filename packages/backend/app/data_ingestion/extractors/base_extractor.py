import os
from abc import ABC, abstractmethod


class DocumentExtractor(ABC):
    """
    Base class for document extraction. Defines common methods for all file types.
    """

    def __init__(self, source_path, output_dir):
        self.source_path = source_path
        self.output_dir = output_dir

    @abstractmethod
    def extract(self):
        """Extract content from the source document."""
        pass

    @abstractmethod
    def normalize(self, content):
        """Normalize extracted content (e.g., clean, preprocess)."""
        pass

    def save(self, content, output_filename):
        """
        Save content to the specified output file.
        Preserves file structure if folders are given.
        """
        relative_path = os.path.relpath(self.source_path, start=os.path.commonpath([self.source_path]))
        save_dir = os.path.join(self.output_dir, os.path.dirname(relative_path))
        os.makedirs(save_dir, exist_ok=True)

        output_path = os.path.join(save_dir, output_filename)
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"File saved to: {output_path}")

    def process(self):
        """
        Full pipeline: Extract -> Normalize -> Save
        """
        print(f"Processing file: {self.source_path}")
        content = self.extract()
        normalized_content = self.normalize(content)
        filename = "text" + ".md"
        self.save(normalized_content, filename)
        return normalized_content

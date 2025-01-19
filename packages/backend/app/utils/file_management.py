import os


def pjoin(*args, **kwargs):
    '''Join path components intelligently for the target platform.
     This is needed to avoid problems if the script runs under windows and the target platform is linux.'''
    return os.path.join(*args, **kwargs).replace(os.path.sep, '/')


def get_files_from_directory(directory, extensions=None):
    """
    Recursively list all files in a directory matching the given extensions.
    """
    file_list = []
    for root, _, files in os.walk(directory):
        for file in files:
            if extensions is None or file.lower().endswith(tuple(extensions)):
                file_list.append(os.path.join(root, file))
    return file_list


def preserve_structure(source_file, output_dir):
    """
    Returns the output path to preserve folder structure.
    """
    relative_path = os.path.relpath(source_file, start=os.path.commonpath([source_file]))
    filename = os.path.splitext(os.path.basename(source_file))[0]
    save_dir = os.path.join(output_dir, os.path.dirname(relative_path), filename)
    os.makedirs(save_dir, exist_ok=True)
    return save_dir

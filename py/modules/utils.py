import os
import random
from numba import jit

@jit(nopython=True)
def _y_equation(x, c1_, c2_, y1_, y2_):
    return x + c1_ * y1_ + c2_ * y2_

@jit(nopython=True)
def _x_equation(y, c1_, c2_, y1_, y2_):
    return y - c1_ * y1_ - c2_ * y2_

@jit(nopython=True)
def _f(x, type = None):
    if type == "file":
        return ((x+1) % 2) - 1
    # text
    return (x % 2) - 1

class CipherVerseUtils:
    def f(self, x, type = None):
        return _f(x, type)

    # using numba to speed up the process
    def y_equation(self, x, c1_, c2_, y1_, y2_):
        return _y_equation(x, c1_, c2_, y1_, y2_)
    
    def x_equation(self, y, c1_, c2_, y1_, y2_):
        return _x_equation(y, c1_, c2_, y1_, y2_)

    def key_stream(self, key, c1, c2, y1, y2, type = None):
        key_results = []
        y = [y1, y2]
        for i in range(len(key)):
            y_n = self.f(self.y_equation(ord(key[i]), c1, c2, y[0], y[1]), type)
            key_results.append(y_n)
            y[1], y[0] = y[0], y_n
        return key_results
    
    def convert_file_extension(self, path, new_extension):
        # Split the file path into directory path, base filename, and extension
        directory, file_name = os.path.split(path)
        base, extension = os.path.splitext(file_name)
        
        # If the extension is already the same, return the original path
        if extension.lower() == new_extension:
            return path
        
        # Construct the new file path with '.png' extension
        new_file_path = os.path.join(directory, base + new_extension)
        return new_file_path

if __name__ == "__main__":
    # test f function with file type and text type, should return -1 and 1 respectively
    utils = CipherVerseUtils()
    
    for i in range(50):
        random_float = random.random()
        f_file = utils.f(random_float, "file")
        f_text = utils.f(random_float, "text")
        assert f_file >= -1 and f_file <= 1 
        assert f_text >= -1 and f_text <= 1
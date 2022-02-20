import os

'''
 A simple helper tool that imports 
 and exports all components in a single file. (@components/lib)
'''

dir_path = os.path.dirname(os.path.realpath(__file__))
f = open(dir_path + "/lib.js", "w+")
for file in os.listdir(dir_path):
    if file[-4:] != ".jsx": continue
    f.write(f"export {{default as {file[0].upper() + file[1:-4]}}} from '@components/{file}';\n")
f.close()
print("Operation Completed")
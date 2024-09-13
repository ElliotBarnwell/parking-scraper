import json
import subprocess
import sys
import difflib

class RunParkingSpider:
    def __init__(self) -> None:
        subprocess.run(f"scrapy runspider -O parking-spots-new.json src/scraper/get_parking_spider.py", shell=True, stdout=sys.stdout, stderr=subprocess.STDOUT)
        #fileCompare('parking-spots.json', 'parking-spots-new.json')
# def fileCompare(oldfp, newfp) -> None:
#     oldFile = open(oldfp, 'r')
#     oldFileContent = oldFile.read()
#     newFile = open(newfp, 'r')
#     newFileContent = newFile.read()
#     diff = get_json_diff(oldFileContent, newFileContent)
#     print(f"diff: {diff}")
#     if diff != "":
#         create_email_content(diff)
#     oldFile.close()
#     newFile.close()

# def compare_file_content(oldFile, newFile) -> str:
#     diff = difflib.ndiff(oldFile, newFile)
#     return ''.join(diff)

# def get_json_diff(json1: str, json2: str) -> dict:
#     dict1 = json.loads(json1)
#     dict2 = json.loads(json2)
    
#     diff = {}
    
#     # Find keys that are only in dict2 (new additions)
#     for key in dict2:
#         if key not in dict1:
#             diff[key] = {"added": dict2[key]}
#         elif dict1[key] != dict2[key]:
#             diff[key] = {"old": dict1[key], "new": dict2[key]}
    
#     # Find keys that were removed from dict1 in dict2
#     for key in dict1:
#         if key not in dict2:
#             diff[key] = {"removed": dict1[key]}
    
#     return diff

def create_email_content(diff: str) -> None:
    f = open('email_content.txt', 'w+')
    f.write(diff)
    f.close

def main():
   RunParkingSpider()

if __name__ == "__main__":
    main()
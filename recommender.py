import time
import os
start_time = time.time()
from imports import *
from get_urls import *
import pandas as pd
import json

class GET_DIFFICULTY(GET_URLS):
    """
        This class is used to get the difficulty measure of the websites returned
        by Google API, three measure together are used which are Flesch reading score, SMOG index and
        Dale Chall score.
    """
    def __init__(self, query, difficulty):
        self.query = query
        self.difficulty = difficulty
        super().__init__(query)
        self.text = ''
        self.avg_diff = {}
        self.df = pd.DataFrame()

    def read_urls(self):
        """
            This function will initiate the whole process, send a query, fetch the results, and get them evaluated.
            It returns the difficulty levels of each URL.
        """
        
        self.fetch_urls()
        with open(self.file_name, 'r') as f:
            for url in f.readlines():
                try:
                    response = urllib.request.urlopen(url)
                except:
                    continue
                
                with open("test.pdf", 'wb') as file:
                    file.write(response.read())

                with open("test.pdf", "rb") as f:
                    try:
                        pdf = PdfFileReader(f)
                    except:
                        continue
                    try:
                        info = pdf.getDocumentInfo()
                        pages = pdf.getNumPages()
                    except:
                        continue
                    #print ("number of pages: %i" % pages)
                    for i in range(pages):
                        if i < 20:
                            page = pdf.getPage(i)
                            self.text  += page.extractText()
                        else:
                            break
                    self.evaluate_difficulty(url)
                
            
        return self.return_results()
                
        
    def evaluate_difficulty(self, url):
        """
            To get a measure of difficulty for the documents.
        """
        self.avg_diff[url] = textstat.smog_index(self.text)

    def return_results(self):
        """
            This is the final function that is called to evaluate the results based on the difficulty level. Returns 5 urls.
        """
        flag = ""
        res = []
        res_easy = []
        res_medium = []
        res_hard = []
        
        seen = set()
        sorted_results = []
        sorted_diff = sorted(self.avg_diff)
        for item in sorted_diff:
            if item not in seen:
                seen.add(item)
                sorted_results.append(item)
        size = len(sorted_results) - 1
        
        print("The number of URLs fetched after filtering are:",size + 1)
                
        flag = self.difficulty.lower()

        print("The URLs for "+self.difficulty+ " difficulty are:")

        for i in range(0, 5):
            if flag == "easy":
                print(sorted_results[i])
            res_easy.append(sorted_results[i][:-1])
        res.append("easy")
        mid = int(size/2)

        for i in range(mid-2, mid+3):
            if flag == "medium":
                print(sorted_results[i])
            res_medium.append(sorted_results[i][:-1])
        res.append("medium")

        for i in range(0, 5):
            if flag == "hard":
                print(sorted_results[i])
            res_hard.append(sorted_results[size-i][:-1])
        res.append("hard")
        self.df['DifficultyLevel'] = res
        self.df['URLs'] = [res_easy,res_medium,res_hard]
        return self.df
                
def results(topicandlevel):
    flag = 0
    obj1 = GET_DIFFICULTY(topicandlevel.rsplit(' ', 1)[0], topicandlevel.split()[-1])
    df = obj1.read_urls()
    df['Topic'] = topicandlevel.rsplit(' ', 1)[0]
    #print(df)
    df_to_dict = df.to_dict('r')
    file_exist=os.path.exists("data.js")

    with open('data.js', 'r+' if file_exist else 'w') as json_file:
        if (file_exist):
            data_all = json.load(json_file)
            if not any(df['Topic'][0] == d['Topic'] for d in data_all):
                data_all.extend(df_to_dict)
                json_file.truncate(0)
                json_file.seek(0)
                json.dump(data_all, json_file, ensure_ascii=False, indent=4)
        else:
            json.dump(df_to_dict, json_file, ensure_ascii=False, indent=4)
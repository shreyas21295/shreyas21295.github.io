# Scribes-recommender-system
A recommender system for students to get lectures notes and scribes personalized with three options(Easy, medium and Hard)

There are three important files, [get_urls.py](https://github.com/shreyas21295/shreyas21295.github.io/blob/main/get_urls.py), [recommender.py](https://github.com/shreyas21295/shreyas21295.github.io/blob/main/recommender.py) and [imports.py](https://github.com/shreyas21295/shreyas21295.github.io/blob/main/imports.py). Need to have all of these files in the same folder for it to work. The [recommender.py](https://github.com/shreyas21295/shreyas21295.github.io/blob/main/recommender.py) contains the core of the project.

An easy way to run the code would be run the [EduRecoSys.ipynb](https://github.com/shreyas21295/shreyas21295.github.io/blob/main/EduRecoSys.ipynb) Jupyter Notebook, preferably in Anaconda.

It could also be either run on command prompt or as a module. On command promt the arguments are optional, make changes in the main file to get results for that query and specify the difficulty level. The script returns top 5 urls as a result.

The results can also be viewed on the [web page](https://shreyas21295.github.io) for the following topics:
GPU sharing, expectation maximization, learning to rank, unsupervised learning. (make sure there aren't any spelling mistakes or white spaces :p)


Mechanics:
- The query given by the user is sent to the Google Search API which returns the results in the form of URLs. Picking first 50 results.
- Saving these urls to a file and then reading each url to access files in it(focusing on just the pdf files).
- Reading pdfs in each of these URLs to get the readability measure of that document. This measure is used as a surrogate to judge the difficulty level. The     measure used is SMOG index. To get a fair measure average of all these values are used.
- Using top 10 returned results along with the measures for final output.
- Sorting these 10 records, and returning 5 based on the difficulty measure given by the user.

# synonymous
## Source Data
I initially started looking for an API to use as my thesaurus to lookup synonyms, but considering API limitations, I instead searched for a synonyms database, and I found a source through [StackOverflow](http://stackoverflow.com/a/4175371/1881379).

The data source for synonyms is the thesaurus for OpenOffice.org that's derived from the WordNet project. The raw data is in the file th_en_US_v2.dat, and the structure is described in data_layout.txt. 

The .dat file is not perfect, so I did some massaging and formatted it into a JSON file with parse_thesaurus.py. The thesaurus is located at thesaurus.json, and an example of the translation from the .dat to JSON file is in thesaurus.example.json.txt.

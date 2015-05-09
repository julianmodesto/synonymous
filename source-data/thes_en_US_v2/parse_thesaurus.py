import re, json, io

thesaurus = []

with open('th_en_US_v2.dat') as fp:
	encoding = fp.readline().rstrip('\n')
	lineNumber = 1
	numberOfMeanings = 0
	for line in fp:
		lineNumber += 1
		line = line.rstrip('\n').split("|")
		if len(line) == 2 and not (line[0].startswith("(") and line[0].endswith(")")):
			word = line[0]
			if numberOfMeanings != 0:
				print "Unexpected error E at line {}".format(lineNumber)
			numberOfMeanings = int(line[1])
			thesaurusWord = {"word": word, "numberOfMeanings": numberOfMeanings, "meanings": []}
		elif len(line) == 1:
			print "Unexpected error A at line {}".format(lineNumber)
			word = "?"
			if numberOfMeanings != 0:
				print "Unexpected error F at line {}".format(lineNumber)
			numberOfMeanings = int(line[0])
		else:
			numberOfMeanings -= 1
			if numberOfMeanings < 0:
				# more number of meanings than expected
				print "Unexpected error D at line {}".format(lineNumber)
			else:
				meaning = {
				"partOfSpeech": "",
				"synonyms": [],
				"genericTerms": [],
				"relatedTerms": [],
				"similarTerms": [],
				"antonyms": []
				}
				for item in line:
					if item.startswith("(") and item.endswith(")"):
						partOfSpeech = item[1:-1]
						meaning["partOfSpeech"] = partOfSpeech
						continue
					special = re.compile("(.+) \((generic term|related term|similar term|antonym)\)").split(item)
					special = filter(None,special)
					if len(special) == 0:
						# probably encountered "||"
						print "Unexpected error B at line {}".format(lineNumber)
						continue
					elif len(special) == 1:
						synonym = item
						meaning["synonyms"].append(synonym)
					elif len(special) == 2:
						synonym = special[0]
						synonymType = special[1]
						if synonymType == "generic term":
							meaning["genericTerms"].append(synonym)
						elif synonymType == "related term":
							meaning["relatedTerms"].append(synonym)
						elif synonymType == "similar term":
							meaning["similarTerms"].append(synonym)
						elif synonymType == "antonym":
							meaning["antonyms"].append(synonym)
						else:
							print "Unexpected error G at line {}".format(lineNumber)
					else:
						# probably encountered "((", "))", or something unexpected
						print "Unexpected error C at line {}".format(lineNumber)
				thesaurusWord["meanings"].append(meaning)
			if numberOfMeanings == 0:
				thesaurus.append(thesaurusWord)

with open('thesaurus.json', 'w') as outfile:
    json.dump(thesaurus, outfile)
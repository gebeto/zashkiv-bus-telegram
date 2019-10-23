import os
import sys
import random
import asyncio
from utils import create_client

from telethon.tl.types import DocumentAttributeAudio
from hachoir.metadata import extractMetadata
from hachoir.parser import createParser

from io import BufferedReader


from mutagen.easyid3 import EasyID3


client = create_client()
loop = asyncio.get_event_loop()


async def send_audio(caption, filepath):
	parser = createParser(filepath)
	metadata = extractMetadata(parser)

	file = open(filepath, "rb")
	await client.send_file("@relaxound", file, caption=caption, attributes=[DocumentAttributeAudio(
		duration=metadata.get('duration').seconds,
		title=metadata.get('title'),
	)])
	await client.send_file("@relaxound", file, caption=caption)



def ignore_arr_items(arr, ignores):
	return [i for i in arr if not i in ignores]

def replace_arr_items(arr):
	return [i\
		.replace("beautifu", "beautiful")\
		.replace("-", "_")\
		.replace(",","")
	for i in arr]


def get_tags(filename):
	m = os.path.splitext(filename)[0]
	ignores = [".ds_store", "at", "mix", "&", "a", "", "out"]
	tags_strings = m.lower().split(" | ")[-1].split(" ")
	tags = sorted(list(set(tags_strings)))
	tags = ignore_arr_items(tags, ignores)
	tags = replace_arr_items(tags)
	tags.insert(0, "relaxound")
	tags = ["#{}".format(t) for t in tags]
	return tags


script, path, bak_path = sys.argv
music = os.listdir(path)

music_count = len(music)
rand = random.randrange(0, music_count - 1)
print(rand, music_count)

m = music[rand]
# m = "123123.mp3"
tags = get_tags(m)
caption = " ".join(tags)
print(m, caption)
fpath = os.path.join(path, m)
fbakpath = os.path.join(bak_path, m)
print(fpath, fbakpath)
loop.run_until_complete(send_audio(caption, fpath))
# exit()
os.replace(fpath, fbakpath)

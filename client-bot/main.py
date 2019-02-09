from telethon import TelegramClient, sync, events
from glob import glob
import os

import importlib

from modules import bot_forward
from modules import bot_action_print


api_id = os.getenv('TG_ID')
api_hash = os.getenv('TG_HASH')

if not api_id or not api_hash:
	print("Please create ENV vars 'TG_ID' and 'TG_HASH'")
	print("with data from https://my.telegram.org")
	exit(0)

client = TelegramClient('GebetoClient', api_id, api_hash)


# chats = (
# 	'gebeto',
# 	'podlodka',
# 	'gebeto_music',
# 	'simpsons_online',
# 	-1001389649534,
# )
chats = None

for module_path in glob('modules/bot_*.py'):
	base = os.path.basename(module_path)
	module, ext = os.path.splitext(base)
	k = importlib.import_module("modules.{}".format(module))
	k.__init__(client, chats)


client.start()

client.connect()
if not client.is_user_authorized():
    client.send_code_request(phone_number)
    me = client.sign_in(phone_number, input('Enter code: '))

client.run_until_disconnected()
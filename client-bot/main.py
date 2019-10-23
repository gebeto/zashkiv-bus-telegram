from telethon import TelegramClient, sync, events
from glob import glob
import os

import importlib

from modules import bot_forward
from modules import bot_action_print


from utils import create_client



client = create_client()


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

# client.connect()
# if not client.is_user_authorized():
#     client.send_code_request(phone_number)
#     me = client.sign_in(phone_number, input('Enter code: '))

client.run_until_disconnected()
from telethon import TelegramClient, sync, events
import os

import bot_forward
import bot_action_print


api_id = os.getenv('TG_ID')
api_hash = os.getenv('TG_HASH')

if not api_id or not api_hash:
	print("Please create ENV vars 'TG_ID' and 'TG_HASH'")
	print("with data from https://my.telegram.org")
	exit(0)

client = TelegramClient('GebetoClient', api_id, api_hash)


chats = (
	# 'gebeto',
	'podlodka',
	# 'gebeto_music',
	# 'simpsons_online',
	# -1001389649534,
)


bot_action_print.main(client, chats)
bot_forward.main(client, chats)


client.start()
client.run_until_disconnected()
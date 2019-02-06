from telethon import TelegramClient, sync, events
import os


api_id = os.getenv('TG_ID')
api_hash = os.getenv('TG_HASH')

if not api_id or not api_hash:
	print("Please create ENV vars 'TG_ID' and 'TG_HASH'")
	print("with data from https://my.telegram.org")
	exit(0)

client = TelegramClient('HappyNewYear', api_id, api_hash)


chats = (
	# 'gebeto',
	'podlodka',
	# 'gebeto_music',
	# 'simpsons_online',
	# -1001389649534,
)

# new_message_event = events.NewMessage(chats=chats)
new_action_event = events.ChatAction(chats=chats)


# @client.on(new_message_event)
# async def handler_message(event):
# 	print(event)
# 	await event.message.forward_to(-1001389649534)

@client.on(new_action_event)
async def handler_action(event):
	# print("ChatAction", event, event.as_dict())
	print("ChatAction", event)
	print("ACTION", dir(event))


client.start()
client.run_until_disconnected()
from telethon import TelegramClient, sync, events
import requests 
import urllib
import urllib.parse

api_id = 123123
api_hash = '123123123123123123123'

client = TelegramClient('HappyNewYear', api_id, api_hash)


chats = (
	'podlodka',
	'gebeto_music',
)

new_message_event = events.NewMessage(chats=chats)

@client.on(new_message_event)
async def handler(event):
	await event.message.forward_to(-1001389649534)


client.start()
client.run_until_disconnected()
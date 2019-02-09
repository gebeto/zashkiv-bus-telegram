from telethon import events
from telethon.tl.types import PeerUser


def __init__(client, chats):
	new_message_event = events.NewMessage(chats=chats)

	@client.on(new_message_event)
	async def handler_message_hey(event):
		if hasattr(event.message.to_id, 'user_id') and event.message.message == "hey":
			await event.message.reply("HEY YOU!")

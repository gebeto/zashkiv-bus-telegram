from telethon import events


def __init__(client, chats):
	new_message_event = events.NewMessage(chats=chats)
	return

	@client.on(new_message_event)
	async def handler_message(event):
		print(event)
		await event.message.forward_to(-1001389649534)

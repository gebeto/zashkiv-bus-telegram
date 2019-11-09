import os
import sys
import random
import asyncio
import datetime

from telethon.tl.types import PeerUser, PeerChat, PeerChannel, User

from utils import create_client


client = create_client()
loop = asyncio.get_event_loop()

async def main():
	dialogs = await client.get_dialogs()
	dialog = dialogs[43]
	print(dialog)
	print(dialog.id, dialog.name)
	user = dialog.entity
	messages = await client.get_messages(user, 2)
	message = messages[1]
	print(message)
	down = await message.download_media()
	print(down)


loop.run_until_complete(main())
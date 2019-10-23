from telethon import TelegramClient
import os


def create_client():
	api_id = os.getenv('TG_ID')
	api_hash = os.getenv('TG_HASH')

	if not api_id or not api_hash:
		print("Please create ENV vars 'TG_ID' and 'TG_HASH'")
		print("with data from https://my.telegram.org")
		exit(0)

	client = TelegramClient('GebetoClient', api_id, api_hash)
	client.start()
	return client


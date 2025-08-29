# from pydrive2.auth import GoogleAuth
# from pydrive2.drive import GoogleDrive

# # Authenticate with Google
# def get_drive():
#     gauth = GoogleAuth()
#     gauth.LoadCredentialsFile("credentials.json")  # path to your credentials
#     if gauth.credentials is None:
#         gauth.LocalWebserverAuth()  
#     elif gauth.access_token_expired:
#         gauth.Refresh()
#     else:
#         gauth.Authorize()
#     gauth.SaveCredentialsFile("credentials.json")
#     return GoogleDrive(gauth)


# def upload_file_to_drive(file_obj, filename: str):
#     """
#     Uploads file object to Google Drive and returns the file link.
#     """
#     drive = get_drive()
#     gfile = drive.CreateFile({'title': filename})
#     gfile.SetContentString(file_obj.decode("utf-8", errors="ignore"))  # for text
#     gfile.Upload()

#     # Make file public
#     gfile.InsertPermission({'type': 'anyone', 'value': 'anyone', 'role': 'reader'})
#     return f"https://drive.google.com/uc?id={gfile['id']}"

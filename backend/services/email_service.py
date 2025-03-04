import smtplib
from email.mime.text import MIMEText
from config import Config

def send_email(subject, body, user_email, to_email):
    msg = MIMEText(body)
    msg['Subject'] = subject
    # Le mail est envoyé par le compte authentifié (celui de Config.SMTP_USER)
    msg['From'] = Config.SMTP_USER  
    # Mais on définit Reply-To pour que l'admin puisse répondre directement à l'utilisateur
    msg['Reply-To'] = user_email  
    msg['To'] = to_email
    with smtplib.SMTP(Config.SMTP_SERVER, Config.SMTP_PORT) as smtp:
        smtp.starttls()
        smtp.login(Config.SMTP_USER, Config.SMTP_PASSWORD)
        smtp.send_message(msg)



from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
import sys

# Ajoutez le chemin du dossier backend pour que les imports fonctionnent correctement
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Importez votre configuration et l'objet db depuis extensions.py
from config import Config
from extensions import db
import models  # Assurez-vous d'importer vos modèles pour que les changements soient détectés

# this is the Alembic Config object, which provides access to the values within the .ini file in use.
config = context.config

# Configure logging from the config file.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Définir target_metadata pour autogénérer les migrations
target_metadata = db.metadata

# Vous pouvez également définir d'autres options si nécessaire.
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # Permet de détecter les changements de type
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

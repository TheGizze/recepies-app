import connexion


def create_app():
    app = connexion.FlaskApp(__name__, specification_dir='openapi/')
    app.add_api('recepies.yml')
    return app

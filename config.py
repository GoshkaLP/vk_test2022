class Config:
    SECRET_KEY = 'SI(t5yc(F97%'
    STATIC_FOLDER = '/static'
    TEMPLATES_FOLDER = '/templates'


class ProdConfig(Config):
    DEBUG = False
    TESTING = False


class DevConfig(Config):
    DEBUG = True
    TESTING = True
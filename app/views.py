from flask import Blueprint, render_template
from .extensions import generate_banknotes


node = Blueprint('node', __name__)


# Метод для обработки запроса на сервер
@node.route('/api/banknotes/<amount>', methods=['GET'])
def api_banknotes(amount):
    banknotes = generate_banknotes(amount)
    print('Доступные банкноты:', banknotes)
    return banknotes


# Метод для отображения главной страницы
@node.route('/')
def api_index():
    return render_template('index.html')

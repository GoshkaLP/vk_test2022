from random import randint


def generate_banknotes(amount):
    # Для простоты будем генерить банкноты каждый раз рандомные
    res = {
        'amount': amount,
        'banknotes': {
            '5000': randint(0, 20),
            '2000': randint(0, 40),
            '1000': randint(20, 1000),
            '500': randint(30, 100),
            '200': randint(40, 100),
            '100': randint(50, 100)
        }
    }
    return res

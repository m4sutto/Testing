import unittest
from calculator import add, subtract, multiply, divide
from input_validation import is_valid_number, is_valid_choice

class TestCalculator(unittest.TestCase):

    def test_add(self):
        self.assertEqual(add(1, 2), 3)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(-1, -1), -2)

    def test_subtract(self):
        self.assertEqual(subtract(5, 3), 2)
        self.assertEqual(subtract(3, 5), -2)
        self.assertEqual(subtract(-1, -1), 0)

    def test_multiply(self):
        self.assertEqual(multiply(3, 7), 21)
        self.assertEqual(multiply(-1, 1), -1)
        self.assertEqual(multiply(-1, -1), 1)

    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)
        self.assertEqual(divide(5, 0), "Ошибка! Деление на ноль.")
        self.assertEqual(divide(-10, -2), 5)

    def test_is_valid_number(self):
        self.assertTrue(is_valid_number("10"))
        self.assertTrue(is_valid_number("-5.5"))
        self.assertFalse(is_valid_number("abc"))
        self.assertFalse(is_valid_number(""))

    def test_is_valid_choice(self):
        self.assertTrue(is_valid_choice("1"))
        self.assertTrue(is_valid_choice("2"))
        self.assertTrue(is_valid_choice("3"))
        self.assertTrue(is_valid_choice("4"))
        self.assertFalse(is_valid_choice("5"))
        self.assertFalse(is_valid_choice("abc"))

if __name__ == "__main__":
    unittest.main()

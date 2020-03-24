"""This is an example module."""

import argparse


def do_hello(name: str, proper: bool = False) -> None:
    """This function just prints a string."""
    if proper:
        to_print = name.title()
    else:
        to_print = name

    print(F"Hello {to_print}")


def parse_args() -> argparse.Namespace:
    """Parse the arguments for my function."""
    parser = argparse.ArgumentParser()
    parser.add_argument("name", help="This should be a string you want to print.")
    parser.add_argument("-p", "--proper", action="store_true", help="This will print it proper!")
    args = parser.parse_args()

    return args


def main() -> None:
    """Run main logic."""
    args = parse_args()
    do_hello(args.name, proper=args.proper)


if __name__ == "__main__":
    main()

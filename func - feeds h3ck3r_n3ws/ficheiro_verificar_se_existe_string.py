#!/usr/bin/env python3
with open("example.txt") as fobj:
    text = fobj.read().strip().split()
    while True:
        try:
            s = input("Enter a string: ")
            if s == "":
                continue
            if s in text:
                print("Matched")
                break
            raise Exception("No such string found, try again")
        except Exception as e:
            print(e)
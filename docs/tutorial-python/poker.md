---
sidebar_position: 1
---

# poker游戏

## 这是一个 python 扑克牌的作品：

### 快捷版

```python
import random, os, time
all_poker = []
num = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
suit = ["♦", "♣", "♥", "♠"]
poker_level = {"A": 12, "2": 13, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5, "8": 6, "9": 7, "10": 8, "J": 9, "Q": 10, "K": 11, "-": 14, "+": 15}
p1_win = 0
p2_win = 0
clear = 1
all_poker = [{"key": item1, "type": item2} for item1 in suit for item2 in num]  # 生成字典
all_poker.append({"key": "Joker", "type": "+"})
all_poker.append({"key": "Joker", "type": "-"})
random.shuffle(all_poker)
p1 = all_poker[0:27]
p2 = all_poker[27:55]
print("player1's poker:")
for i in p1:
    print(f"{p1.index(i)}.{i['key']} {i['type']}", end='  ')  # 由key和type格式化输出
print("\nplayer2's poker:")
for j in p2:
    print(f"{p2.index(j)}.{j['key']} {j['type']}", end='  ')
print("\nplease input the card index.\nfirst,please player1 input card index:", end='')
while len(p1) > 0 and len(p2) > 0:
    try:
        index = int(input())
    except ValueError:
        print("ValueError: your input is not a number")
        print("\nplease input your card index:", end='')
        continue
    except IndexError:
        print("IndexError: your input index is error")
        print("\nplease input your card index:", end='')
        continue
    if index == -1:
        break
    elif index == -2:
        code = input("-----------------------\nplease input your code:\n>>>")
        if code == "del" or code == "delete":
            index = int(input())
            p2.pop(index)
        elif code == "openclear":
            clear = 1
        elif code == "closeclear":
            clear = 0
        index = 0
    elif index == -3:
        print("index -1 is exit\nindex -2 is delete, rules:\ndel or delete is delete the card\nopenclear is open the clear\ncloseclear is close the clear")
        exit(0)
    elif index > len(p1):
        print("IndexError: your input index is error")
        print("\nplease input your card index:", end='')
        continue
    p1_pop_card = p1.pop(index)
    index = random.randint(0, len(p2) - 1)
    p2_pop_card = p2.pop(index)
    print(f"player1 is delete: {p1_pop_card['key']} {p1_pop_card['type']}")
    print(f"player2 is delete: {p2_pop_card['key']} {p2_pop_card['type']}")
    if poker_level[p1_pop_card["type"]] > poker_level[p2_pop_card["type"]]:
        print("player1 is win")
        p1_win += 1
    else:
        print("player2 is win")
        p2_win += 1
    time.sleep(2)
    if clear == 1:
        os.system("cls")
    print("player1's poker:")
    for i in p1:
        print(f"{p1.index(i)}.{i['key']} {i['type']}", end='  ')
    print("\n")
    print("player2's poker:")
    for j in p2:
        print(f"{p2.index(j)}.{j['key']} {j['type']}", end='  ')
    print("\nplease input your card index:", end='')
print(f"player1 winner times: {p1_win}\nplayer2 winner times: {p2_win}")
if p1_win > p2_win:
    print("player1 is win!")
elif p1_win == p2_win:
    print("no winner")
else:
    print("player2 is win!")
```
### 兼容版

```python
import random,os,time
all_poker = []
temp_of_num = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
temp_of_pic = ["♦","♣","♥","♠"]
poker_level = {"A":12,"2":13,"3":1,"4":2,"5":3,"6":4,"7":5,"8":6,"9":7,"10":8,"J":9,"Q":10,"K":11,"-":14,"+":15}
p1_win = 0
p2_win = 0
clear = 1
all_poker = [{"key":item2,"type":item1} for item1 in temp_of_num for item2 in temp_of_pic]  # 生成字典
all_poker.append({"key":"Joker","type":"+"})
all_poker.append({"key":"Joker","type":"-"})
random.shuffle(all_poker)
p1 = all_poker[0:27]
p2 = all_poker[27:55]
print("player1's poker:")
for i in p1:
    print("{}.{} {}".format(p1.index(i), i["key"], i["type"]), end='  ')
print("\nplayer2's poker:")
for j in p2:
    print("{}.{} {}".format(p2.index(j), j["key"], j["type"]), end='  ')
print("\nplease input the card index.\nfirst,please player1 input card index:",end = '')
while len(p1)>0 and len(p2)>0:
    try:
        index = int(input())
    except ValueError:
        print("ValueError:your input is not a number")
        continue
    except IndexError:      
        print("IndexError:your input index is error")
        continue
    if index == -1:
        break
    elif index == -2:
        code = input("-----------------------\nplease input your code:\n>>>")
        if code == "del" or code == "delete":
            index = int(input())
            p2.pop(index)
        elif code == "openclear":
            clear = 1 
        elif code == "closeclear":
            clear = 0
        index = 0
    elif index == -3:
        print("index -1 is exit\nindex -2 is delete,rules:\ndel or delete is delete the card\nopenclear is open the clear\ncloseclear is close the clear")
        exit(0)
    elif index > len(p1):
        print("IndexError:your input index is error")
        continue
    p1_pop_card = p1.pop(index)
    index = random.randint(0,len(p2)-1)
    p2_pop_card = p2.pop(index)
    print("player1 is delete : {} {}".format(p1_pop_card["key"], p1_pop_card["type"]))
    print("player2 is delete : {} {}".format(p2_pop_card["key"], p2_pop_card["type"]))
    if poker_level[p1_pop_card["type"]] >  poker_level[p2_pop_card["type"]]:
        print("player1 is win")
        p1_win += 1
    else:
        print("player2 is win")
        p2_win += 1
    time.sleep(2)
    if clear == 1:
        os.system("cls")
    print("player1's poker:")
    for i in p1:
        print("{}.{} {}".format(p1.index(i), i["key"], i["type"]), end='  ')
    print("\n")
    print("player2's poker:")
    for j in p2:
        print("{}.{} {}".format(p2.index(j), j["key"], j["type"]), end='  ')
    print("\nplease input your card index:",end = '')
print("player1 winner times: {}\nplayer2 winner times: {}".format(p1_win, p2_win))
if p1_win > p2_win:
    print("player1 is win!")
elif p1_win == p2_win:
    print("no winner")
else:
    print("player2 is win!")


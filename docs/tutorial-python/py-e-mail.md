# py-e-mail

```python
import time
import pyotp
def slow_print(*obj, end='\n', delay=0.07):
    for i in obj:
        for j in str(i):
            print(j, end='', flush=True)
            time.sleep(delay)
    print(end, end='')
def base65_to_int(s):
    """Convert a base 65 string to an integer."""
    chars = '0123456789abcdefghijklmnopqrstuvwxyz !@#$%^&*()_+{}|:<>?`-=[];,./'
    n = 0
    for char in s:
        n = n * 65 + chars.index(char)
    return n
def int_to_base65(n):
    """Convert an integer to its base 37 representation."""
    if n == 0:
        return '0'
    chars = '0123456789abcdefghijklmnopqrstuvwxyz !@#$%^&*()_+{}|:<>?`-=[];,./'
    base65 = ''
    while n:
        base65 = chars[n % 65] + base65
        n //= 65
    return base65
slow_print("你好，这是py-e-mail邮件工具，欢迎使用！")
slow_print("请你选择你现在要执行的命令：\n1.注册\n2.登录\n3.退出\n请输入你的选择：",end='')
now_username = ""
while True:
    type = int(input())
    if type == 0:
        slow_print("你确定要恢复到初始状态吗？(y/n)：",end='')
        if input() == "y":
            with open("users.txt","w+") as f:
                slow_print("正在清",delay=0.5,end='')
            with open("message.txt","w+") as f:
                slow_print("除...",delay=0.5)
            slow_print("已恢复到初始状态！")
        else:
            slow_print("已取消！")
    elif type == 1:
        with open("users.txt","a") as f:
            slow_print("请输入你想要注册的用户名：",end='')
            username = input()
            slow_print("请输入你的密码（只能包含数字、小写字母、空格和部分符号）：",end='')
            try:
                password = input()
                otp = pyotp.TOTP(pyotp.random_base32())
                sct = otp.secret
                slow_print("这是你的实时动态验证码的添加码：",sct)
                qr_url = otp.provisioning_uri(username, issuer_name="py-e-mail")
                slow_print("请使用 https://www.qr-code-generator.com/ 网站复制以下信息以扫描二维码：",qr_url)
                if f.tell() > 0:
                    f.write("\n" + username + " " + str(base65_to_int(password)) + " " + sct)
                else:
                    f.write(username + " " + str(base65_to_int(password)) + " " + sct)
            except ValueError:
                slow_print("密码只能包含数字、小写字母、空格和部分符号")
            else:
                slow_print("注册成功！")
        
    elif type == 2:
        slow_print("请输入你的名字：",end='')
        username = input()
        slow_print("请输入你的密码：",end='')
        password = input()
        with open("users.txt","r") as f:
            for line in f:
                true_username = line.split()[0]
                true_password = int_to_base65(int(line.split()[1]))
                otp = line.split()[2]
                if true_username == username and true_password == password:
                        totp = pyotp.TOTP(otp)
                        slow_print("请输入实时动态验证码：",end='')
                        user_input_otp = input()
                        if totp.verify(user_input_otp):
                            slow_print("登录成功！")
                            now_username = username
                            break
            else:
                slow_print("密码错误！")
    elif type == 3:
        exit()
    else:
        slow_print("输入错误！")
        if now_username == "":
            slow_print("请你选择你现在要执行的命令：\n1.注册\n2.登录\n3.退出\n请输入你的选择：",end='')
        else:
            break
    if now_username == "":
        slow_print("请你选择你现在要执行的命令：\n1.注册\n2.登录\n3.退出\n请输入你的选择：",end='')
    else:
        break
while True:
        slow_print("请你选择你现在要执行的命令：\n1.发送邮件\n2.查看邮件\n3.退出\n4.登出\n请输入你的选择：",end='')
        type = int(input())
        if type == 1:
            slow_print("请输入你要发送的邮件名：",end='')
            mailname = input()
            slow_print("请输入你要发送的消息（只能包含数字、小写字母、空格和部分符号）：",end='')
            message = input()
            with open(f"{mailname}.txt","a") as f:
                if f.tell() == 0:
                    slow_print("请输入你要设定的密码（只能包含数字、小写字母、空格和部分符号）：",end='')
                    password = input()
                    f.write(str(base65_to_int(password)) + "\n")
                f.write(time.strftime("%Y/%m/%d_%H:%M:%S") + " " + now_username + " " + str(base65_to_int(message))  +"\n")
        elif type == 2:
            slow_print("请输入你要查看的邮件名：",end='')
            mailname = input()
            slow_print("请输入你要查看的邮件的密码：",end='')
            true_password = input()
            with open(f"{mailname}.txt","r") as f:
                password = int_to_base65(int(f.readline().strip()))
                if password != true_password:
                    slow_print("密码错误！")
                    continue
                for line in f:
                    parts = line.split(" ")
                    if len(parts) == 1:
                        continue
                    if len(parts) == 3:
                        timestamp, username, message_code = parts[0], parts[1], parts[2]
                        message = int_to_base65(int(message_code))  # 解密
                        slow_print("用户“", username, "”在", timestamp, "的时候发送了“", message, "”", end='\n')
                    else:
                        slow_print("邮件被损坏！")
        elif type == 3:
            exit()
        elif type == 4:
            now_username = ""
            slow_print("登出成功！")
            slow_print("请你选择你现在要执行的命令：\n1.注册\n2.登录\n3.退出\n请输入你的选择：",end='')
            while True:
                type = int(input())
                if type == 0:
                    slow_print("你确定要恢复到初始状态吗？(y/n)：",end='')
                    if input() == "y":
                        with open("users.txt","w+") as f:
                            slow_print("正在清",delay=0.5,end='')
                        with open("message.txt","w+") as f:
                            slow_print("除...",delay=0.5)
                        slow_print("已恢复到初始状态！")
                    else:
                        slow_print("已取消！")
                elif type == 1:
                    with open("users.txt","a") as f:
                        slow_print("请输入你想要注册的用户名：",end='')
                        username = input()
                        slow_print("请输入你的密码（只能包含数字、小写字母、空格和部分符号）：",end='')
                        try:
                            password = input()
                            otp = pyotp.TOTP(pyotp.random_base32())
                            sct = otp.secret
                            slow_print("这是你的实时动态验证码的添加码：",sct)
                            if f.tell() > 0:
                                f.write("\n" + username + " " + str(base65_to_int(password)) + " " + sct)
                            else:
                                f.write(username + " " + str(base65_to_int(password)) + " " + sct)
                        except ValueError:
                            slow_print("密码只能包含数字、小写字母、空格和部分符号")
                        else:
                            slow_print("注册成功！")
                    
                elif type == 2:
                    slow_print("请输入你的名字：",end='')
                    username = input()
                    slow_print("请输入你的密码：",end='')
                    password = input()
                    with open("users.txt","r") as f:
                        for line in f:
                            true_username = line.split()[0]
                            true_password = int_to_base65(int(line.split()[1]))
                            otp = line.split()[2]
                            if true_username == username and true_password == password:
                                    totp = pyotp.TOTP(otp)
                                    slow_print("请输入实时动态验证码：",end='')
                                    user_input_otp = input()
                                    if totp.verify(user_input_otp):
                                        slow_print("登录成功！")
                                        now_username = username
                                        break
                        else:
                            slow_print("密码错误！")
                elif type == 3:
                    exit()
                else:
                    slow_print("输入错误！")
                    if now_username == "":
                        slow_print("请你选择你现在要执行的命令：\n1.注册\n2.登录\n3.退出\n请输入你的选择：",end='')
                    else:
                        break
                if now_username == "":
                    slow_print("请你选择你现在要执行的命令：\n1.注册\n2.登录\n3.退出\n请输入你的选择：",end='')
                else:
                    break
            continue
        else:
            slow_print("输入错误！")
            slow_print("请你选择你现在要执行的命令：\n1.发送邮件\n2.查看邮件\n3.退出\n4.登出\n请输入你的选择：",end='')

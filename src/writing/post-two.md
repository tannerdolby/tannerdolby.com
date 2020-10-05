---
title: Getting Started With OverTheWire Bandit Security Games
author: Tanner Dolby
shortname: Overthewire Games
date_created: March 06, 2020
datetime: 03 06 2020
tag: web
post_tags: 
- shell
- security
preview: "How familiar are you with using SSH? If you hesitated to answer, don't fear as after reading this article you will understand how to perform a secure remote connection to a server using SSH and work in the server environment."
permalink: /writing/{{ tag }}/{{ shortname | slug }}/
image: 
    fallback:
        src: /images/pexels-scott-webb-large.jpg
    large: 
        webp: /images/pexels-scott-webb-large.webp
        width: 1024w
    med: 
        webp: /images/pexels-scott-webb-med.webp
        width: 640w
    small: 
        webp: /images/pexels-scott-webb-small.webp
        width: 320w
    credit: https://www.pexels.com/photo/equipment-pavement-security-security-camera-430208/
---


<h1 id="post-title" style="text-align: left; font-size: 40px;">{{ title }}</h1>
<p style="text-align: left;">Posted <time datetime="{{ datetime }}">{{ date_created }}</time> &bull; Tagged with: {% for tags in post_tags %}<code style="margin: 0 .3rem;"><strong>#</strong>{{ tags }}</code>{% endfor %}</p>

<picture>
    <source
        type="image/webp"
        srcSet="
            {{ image.large.webp }} {{ image.large.width }},
            {{ image.med.webp }} {{ image.med.width }},
            {{ image.small.webp }} {{ image.small.width }}
            "
        sizes="33.3vw, 50vw, 100vw"
    >
    <img style="width: 100%" alt="Security Cameras" src="{{ image.fallback.src }}" loading="lazy">
</picture>

<p style="text-align: center; margin-top: .5rem; font-size: 14px;"><i>Photo by Scott Webb from <a href="{{ image.credit}}">Pexels</a></i></p>

{{ preview }} I'm by no means a security expert, but these challenges can be quite fun while providing solid file system practice. Grab your favorite cup of coffee or tea and get ready to conquer some OverTheWire Bandit games!

<h2 id="what-is-ssh">{% skiplink "what-is-ssh", "What is SSH?" %}</h2>

The [SSH Protocol](https://www.ssh.com/ssh/) (referred to as Secure Shell) is a method for remote secure login from one computer to another. It provides several options for strong remote authentication while also protecting the communications security and health via strong encryption.

Using SSH protocol is the most secure alternative to unprotected login protocols such as [telnet](https://www.ssh.com/ssh/telnet) and [rlogin](https://www.ssh.com/ssh/rlogin), amongst other insecure file transfer methods like [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol).

<h2 id="what-is-a-shell">{% skiplink "what-is-a-shell", "What is a shell?" %}</h2>

The [shell](https://en.wikipedia.org/wiki/Shell_(computing)) is a user interface for performaing system level operations. It's a user level program to start other user level programs, using calls to the operating system. The Terminal (macOS) and CMD (Windows) programs are “shells”.

<h2 id="getting-started-overthewire">{% skiplink "getting-started-overthewire", "Getting Started with OverTheWire" %}</h2>

Every level offered by [OverTheWire](https://overthewire.org/) can help you to learn and practice security concepts in the form of fun-filled games using the shell. The game server has its own SSH Port to use when connecting to specific OverTheWire games.

This article will focus on the first five [Bandit](https://overthewire.org/wargames/bandit) level games. All  Bandit levels run on port 2220.

<h3 id="connect-bandit-shell">{% skiplink "connect-bandit-shell", "Connecting to the Bandit Shell"%}</h3>

Open up a shell (Terminal for MacOS, CMD in Windows) program and write the following command for connecting to bandit level zero on port 2220. More information about connecting can be found on the [Level Zero](https://overthewire.org/wargames/bandit/bandit0.html) OverTheWire webpage.

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

After performing the above command, your shell will prompt you to enter a password. The password for Bandit level 0 is `bandit0`. Once the correct passcode has been entered, you will have access to the root directories of the OverTheWire Bandit game server. This process of authentication will be performed for every new instance you SSH into a Bandit level.

<h2 id="otw-games-begin">{% skiplink "otw-games-begin", "Let the games begin!"%}</h2>

The goal of level zero is for you to log into the game using SSH and become familiarized with the bandit shell.

The host to which you need to connect is `bandit.labs.overthewire.org` on port 2220, the username and password are both `bandit0`. Once logged in, go to the [Level One](https://overthewire.org/wargames/bandit/bandit1.html) page to find out how to beat this first Bandit level (or keep reading).

Now that you've sucessfully connected to the Bandit shell you will have access to the root directory contents. If you haven't already, make sure to connect using SSH to Bandit level zero. Refer back to the [Connecting to Bandit Shell](/writing/{{ tag }}/{{ shortname | slug }}/#connect-bandit-shell) section.

Once the correct credentials have been provided, you are sucessfully connected to Bandit level zero and will see a shell similar to below.

```bash
bandit0@bandit:~$
```

<h3 id="listing-commands"> I've connected to a bandit shell with SSH, now what?</h3>

When solving most of the Bandit games, I found myself repeatedly using a few shell commands. Since we're starting at the root directory for every new level, it's wise to list the directories contents with `ls` every time you connect to a new OverTheWire game server.

- Run the command `ls` to list all directory contents and files present on the server. 

After running the `ls` command in bandit level zero, the output returns all the directory contents. Within this level, there is only one file named `readme` existing inside the current directory.

```bash
bandit0@bandit:~$ ls 
readme
```

Next, I will use the command `ls` with flags `-la` to list all hidden files in long listing format within the bandit level root directory. To define the flags or options, take a look below.

- `-l` provides a list of a directories content in long listing format.
- `-a` tells the computer to not ignore entries starting with a period.

```bash
bandit0@bandit:~$ ls -la
total 24
drwxr-xr-x  2 root    root    4096 Oct 16  2018 .
drwxr-xr-x 41 root    root    4096 Oct 16  2018 ..
-rw-r--r--  1 root    root     220 May 15  2017 .bash_logout
-rw-r--r--  1 root    root    3526 May 15  2017 .bashrc
-rw-r--r--  1 root    root     675 May 15  2017 .profile
-rw-r-----  1 bandit1 bandit0   33 Oct 16  2018 readme
bandit0@bandit:~$
```

You *should* see the above file structure in your corresponding shell when performing the `ls -la` command after connecting to Bandit level zero.

<h2 id="bandit-level-zero">{% skiplink "bandit-level-zero", "Bandit Level Zero &RightArrow; One" %}</h2>

The password needed to access Bandit level 1 via SSH is stored in a file called `readme` located in the root directory. Use the password you've uncoverered in the previous level to log into Bandit Level One. Whenever you find a new password. Copy it to your clipboard before using SSH (on port 2220) with the corresponding level username `bandit1` to log into the next level and continue bandit wargames.

For these first few levels, passwords are usually hidden in files that contain ASCII characters or are considered to be human-readable files. To find the first password for bandit level zero we will use the shell command `find`.

```bash
bandit0@bandit:~$ find . -type f -exec file {} + | grep ASCII
./readme:       ASCII text
./.bash_logout: ASCII text
./.profile:     ASCII text
./.bashrc:      ASCII text
bandit0@bandit:~$
```

To break down the above output: The shell told us that each of the files contained ASCII text and were executable. This intermediate step using `find` is not needed as the password could be found via 'trial-and-error' by opening each file in the current directory. But, I thought it was good practice to show moving forward into the next levels.

You can proceed to opening each of the files using `cat filename` on macOS, but I have a good feeling about the first file in the output: `readme`. Lets open it.

```bash
bandit0@bandit:~$ cat ./readme
boJ9jbbUNNfk......
```

And Voilà! Copy the password you found to your clipboard or a place you wont forget. You will need to use this password to SSH into the next bandit level. Use the `exit` command to disconnect from a bandit level after you're ready to move on.

<h2 id="bandit-level-one">{% skiplink "bandit-level-one", "Bandit level One &RightArrow; Two"} </h3>

Now that you have become relatively familiar with the Bandit shell and how to go about finding passwords. Let's jump right into connecting to Bandit level one and find the hidden password!

If you're following along through OverTheWire's website. We are told that the password for this level is stored inside a file named `-` located in the home directory.

The first order of business will be connecting to Bandit level one using `bandit1` as the username on port 2220. This levels password will be the characters you copied to clipboard after performing `cat ./readme` to open the file.

```bash
spherical:~ TannerDolby$ ssh bandit1@bandit.labs.overthewire.org -p 2220
```

You will be prompted to enter a password after entering the above command. Paste the password that we copied to the clipboard from the previous level. Remember this password was found by opening the contents of readme by using `cat ./readme`. If the correct password is provided then you will have successfully connected to the bandit level one shell. You terminal or command line should display an output similar to the code snippet below.

```bash
bandit1@bandit:~$
```

Now that we have connected to the bandit server lets find the password stored in a file called `-` located in the home directory. Like always, lets list all of the root directories contents with `ls -la`. Refer to [ls options](/writing/{{ tag }}/{{ shortname | slug}}/#listing-commands) for a refresher on why we use the `-la`.

```bash
bandit1@bandit:~$ ls -la
total 24
-rw-r-----  1 bandit2 bandit1   33 Oct 16  2018 -
drwxr-xr-x  2 root    root    4096 Oct 16  2018 .
drwxr-xr-x 41 root    root    4096 Oct 16  2018 ..
-rw-r--r--  1 root    root     220 May 15  2017 .bash_logout
-rw-r--r--  1 root    root    3526 May 15  2017 .bashrc
-rw-r--r--  1 root    root     675 May 15  2017 .profile
bandit1@bandit:~$
```

The file `-` is what we are looking for, which can be found on the first line. Next it would be wise to check and make sure this file contains ASCII characters. 

Utilizing the `find` command, we can check for files containing ASCII characters or that are considered to be 'Human Readable'. Perform the command `grep ASCII`. The other helpful options to use here would be, `type -f` to find all regular files, and `-exec file` for finding all executable files.

```bash
bandit1@bandit:~$ find . -type f -exec file {} + | grep ASCII
./.bash_logout: ASCII text
./.bashrc: ASCII text
./-: ASCII text
bandit1@bandit:~$
```

And would you look at that, the `/-` file indeed contains ASCII text. Lets open it with the `cat` command and find that password.

```shell
bandit1@bandit:~$ cat ./-
CV1DtqXWVF......
```

Lastly, since we have (_hopefully_) copied the password to clipboard from opening the above file. Exit the current bandit shell and prepare to SSH into the next level! 

<h2 id="bandit-level-two">Bandit Level Two &RightArrow; Three</h3>
Now that you've made it this far, going about finding passwords in upcoming Bandit Level should be more clear. OverTheWire tells us that the password for the next level is stored in a file called spaces in this filename located in the home directory.

Before we can start searching for the above file, we must first connect to Bandit level two on port 2220 with the username bandit2 and password copied to clipboard from last level. The connection process in terminal should be:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Since this post has covered connecting, I will assume you provided the correct password found from the previous level when attempting to SSH into Bandit level two. After you've connected, whats the first thing you thought to do? 
If you were thinking what I was, then you might have beat me to it by using an `ls -la` command in the shell to perform a long listing format of all the current directories content.

```bash
bandit2@bandit:~$ ls -la
total 24
drwxr-xr-x  2 root    root    4096 Oct 16  2018 .
drwxr-xr-x 41 root    root    4096 Oct 16  2018 ..
-rw-r--r--  1 root    root     220 May 15  2017 .bash_logout
-rw-r--r--  1 root    root    3526 May 15  2017 .bashrc
-rw-r--r--  1 root    root     675 May 15  2017 .profile
-rw-r-----  1 bandit3 bandit2   33 Oct 16  2018 spaces in this filename
bandit2@bandit:~$
```

And there it is! The file, "spaces in this filename". Lets open it by using the cat command and encase the filename in double quotes so the cat command ignores spaces inside filenames.

```bash
bandit2@bandit:~$ cat "spaces in this filename"
UmHadQclWmgd..........
bandit2@bandit:~$ exit
```

Make sure to copy the password to clipboard or make note of it as we will need it handy when accessing the next bandit level.

<h2 id="bandit-level-three">Bandit Level Three &RightArrow; Four</h3>

OverTheWire tells us that the password to access the next level is stored in a hidden file within the `inhere` directory. Now that the process of using SSH to connect to new OverTheWire Bandit Servers has been repeated, I will just show my terminal command to SSH into Bandit level three on port 2220 with username bandit3 and the password found in the previous level.

```bash
spherical:~ TannerDolby$ ssh bandit3@bandit.labs.overthewire.org -p 2220
```

```bash
bandit3@bandit:~$ ls
inhere
```

Remember! We have been told there is a password hidden in a file within the `inhere` directory. Let's change to that directory using the `cd` command and inspect the directories contents.

```bash
bandit3@bandit:~$ cd inhere
bandit3@bandit:~/inhere$ ls -la
total 12
drwxr-xr-x 2 root    root    4096 Oct 16  2018 .
drwxr-xr-x 3 root    root    4096 Oct 16  2018 ..
-rw-r----- 1 bandit4 bandit3   33 Oct 16  2018 .hidden
bandit3@bandit:~/inhere$
```

There we are! We've found a file called `.hidden` with user or groups related to bandit3 and bandit4. To make sure the `.hidden` file contains ASCII characters, try using a `find` command.

```bash
bandit3@bandit:~/inhere$ find . -type f -exec file {} + | grep ASCII
./.hidden: ASCII text
bandit3@bandit:~/inhere$
```

Bravo! The `.hidden` file found in the inhere directory we can be almost positive stores the next levels password.

```bash
bandit3@bandit:~/inhere$ cat ./.hidden
pIwrPrtPN36QITS..................
bandit3@bandit:~/inhere$ exit
```

<h2 id="bandit-level-four">Bandit Level Four &RightArrow; Five</h3>

The password for the next level is stored in the only human-readable file inside the `inhere` directory. Pro tip: if your terminal is cluttered try using the `reset` or `clear` command. 

Next, connect to the level 4 bandit server on port 2220 via SSH. Using bandit4 as the username and the last levels hidden password.

```bash
spherical:~ TannerDolby$ ssh bandit4@bandit.labs.overthewire.org -p 2220
```

Since we are told the password is stored in the only human-readable file within the inhere directory. Lets change directory to 'inhere' and then perform a long listing operation of all the current 'inhere' directories contents. Then use the find command for finding a file containing ASCII characters.

```bash
bandit4@bandit:~$ cd inhere
bandit4@bandit:~/inhere$ ls -la
total 48
drwxr-xr-x 2 root    root    4096 Oct 16  2018 .
drwxr-xr-x 3 root    root    4096 Oct 16  2018 ..
-rw-r----- 1 bandit5 bandit4   33 Oct 16  2018 -file00
...
bandit4@bandit:~/inhere$ find . -type f -exec file {} + | grep ASCII
./-file07: ASCII text
```

And there it is, the only human-readable file that is stored in the 'inhere' directory. Lets open it and find the last password of this article!

```bash
bandit4@bandit:~/inhere$ cat ./-file07
koReBOKuIDDe.......................
bandit4@bandit:~/inhere$ exit
```

<h2 id="concluding-remarks">Concluding Remarks</h2>
Thank you for reading this far! I hope your experience with using the terminal (or command line) has improved by completing bandit levels 1-5 via OverTheWire. If you noticed all of the passwords for each level are not provided, you saw right  :). I will not provide any of the complete passwords as you are capable of following this tutorial and finding them for yourself! Until next time. 

<h3 id="references">References</h3>

1. [overthewire.org](https://overthewire.org/wargames/)
2. [telnet](https://www.ssh.com/ssh/telnet)
3. [rlogin](https://www.ssh.com/ssh/rlogin)
4. [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol)
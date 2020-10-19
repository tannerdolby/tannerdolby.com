---
title: Getting Started with OverTheWire Bandit Security Games
author: Tanner Dolby
shortname: Overthewire Games
date_created: October 05, 2020
datetime: 2020-10-05 00:00:00 Z
date: 2020-10-05
tags:
    - security
    - shell
preview: "How familiar are you with using SSH? If you hesitated to answer, don't fear as after reading this article you will understand how to perform a secure remote connection to a server using SSH and work in the server environment."
permalink: /writing/{{ shortname | slug }}/
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

{{ preview }} I'm by no means a security expert, but these challenges can be quite fun while providing some solid file system practice. Grab your favorite cup of coffee or tea and get ready to conquer some OverTheWire Bandit games!

<h2 id="what-is-ssh" class="dir-link h2-5">What is SSH? {% directlink, "what-is-ssh" %}</h2>

The [SSH Protocol](https://www.ssh.com/ssh/) (referred to as Secure Shell) is a method for remote secure login from one computer to another. It provides several options for strong remote authentication while also protecting the communications security and health via strong encryption.

Using SSH protocol is the most secure alternative to unprotected login protocols such as [telnet](https://www.ssh.com/ssh/telnet) and [rlogin](https://www.ssh.com/ssh/rlogin), amongst other insecure file transfer methods like [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol).

<h2 id="what-is-a-shell" class="dir-link h2-5">What is a shell? {% directlink "what-is-a-shell" %}</h2>

The [shell](https://en.wikipedia.org/wiki/Shell_(computing)) is a user interface for performing system level operations. It's a user level program to start other user level programs, using calls to the operating system. The Terminal (macOS) and CMD (Windows) programs are “shells”.

<h2 id="getting-started-overthewire" class="dir-link h2-5">Getting started with OverTheWire {% directlink "getting-started-overthewire" %}</h2>

Every level offered by [OverTheWire](https://overthewire.org/) can help you to learn and practice security concepts in the form of fun-filled games using the shell. The game server has its own SSH Port to use when connecting to specific OverTheWire games. This article will focus on the first five [Bandit](https://overthewire.org/wargames/bandit) levels which run on port 2220.

<h2 id="connect-bandit-shell" class="dir-link h2-5">Connecting to the Bandit Shell {% directlink "connect-bandit-shell" %}</h2>

Open up a shell (Terminal for MacOS, CMD in Windows) program and write the following command for connecting to bandit level zero on port 2220. More information about connecting can be found on the [Level Zero](https://overthewire.org/wargames/bandit/bandit0.html) OverTheWire webpage.

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

After running the above command, your shell will prompt you to enter a password. The password for Bandit level 0 is `bandit0`. Once the correct passcode has been entered, you will have access to the root directories for the corresponding Bandit level. This process of authentication will be performed for every new instance you SSH into a Bandit level.

<h2 id="otw-games-begin" class="dir-link h2-5">Let the games begin! {% directlink "otw-games-begin" %}</h2>

The goal of level zero is for you to log into the game using SSH and become familiarized with the bandit shell. The host to which you need to connect is `bandit.labs.overthewire.org` on port 2220. We are told that the username and password are both `bandit0`. Once logged in, go to the [Level One](https://overthewire.org/wargames/bandit/bandit1.html) page to find out how to beat this first Bandit level (or keep reading).

Now that you've sucessfully connected to the Bandit shell, you will have access to the root directory contents for the corresponding level. If your having trouble connecting, feel free to refer back to the [Connecting to Bandit Shell](/writing/{{ tag }}/{{ shortname | slug }}/#connect-bandit-shell) section.

Once the correct credentials have been provided, you're sucessfully connected to Bandit level zero and will see a shell similar to below.

```bash
bandit0@bandit:~$
```

<h2 id="listing-commands" class="dir-link h2-5">I've connected to a bandit shell with SSH, now what? {% directlink "listing-commands" %}</h2>

When solving most of the Bandit games, I found myself repeatedly using a few shell commands. Since we're starting at the root directory for every new level, it's wise to list the directories contents with `ls` every time you connect to a new OverTheWire game server.

- Run the command `ls` to list all directory contents and files present on the server. 

After running `ls` in bandit level zero, the output returns all the directory contents. Within this level, there is only one file named `readme` existing inside the current directory.

```bash
bandit0@bandit:~$ ls 
readme
```

Next, use the command `ls` with flags `-la` to list all hidden files in long listing format within the bandit level root directory. To define the flags or options, take a look below.

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

<h2 id="bandit-level-zero" class="dir-link h2-5">Level Zero &RightArrow; One {% directlink "bandit-level-zero" %}</h2>

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

To break down the above output: The shell told us that each of the files contained ASCII text and were executable. This intermediate step using `find` is not necessarily needed here as the password could be found via 'trial-and-error' by opening each file in the current directory. But, I thought it was good practice to show moving forward into the next levels.

You can proceed to opening each of the files using `cat filename` on macOS, but I have a good feeling about the first file in the output: `readme`. Lets open it.

```bash
bandit0@bandit:~$ cat ./readme
boJ9jbbUNNfk......
```

And Voilà! Copy the password you found to your clipboard or a place you wont forget. You will need to use it to SSH into the next bandit level. Use the `exit` command to disconnect from a bandit level after you're ready to move on.

<h2 id="bandit-level-one" class="dir-link h2-5">Level One &RightArrow; Two {% directlink "bandit-level-one" %}</h2>

Now that you've become relatively familiar with the Bandit shell and how to go about finding passwords. Lets jump right into connecting to Bandit level one and find the hidden password!

If you're following along through OverTheWire's website. We're told that the password for this level is stored inside a file named `-` located in the home directory.

The first order of business will be connecting to Bandit level one using `bandit1` as the username on port 2220. This levels password will be the characters you copied to clipboard after performing `cat ./readme` to open the file.

```bash
spherical:~ TannerDolby$ ssh bandit1@bandit.labs.overthewire.org -p 2220
```

If the correct password is provided then you will have successfully connected to the bandit level one shell. You terminal or command line should display an output similar to the code snippet below.

```bash
bandit1@bandit:~$
```

Now that your connected to the bandit server lets find the password stored in a file called `-`. Like always, lets list all of the root directories contents with `ls -la`. Refer to [ls options](/writing/{{ tag }}/{{ shortname | slug}}/#listing-commands) for a refresher on why to use the `-la` options.

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

The file `-` is what we are looking for, which can be found on the first line. Next, it would be wise to check and make sure this file contains ASCII characters. 

Utilizing the `find` command chained with a few other tools, we can check for files containing ASCII characters or that are considered to be "Human Readable".

<h2 id="what-is-grep" class="dir-link h2-5">What is Grep? {% directlink "what-is-grep" %}</h2>

[Grep](https://phoenixnap.com/kb/grep-command-linux-unix-examples) is an acronym that stands for Global Regular Expression Print. It's usage as a command line tool is to search for a pattern or string of text in a given file. The syntax of using `grep` calls for the pattern or string your searching for and the filename you'd like to search in. 

```bash
grep <string to match> <filename to search for>
```

The other helpful options to use here would be, `type -f` to find all regular files, and `-exec file` for finding all executable files.

```bash
bandit1@bandit:~$ find . -type f -exec file {} + | grep ASCII
./.bash_logout: ASCII text
./.bashrc: ASCII text
./-: ASCII text
bandit1@bandit:~$
```

And would you look at that, the `/-` file indeed contains ASCII text. Lets open it with the `cat` command and find the password.

```shell
bandit1@bandit:~$ cat ./-
CV1DtqXWVF......
```

Make sure to copy the password to clipboard from opening the above file and exit the current bandit shell. Onward!

<h2 id="bandit-level-two" class="dir-link h2-5">Level Two &RightArrow; Three {% directlink "bandit-level-two"%}</h2>

OverTheWire tells us that the password for the next level is stored in a file called `spaces in this filename` located in the home directory.

Before you can start searching for the above file, you must first connect to Bandit level two on port 2220 with the username `bandit2` and password copied to clipboard from last level. The connection process in terminal should be:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

After you've connected, whats the first thing you thought to do? If you were thinking what I was, then you might have beat me to it by using an `ls -la` command in the shell to perform a long listing format of all the current directories content.

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

The file `spaces in this filename` indeed exists, so lets open it up and see the file contents using the `cat` command. If a filename contains spaces in between characters, try wrapping filename in double quotes so then the `cat` command ignores spaces inside filenames.

```bash
bandit2@bandit:~$ cat "spaces in this filename"
UmHadQclWmgd..........
bandit2@bandit:~$ exit
```

Make sure to copy the password to clipboard or make note of it as we will need it handy when accessing the next bandit level.

<h2 id="bandit-level-three" class="dir-link h2-5">Level Three &RightArrow; Four {% directlink "bandit-level-three" %}</h2>

OverTheWire tells us that the password to access the next level is stored in a hidden file within the `inhere` directory. Now that the process of using SSH to connect to new OverTheWire Bandit Servers has been repeated a few times, I will just show my terminal command to SSH into Bandit level three on port 2220 with username bandit3 and the password found in the previous level.

```bash
spherical:~ TannerDolby$ ssh bandit3@bandit.labs.overthewire.org -p 2220
```

Quick listing of the root directory contents.

```bash
bandit3@bandit:~$ ls
inhere
```

Remember! We have been told there is a password hidden in a file within the `inhere` directory. Lets change to that directory using the `cd` command and inspect the directories contents.

```bash
bandit3@bandit:~$ cd inhere
bandit3@bandit:~/inhere$ ls -la
total 12
drwxr-xr-x 2 root    root    4096 Oct 16  2018 .
drwxr-xr-x 3 root    root    4096 Oct 16  2018 ..
-rw-r----- 1 bandit4 bandit3   33 Oct 16  2018 .hidden
bandit3@bandit:~/inhere$
```

There it is, a file called `.hidden` with user or groups related to bandit3 and bandit4. In order to make sure the file contains ASCII characters, try using a `find` command to uncover any executable file types that contain ASCII text.

```bash
bandit3@bandit:~/inhere$ find . -type f -exec file {} + | grep ASCII
./.hidden: ASCII text
bandit3@bandit:~/inhere$
```

The `./.hidden` file is found within the inhere directory. Proceed to open it and see if there is a password inside.

```bash
bandit3@bandit:~/inhere$ cat ./.hidden
pIwrPrtPN36QITS..................
bandit3@bandit:~/inhere$ exit
```

<h2 id="bandit-level-four" class="dir-link h2-5">Level Four &RightArrow; Five {% directlink "bandit-level-four" %}</h2>

The password for the next level is stored in the only human-readable file inside the `inhere` directory. If your shell is cluttered up with all the previous levels content, try using the `reset` or `clear` command. 

Next, connect to the level 4 bandit server on port 2220 via SSH. Using bandit4 as the username and the last levels hidden password.

```bash
spherical:~ TannerDolby$ ssh bandit4@bandit.labs.overthewire.org -p 2220
```

Since OTW tells you the password is stored in the only human-readable file within the inhere directory. Lets change directory to `inhere` and then perform a long listing operation of all the current directories contents. 

```bash
bandit4@bandit:~$ cd inhere
bandit4@bandit:~/inhere$ ls -la
total 48
drwxr-xr-x 2 root    root    4096 Oct 16  2018 .
drwxr-xr-x 3 root    root    4096 Oct 16  2018 ..
-rw-r----- 1 bandit5 bandit4   33 Oct 16  2018 -file00
...
```

For length purposes, I truncated off the listing content from the above output after `-file00`. There are many files in this directory so why not simply use the `find` command to help match any files containing ASCII characters.

```bash
bandit4@bandit:~/inhere$ find . -type f -exec file {} + | grep ASCII
./-file07: ASCII text
```

And there it is, the only human-readable file that is stored in the `inhere` directory. Lets open it and find the last password of this article!

```bash
bandit4@bandit:~/inhere$ cat ./-file07
koReBOKuIDDe.......................
bandit4@bandit:~/inhere$ exit
```

<h2 id="concluding-remarks" class="dir-link h2-5">Conclusion {% directlink "concluding-remarks"%}</h2>

Thank you for reading this far! I hope your experience with using the shell has improved by completing bandit levels 1-5 via OverTheWire. If you noticed all of the passwords for each level are not provided, you saw right! I will not provide any of the complete passwords as you are capable of following this tutorial and finding them for yourself! Until next time. 

If you'd like to read another post like this one, have a look at #security or #shell tags.

<h3 id="references" class="dir-link h2-5">References {% directlink "references" %}</h3>

- [overthewire.org](https://overthewire.org/wargames/)
- [telnet](https://www.ssh.com/ssh/telnet)
- [rlogin](https://www.ssh.com/ssh/rlogin)
- [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol)
- [grep command](https://phoenixnap.com/kb/grep-command-linux-unix-examples)
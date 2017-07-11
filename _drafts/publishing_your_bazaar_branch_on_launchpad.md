
# Publishing your Bazaar branch on Launchpad

## preparation
you should install Bazaar first.

## introduction to Bazaar
before you start working, let's tell Bazaar who you are:

    $ bzr whoami "Janus Zhao <JanusKernel@gmail.com>"

you can check what identity is stored in Bazaar's configuration:
    
    $ bzr whoami

starting a new project. first, we'll make a repository directory to hold all our work related to this project. after creating the repository, create the project's main trunk branch:
    
    $ bzr init-repo testproject
    $ bzr init testproject/trunk

now that we have the trunk, we need to move to that directory and create some example files for the first version of that project. create a file test.txt, then we'll "add" the file, which tells bzr we want it to track changes:
    
    $ bzr add test.txt

and then commit, which saves a snapshot of all versioned files:
    
    $ bzr commit -m "Added first text"

## create a launchpad account
visit the Launchpad login page and choose to create a new account.

## create an SSH key
install OpenSSH. once OpenSSH is installed, stay in the terminal and type:

    $ ssh-keygen -t rsa

when prompted, press Enter to accept the default file name for your key. next, enter then confirm a password to protect your SSH key. your key pair is stored in ~/.ssh/ as id_rsa.pub(public key) and id_rsa(private key). now you need to upload the public portion of your SSH key to launchpad.
  
note:

if you're behind a proxy, you'd need SSH via tunneling (using corkscrew). install corkscrew on your machine, add the following lines to ~/.ssh/config:

    Host bazaar.launchpad.net
        User launchpad-username
        ProxyCommand corkscrew proxy-address proxy-port %h %p

## using a custom SSH key for launchpad (option)
you can safely use on SSH key per client machine to connect to multiple hosts. some people choose to use a separate SSH keypair per service and per client. To do this: you need to generate a key to a non-default name, perhaps id_rsa_launchpad (and .pub); upload that key to launchpad, as described above; you'll need to tell your SSH client to use this key. with OpenSSH, add these lines to your ~/.ssh/config file:

    Host bazaar.launchpad.net
        IdentityFile /home/Janus/.ssh/id_rsa_launchpad
        User launchpad-username

## tell Bazaar your launchpad account name
    $ bzr launchpad-login janus

## push the branch for your project
once you've committed your changes locally, you can publish them as the trunk of your new project by typing:
  
    $ bzr push lp:~janus/testproject/trunk

## reference
[http://doc.bazaar.canonical.com/bzr.dev/en/mini-tutorial/index.html](http://doc.bazaar.canonical.com/bzr.dev/en/mini-tutorial/index.html "reference^_^")

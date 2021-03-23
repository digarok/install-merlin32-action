![latest orkflow](https://github.com/digarok/install-merlin32-action/actions/workflows/main.yml/badge.svg)

# install-merlin32-action
A Github Action for installing Merlin32 enabling 6502/65c02/65816 assembly in your workflows.

# Example usage
```
    # This will install Merlin32 on your Github Runner machine
    - name: Install Merlin32
      uses: digarok/install-merlin32-action@master
    
    # Now you can use it to assemble your source code
    - name: Assembly Step
    - run: merlin32 src/myprogram.s
```
# Build recommendations

 1. While you can call Merlin32 directly from [`run`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun) commands as shown above, it makes sense to put your build command(s) in a script that you can also run locally to get the same results.  I'd avoid making complex assembly workflows with Github Actions, but hey you totally can and that's whats so great about actions!
 2. This action is intended to pair really well with my [`install-cadius-action`](https://github.com/digarok/install-cadius-action) which let's you take your assembled object file and package it inside a ProDOS image file for immediate use in your emulator or flash drive.  I use this workflow to handle build and release all via Github Actions.

# About Merlin32
Merlin32 is a disk image program originally by the amazing French team, Brutal Deluxe.  They are not involved with this Open Source version, but I do recommend you view [their site](http://brutaldeluxe.fr/products/crossdevtools/merlin32/) for more information on Merlin32 and their other incredible tools and releases.

# Further Examples

For a fully-integrated pipeline, see my example Apple II project here (https://github.com/digarok/apple2-assembly-github-actions-ci-example).

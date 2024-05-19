# Reminder Snap-In Documentation

This folder contains the documentation and the code for creating  snap-in that if an issue is in triage state for more than X number of days, send a reminder to the owner.

For more reference on Snap-Ins, please refer to the [DevRev Snap-In Development Documentation](https://developer.devrev.ai/snap-in-development/). 
For reference on DevRev methods, refer to their [Developer Docs](https://developer.devrev.ai/docs).

## Installation

1. **Install DevRev CLI**: Follow the instructions [here](https://developer.devrev.ai/snap-in-development/references/install-dev-rev-cli) to install DevRev CLI.
2. **Install JQ**: Follow the instructions [here](https://jqlang.github.io/jq/) to install JQ.
3. **Add Executables to System PATH**: (Optional) Unzip the files and add the executables to your system PATH.
4. **Verify the Installation**: Run the following command in your command shell to verify the installation:
   ```sh
   devrev --version
    ```
## Authentication
To authenticate with DevRev CLI, run the following command:

    ```plaintext
    devrev profiles authenticate -o <dev-org-slug> -u <youremail@yourdomain.com>
    ```
# Clone the Repository

Once you have cloned the repository, run the following commands to build and package the snap-in.

## Build the Package
    ```plaintext
    cd devrev-snaps-typescript-template/code
    npm install
    npm run build
    npm run package
    ```

This will generate a build.tar.gz file within the current directory.

Create a new snap-in package with a unique slug name:
    ```plaintext
    devrev snap_in_package create-one --slug reminder-snap-in | jq .
    ```

## Creating a New Snap-In Version
Create a new snap-in version by running the following command. The snap-in-version ID can be found in the JSON output of the snap_in_version create-one command:
    ```plaintext
    cd ../..
    devrev snap_in_version create-one --manifest ./devrev-snaps-typescript-template/manifest.yaml --archive ./devrev-snaps-typescript-template/code/build.tar.gz | jq .
    ```

Create a draft for the snap-in:
    ```plaintext
    devrev snap_in draft --snap_in_version <snap_in_version_id>
    ```

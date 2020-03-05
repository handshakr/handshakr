#!/usr/bin/env node

const boxen = require('boxen');
const chalk = require('chalk');
const Path = require('path');
const os = require('os');
const fs = require('bfile');
const inquirer = require('inquirer');
const fetch = require('node-fetch');
const argv = require('yargs').argv;

const fixed = require('../lib/fixed');
const helper = require('../lib/helper.js');

// Constants.
const PROOF_SUBMIT_URL = 'https://us-central1-handshakr-49220.cloudfunctions.net/ingestProof';
const DEFAULT_KEY_PATH = Path.join(os.homedir(), '.ssh', 'id_rsa')
const DEPOSIT_ADDRESS = 'hs1q3xyh86snzp9frw6ptcxnvt040r63mmr9wvl3lv';

async function main() {
    console.log(chalk.green(boxen("Welcome to Handshakr!\n" +
    "Easy Handshake (HNS) claimer.\n\n" + 
    "Learn more: https://github.com/handshakr/handshakr"
    , { padding: 1, margin: { top: 1, bottom: 1 }, align: 'center' })));

    const result = {
        referrer: argv.referrer || '',
    };

    // Enter email.
    result.email = (await inquirer.prompt({
        type: 'input',
        name: 'email',
        message: 'Enter your email:',
        validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            } else {
                return 'Invalid email, please enter correct email.';
            }
        }
    })).email;

    // Search for key.
    if (fs.existsSync(DEFAULT_KEY_PATH)) {
        console.log(chalk.white.bold(`Github SSH key found at ${DEFAULT_KEY_PATH}`));
    } else {
        throw new Error(`Github SSH key not found at ${DEFAULT_KEY_PATH}`);
    }

    // Reading the key.
    var key = null;
    await inquirer.prompt({
        type: 'password',
        name: 'password',
        message: 'Enter your SSH key password. If you don\'t have a password, just press ENTER:',
        mask: true,
        validate: async (input) => {
            try {
                key = await helper.readKey(DEFAULT_KEY_PATH, null, input);
                return true;
            } catch (e) {
                console.error(e);
                return 'Incorrect password for found SSH key. Please try again.';
            }
        }
    });

    // Creating proof.
    console.log(chalk.white.bold("Creating proof based on found key. This may take 5-10 minutes. Please keep this program running."));
    const options = {
        addr: DEPOSIT_ADDRESS,
        bare: false,
        entries: [],
        key: key,
        fee: fixed.decode('0.5', 6),
        type: 'ssh',
        version: 0,
    };
    [options.version, options.hash] = helper.parseAddress(options.addr);
    result.originalProofs = await helper.createKeyProofs(options);
    result.encodedProof = result.originalProofs[0].toBase64();

    // Sending proof.
    await fetch(PROOF_SUBMIT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify(result),
    });

    console.log(chalk.green(boxen('All done!\n' + 
        'We will follow up with an email with a gift card after your proof gets verified!\n\n' + 
        'Refer your friends by sharing with them this command:\n' + 
        chalk.bold(`curl -sL https://raw.githubusercontent.com/handshakr/handshakr/master/run.sh | bash -s -- --referrer ${result.email}`), 
        { padding: 1, margin: { top: 1, bottom: 1 }, align: 'center' })));
}

main();

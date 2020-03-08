# Handshakr

Easy Handshake (HNS) claimer.

Just run:

```bash
curl -sL https://raw.githubusercontent.com/handshakr/handshakr/master/run.sh \
 | bash -s -- --referrer handshakr@protonmail.com
```

## What is this about?

[Handshake](https://handshake.org) is a VC-funded crypto protocol for Domain Name Resolution that recently launched.
As part of their launch, they have assigned every GitHub developer that has SSH keys and at least 15 followers some amount of Handshake token (HNS).

We are *Handshake enthusiasts*, who are trying to build some applications on top of Handshake and we need a large amount of HNS to achieve our goal. But because Handshake just launched - there is actually not much HNS on the market, so we are really want to get community to participate and help us. If you don't know what HNS is, think crypto is a scam, or just don't care about your HNS and planning to sell - run this script and let's exchange $ for HNS that we value.

Feel free to email us at `handshakr@protonmail.com` with suggestions too! And send PRs if you see problems with the script!

## What does the script do? 
This script will search for your `id_rsa` file that you used for SSH access to GitHub and will use it to sign a special message. You must have access to your SSH key associated with your account in Feb 2019 for the script to work. 

*We are not collecting your private key or using it for anything except to sign one message.*

All of the code is open source in this repo and you can see how key is used here - https://github.com/handshakr/handshakr/blob/master/lib/helper.js#L325

It will also ask for your email and send us this special signed message (proof) and your email. After we confirm that it works, we will send you `$200` Amazon gift card.  Or if you prefer Bitcoin - we can do that as well.

You see that `referrer` flag? This is for you to share with your friends and co-workers.
If they qualify and run this - you will receive `$20`. Btw, if they refer someone as well - you will get another `$5`.

And yes, this is MLM - but we are transparent about what we do.

## Who is this for?

If you have more than 15 Github followers, you are probably eligible for the airdrop. Run this script and share with your friends and co-workers who also have more than 15 followers. 

If you don't have 15 followers and are not eligible for the claiming tokens, you can still share the script with your friends and co-workers who match this criteria with the `referrer` set to your email to earn referral bonuses.

## What if I see an error?

That either means that you don't use `id_rsa` for GitHub or you didn't have 15 followers when Handshake snapshotted GitHub on Feb 2019.

If you see some other error - email us at `handshakr@protonmail.com`

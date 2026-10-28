---
title: "Building a Mini Datacenter at Home: Why and How I Set Up My Homelab"
date: 2026-10-28
description: "My homelab: a Mini PC, Proxmox VE and no open ports, built on a minimum budget for maximum value."
lang: en
translation: evde-mini-datacenter-kurmak
tags: ["homelab", "proxmox", "self-hosted", "cloudflare", "pi-hole", "docker"]
---

In February, Deniz İrgin was debating on X whether to take his homelab into AI: 2x RTX 3090 or a single RTX 4090? In the end he [dropped the AI plan and went back to his original homelab goals](https://x.com/denizirgin/status/2026388061752336780). I had been down a similar road, so I [replied with my own setup](https://x.com/emresand1kc1/status/2026755450864284119). My homelab is now more than a year old, and I've only now got around to turning that reply into a proper post.

Once you get into this, the research, the hardware options and the costs never end. High-capacity RAM, big NAS drives, server cases, and the budget suddenly multiplies.

I went through the same thing. After seeing how far it could go, I asked myself: **"What do I actually need?"**

Given the conditions in Turkey, I decided to get the most out of a minimum budget. I bought a GMKtec M6 as my Mini PC and took a small first step into self-hosting. The Mini PC cost me around 15,000-20,000 Turkish lira.

Below is what I set up, how, and which tools I use.

## Proxmox VE

I installed [Proxmox VE](https://www.proxmox.com/en/proxmox-virtual-environment/overview) on the Mini PC. I can split CPU, RAM and disk between LXC containers and VMs on the fly, however I want, which makes a lot of things easier.

I created a few servers with LXC and separated my work and home networks virtually. I installed Docker inside each virtual server, and the services run on top of them as containers.

On the network side, I reserved the `192.168.1.100` - `192.168.1.254` range on my home router for the homelab and set up static DHCP leases. That way I always know which service is on which IP.

## External Access: No Open Ports, No Static IP

A static IP costs extra, though it isn't expensive, and opening ports on a home connection is a security risk. Instead I went with Cloudflare Zero Trust, and I use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) for external access.

The `cloudflare/cloudflared` container opens an outbound connection from my home to Cloudflare. The services I want to expose go live over HTTPS through that tunnel. There are no open ports on my router and my home IP isn't visible. Instead of drowning in details like setting up and tuning a firewall, I could focus on what I actually wanted to build.

## Running Services

- **[Pi-hole](https://pi-hole.net):** The DNS server for my home network. It blocks ad and tracker domains at the network level, so I don't have to install anything on each device.
- **[Vaultwarden](https://github.com/dani-garcia/vaultwarden):** A lightweight, Bitwarden-compatible password manager server. My passwords live on my own server.
- **[MySpeed](https://github.com/gnmyt/myspeed):** Runs speed tests at set intervals during the day and keeps the results. When I think something is wrong with the internet, I have data instead of a guess.
- **[Jellyfin](https://jellyfin.org):** For sharing media on the home network. I can open my own library from the TV, my phone or my computer. Don't worry about local streaming wearing out the CPU and GPU; as long as you're the only one watching, the impact is small.
- **[CasaOS](https://casaos.zimaspace.com):** A simple dashboard to see all the services in one place.

I haven't had any problems so far.

## From Homelab to Hosting

After getting into all this, my partner and I bought a second-hand server in the US for a business I run there, and started a small hosting operation. Same logic here: a second-hand server instead of new hardware. It cost $500-600, rack space included.

The server hosts some of our clients' projects as well as some of our own. Its specs and current usage:

- **CPU:** 2x Intel Xeon E5-2697 v4 @ 2.30GHz (2 sockets, 72 threads in total)
- **RAM:** 128 GB, about half (61 GiB) in use right now
- **Storage:** 1 TB, 274 GiB of it used

About half the resources are still free, so there's room for new projects too.

## Final Thoughts

You don't need server racks or high-capacity RAM to build a homelab that's actually useful; a Mini PC is enough. I got a place to try new things, and some of my data, like my passwords, now lives in my own home.

If you're thinking about a similar setup, I'd suggest getting clear on what you need before spending money on hardware, and starting small. If it's a hobby and you have a spare PC lying around, the most sensible move is to set that up and get going without overthinking it.

If you have questions or your own homelab stories, feel free to reach out on X ([@emresand1kc1](https://x.com/emresand1kc1)).

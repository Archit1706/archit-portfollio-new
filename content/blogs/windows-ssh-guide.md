---
title: "Windows SSH Guide"
slug: windows-ssh-guide
date: 2025-09-10
tags: [SSH, DevOps, Windows]
excerpt: "A step-by-step guide to enabling OpenSSH on Windows, connecting from any machine, and setting up key-based auth so you never type a password again."
readingTime: 5
featured: false
---

# Guide: Setting up SSH on Windows and Accessing it from Another Computer

## 1. Enable the OpenSSH Server on Windows (Server Machine)

Windows 10 (1809+) and Windows 11 come with OpenSSH built-in but not always enabled.

1. **Open Settings**

    - Press `Win + I` → Go to **Apps** → **Optional features**.

2. **Install OpenSSH Server**

    - Scroll down and check if **OpenSSH Server** is installed.
    - If not, click **Add a feature** → Search for _OpenSSH Server_ → Install.

3. **Start and Enable the SSH Service**

    - Open **Services** (`Win + R`, type `services.msc`).
    - Find **OpenSSH SSH Server**.
    - Right-click → **Start**.
    - To make it auto-start on boot: Right-click → **Properties** → Set _Startup type_ to **Automatic**.

4. **Check the Firewall**

    - Open PowerShell as Administrator and run:
        ```powershell
        Get-NetFirewallRule -Name *ssh*
        ```
    - If needed, allow SSH explicitly:
        ```powershell
        New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
        ```

---

## 2. Find Your Windows Machine's IP Address

On the server machine, open **Command Prompt** or **PowerShell** and run:

```powershell
ipconfig
```

-   Look for your IPv4 Address (e.g., `192.168.1.50`).

---

## 3. Connect from Another Computer (Client Machine)

### From Linux / macOS

Open a terminal and run:

```bash
ssh username@192.168.1.50
```

-   Replace `username` with your Windows account username.
-   Replace `192.168.1.50` with the Windows machine's IP.

If prompted with a fingerprint warning → type **yes**.
Enter your Windows password.

### From Another Windows Computer

1. Open **PowerShell**.
2. Run:

    ```powershell
    ssh username@192.168.1.50
    ```

---

## 4. (Optional but Recommended) Set Up Key-Based Authentication

This avoids typing a password every time.

1. **On Client Machine** generate SSH keys:

    ```bash
    ssh-keygen
    ```

    - Press Enter to accept defaults → keys saved in `~/.ssh/id_rsa`.

2. **Copy the Public Key to Windows**

    - On the client, run:
        ```bash
        ssh-copy-id username@192.168.1.50
        ```
        _(If `ssh-copy-id` isn't available, just copy the contents of `~/.ssh/id_rsa.pub` manually)._
    - On the Windows server:
        - Create directory (if not exists):
            ```powershell
            mkdir C:\Users\username\.ssh
            ```
        - Paste your public key into a file called `authorized_keys`:
            ```powershell
            notepad C:\Users\username\.ssh\authorized_keys
            ```
    - Ensure permissions are correct:
        ```powershell
        icacls C:\Users\username\.ssh /inheritance:r
        icacls C:\Users\username\.ssh /grant "$($env:USERNAME):(R,W)"
        ```

3. Now you can log in without a password:

    ```bash
    ssh username@192.168.1.50
    ```

---

## 5. (Optional) Access Over the Internet

If you want to connect from **outside your local network**:

1. Log in to your router and **port-forward TCP port 22** to your Windows machine's IP.
2. Find your public IP (e.g., visit [whatismyip.com](https://whatismyip.com)).
3. From the client:

    ```bash
    ssh username@<your-public-ip>
    ```

⚠️ **Security Warning**: Exposing SSH directly to the internet can be risky. Change the port, use key-based authentication, or set up a VPN for safety.

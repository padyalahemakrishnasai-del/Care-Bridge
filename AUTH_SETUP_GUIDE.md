# CareBridge Authentication Setup & Supabase Configuration Guide

This guide walks you through configuring **Supabase Authentication** and **Google OAuth** for your CareBridge project.

---

## 1. Quick Development Setup (No Supabase Account Required)

CareBridge is equipped with a **Dual-Mode Engine**:
* **Demo / Offline Mode (Default)**: If no keys are placed in `.env`, the full UI, forms, and local state management work immediately out-of-the-box.
* **Production Cloud Mode**: When you connect your real Supabase project, all authentication requests are processed by Supabase servers.

---

## 2. Setting Up Your Supabase Project (Backend)

1. Go to **[https://supabase.com](https://supabase.com)** and create a free account.
2. Click **New Project** and name it `carebridge`.
3. Choose your closest region (e.g., `South Asia (Mumbai)`).
4. In your Supabase Dashboard, go to **Project Settings** > **API**.
5. Copy your:
   - **Project URL**
   - **Project API Anon Key**
6. In your project root, create a `.env` file from `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...your-anon-key
   ```

---

## 3. Configuring Google OAuth in Supabase

To enable **"Continue with Google"**:

1. Go to the **Google Cloud Console** ([https://console.cloud.google.com](https://console.cloud.google.com)).
2. Create a new project named `CareBridge`.
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - User Type: **External**
   - App Name: `CareBridge`
   - User support email: your email
4. Navigate to **APIs & Services** > **Credentials**:
   - Click **Create Credentials** > **OAuth Client ID**.
   - Application type: **Web application**.
   - Under **Authorized redirect URIs**, add your Supabase Callback URL:
     ```
     https://<your-project-id>.supabase.co/auth/v1/callback
     ```
   - Click **Create** and copy your **Client ID** and **Client Secret**.
5. In your **Supabase Dashboard**:
   - Go to **Authentication** > **Providers** > **Google**.
   - Turn on **Enable Google provider**.
   - Paste the **Client ID** and **Client Secret**.
   - Click **Save**.

---

## 4. Applying the Database Migration

1. In your Supabase Dashboard, open the **SQL Editor**.
2. Open [`supabase/migrations/20261011_carebridge_schema.sql`](./supabase/migrations/20261011_carebridge_schema.sql).
3. Copy the entire contents, paste it into the Supabase SQL Editor, and click **Run**.
4. All 22 tables and strict Row Level Security (RLS) policies are now live!

---

## 5. Testing the 7 Authentication Flows

1. **Email Registration**:
   - Go to `/signup`.
   - Enter Full Name, Unique Username, Email, and Password (min. 8 characters + number).
   - Check the Terms box and click **Create CareBridge Account**.
   - You will be redirected to the `/email-confirmation` screen.

2. **Login with Email & Remember Me**:
   - Go to `/login`.
   - Select **Email Address**, enter credentials, leave **Remember me** checked, and click **Sign In**.
   - You will be redirected to `/dashboard`.

3. **Login with Username**:
   - Go to `/login`.
   - Click the **Username** tab, type your handle (e.g. `priya_health`), enter your password, and click **Sign In**.

4. **Forgot Password & Recovery**:
   - On `/login`, click **Forgot Password?**.
   - Enter your email and click **Send Password Reset Link**.
   - Observe the confirmation screen confirming the recovery link was dispatched.

5. **Reset Password Screen**:
   - Navigate to `/reset-password`.
   - Enter your new password twice and click **Save New Password**.

6. **Complete Profile Screen**:
   - Navigate to `/complete-profile`.
   - Enter your 6-digit PIN code, blood group, and emergency contact for instant 112 dialing.
   - Click **Finish & Go to My Health Dashboard**.

7. **Sign Out & Session Revocation**:
   - Click **Role** or visit your profile and click **Sign Out / Browse as Guest** to test session clearance.

# Australia Pacific Group Order - Deploy Guide

## 1. Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. Paste the contents of `supabase-schema.sql`.
4. Run it.
5. Go to Project Settings -> API.
6. Copy:
   - Project URL
   - `service_role` key

Keep the service role key private. It only goes into Render environment variables.

## 2. GitHub

Push this folder to a GitHub repository.

## 3. Render

Create a new Web Service:

- Environment: Node
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PORT` can be omitted on Render because Render sets it automatically.

## 4. First Login

Open the Render URL and login:

- Admin: `ryan` / `ryan123`
- General Manager: `manager` / `manager123`
- Staff: `staff.vn` / `staff123`

After first login, change the passwords in Settings.

## 5. Notes

This deploy uses a Node API server plus Supabase state storage. Staff in Vietnam and admin in Australia will use the same Render link and shared cloud data.

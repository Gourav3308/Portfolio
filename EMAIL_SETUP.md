# Email Configuration Guide

## Gmail Setup for Contact Form

To enable email functionality in your portfolio contact form, you need to configure Gmail SMTP settings.

### Step 1: Enable 2-Factor Authentication
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to Security
3. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password
1. In Google Account settings, go to Security
2. Under "How you sign in to Google", click on "App passwords"
3. Select "Mail" as the app
4. Generate a new app password
5. Copy this password (you'll need it for the configuration)

### Step 3: Update Application Configuration
Update the `backend/src/main/resources/application.yml` file:

```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: gouravkrsah78@gmail.com
    password: YOUR_APP_PASSWORD_HERE  # Use the app password from Step 2
```

### Step 4: Environment Variables (Optional)
For production deployment, set these environment variables:
- `EMAIL_USERNAME=gouravkrsah78@gmail.com`
- `EMAIL_PASSWORD=your_app_password`

### How It Works
1. When someone fills out the contact form, the message is saved to the database
2. An email notification is sent to `gouravkrsah78@gmail.com`
3. An auto-reply is sent to the person who submitted the form
4. If email sending fails, the form falls back to opening the user's email client

### Testing
1. Start your Spring Boot backend
2. Fill out the contact form on your website
3. Check your Gmail inbox for the notification
4. Verify that an auto-reply was sent to the sender

### Troubleshooting
- Make sure you're using the App Password, not your regular Gmail password
- Ensure 2-Factor Authentication is enabled
- Check that the SMTP settings are correct
- Verify that your firewall allows outbound connections on port 587
